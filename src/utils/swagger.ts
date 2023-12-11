import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cleaning Software',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    // Add the base path here
    servers: [
      {
        url: '/framework', // Replace '/base-path' with your desired base path
      },
    ],
  },
  apis: ['./src/api//**/*.ts', './src/schemas/**/*.ts'],
};
export const swaggerSpec = swaggerJsdoc(options);

async function swaggerDocs(app: Express) {
  //swagger page
  app.use('/framework/explorer', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in json format
  app.get('/framework/openapi.json', (req: Request, res: Response) => {
    res.setHeader('Content-type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
