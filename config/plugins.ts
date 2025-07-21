export default ({ env }: { env: any }) => ({
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
