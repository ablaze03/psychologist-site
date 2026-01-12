// Сохранение прогресса в localStorage

export interface SessionData {
  currentQuestion: number;
  answers: Record<string, number>;
  startedAt: number;
  lastUpdated: number;
}

const STORAGE_KEY = 'screening_session';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 часа

export function saveProgress(data: SessionData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
}

export function loadProgress(): SessionData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const session: SessionData = JSON.parse(data);
    
    // Проверяем, не истёк ли срок сессии
    if (Date.now() - session.lastUpdated > SESSION_TIMEOUT) {
      clearProgress();
      return null;
    }

    return session;
  } catch (e) {
    console.error('Failed to load progress', e);
    return null;
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear progress', e);
  }
}

export function hasProgress(): boolean {
  return loadProgress() !== null;
}
