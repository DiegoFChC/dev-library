---
title: Process
description: Objeto global process en Node JS
order: 1
---

## Global Object process
Objeto global que proporciona informacion y control sobre el proceso actual de ejecución. Propiedades y métodos que nos permiten interactuar con el entorno de ejecución de Node JS.

* **argv**: Nos permite acceder a los argumentos de un comando.

```javascript
console.log(process.argv)

// bash
// > node index.js twich curso node hola --uuu midu
// Retornaría
[
  'C:\\Program Files\\nodejs\\node.exe', // Directorio de node
  'D:\\Cursos\\Teoria\\Node\\index.js', // Directorio donde está el archivo
  'twich', // argumento 1
  'curso', // argumento 2
  'node', // argumento 3
  'hola', // argumento 4
  '--uuu', // argumento 5
  'midu' // argumento 6
]
```

* **exit**: Controlar el proceso y su salida
  * `0` todo fué bien
  * `1` hay algún error y queremos que termine
* **on**: Permite escuchar los eventos, por ejemplo `exit`.

```javascript
process.on('exit', () => {
  // acción a ejecutar
})
```

* **cwd**: (Current working directory) nos permite saber desde que carpeta estamos ejecutando un proceso.
* **env**: Variables de entorno.