# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `tests/product.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB, Jest |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/config/dynamodb.ts` — `DynamoDBConfig.update`: Se invoca `update` sobre `DynamoDBConfig`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de productos en DynamoDB expuesto por una API REST con Express y pruebas con Jest (corrida e2e 20261109193147506), Implementa operaciones CRUD de productos sobre DynamoDB con Express y las cubre con pruebas unitarias en Jest

### Misión / candidato
Persistir y consultar productos

### Reto
- Tema: CRUD de productos con Express y DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de productos en DynamoDB con Express
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Implementación de la funcionalidad básica — objetivo: Crear las operaciones CRUD básicas para productos en DynamoDB. — entregable (NO resolver): Operaciones CRUD básicas implementadas y verificadas.
- Fase 2: Manejo de errores y casos borde — objetivo: Implementar manejo de errores y casos borde para las operaciones CRUD. — entregable (NO resolver): Operaciones CRUD con manejo de errores y casos borde implementados y verificados.
- Fase 3: Implementación de pruebas unitarias — objetivo: Cubrir las operaciones CRUD con pruebas unitarias utilizando Jest. — entregable (NO resolver): Pruebas unitarias implementadas y verificadas para las operaciones CRUD.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "fintech-products-api",
  "version": "1.0.0",
  "description": "API para gestión de productos financieros con Express y DynamoDB",
  "main": "src/main.ts",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "ts-node src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "aws-sdk": "2.1691.0",
    "class-validator": "0.14.1",
    "express": "4.21.0",
    "reflect-metadata": "0.2.2",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/express": "5.0.0",
    "@types/jest": "29.5.14",
    "@types/node": "22.7.4",
    "@types/uuid": "^9.0.8",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "ts-node": "^10.9.2",
    "typescript": "5.7.2"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "moduleFileExtensions": [
      "ts",
      "js"
    ],
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testMatch": [
      "**/*.test.ts"
    ]
  }
}


// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}

// === ARCHIVO: src/main.ts ===
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

// === ARCHIVO: src/models/product.ts ===
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

// === ARCHIVO: src/repositories/productRepository.ts ===
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

// === ARCHIVO: src/app.ts ===
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

// === ARCHIVO: src/routes/products.ts ===
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

// === ARCHIVO: src/services/productService.ts ===
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

