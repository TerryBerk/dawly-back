# 📚 Dawly Backend API Documentation

## Обзор

Dawly Backend предоставляет REST API и GraphQL API для управления контентом. API построен на Strapi CMS и поддерживает аутентификацию, авторизацию и различные типы контента.

## 🔗 Базовый URL

```
http://localhost:1337
```

## 🔐 Аутентификация

### JWT Token

Для защищенных endpoints требуется JWT токен в заголовке:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Получение токена

```bash
POST /api/auth/local
Content-Type: application/json

{
  "identifier": "your-email@example.com",
  "password": "your-password"
}
```

## 📄 REST API

### Статьи (Articles)

#### Получить все статьи
```bash
GET /api/articles
```

#### Получить статью по ID
```bash
GET /api/articles/:id
```

#### Создать статью
```bash
POST /api/articles
Content-Type: application/json

{
  "data": {
    "title": "Заголовок статьи",
    "content": "Содержание статьи",
    "publishedAt": "2025-01-21T00:00:00.000Z"
  }
}
```

#### Обновить статью
```bash
PUT /api/articles/:id
Content-Type: application/json

{
  "data": {
    "title": "Обновленный заголовок"
  }
}
```

#### Удалить статью
```bash
DELETE /api/articles/:id
```

### Страницы (Pages)

#### Получить все страницы
```bash
GET /api/pages
```

#### Получить страницу по slug
```bash
GET /api/pages?filters[slug][$eq]=about
```

### Проекты (Projects)

#### Получить все проекты
```bash
GET /api/projects
```

#### Получить проект с изображениями
```bash
GET /api/projects?populate=*
```

### Услуги (Services)

#### Получить все услуги
```bash
GET /api/services
```

## 🔍 Фильтрация и сортировка

### Фильтрация
```bash
GET /api/articles?filters[title][$contains]=javascript
GET /api/projects?filters[category][$eq]=web
```

### Сортировка
```bash
GET /api/articles?sort=createdAt:desc
GET /api/projects?sort=title:asc
```

### Пагинация
```bash
GET /api/articles?pagination[page]=1&pagination[pageSize]=10
```

### Поля
```bash
GET /api/articles?fields=title,content
```

### Популяция связей
```bash
GET /api/articles?populate=*
GET /api/projects?populate=images,category
```

## 🎯 GraphQL API

### Endpoint
```
POST /graphql
```

### Примеры запросов

#### Получить все статьи
```graphql
query {
  articles {
    data {
      id
      attributes {
        title
        content
        createdAt
      }
    }
  }
}
```

#### Получить статью с SEO
```graphql
query {
  article(id: 1) {
    data {
      attributes {
        title
        content
        seo {
          metaTitle
          metaDescription
        }
      }
    }
  }
}
```

#### Получить проекты с изображениями
```graphql
query {
  projects {
    data {
      attributes {
        title
        description
        images {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
      }
    }
  }
}
```

## 📊 Медиа файлы

### Загрузка файла
```bash
POST /api/upload
Content-Type: multipart/form-data

file: [binary]
```

### Получить файл
```bash
GET /uploads/:filename
```

## 🔧 Утилиты

### Health Check
```bash
GET /_health
```

### Информация о системе
```bash
GET /api/info
```

## 📝 Коды ответов

- `200` - Успешный запрос
- `201` - Ресурс создан
- `400` - Неверный запрос
- `401` - Не авторизован
- `403` - Доступ запрещен
- `404` - Ресурс не найден
- `500` - Внутренняя ошибка сервера

## 🚀 Примеры использования

### JavaScript (Fetch)
```javascript
// Получить все статьи
const response = await fetch('http://localhost:1337/api/articles');
const articles = await response.json();

// Создать статью
const newArticle = await fetch('http://localhost:1337/api/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    data: {
      title: 'Новая статья',
      content: 'Содержание'
    }
  })
});
```

### cURL
```bash
# Получить все проекты
curl -X GET "http://localhost:1337/api/projects"

# Создать услугу
curl -X POST "http://localhost:1337/api/services" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "data": {
      "title": "Веб-разработка",
      "description": "Создание современных веб-сайтов",
      "price": 50000
    }
  }'
```

## 🔒 Безопасность

- Все API endpoints защищены CORS
- JWT токены имеют ограниченное время жизни
- Пароли хешируются с использованием bcrypt
- Rate limiting применяется к публичным endpoints

## 📈 Мониторинг

- Логирование всех запросов
- Метрики производительности
- Мониторинг ошибок
- Health check endpoints

---

**Dawly Backend API** - часть экосистемы Dawly 