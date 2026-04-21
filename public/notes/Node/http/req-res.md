---
title: Request y Response 
description: Request y response en un server de Node JS
order: 1
---

## Cuando hacemos una petición
Cuando usamos el módulo `http`, cada petición HTTP activa una función que recibe dos objetos:

* `request` lo que el cliente envía
* `response` lo que el servidor responde

> Estos objetos sólo viven durante esa request, si el cliente hace una nueva petición, los objetos `request` y `response` se vuelven a generar con los nuevos datos.

```javascript
const http = require('node:http')
const server = http.createServer((req, res) => {})
```

## Request (IncomingMessage)

`Request` es un objeto que respresenta **la petición del cliente**. Algo múy importante es que la `request` es un **STREAM** de lectura.

El hecho de que la `request` sea un **STREAM** significa que los datos enviados por el cliente (dato de un formulario, un archivo, etc) no llegan todos al mismo tiempo sino que se reciben en fragmentos (**chunks**) a medida que viajan por la red.

Entre algunas ventaja que tiene son:

* Puede procesar peticiones masivas sin necesidad de ocupar toda la RAM, ya que sólo procesa por pequeñas partes.
* Puede empezar a trabajar con la información antes de que el usuario envíe toda la información.
* Tiene algunos eventos asociados que facilitan la detección de llegada de nuevos fragmentos, al igual que cuando se ha finalizado o si ha ocurrido algún error.

> `createServer` es un **EventEmitter** y `request` es una instancia de **IncomingMessage**.

Entre los eventos más comunes asociados a la `request` como **stream** tenemos:

* `data`: Se emite cada vez que el servidor recibe un nuevo fragmento (chunk) de datos del cuerpo de la petición. Es esencial para capturar la información que el cliente envía (como un JSON en un POST).
* `end`: Se dispara cuando se han recibido todos los fragmentos y no hay más datos disponibles en la transmisión.
* `error`: Ocurre si hay un fallo durante la comunicación o la lectura del flujo.
* `close`: Indica que la conexión subyacente se ha cerrado completamente.
* `aborted`: (Específico de peticiones) Se emite si el cliente aborta la conexión antes de que termine. **Deprecated**

> Puedes buscar más en la [Documentación de Node.js](https://nodejs.org/docs/latest/api/http.html#class-httpincomingmessage)

De la request pordemos obtener información como:
* Headers
* Methods
* Url
* Body

> Ampliaremos esto en las siguientes secciones.

## Response (ServerReponse)
La `response` es un **Stream** de escritura y una instancia de **ServerResponse**. Response hace referencia a las respuestas que damos al cliente. Al ser un **stream** nos permite enviar datos al cliente por partes (así como recibimos los datos).

Con el objeto `response` podemos controlar cosas como:

* `res.statusCode`: Define el código de estado HTTP (ej. 200, 404, 500).
* `res.setHeader(name, value)`: Define un encabezado específico (ej. Content-Type).
* `res.headersSent`: Booleano que te indica si los encabezados ya fueron enviados al cliente (útil para evitar errores de "Headers already sent"). 

Entre sus eventos más usados tenemos:

* **finish:** Se dispara cuando todos los datos han sido entregados al sistema operativo para ser enviados al cliente.
* **close:** Se emite cuando la conexión se ha cerrado (por el servidor o por el cliente de forma inesperada).
* **error:** Se dispara si hay un problema al intentar escribir en la respuesta.

El orden recomendado a la hora de enviar respuestas al cliente es el siguiente:

1. **Encabezados primero:** Debes definir el estado y los headers antes de enviar el contenido (res.writeHead).
2. **Escritura progresiva:** Puedes usar res.write(chunk) múltiples veces para enviar fragmentos de datos (útil para generar archivos grandes o transmisiones en vivo).
3. **Cierre obligatorio:** Siempre debes llamar a res.end() para informar al cliente (y al servidor) que la respuesta ha terminado y cerrar la conexión. 

{% callout type="caution" %}
**Regla de oro:** Una `request` → una `response` → un `res.end()`
{% /callout %}

### Tipos de response
Como `response` es un **stream** de escritura, tenemos flexibilidad sobre el formato o la forma en que enviamos los datos. Dependiendo de su contenido y el método de entrega podemos responder:

1. Por el formato del contenido (MIME Types)

* **Texto Plano:** text/plain (ej. mensajes sencillos o logs).
* **HTML:** text/html (para servir páginas web completas).
* **JSON:** application/json (el estándar para APIs; requiere transformar el objeto a string con `JSON.stringify()`).
* **Archivos Binarios:** image/png, application/pdf, audio/mpeg, etc.. 

2. Por el método de entrega (Estrategia)

* **Respuesta Atómica (Buffer):** Envías todo el contenido de una vez con res.end(data). Es ideal para datos pequeños como un objeto JSON o un mensaje corto.
* **Respuesta Fragmentada (Streaming):** Envías partes de la respuesta poco a poco usando res.write(chunk) y terminas con res.end(). Esto genera una respuesta con Transfer-Encoding: chunked.
* **Transmisión Directa (Pipe):** Conectas un stream de lectura (como un archivo) directamente a la respuesta: source.pipe(res). Es la forma más eficiente para enviar archivos grandes sin saturar la memoria. 

3. Por el estado de la comunicación (Códigos HTTP)
Puedes categorizar tus respuestas según lo que quieras comunicar al cliente: 

* **Éxito (2xx):** Como 200 OK (petición correcta) o 201 Created (recurso creado).
* **Redirecciones (3xx):** Como 301 Moved Permanently para enviar al usuario a otra URL.
* **Errores del Cliente (4xx):** Como 400 Bad Request (datos inválidos) o 404 Not Found (no existe).
* **Errores del Servidor (5xx):** Como 500 Internal Server Error cuando algo falla en tu código. 

## Flujo completo de una petición HTTP

Mentalmente, el flujo es el siguiente:

1. Cliente hace request
2. Node crea req y res
3. Tú lees:
   1. req.method
   2. req.url
   3. req.headers
4. (Opcional) lees body por eventos
5. Decides la respuesta
6. Configuras headers / status
7. Llamas a res.end()
8. Conexión cerrada

> Proyecto asociado al capítulo de HTTP para comprender mejor los conceptos: [Github](https://github.com/DiegoFChC/Node-JS-mini-projects/tree/main/4-users-api-rest)