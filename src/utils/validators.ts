import { Product } from '../models/product';
import { ProductCreateDto } from '../models/product';
import { ProductUpdateDto } from '../models/product';
import { IProductRepository } from '../repositories/productRepository';
import { validate as classValidatorValidate, ValidationError as ClassValidatorError } from 'class-validator';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export class ProductValidator {
  private readonly repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async validateCreate(dto: ProductCreateDto): Promise<ValidationResult> {
    const errors: string[] = [];

    if (!dto.name || dto.name.trim().length === 0) {
      errors.push('El nombre del producto es obligatorio');
    }

    if (dto.name && dto.name.length > 100) {
      errors.push('El nombre del producto no puede exceder 100 caracteres');
    }

    if (dto.price === undefined || dto.price === null) {
      errors.push('El precio del producto es obligatorio');
    }

    if (dto.price !== undefined && dto.price < 0) {
      errors.push('El precio del producto no puede ser negativo');
    }

    if (dto.price !== undefined && dto.price > 999999999) {
      errors.push('El precio del producto excede el límite permitido');
    }

    if (dto.stock !== undefined && dto.stock < 0) {
      errors.push('El stock del producto no puede ser negativo');
    }

    if (dto.stock !== undefined && !Number.isInteger(dto.stock)) {
      errors.push('El stock del producto debe ser un número entero');
    }

    if (!dto.category || dto.category.trim().length === 0) {
      errors.push('La categoría del producto es obligatoria');
    }

    if (dto.category && !this.isValidCategory(dto.category)) {
      errors.push('La categoría del producto no es válida');
    }

    if (dto.name && errors.length === 0) {
      const existingProduct = await this.repository.findByName(dto.name);
      if (existingProduct) {
        errors.push('Ya existe un producto con ese nombre');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  async validateUpdate(id: string, dto: ProductUpdateDto): Promise<ValidationResult> {
    const errors: string[] = [];

    if (dto.name !== undefined) {
      if (dto.name.trim().length === 0) {
        errors.push('El nombre del producto no puede estar vacío');
      }

      if (dto.name.length > 100) {
        errors.push('El nombre del producto no puede exceder 100 caracteres');
      }

      if (errors.length === 0) {
        const existingProduct = await this.repository.findByName(dto.name);
        if (existingProduct && existingProduct.id !== id) {
          errors.push('Ya existe otro producto con ese nombre');
        }
      }
    }

    if (dto.price !== undefined) {
      if (dto.price < 0) {
        errors.push('El precio del producto no puede ser negativo');
      }

      if (dto.price > 999999999) {
        errors.push('El precio del producto excede el límite permitido');
      }
    }

    if (dto.stock !== undefined) {
      if (dto.stock < 0) {
        errors.push('El stock del producto no puede ser negativo');
      }

      if (!Number.isInteger(dto.stock)) {
        errors.push('El stock del producto debe ser un número entero');
      }
    }

    if (dto.category !== undefined && !this.isValidCategory(dto.category)) {
      errors.push('La categoría del producto no es válida');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  validateProductData(product: Partial<Product>): ValidationResult {
    const errors: string[] = [];

    if (!product.name || product.name.trim().length === 0) {
      errors.push('El nombre es obligatorio');
    }

    if (product.price === undefined || product.price === null) {
      errors.push('El precio es obligatorio');
    } else if (product.price < 0) {
      errors.push('El precio no puede ser negativo');
    }

    if (product.stock !== undefined && product.stock < 0) {
      errors.push('El stock no puede ser negativo');
    }

    if (!product.category || product.category.trim().length === 0) {
      errors.push('La categoría es obligatoria');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private isValidCategory(category: string): boolean {
    const validCategories = [
      'inversion',
      'ahorro',
      'credito',
      'seguro',
      'fondo',
      'accion',
      'bono',
      'otro',
    ];
    return validCategories.includes(category.toLowerCase());
  }
}

export function validatePositivePrice(price: number): boolean {
  return typeof price === 'number' && price >= 0 && isFinite(price);
}

export function validateStock(stock: number): boolean {
  return Number.isInteger(stock) && stock >= 0;
}

export function sanitizeProductName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

export async function validate<T extends object>(instance: T): Promise<void> {
  const errors = await classValidatorValidate(instance);
  if (errors.length > 0) {
    const errorMessages = errors.map((err: ClassValidatorError) => {
      return Object.values(err.constraints || {}).join(', ');
    });
    throw new Error(errorMessages.join('; '));
  }
}

export async function validateCreateProduct(dto: ProductCreateDto): Promise<string | null> {
  const errors: string[] = [];

  if (!dto.name || dto.name.trim().length === 0) {
    errors.push('El nombre del producto es obligatorio');
  } else if (dto.name.length > 100) {
    errors.push('El nombre del producto no puede exceder 100 caracteres');
  }

  if (dto.price === undefined || dto.price === null) {
    errors.push('El precio del producto es obligatorio');
  } else if (dto.price < 0) {
    errors.push('El precio del producto no puede ser negativo');
  } else if (dto.price > 999999999) {
    errors.push('El precio del producto excede el límite permitido');
  }

  if (dto.stock !== undefined && dto.stock < 0) {
    errors.push('El stock del producto no puede ser negativo');
  } else if (dto.stock !== undefined && !Number.isInteger(dto.stock)) {
    errors.push('El stock del producto debe ser un número entero');
  }

  if (!dto.category || dto.category.trim().length === 0) {
    errors.push('La categoría del producto es obligatoria');
  } else if (!isValidCategory(dto.category)) {
    errors.push('La categoría del producto no es válida');
  }

  return errors.length > 0 ? errors.join('; ') : null;
}

export async function validateUpdateProduct(dto: ProductUpdateDto): Promise<string | null> {
  const errors: string[] = [];

  if (dto.name !== undefined) {
    if (dto.name.trim().length === 0) {
      errors.push('El nombre del producto no puede estar vacío');
    } else if (dto.name.length > 100) {
      errors.push('El nombre del producto no puede exceder 100 caracteres');
    }
  }

  if (dto.price !== undefined) {
    if (dto.price < 0) {
      errors.push('El precio del producto no puede ser negativo');
    } else if (dto.price > 999999999) {
      errors.push('El precio del producto excede el límite permitido');
    }
  }

  if (dto.stock !== undefined) {
    if (dto.stock < 0) {
      errors.push('El stock del producto no puede ser negativo');
    } else if (!Number.isInteger(dto.stock)) {
      errors.push('El stock del producto debe ser un número entero');
    }
  }

  if (dto.category !== undefined && !isValidCategory(dto.category)) {
    errors.push('La categoría del producto no es válida');
  }

  return errors.length > 0 ? errors.join('; ') : null;
}

function isValidCategory(category: string): boolean {
  const validCategories = [
    'inversion',
    'ahorro',
    'credito',
    'seguro',
    'fondo',
    'accion',
    'bono',
    'otro',
  ];
  return validCategories.includes(category.toLowerCase());
}