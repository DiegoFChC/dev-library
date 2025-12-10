---
title:  Módulos en Node
description: Patrones de diseño usados en Node JS para imports y exports en Node JS.
order: 2
---

## CommonJS modules

Los múdulos nos permiten construir una aplicación grande dividia en diferentes archivos.
El objeto global *module* tiene algunos atributos importantes:

* **exports**: Permite exportar
* **require**: Permite importar

Veamos el siguiente ejemplo:

```
/modules
  myModule.js
index.js
```

```javascript
// myModule.js
const user = {
  name: 'Diego',
  lastName: 'Chaverra',
  age: 24
}

const bike = {
  color: 'black',
  cc: 300
}

module.exports = { user, bike }
```

```javascript
// index.js
const { user, bike } = require('./modules/myModule')

console.log(user, bike)
```

### Exports individuales

Para exportar elementos de forma individual pordemos hacerlo de la sigueinte manera:

```javascript
const user = {
  name: 'Diego',
  lastName: 'Chaverra',
  age: 24
}

const bike = {
  color: 'black',
  cc: 300
}

module.exports.user = user
module.exports.bike = bike
```

> El cambiar la forma de exportar no cambia la forma de importar.

## ES Modules

ECMAScript Modules es el sistema oficial de módulos de JavaScript. Este sistema permite dividir el código en archivos separados y reutilizarlos mediante las palabras clave `import` y  `export`.

Es una alternativa a CommonJS módulos y mucho más sencilla de usar. Veámoslo con el ejemplo anterior pero a daptado a ES Modules.

```
/modules
  myModule.js
index.js
```

```javascript
// myModule.js
export const user = {
  name: 'Diego',
  lastName: 'Chaverra',
  age: 24
}

export const bike = {
  color: 'black',
  cc: 300
}
```

```javascript
// index.js
import { user, bike } from './modules/myModule.mjs'

console.log(user, bike)
```

### Otras consideraciones

Según la extensión que tengan nuestros archivos, podemos obligar a que se use uno u otro método.

* **.js**: Por defecto usar CommonJS
* **.mjs**: Obliga a usar ES Module
* **.cjs**: Obliga  ausar CommonJS