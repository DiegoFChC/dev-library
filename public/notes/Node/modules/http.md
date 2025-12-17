---
title: HTTP
description: Módulo HTTP
order: 5
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
* COntrolar headers
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

> Dado lo extenso de ete capítulo, se ha decidido dedicar una sección completa al módulo de evento. A continuación puedes dirigirte a la sección [http](https://dev-library-diferdev.vercel.app/notes/Node/http/req-res)