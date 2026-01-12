import type { AnalyticsEvent, TopicType, VersionType } from '../types/screening';

/**
 * Отправляет событие аналитики
 */
export function trackEvent(
  event: string,
  sessionId: string,
  data?: {
    topic?: TopicType;
    version?: VersionType;
    question_id?: string;
  }
): void {
  const eventData: AnalyticsEvent = {
    event,
    session_id: sessionId,
    timestamp: Date.now(),
    ...data
  };

  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, {
      session_id: sessionId,
      ...data
    });
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', event, {
      session_id: sessionId,
      ...data
    });
  }

  // Yandex Metrika
  if (typeof window !== 'undefined' && (window as any).ym) {
    const ymId = '106211627'; // ID Яндекс Метрики
    (window as any).ym(ymId, 'reachGoal', event, {
      session_id: sessionId,
      ...data
    });
  }

  // Console log в dev режиме
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('[Analytics]', event, eventData);
  }
}

/**
 * Генерирует уникальный session ID
 */
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Сохраняет session в localStorage
 */
export function saveSession(sessionId: string, data: any): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`screening_session_${sessionId}`, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save session', e);
    }
  }
}

/**
 * Загружает session из localStorage
 */
export function loadSession(sessionId: string): any | null {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(`screening_session_${sessionId}`);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load session', e);
      return null;
    }
  }
  return null;
}
