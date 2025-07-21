# 📚 Dawly Backend API Documentation

## Overview

Dawly Backend provides REST API and GraphQL API for content management. The API is built on Strapi CMS and supports authentication, authorization, and various content types.

## 🔗 Base URL

```
http://localhost:1337
```

## 🔐 Authentication

### JWT Token

Protected endpoints require a JWT token in the header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Get Token

```bash
POST /api/auth/local
Content-Type: application/json

{
  "identifier": "your-email@example.com",
  "password": "your-password"
}
```

## 📄 REST API

### Articles

#### Get all articles
```bash
GET /api/articles
```

#### Get article by ID
```bash
GET /api/articles/:id
```

#### Create article
```bash
POST /api/articles
Content-Type: application/json

{
  "data": {
    "title": "Article Title",
    "content": "Article content",
    "publishedAt": "2025-01-21T00:00:00.000Z"
  }
}
```

#### Update article
```bash
PUT /api/articles/:id
Content-Type: application/json

{
  "data": {
    "title": "Updated title"
  }
}
```

#### Delete article
```bash
DELETE /api/articles/:id
```

### Pages

#### Get all pages
```bash
GET /api/pages
```

#### Get page by slug
```bash
GET /api/pages?filters[slug][$eq]=about
```

### Projects

#### Get all projects
```bash
GET /api/projects
```

#### Get project with images
```bash
GET /api/projects?populate=*
```

### Services

#### Get all services
```bash
GET /api/services
```

## 🔍 Filtering and Sorting

### Filtering
```bash
GET /api/articles?filters[title][$contains]=javascript
GET /api/projects?filters[category][$eq]=web
```

### Sorting
```bash
GET /api/articles?sort=createdAt:desc
GET /api/projects?sort=title:asc
```

### Pagination
```bash
GET /api/articles?pagination[page]=1&pagination[pageSize]=10
```

### Fields
```bash
GET /api/articles?fields=title,content
```

### Populate relations
```bash
GET /api/articles?populate=*
GET /api/projects?populate=images,category
```

## 🎯 GraphQL API

### Endpoint
```
POST /graphql
```

### Query Examples

#### Get all articles
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

#### Get article with SEO
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

#### Get projects with images
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

## 📊 Media Files

### Upload file
```bash
POST /api/upload
Content-Type: multipart/form-data

file: [binary]
```

### Get file
```bash
GET /uploads/:filename
```

## 🔧 Utilities

### Health Check
```bash
GET /_health
```

### System Info
```bash
GET /api/info
```

## 📝 Response Codes

- `200` - Successful request
- `201` - Resource created
- `400` - Bad request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Resource not found
- `500` - Internal server error

## 🚀 Usage Examples

### JavaScript (Fetch)
```javascript
// Get all articles
const response = await fetch('http://localhost:1337/api/articles');
const articles = await response.json();

// Create article
const newArticle = await fetch('http://localhost:1337/api/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    data: {
      title: 'New Article',
      content: 'Content'
    }
  })
});
```

### cURL
```bash
# Get all projects
curl -X GET "http://localhost:1337/api/projects"

# Create service
curl -X POST "http://localhost:1337/api/services" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "data": {
      "title": "Web Development",
      "description": "Creating modern websites",
      "price": 50000
    }
  }'
```

## 🔒 Security

- All API endpoints are protected with CORS
- JWT tokens have limited lifetime
- Passwords are hashed using bcrypt
- Rate limiting is applied to public endpoints

## 📈 Monitoring

- Request logging
- Performance metrics
- Error monitoring
- Health check endpoints

---

**Dawly Backend API** - part of the Dawly ecosystem 