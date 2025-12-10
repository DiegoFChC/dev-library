---
title: FS async
description: Módulo FS asíncrono
order: 3
---

## Módulo FS asíncrono

El módulo fs asíncrono nos permite realizar lo mismo que fs síncrono, solo que este no detiene la ejecución de nuestro programa, esperando una respuesta de nuestra función.

Este módulo nos permite tener mejor rendimiento al usar mejor la memoria, por no tener que esperar a que una funcionalidad termine.

* **readFile**: Lectura de archivos asíncrona. En este método podemos agregar un tercer parámetro que hace referencia a un _callback_.

### Asíncrono con callbacks

```javascript
const fs = require('node:fs')

fs.readFile('./file.txt', 'utf-8', (err, text) => {
  console.log(text)
}) // utf-8 convierte a texto

fs.readFile('./file2.txt', 'utf-8', (err, text) => {
  console.log(text)
})

console.log('Ejecuta algo mientras acaba')

// -> Node no se bloquea esperando la lectura de los archivos.
```

> **Callback** es una función que se ejecuta cuando una tarea ha terminado.

### Asíncrono secuencial

Podemos leer el archivo usando promesas (ya habilitdo por Node JS):

```javascript
const fs = require('node:fs/promises') // <-- Importante!!!

fs.readFile('./file.txt', 'utf-8')
  .then(text => console.log('Primer texto:', text))

console.log('Ejecuta algo mientras acaba')

fs.readFile('./file.txt', 'utf-8')
  .then(text => console.log('Segundo texto:', text))
```

Podemos usar `async` `await`, pero esto genera asincronía secuencial. Si lo hacemos en ES modules.

```javascript
import { readFile } from 'node:fs/promises'

const text1 = await readFile('./file.txt', 'utf-8')
console.log('Primer texto:', text1)

console.log('Ejecuta algo mientras acaba')

const text2 = await readFile('./file2.txt', 'utf-8')
console.log('Segundo texto:', text2)
```

Si lo hacemos en CommonJS modules.

```javascript
// Usando una función autoinvocada
const { readFile } = require('node:fs/promises'); // <-- OJO: punto y coma es necesario

// IIFE - Inmediatly Invoked Function Expresion
// (
//   () => {
    
//   }
// )()
(
  async () => {
    const text1 = await readFile('./file.txt', 'utf-8')
    console.log('Primer texto:', text1)

    console.log('Ejecuta algo mientras acaba')

    const text2 = await readFile('./file2.txt', 'utf-8')
    console.log('Segundo texto:', text2)
  }
)()
```

```javascript
const { readFile } = require('node:fs/promises')

async function init() {
  const text1 = await readFile('./file.txt', 'utf-8')
  console.log('Primer texto:', text1)

  console.log('Ejecuta algo mientras acaba')

  const text2 = await readFile('./file2.txt', 'utf-8')
  console.log('Segundo texto:', text2)
}

init()
```

{% callout type="caution" %}
Cuando usamos CommonJS no es permitido usar `await` fuera de una función asíncrona. ES sí lo permite.
{% /callout %}

Algo interesante que nos permite hacer Node JS, es que nos permite convertir módulos síncronos a promesas por medio de una utilidad:

```javascript
const fs = require('node:fs')
const { promisify } = require('node:util')

const readFilePromise = promisify(fs.readFile)

readFilePromise('./file.txt', 'utf-8')
  .then(text => console.log('Primer texto:', text))

console.log('Ejecuta algo mientras acaba')

readFilePromise('./file.txt', 'utf-8')
  .then(text => console.log('Segundo texto:', text))
```

{% callout type="danger" %}
Sólo usar en caso de que Node aún no provea una versión en promesas del módulo requerido.
{% /callout %}

### Asíncrono paralelo

Lee los archivos en asíncrono pero al mismo tiempo. Cuando acabe con ambos, continua.

```javascript
const { readFile } = require('node:fs/promises')

Promise.all([
  readFile('./file.txt', 'utf-8'),
  readFile('./file2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('Primer texto:', text)
  console.log('Segundo texto:', secondText)
})
```
