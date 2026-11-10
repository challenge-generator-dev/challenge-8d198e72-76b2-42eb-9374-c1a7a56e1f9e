# Implementación de CRUD de productos en DynamoDB con Express

La empresa 'FinTech Solutions' necesita un sistema para gestionar productos financieros. Los productos tienen un nombre, precio, stock y categoría. El sistema debe permitir crear, leer, actualizar y eliminar productos, asegurando que no haya nombres duplicados ni precios negativos. Además, el sistema debe ser capaz de manejar errores y casos borde del dominio de manera efectiva.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de productos con Express y DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Implementación de la funcionalidad básica

**Objetivo:** Crear las operaciones CRUD básicas para productos en DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las operaciones de crear, leer, actualizar y eliminar productos en DynamoDB.
- Asegúrate de que los productos tengan un nombre único y un precio positivo.

**Entregable:** Operaciones CRUD básicas implementadas y verificadas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo estructurar la tabla de DynamoDB para los productos.
- Piensa en cómo manejar las validaciones de nombre y precio.

</details>

### Fase 2: Manejo de errores y casos borde

**Objetivo:** Implementar manejo de errores y casos borde para las operaciones CRUD.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa el manejo de errores para las operaciones CRUD, incluyendo casos donde el nombre del producto ya existe o el precio es negativo.
- Asegúrate de que el sistema responda adecuadamente a estos casos borde.

**Entregable:** Operaciones CRUD con manejo de errores y casos borde implementados y verificados.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo comunicar los errores al usuario de manera clara y concisa.
- Piensa en cómo manejar casos donde la operación no puede completarse debido a restricciones del dominio.

</details>

### Fase 3: Implementación de pruebas unitarias

**Objetivo:** Cubrir las operaciones CRUD con pruebas unitarias utilizando Jest.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Implementa pruebas unitarias para las operaciones CRUD utilizando Jest.
- Asegúrate de que las pruebas cubran tanto los casos felices como los casos borde.

**Entregable:** Pruebas unitarias implementadas y verificadas para las operaciones CRUD.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo estructurar tus pruebas para asegurar una cobertura completa.
- Piensa en cómo simular casos borde en tus pruebas.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en DynamoDB?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en el contexto de gestión de productos?
- **comoSeUsa**: ¿Cómo se usan las operaciones CRUD para gestionar productos en DynamoDB?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de operaciones CRUD en DynamoDB?

## Criterios de Evaluacion

- Implementación correcta de las operaciones CRUD en DynamoDB.
- Manejo adecuado de errores y casos borde en las operaciones CRUD.
- Cobertura completa de las operaciones CRUD con pruebas unitarias utilizando Jest.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
