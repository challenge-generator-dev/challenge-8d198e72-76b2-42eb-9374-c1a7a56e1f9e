import { Router, Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/productService';
import { ProductRepository } from '../repositories/productRepository';
import { ProductCreateDto, ProductUpdateDto } from '../models/product';
import { validateCreateProduct, validateUpdateProduct } from '../utils/validators';

const productRouter = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

async function createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const validationError = await validateCreateProduct(req.body as ProductCreateDto);
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }

        const product = await productService.createProduct(req.body as ProductCreateDto);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

async function getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = req.params.id as string;
        if (!id || id.trim() === '') {
            res.status(400).json({ error: 'El ID del producto es requerido' });
            return;
        }

        const product = await productService.getProduct(id);
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

async function updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = req.params.id as string;
        if (!id || id.trim() === '') {
            res.status(400).json({ error: 'El ID del producto es requerido' });
            return;
        }

        const validationError = await validateUpdateProduct(req.body as ProductUpdateDto);
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }

        const product = await productService.updateProduct(id, req.body as ProductUpdateDto);
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

async function deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = req.params.id as string;
        if (!id || id.trim() === '') {
            res.status(400).json({ error: 'El ID del producto es requerido' });
            return;
        }

        const exists = await productService.getProduct(id);
        if (!exists) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        await productService.deleteProduct(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

async function listProducts(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const products = await productService.listProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

productRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await createProduct(req, res, next);
});

productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await getProduct(req, res, next);
});

productRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await updateProduct(req, res, next);
});

productRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await deleteProduct(req, res, next);
});

productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await listProducts(req, res, next);
});

export { productRouter, createProduct, getProduct, updateProduct, deleteProduct, listProducts };