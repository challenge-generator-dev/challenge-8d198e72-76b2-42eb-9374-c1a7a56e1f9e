import { Product, ProductCreateDto, ProductUpdateDto } from '../models/product';
import { IProductRepository } from '../repositories/productRepository';

export class ProductService {
    private readonly repository: IProductRepository;

    constructor(repository: IProductRepository) {
        this.repository = repository;
    }

    async createProduct(dto: ProductCreateDto): Promise<Product> {
        if (dto.price < 0) {
            throw new Error('El precio no puede ser negativo');
        }

        if (dto.stock < 0) {
            throw new Error('El stock no puede ser negativo');
        }

        const existingProduct = await this.repository.findByName(dto.name);
        if (existingProduct) {
            throw new Error('Ya existe un producto con ese nombre');
        }

        const product = new Product(
            dto.name,
            dto.price,
            dto.stock,
            dto.category
        );

        return await this.repository.create(product);
    }

    async getProduct(id: string): Promise<Product | null> {
        if (!id || id.trim() === '') {
            throw new Error('El ID del producto es requerido');
        }

        return await this.repository.findById(id);
    }

    async updateProduct(id: string, dto: ProductUpdateDto): Promise<Product | null> {
        if (!id || id.trim() === '') {
            throw new Error('El ID del producto es requerido');
        }

        const existingProduct = await this.repository.findById(id);
        if (!existingProduct) {
            return null;
        }

        if (dto.name !== undefined && dto.name !== existingProduct.name) {
            const productWithName = await this.repository.findByName(dto.name);
            if (productWithName && productWithName.id !== id) {
                throw new Error('Ya existe otro producto con ese nombre');
            }
        }

        if (dto.price !== undefined && dto.price < 0) {
            throw new Error('El precio no puede ser negativo');
        }

        if (dto.stock !== undefined && dto.stock < 0) {
            throw new Error('El stock no puede ser negativo');
        }

        const updateData: Partial<Product> = {};
        if (dto.name !== undefined) updateData.name = dto.name;
        if (dto.price !== undefined) updateData.price = dto.price;
        if (dto.stock !== undefined) updateData.stock = dto.stock;
        if (dto.category !== undefined) updateData.category = dto.category;

        return await this.repository.update(id, updateData);
    }

    async deleteProduct(id: string): Promise<void> {
        if (!id || id.trim() === '') {
            throw new Error('El ID del producto es requerido');
        }

        const existingProduct = await this.repository.findById(id);
        if (!existingProduct) {
            throw new Error('Producto no encontrado');
        }

        await this.repository.delete(id);
    }

    async listProducts(): Promise<Product[]> {
        return await this.repository.list();
    }
}