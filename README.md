# Сайт психолога

Статический сайт на Astro + Tailwind CSS.

## Установка

```bash
npm install
```

## Запуск в режиме разработки

```bash
npm run dev
```

Сайт будет доступен по адресу: `http://localhost:4321`

## Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

## Предпросмотр продакшен-сборки

```bash
npm run preview
```

## Структура проекта

- `content.json` - все тексты сайта
- `src/pages/index.astro` - главная страница
- `src/components/` - компоненты (Navigation, FAQ)
- `src/layouts/` - базовый layout
- `src/styles/global.css` - глобальные стили с Tailwind

## Редактирование контента

Все тексты находятся в файле `content.json` в корне папки `site/`. После изменения файла перезапустите dev-сервер.

## Замена фото в Hero

Сейчас используется placeholder: `public/images/portrait-placeholder.svg`

Чтобы заменить на реальное фото:
1. Поместите файл `portrait.jpg` в папку `public/images/`
2. Откройте `src/pages/index.astro`
3. Найдите строку с `<img src="/images/portrait-placeholder.svg"` 
4. Замените на `<img src="/images/portrait.jpg"`
5. Готово! Фото автоматически подставится

