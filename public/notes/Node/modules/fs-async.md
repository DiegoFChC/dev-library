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

## Como funciona?
Algo importante a tener en cuenta es como en realidad funcionan los métodos como los de lectura y escritura. Estas funciones que hemos visto hasta el momento son abstracciones o mejor llamado **azucar sintáctico**.

### Abriendo el archivo

Para hacer operaciones como _leer_ o _escribir_ sobre un archivo, debemos usar la clase `FileHandle`, la cual es un objeto de tipo `EventEmitter` (puedes ver más acerca de lo que es `EventEmitter` en la sección de **eventos**). Para crear una instacia del mismo usamos el método open del módulo `node:fs/promises`.

> **Eventhandle** permite realizar operaciones de lectura y escritura en archivos de forma eficiente. Permite manipulación detallada.

Entre los parámetros maás importantes que recibe el método `open`, tenemos:

* `path` URL donde se encuentra el archivo a modificar
* `flags` Permite saber que tipo de acción de realizará sobre el archivo:
  * `'r'` Abre el archivo para leer su contenido
  * `'a'` Abre el archivo para añadir datos a él
  * `'w'` Abre el archivo para sobreescribir sobre él
  * `'r+'` Abre el archivo para lectura y escritura

> Puedes ver la lista completa de banderas en la [documentación oficial](https://nodejs.org/docs/latest/api/fs.html#file-system-flags).

Se debe tener especial cuidado a la hora de seleccionar la bandera, ya que esta determina lo que se realizará con el archivo.

```javascript
const fs = require('node:fs/promises')

// Para sólo lectura
const fileHandle = await fs.open('./file.txt', 'r')

// Para escritura (append)
const fileHandle = await fs.open('./file.txt', 'a')
```

### Acciones sobre el FileHandle

Luego de creada la instancia del `FileHandle`, dependiendo de la _bandera_ selecciona, podemos acceder a método como `read`, `write`, etc.

```javascript
// Escribiendo sobre un archivo
fileHandle.write('new text')
```

Para escribir es tan sencillo como llamar al método `write`, pero no lo es para acciones que inician con lectura de archivos. Para lectura debenos hacer algunos pasos adicionales, ya que manualmente debemos crear el espacio de memoria que se usará para almacenar la información leida, y debe hacerce cuidadosamente para no ocupar espacio demás. Veamos el siguiente ejemplo:

```javascript
// Leyendo un file.txt
const size = (await fileHandle.stat()).size // Definimos el espacio necesario
const buffer = Buffer.alloc(size) // Creamos el espacio en memoria
const offset = 0 // Definimos desde donde se empieza a llenar el buffer
const length = size // Definimos cuantos Bytes se van a leer
const position = 0 // Definimos desde donde empieza a leer

// Leemos y guardamos en el buffer
await fileHandle.read(buffer, offset, length, position)
const data = buffer.toString('utf8') // -> Ya accedemos a los datos del file.txt
```

Como vemos, es un proceso más cuidadoso. Debemos saber cuanto espacio vamos a ocupar en memoria, como se va a llenar, cuanto se va a leer y desde que posición se hará, para finalmente poder leer el archivo (`open`). Así es como internamente funcionan los métodos `readFileSync` o `readFile` que vimos anteriormente.

### Cerrando el FileHandle
Es sumamente **importante** que cada vez que terminemos una acción sea de lectura o escritura, **cerremos el evento** ya que si no lo hacemos puede quedar ocupando espacio en memoria y posteriormente causar problemas, e incluso detener el hilo de _Node JS_.

```javascript
await fileHandle.close()
```

> Puedes ver más a detalle la implementación de estos métodos de I/O en el [código fuente de Node JS (fs)](https://github.com/nodejs/node/blob/main/lib/fs.js)