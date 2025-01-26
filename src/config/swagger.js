const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API Documentation', // Title of your API
      version: '1.0.0', // Version
      description: 'API documentation for the Node.js project', // Description
    },
    servers: [
      {
        url: 'https://localhost:8000', // Your base URL
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the route files where you define APIs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
