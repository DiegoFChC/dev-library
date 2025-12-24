---
title: Body
description: Manejo del body en Node.js
order: 6
---

## El Body de las peticiones

El body es el contenido principal de una request o response. Se usa para enviar datos, archivos, JSON, formularios, etc. Por lo general el método `GET` no tiene body.

{% callout type="caution" %}
En Node.js el body **NO** llega completo, llega como un **stream**.
{% /callout %}

* `req` es un _stream_ de lectura, y hereda de `ReadableStream`. Su métodos más importantes son:
  * `data`: Se emite cada vez que el servidor recibe un nuevo fragmento (chunk) de datos del cuerpo de la petición. Es esencial para capturar la información que el cliente envía (como un JSON en un POST).
  * `end`: Se dispara cuando se han recibido todos los fragmentos y no hay más datos disponibles en la transmisión.
  * `error`: Ocurre si hay un fallo durante la comunicación o la lectura del flujo.
* `res` es un _stream_ de escritura, y hereda de `ServerResponse`. Sus métodos más importantes son:
  * `finish`: Se dispara cuando todos los datos han sido entregados al sistema operativo para ser enviados al cliente.
  * `close`: Se emite cuando la conexión se ha cerrado (por el servidor o por el cliente de forma inesperada).
  * `error`: Se dispara si hay un problema al intentar escribir en la respuesta.

```javascript
// Ejemplo de implementación con promesas

function bodyParser(req, res) {
  return new Promise((resolve, reject) => {
    let totalData = ''
    req
      .on('data', (chunk) => {
        totalData += chunk.toString()
      })
      .on('end', () => {
        if (totalData.length === 0) {
          return reject(new Error('Data not received'));
        }
        try {
          req.body = JSON.parse(totalData);
          resolve();
        } catch (err) {
          reject(new Error('Invalid JSON format'));
        }
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}

module.exports = { bodyParser }
```

> El tipo del body depende del `Content-Type` especificado en los `headers`.

> Proyecto asociado al capítulo de HTTP para comprender mejor los conceptos: [Github](https://github.com/DiegoFChC/Node-JS-mini-projects/tree/main/4-users-api-rest)