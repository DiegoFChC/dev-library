---
title: OS
description: Módulo OS
order: 1
---

## Módulo OS

El módulo `os` permite obtener información sobre el sistema operativo y el hardware donde se está ejecutando la aplicación, ej: la arquitectura, el nombre, la memoria y datos de red.

```javascript
// const os = require('os') -> Antigua forma de importar módulos nativos.
const os = require('node:os') // Forma recomendada

console.log(os.userInfo()) // Usuario del sistema
console.log(os.uptime()) // Cuantos días lleva tu ordenador encendido
console.log(os.platform()) // Sistema
console.log(os.totalmem()) // Total de memoria
console.log(os.freemem()) // Memoria libre
console.log(os.arch()) // Arquitectura
console.log(os.cpus()) // Cpus

console.table({
  os: os.platform(),
  version: os.release(),
  totalMemory: os.totalmem()
})
```