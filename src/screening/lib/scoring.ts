// Подсчет результатов теста

import { questions } from '../config/questions';
import { getPHQ9Level, getGAD7Level } from '../config/interpretations';

export interface ScaleResult {
  scale: 'PHQ9' | 'GAD7';
  score: number;
  maxScore: number;
  percent: number;
  level: 'minimal' | 'mild' | 'moderate' | 'severe';
  label: string;
}

export interface TestResults {
  phq9: ScaleResult;
  gad7: ScaleResult;
  safetyTriggered: boolean;
  timestamp: number;
}

export function calculateResults(answers: Record<string, number>): TestResults {
  // Подсчитываем PHQ-9
  const phq9Questions = questions.filter(q => q.scale === 'PHQ9');
  const phq9Score = phq9Questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
  const phq9MaxScore = phq9Questions.length * 3;
  
  // Подсчитываем GAD-7
  const gad7Questions = questions.filter(q => q.scale === 'GAD7');
  const gad7Score = gad7Questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
  const gad7MaxScore = gad7Questions.length * 3;

  // Проверяем Safety
  const safetyAnswer = answers['safety1'] || 0;
  const safetyTriggered = safetyAnswer > 0;

  return {
    phq9: {
      scale: 'PHQ9',
      score: phq9Score,
      maxScore: phq9MaxScore,
      percent: Math.round((phq9Score / phq9MaxScore) * 100),
      level: getPHQ9Level(phq9Score),
      label: 'Депрессивные симптомы'
    },
    gad7: {
      scale: 'GAD7',
      score: gad7Score,
      maxScore: gad7MaxScore,
      percent: Math.round((gad7Score / gad7MaxScore) * 100),
      level: getGAD7Level(gad7Score),
      label: 'Тревожные симптомы'
    },
    safetyTriggered,
    timestamp: Date.now()
  };
}

export function getLevelColor(level: 'minimal' | 'mild' | 'moderate' | 'severe'): string {
  switch (level) {
    case 'minimal': return '#10b981'; // green
    case 'mild': return '#f59e0b';    // yellow
    case 'moderate': return '#f97316'; // orange
    case 'severe': return '#ef4444';   // red
  }
}

export function getLevelLabel(level: 'minimal' | 'mild' | 'moderate' | 'severe'): string {
  switch (level) {
    case 'minimal': return 'Минимальная';
    case 'mild': return 'Лёгкая';
    case 'moderate': return 'Умеренная';
    case 'severe': return 'Выраженная';
  }
}
