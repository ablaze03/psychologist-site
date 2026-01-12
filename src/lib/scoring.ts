import type { Question, AnswerValue, ScaleScore, SeverityLevel, ScaleType, VersionType, TopicType } from '../types/screening';
import { questions } from '../config/questions';

/**
 * Вычисляет score для одного вопроса с учётом reverse scoring
 */
function computeQuestionScore(question: Question, answer: AnswerValue): number {
  if (question.reverse_scored) {
    return 3 - answer;
  }
  return answer;
}

/**
 * Определяет уровень выраженности по проценту
 */
function getSeverityLevel(percent: number): SeverityLevel {
  if (percent <= 33) return 'low';
  if (percent <= 66) return 'moderate';
  return 'high';
}

/**
 * Вычисляет баллы по всем шкалам на основе ответов
 */
export function computeScores(
  responses: Record<string, AnswerValue>,
  topic: TopicType,
  version: VersionType
): ScaleScore[] {
  // Группируем вопросы по шкалам
  const scaleQuestions: Record<ScaleType, Question[]> = {} as any;

  questions.forEach(q => {
    // Фильтруем вопросы по версии и теме
    const matchesVersion = q.version === version || q.version === 'both';
    const matchesTopic = q.topic_gate === 'all' || q.topic_gate === topic;
    
    if (matchesVersion && matchesTopic && responses[q.id] !== undefined) {
      if (!scaleQuestions[q.scale]) {
        scaleQuestions[q.scale] = [];
      }
      scaleQuestions[q.scale].push(q);
    }
  });

  // Вычисляем баллы для каждой шкалы
  const scores: ScaleScore[] = [];

  Object.entries(scaleQuestions).forEach(([scale, scaleQs]) => {
    let rawScore = 0;
    
    scaleQs.forEach(q => {
      const answer = responses[q.id];
      if (answer !== undefined) {
        rawScore += computeQuestionScore(q, answer);
      }
    });

    const maxScore = scaleQs.length * 3;
    const percent = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : 0;
    const level = getSeverityLevel(percent);

    scores.push({
      scale: scale as ScaleType,
      raw_score: rawScore,
      max_score: maxScore,
      percent,
      level
    });
  });

  return scores;
}

/**
 * Определяет топ-2 зоны беспокойства (исключая SAFETY и WHO)
 */
export function getTopConcerns(scores: ScaleScore[]): ScaleScore[] {
  const filtered = scores.filter(s => 
    s.scale !== 'SAFETY' && 
    !s.scale.includes('WHO') // WHO показывает ресурс, не проблему
  );

  return filtered
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 2);
}

/**
 * Получить название шкалы для отображения
 */
export function getScaleDisplayName(scale: ScaleType): string {
  const names: Record<ScaleType, string> = {
    PHQ2: 'Настроение',
    PHQ9: 'Депрессивные симптомы',
    GAD2: 'Тревога',
    GAD7: 'Тревожные симптомы',
    PSS_SHORT: 'Стресс',
    PSS10: 'Переживание стресса',
    WHO_SHORT: 'Ресурс',
    WHO5: 'Психологический ресурс',
    TOPIC_REL: 'Отношения',
    TOPIC_WORK: 'Работа и выгорание',
    TOPIC_ANX: 'Тревога и контроль',
    TOPIC_OTHER: 'Эмоциональное состояние',
    SAFETY: 'Безопасность'
  };
  
  return names[scale] || scale;
}

/**
 * Проверяет, сработал ли safety триггер
 */
export function checkSafetyTrigger(responses: Record<string, AnswerValue>): boolean {
  const safetyQuestion = questions.find(q => q.scale === 'SAFETY');
  if (!safetyQuestion) return false;
  
  const answer = responses[safetyQuestion.id];
  return answer !== undefined && answer > 0;
}

/**
 * Получить список вопросов для данной темы и версии
 */
export function getQuestionsForSession(topic: TopicType, version: VersionType): Question[] {
  return questions
    .filter(q => {
      const matchesVersion = q.version === version || q.version === 'both';
      const matchesTopic = q.topic_gate === 'all' || q.topic_gate === topic;
      return matchesVersion && matchesTopic;
    })
    .sort((a, b) => a.order - b.order);
}
