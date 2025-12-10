---
title: HTTP
description: Módulo HTTP
order: 5
---

## Módulo HTTP

Permite crear servidores web y realizar solicitudes HTTP (get, post, put patch, etc). Permite transferir datos por medio del Protocolo de Transferencia de Hipertexto (HTTP), actuando como intérprete entre el navegador y el servidor.

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