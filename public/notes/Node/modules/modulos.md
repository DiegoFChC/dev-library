---
title: Módulos de Node
description: Node JS nos provee módulos para trabajar, se les llama la API de Node JS. Nos facilita la creación de funcionalidades.
order: 6
---

### Request
Información acerca del cliente.

### Response
Lo que se le responde al cliente.

### Event loop

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Welcome to the server')
    return res.end()
  }

  if (req.url === '/about') {
    // Blocking code
    for (let i = 0; i < 100000; i++) {
      console.log(Math.random() * i)
    }

    return res.end('About page')
  }

  res.end('Not found')
})

server.listen(3000)
console.log('Servidor escuchando en el puerto 3000')
```

### Promesas

```javascript
const { readFile } = require('fs')

function getText (pathFile) {
  return new Promise(function (resolve, reject) {
    readFile(pathFile, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }
    
      resolve(data)
    })
  })
}

getText('./data/first.txt')
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

```javascript
const { readFile } = require('fs')

function getText (pathFile) {
  return new Promise(function (resolve, reject) {
    readFile(pathFile, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }
    
      resolve(data)
    })
  })
}

async function read () {
  try {
    const data = await getText('./data/first.txt')
    console.log(data)
  } catch (err) {
    throw new Error('Error al leer el archivo')
  }
}

read()
```

```javascript
const { readFile } = require('fs')
const { promisify } = require('util')

const readFilePromise = promisify(readFile)
async function read () {
  try {
    const data = await readFilePromise('./data/first.txt', 'utf-8')
    console.log(data)
  } catch (err) {
    throw new Error('Error al leer el archivo')
  }
}

read()
```

## Evento

```javascript
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('response', (text, data) => {
  console.log(text)
  console.log(data)
})

customEmitter.emit('response', 'Hello world', { data: 7 })
```

## Stream
Permite dividir archivos grandes para que sean enviados.

```javascript
const { writeFile } = require('fs/promises')

const createBigFile = async () => {
  await writeFile('./data/bigData.txt', 'hello world '.repeat(1000000))
}

createBigFile()

const { createReadStream } = require('fs')

const stream = createReadStream('./data/bigData.txt', {
  encoding: 'utf-8'
})
stream.on('data', function(chunk) {
  console.log(chunk)
})

stream.on('end', () => {
  console.log('Ya he acabado de leer el archivo')
})

stream.on('error', (error) => {
  console.log(error)
})
```

## stream y http

```javascript
const http = require('http')
const { createReadStream } = require('fs')

const server = http.createServer((req, res) => {
  const fileStream = createReadStream('./data/bigData.txt', {
    encoding: 'utf-8'
  })

  fileStream.on('data', (chunk) => {
    console.log(chunk)
    fileStream.pipe(res)
  })

  fileStream.on('error', (err) => {
    console.log(err)
  })
})

server.listen(3000)
console.log(`Server on port ${3000}`)
```

## fetch
