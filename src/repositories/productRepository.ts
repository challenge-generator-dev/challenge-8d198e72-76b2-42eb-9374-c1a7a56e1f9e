import { DynamoDB } from 'aws-sdk';
import { Product } from '../models/product';

export interface IProductRepository {
    create(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    update(id: string, product: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<void>;
    list(): Promise<Product[]>;
    findByName(name: string): Promise<Product | null>;
}

export class ProductRepository implements IProductRepository {
    private readonly dynamoDB: DynamoDB.DocumentClient;
    private readonly tableName: string = process.env.DYNAMODB_TABLE_NAME || 'Products';

    constructor() {
        this.dynamoDB = new DynamoDB.DocumentClient();
    }

    async create(product: Product): Promise<Product> {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: product,
            ConditionExpression: 'attribute_not_exists(id)'
        };

        try {
            await this.dynamoDB.put(params).promise();
            return product;
        } catch (error) {
            const err = error as { code?: string };
            if (err.code === 'ConditionalCheckFailedException') {
                throw new Error('Ya existe un producto con el mismo ID');
            }
            throw new Error('Error al crear el producto en DynamoDB');
        }
    }

    async findById(id: string): Promise<Product | null> {
        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: { id }
        };

        const result = await this.dynamoDB.get(params).promise();
        return result.Item ? result.Item as Product : null;
    }

    async update(id: string, product: Partial<Product>): Promise<Product> {
        const updateExpressions: string[] = [];
        const expressionAttributeValues: Record<string, unknown> = {};
        const expressionAttributeNames: Record<string, string> = {};

        if (product.name !== undefined) {
            updateExpressions.push('#name = :name');
            expressionAttributeNames['#name'] = 'name';
            expressionAttributeValues[':name'] = product.name;
        }
        if (product.price !== undefined) {
            updateExpressions.push('price = :price');
            expressionAttributeValues[':price'] = product.price;
        }
        if (product.stock !== undefined) {
            updateExpressions.push('stock = :stock');
            expressionAttributeValues[':stock'] = product.stock;
        }
        if (product.category !== undefined) {
            updateExpressions.push('category = :category');
            expressionAttributeValues[':category'] = product.category;
        }

        if (updateExpressions.length === 0) {
            throw new Error('No se proporcionaron campos para actualizar');
        }

        const params: DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: `SET ${updateExpressions.join(', ')}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: 'ALL_NEW'
        };

        const result = await this.dynamoDB.update(params).promise();
        if (!result.Attributes) {
            throw new Error('Producto no encontrado');
        }
        return result.Attributes as Product;
    }

    async delete(id: string): Promise<void> {
        const params: DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: { id }
        };

        await this.dynamoDB.delete(params).promise();
    }

    async list(): Promise<Product[]> {
        const params: DynamoDB.DocumentClient.ScanInput = {
            TableName: this.tableName
        };

        const result = await this.dynamoDB.scan(params).promise();
        return result.Items ? result.Items as Product[] : [];
    }

    async findByName(name: string): Promise<Product | null> {
        const params: DynamoDB.DocumentClient.ScanInput = {
            TableName: this.tableName,
            FilterExpression: '#name = :name',
            ExpressionAttributeNames: {
                '#name': 'name'
            },
            ExpressionAttributeValues: {
                ':name': name
            }
        };

        const result = await this.dynamoDB.scan(params).promise();
        return result.Items && result.Items.length > 0 ? result.Items[0] as Product : null;
    }
}