---
title: FS sync
description: Módulo FS síncrono
order: 2
---

## Módulo FS síncrono

El módulo fs (file system) nos permite administrar los archivos en el sistema, leer, escribir o comprobar. Cuando se habla de síncrono, se refiere a que al llamar las funcionalidades síncronas, estan bloquearán la ejecución del programa hasta que se se termine de ejecutar dicha función.

```javascript
const fs = require('node:fs')

import fs from 'node:fs'
```

Entre sus princiales métodos tenemos:

* **statSync**: Información del archivo.

```javascript
const fs = require('node:fs')

const stats = fs.statSync('./file.txt')

console.log(
  stats.isFile(), // Si es un archivo
  stats.isDirectory(), // Si es un directorio
  stats.isSymbolicLink(), // Si es un enlace simbólico
  stats.size // Tamaño en bytes
)
```

* **readFileSync**: Lectura de archivos síncrona.

```javascript
const fs = require('node:fs')

const text = fs.readFileSync('./file.txt', 'utf-8') // utf-8 convierte a texto

console.log(text)
```

## Métodos generales

A continaución se enumeran algunos métodos generales que tenemos en el _file system_. Estos métodos se definirán de forma general y pueden ser usados en _FS Sync_ o _FS Async_ (usando la función correcta).

* **writeFile**: Crea un archivo en la dirección especificada con el texto dato. Si ya existe, sobreescribe el existente.
  * `path` dirección donde se creará.
  * `content` contenido del nuevo archivo.
* **readFile**: Lee un archivo.
  * `path` dirección del archivo a leer.
  * `format` formato de lectura (utf-8, etc). Si no se especifica retorna un `buffer`.
* **appendFile**: Añade contenido a un archivo existente. Si no existe, lo crea.
  * `file` dirección del archivo al que agregaremos contenido.
  * `content` contenido a agregar.
* **unlink**: Borrar un archivo.
  * `path` dirección del archivo a borrar. Si es un _symbolic link_, no afecta a los elementos enlazados a él.

> **Symbolic link** hace referencia a un acceso directo.

Para consultar más sobre los métodos disponibles puede acceder a [Node JS Docs](https://nodejs.org/docs/latest/api/fs.html).


















Veamos un pequeño ejemplo:

```javascript
const fs = require('node:fs')

// Leer un archivo de forma síncrona (crudo)
const first = fs.readFileSync('./data/first.txt')
console.log(first) // Retorna un buffer, txt en crudo

// Leer un archivo de forma síncrona (formateado)
const first2 = fs.readFileSync('./data/first.txt', 'utf-8')
console.log(first2)

const second = fs.readFileSync('./data/second.txt')
console.log(second.toString())

// Crear archivos (url, content)
fs.writeFileSync('./data/third.txt', 'Hello world 3!!!')

const title = 'This is the content of this .txt'
fs.writeFileSync('./data/fourth.txt', title)

// Si ya existe lo sobreescribe, pero si queremos añadir texto al mismo archivo podemos añadir un parámetro flag:'a' -> append
fs.writeFileSync('./data/fourth.txt', title, { flag: 'a' })
```