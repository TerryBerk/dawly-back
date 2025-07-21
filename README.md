# 🚀 Dawly Backend

Backend API для проекта Dawly, построенный на Strapi CMS.

## 📋 Описание

Dawly Backend - это серверная часть приложения, которая предоставляет REST API и GraphQL API для управления контентом. Построен на Strapi CMS с поддержкой TypeScript.

## 🛠 Технологии

- **Strapi** - Headless CMS
- **TypeScript** - Типизированный JavaScript
- **Node.js** - Серверная среда выполнения
- **PostgreSQL** - База данных (настраивается)

## 📁 Структура проекта

```
dawly-back/
├── config/           # Конфигурационные файлы
├── src/
│   ├── api/         # API endpoints и content types
│   │   ├── article/ # Статьи
│   │   ├── page/    # Страницы
│   │   ├── project/ # Проекты
│   │   └── service/ # Услуги
│   ├── components/  # Переиспользуемые компоненты
│   └── extensions/  # Расширения Strapi
├── database/        # Миграции и данные БД
├── public/          # Статические файлы
└── types/           # TypeScript типы
```

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Настройка окружения

Скопируйте файл `.env.example` в `.env` и настройте переменные окружения:

```bash
cp .env.example .env
```

### Запуск в режиме разработки

```bash
npm run develop
```

Приложение будет доступно по адресу: http://localhost:1337

### Админ панель

Админ панель Strapi доступна по адресу: http://localhost:1337/admin

## 📚 API

### REST API

- **Статьи**: `/api/articles`
- **Страницы**: `/api/pages`
- **Проекты**: `/api/projects`
- **Услуги**: `/api/services`

### GraphQL API

GraphQL endpoint доступен по адресу: `/graphql`

## 🔧 Команды

### Разработка

```bash
npm run develop  # Запуск с автоперезагрузкой
npm run start    # Запуск без автоперезагрузки
npm run build    # Сборка админ панели
```

### База данных

```bash
npm run strapi database:migrate  # Применение миграций
npm run strapi database:seed     # Заполнение тестовыми данными
```

## 📦 Content Types

### Article
- Заголовок
- Содержание
- SEO метаданные
- Статус публикации

### Page
- Заголовок
- Содержание
- SEO метаданные
- Slug для URL

### Project
- Название проекта
- Описание
- Изображения
- Технологии
- Ссылки

### Service
- Название услуги
- Описание
- Цена
- Категория

## 🔒 Безопасность

- JWT аутентификация
- Роли и разрешения
- CORS настройки
- Rate limiting

## 📈 Мониторинг

- Логирование запросов
- Мониторинг производительности
- Health check endpoints

## 🚀 Деплой

### Production

```bash
npm run build
npm run start
```

### Docker

```bash
docker build -t dawly-back .
docker run -p 1337:1337 dawly-back
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

---

**Dawly Backend** - часть экосистемы Dawly
