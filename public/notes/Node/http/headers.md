---
title: Headers
description: Que son y tipos de headers
order: 3
---

## Headers
Los **headers** son metadatos que viajan a la `request` y la `response`. Hacen referencia a como se debe tratar el contenido (`body`) de la `request` o la `response`.

### Los más comunes en la request

```javascript
req.headers
```

#### Content-Type

Indica qué tipo de datos viene en el body.

Ejemplos:

* application/json
* application/x-www-form-urlencoded
* multipart/form-data
* text/plain
* image/png
* audio/mpeg

👉 Sin este header, el servidor no sabe cómo interpretar el body.

#### Content-Length (request)

Tamaño del body en bytes.

Node lo usa para:

* Saber cuándo termina el stream
* Validar uploads

#### Authorization

Usado para autenticación.

Ejemplos:

* Bearer token
* Basic base64

#### Accept

Indica qué tipo de respuesta espera el cliente.

Ejemplo:

* application/json
* text/html

#### User-Agent

Identifica el cliente:

* navegador
* curl
* Postman
* script

### Los más comunes en la response

```javascript
res.setHeader(name, value)
```

#### Content-Type (el más importante)

Define cómo el cliente debe interpretar el body.

Ejemplos:

* text/plain
* application/json
* text/html

👉 Si envías JSON sin este header, el cliente puede interpretarlo mal.

#### Content-Length (response)

Tamaño de la respuesta.

Node puede calcularlo automáticamente, pero no siempre.

#### Location

Usado en redirecciones (3xx).

#### Cache-Control

Controla caché:

* no-cache
* max-age=3600

#### Set-Cookie

Enviar cookies al cliente.

```javascript
// Ejemplo de validación de headers
if (!req.contentType?.includes('application/json')) {
  return unsupportedMedia(res)
}
```

> Proyecto asociado al capítulo de HTTP para comprender mejor los conceptos: [Github](https://github.com/DiegoFChC/Node-JS-mini-projects/tree/main/4-users-api-rest)