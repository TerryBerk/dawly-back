# 🚀 Dawly Backend

Backend API for the Dawly project, built on Strapi CMS.

## 📋 Description

Dawly Backend is the server-side application that provides REST API and GraphQL API for content management. Built on Strapi CMS with TypeScript support.

## 🛠 Technologies

- **Strapi** - Headless CMS
- **TypeScript** - Typed JavaScript
- **Node.js** - Server runtime environment
- **PostgreSQL** - Database (configurable)

## 📁 Project Structure

```
dawly-back/
├── config/           # Configuration files
├── src/
│   ├── api/         # API endpoints and content types
│   │   ├── article/ # Articles
│   │   ├── page/    # Pages
│   │   ├── project/ # Projects
│   │   └── service/ # Services
│   ├── components/  # Reusable components
│   └── extensions/  # Strapi extensions
├── database/        # Database migrations and data
├── public/          # Static files
└── types/           # TypeScript types
```

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Environment Setup

Copy the `.env.example` file to `.env` and configure environment variables:

```bash
cp .env.example .env
```

### Development Mode

```bash
npm run develop
```

The application will be available at: http://localhost:1337

### Admin Panel

Strapi admin panel is available at: http://localhost:1337/admin

## 📚 API

### REST API

- **Articles**: `/api/articles`
- **Pages**: `/api/pages`
- **Projects**: `/api/projects`
- **Services**: `/api/services`

### GraphQL API

GraphQL endpoint is available at: `/graphql`

## 🔧 Commands

### Development

```bash
npm run develop  # Start with auto-reload
npm run start    # Start without auto-reload
npm run build    # Build admin panel
```

### Database

```bash
npm run strapi database:migrate  # Apply migrations
npm run strapi database:seed     # Seed with test data
```

## 📦 Content Types

### Article
- Title
- Content
- SEO metadata
- Publication status

### Page
- Title
- Content
- SEO metadata
- URL slug

### Project
- Project name
- Description
- Images
- Technologies
- Links

### Service
- Service name
- Description
- Price
- Category

## 🔒 Security

- JWT authentication
- Roles and permissions
- CORS settings
- Rate limiting

## 📈 Monitoring

- Request logging
- Performance monitoring
- Health check endpoints

## 🚀 Deployment

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Create a Pull Request

## 📄 License

MIT License

---

**Dawly Backend** - part of the Dawly ecosystem
