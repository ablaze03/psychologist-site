import type { SessionData, TopicType, VersionType, AnswerValue, Question } from '../types/screening';
import { getQuestionsForSession, computeScores, checkSafetyTrigger, getTopConcerns } from './scoring';
import { generateSessionId, trackEvent, saveSession } from './analytics';

export type ScreenType = 
  | 'welcome'
  | 'topic'
  | 'depth'
  | 'questions'
  | 'safety'
  | 'results';

export interface TestState {
  screen: ScreenType;
  session: SessionData;
  questions: Question[];
  currentQuestionIndex: number;
}

/**
 * Класс для управления состоянием теста
 */
export class TestStateMachine {
  private state: TestState;
  private listeners: Array<(state: TestState) => void> = [];

  constructor(sessionId?: string) {
    this.state = {
      screen: 'welcome',
      session: {
        session_id: sessionId || generateSessionId(),
        topic_selected: 'other',
        version_selected: 'quick',
        responses: {},
        started_at: Date.now()
      },
      questions: [],
      currentQuestionIndex: 0
    };
  }

  /**
   * Подписка на изменения состояния
   */
  subscribe(listener: (state: TestState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Уведомление подписчиков об изменениях
   */
  private notify(): void {
    this.listeners.forEach(listener => listener(this.state));
    this.saveState();
  }

  /**
   * Сохранение состояния
   */
  private saveState(): void {
    saveSession(this.state.session.session_id, this.state);
  }

  /**
   * Получение текущего состояния
   */
  getState(): TestState {
    return this.state;
  }

  /**
   * Начало теста
   */
  start(): void {
    trackEvent('test_start', this.state.session.session_id);
    this.state.screen = 'topic';
    this.notify();
  }

  /**
   * Выбор темы
   */
  selectTopic(topic: TopicType): void {
    this.state.session.topic_selected = topic;
    trackEvent('topic_selected', this.state.session.session_id, { topic });
    this.state.screen = 'depth';
    this.notify();
  }

  /**
   * Выбор версии (quick/deep)
   */
  selectVersion(version: VersionType): void {
    this.state.session.version_selected = version;
    trackEvent('version_selected', this.state.session.session_id, { 
      topic: this.state.session.topic_selected,
      version 
    });

    // Получаем вопросы для выбранной темы и версии
    this.state.questions = getQuestionsForSession(
      this.state.session.topic_selected,
      version
    );

    this.state.currentQuestionIndex = 0;
    this.state.screen = 'questions';
    this.notify();
  }

  /**
   * Ответ на вопрос
   */
  answerQuestion(questionId: string, answer: AnswerValue): void {
    this.state.session.responses[questionId] = answer;
    
    trackEvent('question_answered', this.state.session.session_id, {
      question_id: questionId,
      topic: this.state.session.topic_selected,
      version: this.state.session.version_selected
    });

    this.notify();
  }

  /**
   * Переход к следующему вопросу
   */
  nextQuestion(): void {
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    
    // Проверяем, это safety вопрос и сработал ли триггер
    if (currentQuestion?.scale === 'SAFETY') {
      const safetyTriggered = checkSafetyTrigger(this.state.session.responses);
      
      if (safetyTriggered) {
        trackEvent('safety_triggered', this.state.session.session_id);
        this.state.screen = 'safety';
        this.notify();
        return;
      }
    }

    // Переход к следующему вопросу
    if (this.state.currentQuestionIndex < this.state.questions.length - 1) {
      this.state.currentQuestionIndex++;
      this.notify();
    } else {
      // Все вопросы отвечены, показываем результаты
      this.showResults();
    }
  }

  /**
   * Переход к предыдущему вопросу
   */
  previousQuestion(): void {
    if (this.state.currentQuestionIndex > 0) {
      this.state.currentQuestionIndex--;
      this.notify();
    }
  }

  /**
   * Продолжить после safety screen
   */
  continuFromSafety(): void {
    this.showResults();
  }

  /**
   * Показать результаты
   */
  private showResults(): void {
    this.state.session.finished_at = Date.now();

    // Вычисляем результаты
    const scores = computeScores(
      this.state.session.responses,
      this.state.session.topic_selected,
      this.state.session.version_selected
    );

    const topConcerns = getTopConcerns(scores);
    const safetyTriggered = checkSafetyTrigger(this.state.session.responses);

    this.state.session.result = {
      scores,
      top_concerns: topConcerns,
      safety_triggered: safetyTriggered,
      interpretation: {
        title: '',
        summary: '',
        recommendations: [],
        therapy_prompts: [],
        evidence_note: 'Основано на скрининговых шкалах PHQ-9, GAD-7, PSS-10, WHO-5. Не является диагнозом.'
      }
    };

    trackEvent('results_view', this.state.session.session_id, {
      topic: this.state.session.topic_selected,
      version: this.state.session.version_selected
    });

    this.state.screen = 'results';
    this.notify();
  }

  /**
   * Получить текущий вопрос
   */
  getCurrentQuestion(): Question | null {
    return this.state.questions[this.state.currentQuestionIndex] || null;
  }

  /**
   * Получить прогресс (процент)
   */
  getProgress(): number {
    if (this.state.questions.length === 0) return 0;
    return Math.round(((this.state.currentQuestionIndex + 1) / this.state.questions.length) * 100);
  }

  /**
   * Проверка, отвечен ли текущий вопрос
   */
  isCurrentQuestionAnswered(): boolean {
    const currentQuestion = this.getCurrentQuestion();
    if (!currentQuestion) return false;
    return this.state.session.responses[currentQuestion.id] !== undefined;
  }

  /**
   * Сброс теста (начать заново)
   */
  reset(): void {
    this.state = {
      screen: 'welcome',
      session: {
        session_id: generateSessionId(),
        topic_selected: 'other',
        version_selected: 'quick',
        responses: {},
        started_at: Date.now()
      },
      questions: [],
      currentQuestionIndex: 0
    };
    this.notify();
  }
}
