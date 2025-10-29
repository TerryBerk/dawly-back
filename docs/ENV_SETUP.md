# Environment Variables Setup

## Required Environment Variables for Authentication

Add these variables to your `.env` file in the `dawly-back` directory:

```bash
# JWT Authentication (REQUIRED)
JWT_SECRET=your-secret-jwt-key-change-in-production-min-32-chars
JWT_EXPIRY=15m

# Google OAuth (REQUIRED for Google Sign-In)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Email Verification (Optional for MVP)
EMAIL_VERIFICATION_ENABLED=false
EMAIL_CONFIRMATION_REQUIRED=false

# CORS (Frontend URL)
CLIENT_URL=http://localhost:3000
```

## JWT Secret Generation

Generate a strong JWT secret (minimum 32 characters):

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

## Complete .env File Example

```bash
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=dawly
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_SSL=false

# JWT Authentication
JWT_SECRET=your-generated-secret-key-here
JWT_EXPIRY=15m

# Email Verification (Optional for MVP)
EMAIL_VERIFICATION_ENABLED=false
EMAIL_CONFIRMATION_REQUIRED=false

# SendGrid (if email enabled)
SENDGRID_API_KEY=

# AWS S3 Upload
AWS_S3_ACCESS_KEY_ID=
AWS_S3_SECRET_ACCESS_KEY=
AWS_S3_REGION=
AWS_S3_BUCKET=
AWS_S3_ENDPOINT=
AWS_S3_FORCE_PATH_STYLE=false

# GraphQL
GRAPHQL_PLAYGROUND_ENABLED=true
GRAPHQL_INTROSPECTION=true

# CORS (Frontend URL)
CLIENT_URL=http://localhost:3000

# Node Environment
NODE_ENV=development
```

## Security Notes

1. **Never commit `.env` file to git**
2. Use strong JWT_SECRET in production (min 32 chars)
3. Change JWT_SECRET regularly in production
4. Use different secrets for dev/staging/prod
5. Enable HTTPS in production
6. Configure CORS properly for your domain

## Testing Authentication

Once configured, test the auth endpoints:

```bash
# Register
curl -X POST http://localhost:1337/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test1234!"
  }'

# Login
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "test@example.com",
    "password": "Test1234!"
  }'
```

## GraphQL Authentication

For GraphQL, use the JWT token in the Authorization header:

```graphql
# Headers
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

# Query
query {
  me {
    id
    username
    email
  }
}
```

## Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API (or People API)

### 2. Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Select **Web application**
4. Configure:
   - **Name:** Dawly Studio
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - **Authorized redirect URIs:**
     - `http://localhost:3000/api/auth/google/callback` (development)
     - `https://yourdomain.com/api/auth/google/callback` (production)
5. Click **Create**
6. Copy **Client ID** and **Client Secret**

### 3. Configure Strapi

Add to your `.env` file:

```bash
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

### 4. Enable Google Provider in Strapi Admin

1. Start Strapi: `npm run develop`
2. Go to http://localhost:1337/admin
3. Navigate to **Settings** > **Users & Permissions plugin** > **Providers**
4. Enable **Google**
5. Paste your Client ID and Client Secret
6. Save

### 5. Test Google OAuth

```bash
# Initiate OAuth flow
open "http://localhost:1337/api/connect/google"

# After successful auth, you'll be redirected to:
# http://localhost:3000/api/auth/google/callback?access_token=JWT_TOKEN
```

## Testing Google Sign-In

Once configured, users can:
1. Click "Sign in with Google" button
2. Authorize Dawly Studio
3. Automatically logged in with JWT token

