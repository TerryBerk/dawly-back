export default ({ env }: { env: any }) => ({
  'users-permissions': {
    config: {
      jwt: {
        jwtSecret: env('JWT_SECRET'),
        expiresIn: env('JWT_EXPIRY', '15m'), // Short-lived access token
      },
      register: {
        allowedFields: ['username', 'email', 'password'],
      },
      email: {
        enabled: env.bool('EMAIL_VERIFICATION_ENABLED', false),
        confirmationRequired: env.bool('EMAIL_CONFIRMATION_REQUIRED', false),
      },
      grant: {
        google: {
          key: env('GOOGLE_CLIENT_ID'),
          secret: env('GOOGLE_CLIENT_SECRET'),
          callback: env('GOOGLE_CALLBACK_URL', `${env('CLIENT_URL')}/api/auth/google/callback`),
          scope: ['email', 'profile'],
        },
      },
    },
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: env.bool('GRAPHQL_PLAYGROUND_ENABLED', true),
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
        introspection: env.bool('GRAPHQL_INTROSPECTION', true),
      },
    },
  },
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_S3_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_S3_SECRET_ACCESS_KEY'),
        region: env('AWS_S3_REGION'),
        params: {
          Bucket: env('AWS_S3_BUCKET'),
        },
        endpoint: env('AWS_S3_ENDPOINT'),
        forcePathStyle: env.bool('AWS_S3_FORCE_PATH_STYLE', false),
      },
    },
  },
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'your-email@example.com',
        defaultReplyTo: 'your-email@example.com',
      },
    },
  },
});
