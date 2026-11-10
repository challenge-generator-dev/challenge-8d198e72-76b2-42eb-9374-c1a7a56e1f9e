import express, { Application, Request, Response } from 'express';
import { productRouter } from './routes/products';
import errorHandler from './middleware/errorHandler';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/products', productRouter);

app.use(errorHandler);

export default app;