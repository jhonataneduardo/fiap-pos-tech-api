import swaggerJSDoc from 'swagger-jsdoc';
import { schemas } from './schemas';
import { paths } from './paths';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'FIAP Pos Tech API',
        version: '1.0.0',
        description: 'API para gerenciamento de vendas de veículos - Tech Challenge FIAP',
        contact: {
            name: 'Jhonatan Eduardo',
            email: 'jhonatanepp@gmail.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:3001/api/v1',
            description: 'Development server'
        }
    ],
    components: {
        schemas
    },
    paths
};

const swaggerOptions: swaggerJSDoc.Options = {
    definition: swaggerDefinition,
    apis: []
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);