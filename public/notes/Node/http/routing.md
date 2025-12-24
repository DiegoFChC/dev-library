---
title: Routing
description: Routing manual en Node.js
order: 5
---

## Routing
El **routing** permite decidir que hacer según el método y la url que viene desde el cliente.

Existen frameworks que hacen estas validaciones internamente, pero si lo queremos hacer en Node directamente, lo podemos hacer sacando estos valores de nuestro objeto **request**.

```javascript
const server = http.createServer((req, res) => {
  const { method, url } = req
})
```

De forma general, las validaciones se **url** y **method** se hacer con estructuras `if` `else if` y `else`, aunque para hacerlo más limpio se recomienda la estructura `switch`.

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  // Obtener la ruta de la URL
  const path = req.url.toLowerCase()

  // Configurar la cabecera de respuesta estándar
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  // Lógica de enrutamiento manual
  if (path === '/' || path === '/home') {
    res.statusCode = 200
    res.end('<h1>Inicio</h1><p>Bienvenido a la página principal.</p>')
  } else if (path === '/contacto') {
    res.statusCode = 200
    res.end('<h1>Contacto</h1><p>Escríbenos a contacto@ejemplo.com</p>')
  } else {
    // Manejo de error 404 (Página no encontrada)
    res.statusCode = 404
    res.end('<h1>404</h1><p>Lo sentimos, esta página no existe.</p>')
  }
})

// El servidor escucha en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})
```

A continuación vemos un ejemplo usando el `method`:

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (url === '/usuario' && method === 'GET') {
    // Responder a una petición GET
  } else if (url === '/usuario' && method === 'POST') {
    // Responder a una petición POST
  } else {
    // Ruta no encontrada
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Ruta no encontrada')
  }
})

server.listen(3000, () => console.log('Servidor en http://localhost:3000'))
```

### Rutas dinámicas
Rutas que no son fijas, sino que contienen variables o patrones (parámetros). En Node.js puro no existe una forma de obtener dichas variables directamente de la `url`, es por esto que existen frameworks como **Express** que nos facilitan esto.

Para hacerlo en Node puro debemos implementar la lógica de limpieza, dividir la URL, detectar patrones y extraer los valores de las variables.

### Query params
Los query params son pares `clave=valor` que van en la URL, después del `?`.

```bash
/users?page=2&limit=10
```

Por lo general se usan para filtros, paginación, ordenamiento, búsquedas, etc. No cambian el recurso, sólo como son consultados.

Estos **query params** siempre llegan como `strings`, por lo que en algunos casos es necesario realizar converciones.

Como te puedes dar cuenta, al igual que con el enrutado dinámico, se debe preprocesar la URL para obtener dichos valores.

> Proyecto asociado al capítulo de HTTP para comprender mejor los conceptos: [Github](https://github.com/DiegoFChC/Node-JS-mini-projects/tree/main/4-users-api-rest)