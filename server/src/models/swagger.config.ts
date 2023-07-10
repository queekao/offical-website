export const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      host: 'localhost:3030',
      basePath: '/v1/',
      schemes: ['http'],
      title: 'Umbrella Version 1',
      version: '1.0.0',
      description: 'API Documentation',
      servers: [{ url: 'http://localhost:3030' }]
    }
  },
  apis: ['../../dist/routes/**/*.js'] // Specify the path to your API route files
}
