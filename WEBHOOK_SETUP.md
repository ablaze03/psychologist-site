# Настройка Webhook интеграций для скрининг-теста

## 📋 Обзор

Скрининг-тест отправляет данные о прохождении теста и контактные данные пользователей через webhook. Это позволяет легко интегрировать тест с CRM, email-сервисами и мессенджерами.

## 🔧 Настройка переменных окружения

Создайте файл `.env` в корне проекта `site/`:

```bash
# Webhook для отправки лидов
PUBLIC_WEBHOOK_URL=https://hook.eu1.make.com/xxxxxxxxxx

# Webhook для email (опционально)
PUBLIC_EMAIL_WEBHOOK_URL=https://your-email-webhook.com

# Yandex Metrika ID
PUBLIC_YM_ID=12345678
```

## 🎯 Формат данных Webhook

### Структура payload

```json
{
  "session_id": "1705234567890-abc123def",
  "topic": "relationships",
  "version": "deep",
  "scores": {
    "PHQ9": 45,
    "GAD7": 60,
    "PSS10": 55,
    "WHO5": 40,
    "TOPIC_REL": 70
  },
  "top_concerns": [
    "Отношения",
    "Тревожные симптомы"
  ],
  "contact_email": "user@example.com",
  "contact_telegram": "@username",
  "raw_answers": {
    "phq2_1": 2,
    "phq2_2": 1,
    "gad2_1": 3
  }
}
```

### Описание полей

- `session_id` - уникальный ID сессии
- `topic` - выбранная тема (relationships/anxiety/work/other)
- `version` - версия теста (quick/deep)
- `scores` - объект с процентами по каждой шкале
- `top_concerns` - массив топ-2 зон беспокойства (названия шкал)
- `contact_email` - email пользователя (если указан)
- `contact_telegram` - Telegram username/телефон (если указан)
- `raw_answers` - сырые ответы (опционально, если включен флаг)

## 🛠️ Интеграция с Make.com (ex Integromat)

### Шаг 1: Создание сценария

