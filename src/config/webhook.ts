// Конфигурация для отправки результатов теста

export const webhookConfig = {
  // Telegram Bot
  // Инструкция по настройке: site/src/screening/НАСТРОЙКА_ОТПРАВКИ.md
  telegram: {
    enabled: true,
    // Получите токен у @BotFather в Telegram
    botToken: import.meta.env.PUBLIC_TELEGRAM_BOT_TOKEN || '8201502833:AAFdAhwA5XNjmoVSICXTgEYwMFC3PoW2RT0',
    // Ваш chat_id (получите у @userinfobot)
    chatId: import.meta.env.PUBLIC_TELEGRAM_CHAT_ID || '269044713',
  },

  // Email (резервный вариант через FormSubmit.co)
  email: {
    enabled: false,
    // Ваш email для получения результатов
    recipientEmail: import.meta.env.PUBLIC_RESULTS_EMAIL || '',
    // FormSubmit endpoint (автоматически генерируется)
    formSubmitEndpoint: '', // заполнится автоматически на основе email
  },
};

// Функция отправки результатов в Telegram
export async function sendToTelegram(data: {
  contactType: string;
  contactValue: string;
  phq9Score: number;
  phq9Level: string;
  gad7Score: number;
  gad7Level: string;
  safetyTriggered: boolean;
}) {
  const { telegram } = webhookConfig;

  if (!telegram.enabled || !telegram.botToken || !telegram.chatId) {
    console.warn('Telegram не настроен');
    return { success: false, error: 'Telegram не настроен' };
  }

  const message = `
🆕 <b>Новый результат теста</b>

👤 <b>Контакт клиента:</b>
${data.contactType === 'email' ? '📧' : '📱'} ${data.contactValue}

📊 <b>Результаты:</b>
🟦 <b>Депрессия (PHQ-9):</b> ${data.phq9Score} баллов — ${getLevelRu(data.phq9Level)}
🟧 <b>Тревога (GAD-7):</b> ${data.gad7Score} баллов — ${getLevelRu(data.gad7Level)}

${data.safetyTriggered ? '⚠️ <b>ВНИМАНИЕ:</b> Сработал safety-триггер (суицидальные мысли)\n' : ''}
${data.phq9Level === 'severe' || data.gad7Level === 'severe' ? '🔴 <b>Тяжёлое состояние</b> — рекомендован психотерапевт/психиатр\n' : ''}

<i>Дата: ${new Date().toLocaleString('ru-RU')}</i>
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${telegram.botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegram.chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const result = await response.json();

    if (result.ok) {
      return { success: true };
    } else {
      console.error('Ошибка Telegram:', result);
      return { success: false, error: result.description };
    }
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    return { success: false, error: String(error) };
  }
}

// Функция отправки результатов на Email
export async function sendToEmail(data: {
  contactType: string;
  contactValue: string;
  phq9Score: number;
  phq9Level: string;
  gad7Score: number;
  gad7Level: string;
  safetyTriggered: boolean;
}) {
  const { email } = webhookConfig;

  if (!email.enabled || !email.recipientEmail) {
    console.warn('Email не настроен');
    return { success: false, error: 'Email не настроен' };
  }

  const endpoint = `https://formsubmit.co/${email.recipientEmail}`;

  const formData = new FormData();
  formData.append('_subject', `Новый результат теста от ${data.contactValue}`);
  formData.append('_template', 'table');
  formData.append('_captcha', 'false');
  
  formData.append('Контакт клиента', data.contactValue);
  formData.append('Тип контакта', data.contactType);
  formData.append('Депрессия (PHQ-9)', `${data.phq9Score} баллов — ${getLevelRu(data.phq9Level)}`);
  formData.append('Тревога (GAD-7)', `${data.gad7Score} баллов — ${getLevelRu(data.gad7Level)}`);
  formData.append('Safety триггер', data.safetyTriggered ? 'ДА' : 'Нет');
  formData.append('Дата', new Date().toLocaleString('ru-RU'));

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Ошибка отправки' };
    }
  } catch (error) {
    console.error('Ошибка отправки на Email:', error);
    return { success: false, error: String(error) };
  }
}

// Универсальная функция отправки (пробует все настроенные методы)
export async function sendTestResults(data: {
  contactType: string;
  contactValue: string;
  phq9Score: number;
  phq9Level: string;
  gad7Score: number;
  gad7Level: string;
  safetyTriggered: boolean;
}) {
  const results = [];

  // Пробуем Telegram
  if (webhookConfig.telegram.enabled) {
    const telegramResult = await sendToTelegram(data);
    results.push({ method: 'Telegram', ...telegramResult });
  }

  // Пробуем Email
  if (webhookConfig.email.enabled) {
    const emailResult = await sendToEmail(data);
    results.push({ method: 'Email', ...emailResult });
  }

  // Если хотя бы один метод сработал — успех
  const anySuccess = results.some(r => r.success);

  return {
    success: anySuccess,
    results,
  };
}

// Вспомогательная функция для перевода уровней
function getLevelRu(level: string): string {
  const levels: Record<string, string> = {
    minimal: 'минимальный',
    mild: 'лёгкий',
    moderate: 'умеренный',
    severe: 'тяжёлый',
  };
  return levels[level] || level;
}
