import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class Product {
    id!: string;

    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    name!: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price!: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock!: number;

    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    @IsString({ message: 'La categoría debe ser una cadena de texto' })
    category!: string;

    constructor(name: string, price: number, stock: number, category: string, id?: string) {
        this.id = id || uuidv4();
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }
}

export class ProductCreateDto {
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    name!: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price!: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock!: number;

    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    @IsString({ message: 'La categoría debe ser una cadena de texto' })
    category!: string;
}

export class ProductUpdateDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    name?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price?: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock?: number;

    @IsString({ message: 'La categoría debe ser una cadena de texto' })
    category?: string;
}