1. Зайдите на [make.com](https://make.com)
2. Создайте новый сценарий
3. Добавьте модуль "Webhooks → Custom webhook"
4. Скопируйте URL webhook

### Шаг 2: Настройка обработки данных

#### Пример 1: Отправка в Google Sheets

```
Webhook → Google Sheets (Add a row)
```

Маппинг данных:
- Session ID: `{{1.session_id}}`
- Тема: `{{1.topic}}`
- Версия: `{{1.version}}`
- Email: `{{1.contact_email}}`
- Telegram: `{{1.contact_telegram}}`
- Депрессия (PHQ9): `{{1.scores.PHQ9}}`
- Тревога (GAD7): `{{1.scores.GAD7}}`
- Стресс (PSS10): `{{1.scores.PSS10}}`
- Ресурс (WHO5): `{{1.scores.WHO5}}`
- Топ беспокойства: `{{join(1.top_concerns; ", ")}}`
- Дата: `{{now}}`

#### Пример 2: Отправка в Telegram

```
Webhook → Telegram (Send a message)
```

Текст сообщения:
```
🔔 Новый результат скрининг-теста

👤 Контакт:
Email: {{1.contact_email}}
Telegram: {{1.contact_telegram}}

📊 Результаты:
Тема: {{1.topic}}
Версия: {{1.version}}

Баллы по шкалам:
• PHQ-9 (депрессия): {{1.scores.PHQ9}}%
• GAD-7 (тревога): {{1.scores.GAD7}}%
• PSS-10 (стресс): {{1.scores.PSS10}}%
• WHO-5 (ресурс): {{1.scores.WHO5}}%

⚠️ Топ беспокойства: {{join(1.top_concerns; ", ")}}

Session ID: {{1.session_id}}
```

#### Пример 3: Отправка email через SendGrid

```
Webhook → SendGrid (Send an email)
```

- To: `{{1.contact_email}}`
- From: `noreply@spiridonovapsy.ru`
- Subject: `Результаты вашего теста — расшифровка`
- Body: (создать шаблон с результатами)

### Шаг 3: Условная логика

Добавьте роутер для разной обработки по уровню:

```
Webhook → Router
  ├─ Filter (high concern) → Отправить срочное уведомление
  ├─ Filter (moderate) → Отправить стандартное письмо
  └─ Filter (low) → Отправить поддерживающее письмо
```

Пример фильтра для "high":
```javascript
{{contains(1.top_concerns; "Депрессивные симптомы")}} AND 
{{1.scores.PHQ9 > 66}}
```

## 💌 Интеграция с email-сервисами

### SendGrid

```javascript
// Make.com модуль: HTTP → Make a request
{
  "url": "https://api.sendgrid.com/v3/mail/send",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  "body": {
    "personalizations": [{
      "to": [{"email": "{{1.contact_email}}"}],
      "dynamic_template_data": {
        "session_id": "{{1.session_id}}",
        "topic": "{{1.topic}}",
        "scores": "{{1.scores}}"
      }
    }],
    "from": {"email": "noreply@spiridonovapsy.ru"},
    "template_id": "d-xxxxxxxxxxxxxxxxx"
  }
}
```

### Mailchimp

```
Webhook → Mailchimp (Add/Update subscriber)
  + Add tag: "screening_completed"
  + Add merge field: "TOPIC" = {{1.topic}}
  + Trigger automation: "Screening Results"
```

## 📱 Интеграция с CRM

### Битрикс24

```
Webhook → Bitrix24 (Create a lead)
```

Маппинг:
- Title: `Скрининг-тест: {{1.topic}}`
- Name: (извлечь из email)
- Email: `{{1.contact_email}}`
- Phone: `{{1.contact_telegram}}`
- Comments: `Версия: {{1.version}}, Топ беспокойства: {{join(1.top_concerns; ", ")}}`
- Custom field (PHQ9): `{{1.scores.PHQ9}}`
- Custom field (GAD7): `{{1.scores.GAD7}}`

### AmoCRM

Аналогично Битрикс24, используйте модуль AmoCRM в Make.com

## 🔐 Безопасность

### Проверка источника webhook

В Make.com добавьте фильтр:

```javascript
// Проверка, что webhook пришел с вашего домена
{{1.headers.origin}} = "https://spiridonovapsy.ru"
```

### Скрытие чувствительных данных

Если не хотите хранить raw_answers:
- В коде установите `send_raw_answers: false` (по умолчанию)
- Или в Make.com не маппьте поле `raw_answers`

## 📊 Аналитика в Make.com

Добавьте модуль Data Store для подсчета статистики:

```
Webhook → Data Store (Increment)
  Key: screening_completions_{{formatDate(now; "YYYY-MM")}}
  Value: +1
```

Или отправляйте в Google Analytics:

```
Webhook → HTTP → Make a request
URL: https://www.google-analytics.com/collect
Method: POST
Body:
  v=1
  tid=UA-XXXXX-Y
  cid={{1.session_id}}
  t=event
  ec=screening
  ea=completed
  el={{1.topic}}
  ev={{1.scores.PHQ9}}
```

## 🧪 Тестирование

1. Запустите тест на локальном сервере
2. Пройдите до конца
3. Отправьте форму
4. Проверьте получение webhook в Make.com
5. Проверьте все маппинги данных

### Тестовый payload

Используйте в Make.com для тестирования:

```json
{
  "session_id": "test-123",
  "topic": "anxiety",
  "version": "quick",
  "scores": {
    "PHQ2": 50,
    "GAD2": 75,
    "PSS_SHORT": 60,
    "WHO_SHORT": 40,
    "TOPIC_ANX": 80
  },
  "top_concerns": ["Тревога", "Стресс"],
  "contact_email": "test@example.com",
  "contact_telegram": "@testuser"
}
```

## 🚨 Обработка Safety триггера

Если пользователь ответил положительно на safety вопрос, в данных будет:

```json
{
  "safety_triggered": true,
  // ... остальные данные
}
```

Создайте отдельный роутер для этого случая:

```
Webhook → Router
  └─ Filter (safety triggered) → 
      → Telegram (срочное уведомление психологу)
      → Email (письмо с контактами экстренной помощи)
```

## 📞 Автоматическая запись на консультацию

Интеграция с Calendly/Acuity/Yclients:

```
Webhook → HTTP (Create booking)
URL: https://api.yclients.com/api/v1/booking
Method: POST
Headers:
  Authorization: Bearer YOUR_TOKEN
Body:
  {
    "company_id": 12345,
    "staff_id": 67890,
    "client": {
      "email": "{{1.contact_email}}",
      "phone": "{{1.contact_telegram}}"
    },
    "comment": "Скрининг-тест: {{join(1.top_concerns; ", ")}}"
  }
```

## ✅ Чек-лист настройки

- [ ] Создан сценарий в Make.com
- [ ] Получен URL webhook
- [ ] URL добавлен в `.env` как `PUBLIC_WEBHOOK_URL`
- [ ] Настроена отправка в Google Sheets / CRM
- [ ] Настроена отправка email с результатами
- [ ] Настроено уведомление в Telegram
- [ ] Добавлена обработка safety триггера
- [ ] Протестирован весь флоу
- [ ] Проверена работа на продакшене

## 🆘 Troubleshooting

### Webhook не получает данные

1. Проверьте URL в `.env`
2. Проверьте консоль браузера на ошибки
3. Проверьте CORS настройки webhook endpoint
4. Убедитесь, что пользователь дошел до отправки формы

### Некорректные данные в webhook

1. Проверьте маппинг полей в Make.com
2. Проверьте формат данных в консоли перед отправкой
3. Добавьте логирование в `sendLeadWebhook()`

### Email не отправляются

1. Проверьте настройки email-сервиса
2. Проверьте лимиты API
3. Проверьте правильность email адреса
4. Проверьте spam-папку

## 📚 Дополнительные ресурсы

- [Make.com Documentation](https://www.make.com/en/help/app/webhooks)
- [SendGrid API](https://docs.sendgrid.com/api-reference)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Битрикс24 REST API](https://dev.1c-bitrix.ru/rest_help/)
