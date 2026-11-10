import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { productRouter, createProduct, getProduct, updateProduct, deleteProduct, listProducts } from './routes/products';
import errorHandler from './middleware/errorHandler';
import { validate, validateCreateProduct, validateUpdateProduct } from './utils/validators';
import { ProductCreateDto, ProductUpdateDto } from './models/product';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function validateCreateMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const error = await validateCreateProduct(req.body as ProductCreateDto);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        next();
    } catch (err) {
        next(err);
    }
}

async function validateUpdateMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const error = await validateUpdateProduct(req.body as ProductUpdateDto);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        next();
    } catch (err) {
        next(err);
    }
}

app.post('/products', validateCreateMiddleware, createProduct);
app.get('/products/:id', getProduct);
app.put('/products/:id', validateUpdateMiddleware, updateProduct);
app.delete('/products/:id', deleteProduct);
app.get('/products', listProducts);

app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM recibido. Cerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado');
    });
});

export { app, server };