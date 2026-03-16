---
title: HTTP
description: Módulo HTTP
order: 6
---

## Módulo HTTP

El módulo HTTP es un módulo nativo de Node JS que permite crear servidores y realizar solicitudes HTTP (get, post, put patch, etc). Permite transferir datos por medio del Protocolo de Transferencia de Hipertexto (HTTP), actuando como intérprete entre el navegador y el servidor.

Node está pensando para manejar muchas conexiones, sin bloquear el hilo principal usando eventos y streams.

El método `http` nos permite (entre muchas otras cosas):
* Crear un servidor
* Escuchar peticiones
* Leer la URL
* Leer el métodos HTTP
* Leer headers
* Leer el body (en streaming)
* Enviar respuestas
* Controlar status code
* Controlar headers
* Devolver JSON, HTML o texto

A continuación vemos un ejemplo sencillo de como crear un servidor:

```javascript
const http = require('http')

const server = http.createServer((request, response) => {
  console.log(request.url)

  if (request.url === '/') {
    response.write('Welcome to the server')
    return response.end()
  }

  if (request.url === '/about') {
    response.write('Acerca de')
    return response.end()
  }

  response.write(`
    <h1>Not Found</h1>
    <p>Esta página no se encontró</p>
    <a href='/'>Volver a la página principal</a>
  `)
  response.end()
})

server.listen(3000)

console.log('Servidor escuchando en el puerto 3000')
```

### Atributos de request comunes

Atributos comúnmente usados para `request`

* `req.url` url a la que se hace la petición.
```javascript
req.url // -> /user/23131321
```

* `req.headers` cabeceras HTTP de la petición (ej: content-type)
```javascript
req.headers // -> { 'content-type': 'application/json' }
```

* `req.method` verbo HTTP utilizado (ej: GET, POST)
```javascript
req.method // -> POST
```

* `req.on('data', callback)` escucha para recibir los datos del `body` enviados en peticiones `POST`, `PUT`, etc.
```javascript
let data = ''
req.on('data', (chuck) => {
  data += chunck.toString()
})
```

* `req.on('end', callback)` escucha para ejecutar algo al finalizar la recepción de datos del `body`.
```javascript
req.on('end', () => {
  // -> do something
})
```

* `req.on('error', callback) detecta un error al cargar los datos del body.
```javascript
req.on('error', () => {
  // -> do something
})
```

### Atributos de response comunes

Atributos comúnmente usados para `response`

* `res.statusCode` establece el código de estado de la respuesta (ej: `200`).
```javascript
res.statusCode = 200
```

* `res.setHeader(name, value)` establece una cabecera de respuesta específica.
```javascript
res.setHeader('content-type', 'application/json')
res.getHeader('content-type') // -> 'application/json'
```

* `res.writeHead(statusOode, headers)` permite escribir el código de respuesta y los headers a enviar de una vez.
```javascript
res.writeHead(205, {
  'content-type': 'application/json'
})
```

* `res.write(data)` Envía un **trozo** de datos al cuerpo de la respuesta.
```javascript
res.write("I'm gonna send this!!!")
```

* `res.end([data])` finaliza la respuesta, enviando los datos finales opcionales.
```javascript
res.end('More data')

// Simulación
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hola, estoy preparando tu respuesta...\n');
  setTimeout(() => {
    res.write('Aquí tienes la segunda parte.\n');
    res.end('Listo, terminamos.');
  }, 2000);
})
```

> Dado lo extenso de ete capítulo, se ha decidido dedicar una sección completa al módulo de evento. A continuación puedes dirigirte a la sección [http](https://dev-library-diferdev.vercel.app/notes/Node/http/req-res)
> También puedes encontrar un servidor básico creado sólo con Node puro: [Github](https://github.com/DiegoFChC/Node-JS-mini-projects/tree/main/4-users-api-rest)
