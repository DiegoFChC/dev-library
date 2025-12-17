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

1. Content-Type

Indica qué tipo de datos viene en el body.

Ejemplos:

* application/json
* application/x-www-form-urlencoded
* multipart/form-data
* text/plain
* image/png
* audio/mpeg

👉 Sin este header, el servidor no sabe cómo interpretar el body.

2. Content-Length

Tamaño del body en bytes.

Node lo usa para:

* saber cuándo termina el stream
* validar uploads

3. Authorization

Usado para autenticación.

Ejemplos:

* Bearer token
* Basic base64

4. Accept

Indica qué tipo de respuesta espera el cliente.

Ejemplo:

* application/json
* text/html

5. User-Agent

Identifica el cliente:

* navegador
* curl
* Postman
* script

### Los más comunes en la response

```javascript
res.setHeader(name, value)
```

1. Content-Type (el más importante)

Define cómo el cliente debe interpretar el body.

Ejemplos:

* text/plain
* application/json
* text/html

👉 Si envías JSON sin este header, el cliente puede interpretarlo mal.

2. Content-Length

Tamaño de la respuesta.

Node puede calcularlo automáticamente, pero no siempre.

3. Location

Usado en redirecciones (3xx).

4. Cache-Control

Controla caché:

* no-cache
* max-age=3600

5. Set-Cookie

Enviar cookies al cliente.