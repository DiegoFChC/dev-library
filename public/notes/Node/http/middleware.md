---
title: Middlewares
description: Que son y como usar middlewares en NodeJS
order: 7
---

## Middleware

Un middleware es una función que se ejecuta **antre la llegada del request y el handler final** facilitando la comunicación y el intercambio de datos, procesando, validando o modificando peticiones antes de llegar al destino final.

```bash
Request → middleware(s) → controller → response
```

Puede tener algunas de las siguientes funciones:

* Validar
* Transformar
* Proteger
* Interceptar

No se debe confundir con los **controllers**. Los controladores se encargan de cosas como:

* Definir que endpoint se está solicitando
* Que lógica se debe ejecutar
* Que devuelvo

A diferendia de los middlewares que se encargan de cosas como:

* Validar si está autorizado
* Verificar IDs
* Verificar Content-Type
  
De forma conceptual lo podemos ver como:

```javascript
(req, res, next) => {
  // hago algo
  // si todo va bien → next()
  // si no → respondo y corto
}
```

Algunos ejemplo de middlewares que podríamos tener en Node JS (puro) son:

* `bodyParser` parsear el body (stream) cuando llega la petición.

```javascript

function bodyParser(req, res, next) {
  if (!req.contentType?.includes('application/json')) {
    // -> Error: unsupportedMedia
  }

  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    if (body.length === 0) {
      // -> Error: badRequest
    }
    try {
      req.body = body ? JSON.parse(body) : {}
      next()
    } catch {
      // -> Error: badRequest
    }
  })

  req.on('error', (err) => {
    // -> internalServerError
  })
}
```

* `urlParser` parsear la url para obtener datos como: url, method, contentType, searchParams, etc.

```javascript
const { URL } = require('node:url')

function urlParser(req, res, next) {
  const {
    url,
    headers: { host },
  } = req

  const contentType = req.headers['content-type']

  const { pathname, searchParams } = new URL(`http://${host}${url}`)
  const [base, id, optional] = pathname.split('/').filter(Boolean)

  let searchParamsList = {}
  for (const [key, value] of searchParams.entries()) {
    searchParamsList[key] = value
  }

  req.pathname = pathname
  req.base = base
  req.id = id
  req.optional = optional
  req.searchParams = searchParamsList
  req.contentType = contentType

  next()
}
```

* `validUUID` validar si un id es correcto.

```javascript
function validUUID(id) {
  const UUID_REGEX =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

  return UUID_REGEX.test(id)
}

function validUUIDMiddleware(req, res, next) {
  const id = req.slug

  if (!validUUID(id)) {
    // -> Error: badRequest
  }

  next()
}
```

Ahora veamos un ejemplo donde usemos algunos de estos _middlewares_.

```javascript
// Ejemplo de ejecución de middlewares en enrutado
urlParser(req, res, () => {
  const { url, method, searchParams, base, id: userId, optional } = req
  
  if (method === 'PUT' && userId) {
    return validUUIDMiddleware(req, res, () =>
      bodyParser(req, res, () => putUser(req, res, userId))
    )
  }
})
```

> Proyecto asociado al capítulo de HTTP para comprender mejor los conceptos: [Github](https://github.com/DiegoFChC/Node-JS-mini-projects/tree/main/4-users-api-rest)