// === ARCHIVO: src/middleware/errorHandler.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code: string;

  constructor(message: string, statusCode: number, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} con id ${id} no encontrado`, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500, 'DATABASE_ERROR');
  }
}

const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: err.message,
      },
    });
    return;
  }

  if (err.name === 'CastError' || err.name === 'ObjectIdError') {
    res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_ID',
        message: 'El formato del ID proporcionado no es válido',
      },
    });
    return;
  }

  console.error('Error no controlado:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Error interno del servidor',
    },
  });
};

export default errorHandler;

// === ARCHIVO: src/utils/validators.ts ===
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

// === ARCHIVO: src/config/dynamodb.ts ===
import AWS from 'aws-sdk';

const DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'local';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'local';
const DYNAMODB_TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'products';

export interface DynamoDBConfig {
  endpoint: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface DynamoDBClientConfig {
  DocumentClient: {
    put: (params: AWS.DynamoDB.PutItemInput) => Promise<AWS.DynamoDB.PutItemOutput>;
    get: (params: AWS.DynamoDB.GetItemInput) => Promise<AWS.DynamoDB.GetItemOutput>;
    update: (params: AWS.DynamoDB.UpdateItemInput) => Promise<AWS.DynamoDB.UpdateItemOutput>;
    delete: (params: AWS.DynamoDB.DeleteItemInput) => Promise<AWS.DynamoDB.DeleteItemOutput>;
    scan: (params: AWS.DynamoDB.ScanInput) => Promise<AWS.DynamoDB.ScanOutput>;
  };
}

class DynamoDBConfiguration {
  private static instance: AWS.DynamoDB.DocumentClient;
  private static config: DynamoDBConfig;

  private constructor() {}

  static getConfig(): DynamoDBConfig {
    if (!DynamoDBConfiguration.config) {
      DynamoDBConfiguration.config = {
        endpoint: DYNAMODB_ENDPOINT,
        region: AWS_REGION,
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      };
    }
    return DynamoDBConfiguration.config;
  }

  static getDocumentClient(): AWS.DynamoDB.DocumentClient {
    if (!DynamoDBConfiguration.instance) {
      const config = DynamoDBConfiguration.getConfig();
      const isLocal = config.endpoint.includes('localhost') || config.endpoint.includes('127.0.0.1');

      const awsConfig: AWS.Configuration = {
        region: config.region,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      };

      if (isLocal) {
        awsConfig.endpoint = config.endpoint;
        (awsConfig as any).sslEnabled = false;
        (awsConfig as any).signatureVersion = 'v4';
      }

      AWS.config.update(awsConfig);

      DynamoDBConfiguration.instance = new AWS.DynamoDB.DocumentClient();
    }

    return DynamoDBConfiguration.instance;
  }

  static getTableName(): string {
    return DYNAMODB_TABLE_NAME;
  }

  static resetInstance(): void {
    DynamoDBConfiguration.instance = undefined as unknown as AWS.DynamoDB.DocumentClient;
    DynamoDBConfiguration.config = undefined as unknown as DynamoDBConfig;
  }

  static isLocalEnvironment(): boolean {
    const config = DynamoDBConfiguration.getConfig();
    return config.endpoint.includes('localhost') || config.endpoint.includes('127.0.0.1');
  }
}

export const dynamoDBConfig = DynamoDBConfiguration.getConfig();
export const documentClient = DynamoDBConfiguration.getDocumentClient();
export const tableName = DynamoDBConfiguration.getTableName();
export default DynamoDBConfiguration;

// === ARCHIVO: tests/product.test.ts ===
import { Product } from '../src/models/product';
import { ProductRepository } from '../src/repositories/productRepository';

// Mock del repositorio
jest.mock('../src/repositories/productRepository');

describe('Product Service - Operaciones CRUD', () => {
    let productRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        productRepository = new ProductRepository() as jest.Mocked<ProductRepository>;
        jest.clearAllMocks();
    });

    describe('createProduct', () => {
        it('debería crear un producto cuando los datos son válidos', async () => {
            // Arrange
            const mockProduct: Product = {
                id: '123',
                name: 'Producto Test',
                price: 100,
                stock: 10,
                category: 'electronics'
            };
            productRepository.create.mockResolvedValue(mockProduct);

            // Act & Assert
            // TODO: Implementar la llamada al servicio y verificar el resultado
            expect(true).toBe(true);
        });

        it('debería fallar al crear producto con nombre duplicado', async () => {
            // Arrange
            // TODO: Configurar mock para lanzar error de nombre duplicado
            expect(true).toBe(true);
        });

        it('debería fallar al crear producto con precio negativo', async () => {
            // TODO: Implementar validación de precio negativo
            expect(true).toBe(true);
        });
    });

    describe('getProduct', () => {
        it('debería obtener un producto por su ID', async () => {
            // Arrange
            const mockProduct: Product = {
                id: '123',
                name: 'Producto Test',
                price: 100,
                stock: 10,
                category: 'electronics'
            };
            productRepository.findById.mockResolvedValue(mockProduct);

            // Act & Assert
            // TODO: Implementar la llamada al servicio y verificar el resultado
            expect(true).toBe(true);
        });

        it('debería retornar null cuando el producto no existe', async () => {
            // Arrange
            productRepository.findById.mockResolvedValue(null);

            // TODO: Implementar verificación de producto no encontrado
            expect(true).toBe(true);
        });
    });

    describe('updateProduct', () => {
        it('debería actualizar un producto existente', async () => {
            // Arrange
            const updatedProduct: Product = {
                id: '123',
                name: 'Producto Actualizado',
                price: 150,
                stock: 20,
                category: 'electronics'
            };
            productRepository.update.mockResolvedValue(updatedProduct);

            // TODO: Implementar la llamada al servicio de actualización
            expect(true).toBe(true);
        });

        it('debería fallar al actualizar un producto inexistente', async () => {
            // TODO: Implementar manejo de producto no encontrado en actualización
            expect(true).toBe(true);
        });

        it('debería fallar al intentar cambiar a un nombre ya existente', async () => {
            // TODO: Implementar validación de nombre duplicado en actualización
            expect(true).toBe(true);
        });
    });

    describe('deleteProduct', () => {
        it('debería eliminar un producto existente', async () => {
            // Arrange
            productRepository.delete.mockResolvedValue();

            // TODO: Implementar la llamada al servicio de eliminación
            expect(true).toBe(true);
        });

        it('debería fallar al eliminar un producto inexistente', async () => {
            // TODO: Implementar manejo de error al eliminar producto no existente
            expect(true).toBe(true);
        });
    });

    describe('listProducts', () => {
        it('debería listar todos los productos', async () => {
            // Arrange
            const mockProducts: Product[] = [
                { id: '1', name: 'Producto 1', price: 100, stock: 10, category: 'electronics' },
                { id: '2', name: 'Producto 2', price: 200, stock: 20, category: 'clothing' }
            ];
            productRepository.list.mockResolvedValue(mockProducts);

            // TODO: Implementar la llamada al servicio de listado
            expect(true).toBe(true);
        });

        it('debería retornar array vacío cuando no hay productos', async () => {
            // Arrange
            productRepository.list.mockResolvedValue([]);

            // TODO: Verificar que se retorna array vacío
            expect(true).toBe(true);
        });
    });

    describe('Validaciones de dominio', () => {
        it('debería validar que el precio no sea negativo', async () => {
            // TODO: Implementar validación de precio negativo
            expect(true).toBe(true);
        });

        it('debería validar que el nombre no esté vacío', async () => {
            // TODO: Implementar validación de nombre vacío
            expect(true).toBe(true);
        });

        it('debería validar que el stock no sea negativo', async () => {
            // TODO: Implementar validación de stock negativo
            expect(true).toBe(true);
        });

        it('debería validar que la categoría sea válida', async () => {
            // TODO: Implementar validación de categoría
            expect(true).toBe(true);
        });
    });

    describe('Casos borde', () => {
        it('debería manejar errores de base de datos', async () => {
            // TODO: Simular error de DynamoDB y verificar manejo
            expect(true).toBe(true);
        });

        it('debería validar el formato del ID', async () => {
            // TODO: Verificar validación de formato UUID
            expect(true).toBe(true);
        });

        it('debería manejar timeouts en operaciones de base de datos', async () => {
            // TODO: Implementar prueba de timeout
            expect(true).toBe(true);
        });
    });
});

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
