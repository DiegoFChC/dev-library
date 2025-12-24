---
title: Status code
description: Que son los Status Code en HTTP
order: 2
---

## Status Code
Un **status code** es un número que indica que sucedió con la `request`. Describe el resultado de la operación.

La forma de definir el **status code** es por medio del objeto `response`.

```javascript
res.statusCode = 200 // status code number
```

Entre las familias más importantes tenemos:

* **2xx** Éxito

| Código           | Significado    | Cuándo usarlo      |
| ---------------- | -------------- | ------------------ |
| `200 OK`         | Todo bien      | GET exitoso        |
| `201 Created`    | Recurso creado | POST que crea algo |
| `204 No Content` | Éxito sin body | DELETE exitoso     |

* **3xx** Redirecciones

| Código | Uso                    |
| ------ | ---------------------- |
| `301`  | Redirección permanente |
| `302`  | Redirección temporal   |

* **4xx** Error del cliente

| Código                     | Cuándo usarlo     |
| -------------------------- | ----------------- |
| `400 Bad Request`          | Datos inválidos   |
| `401 Unauthorized`         | No autenticado    |
| `403 Forbidden`            | Sin permisos      |
| `404 Not Found`            | Recurso no existe |
| `409 Conflict`             | Estado inválido   |
| `422 Unprocessable Entity` | Validación falló  |

* **5xx** Error del servidor

| Código                      | Cuándo usarlo      |
| --------------------------- | ------------------ |
| `500 Internal Server Error` | Error inesperado   |
| `502 Bad Gateway`           | Error aguas arriba |
| `503 Service Unavailable`   | Servicio caído     |

```javascript
// Ejemplo de implementación de respuestas
function send(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

const ok = (res, data) => send(res, 200, data)
const okNoContent = (res) => 
  send(res, 204, {})
const created = (res, data) =>
  send(res, 201, { message: 'Created successfully', result: data })
const badRequest = (res, message = 'Bad request') =>
  send(res, 400, { message })
const notFound = (res, message = 'Not found') =>
  send(res, 404, { message })
const unsupportedMedia = (res) =>
  send(res, 415, { message: 'Unsupported Media Type' })
const internalServerError = (res) =>
  send(res, 500, { message: 'Internal Server Error' })
```

> Puedes encontrar más acerca de los `status code` en [mdn](https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Status), [HTTP cats](https://http.cat/)

> Proyecto asociado al capítulo de HTTP para comprender mejor los conceptos: [Github](https://github.com/DiegoFChC/Node-JS-mini-projects/tree/main/4-users-api-rest)