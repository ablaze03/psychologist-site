import type { WebhookPayload } from '../types/screening';

/**
 * Отправляет данные лида через webhook
 */
export async function sendLeadWebhook(
  payload: WebhookPayload,
  includRawAnswers: boolean = false
): Promise<boolean> {
  // Webhook URL можно настроить в env или использовать напрямую
  const webhookUrl = ''; // Настройте при необходимости
  
  if (!webhookUrl) {
    console.warn('Webhook URL not configured');
    return false;
  }

  try {
    const dataToSend = includRawAnswers
      ? payload
      : { ...payload, raw_answers: undefined };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to send webhook:', error);
    return false;
  }
}

/**
 * Отправляет email с результатами (через webhook или API)
 */
export async function sendResultsEmail(
  email: string,
  sessionId: string,
  resultSummary: string
): Promise<boolean> {
  // Email webhook URL можно настроить при необходимости
  const emailWebhook = ''; // Настройте при необходимости
  
  if (!emailWebhook) {
    console.warn('Email webhook URL not configured');
    return false;
  }

  try {
    const response = await fetch(emailWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        session_id: sessionId,
        result_summary: resultSummary,
        template: 'screening_results'
      })
    });

    if (!response.ok) {
      throw new Error(`Email webhook failed: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}
