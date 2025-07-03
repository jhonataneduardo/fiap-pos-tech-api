import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import mainRouter from '@core/infrastructure/http/routes';

class App {
    public server: Express;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    private middlewares(): void {
        this.server.use(helmet());
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
    }

    private routes(): void {
        this.server.use('/api/v1', mainRouter);
    }

    private exceptionHandler(): void { }
}

export default new App().server;