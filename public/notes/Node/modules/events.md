---
title: Eventos
description: Módulo de eventos de Node JS
order: 6
---

## ¿Que son?
Un **evento** en Node JS es una señal que indica que algo pasó. Un evento puede ser cualquier cosa: llegó una petición, se terminó de leer un archivo, se presionó una tecla, pasó un tiempo (timeout, interval), un socket recibió datos, un proceso acabó, etc.

Para esto Node JS utiliza un sistema llamado `EventEmitter`, que es la clase central del módulo `events`.

Podemos pensar el `EventEmitter` como una clase que almacena un objeto el cual contiene diferentes `listener`. Cada `listener` puede tener una o más funciones, las cuales se ejecutarán automáticamente cuando se llame a un `listener` específico. Dicha clase `ÈventEmitter` no solo permite añadir `listeners` o ejecutar las funciones asociadas a los mismos, sino que permite contarlos, removerlos, entre otras funciones relevantes.

### Creación
En base a la documentación de Node JS, podemos crear un objeto emitter de la siguiente manera:

```javascript
const EventEmitter = require('node:events')

class Emitter extends EventEmitter {}

const myEmitter = new Emitter()
```

### Funcionalidades importantes

* `on` Registra un listener para un evento

```javascript
// .on('listenername', action)
myEmitter.on('listenerName', () => {
  console.log('Do something!!!')
})
```

* `emit` Dispara (emite) un evento. Ejecuta todas las funciones asociadas a un listener.

```javascript
// .emit(listenerName, params...)
myEmitter.emit('listenerName')

// -> Console
// -> So something!!!
```

* `once` Funciona como `emit` pero dispara el evento una sóla vez y luego lo elimina, por lo que aunque lo llames de nuevo, no funcionará.
* `off` o `removeListener` Elimina un listener específico.
* `removeAllListeners` Elimina todos los listeners asociados a un evento.
* `listenerCount` Da el número de listeners asociados a un evento.

Puedes consultar más en la página de documentación de Node JS. [Documentación](https://nodejs.org/docs/latest/api/events.html)

## Importante para Node JS
El módulo `events` es muy importante para Node JS debido a que Node entero está contruido sobre un **modelo de programación orientado a eventos**.

Node no usar múltiples hilos para manejar muchas tareas al mismo tiempo, sino que una **un sólo hilo** y un **Event Loop**. El Event Loop funciona de la siguiente manera:

1. Lanzas operaciones asíncronas (leer archivo, esperar petición HTTP, conectar a BD, etc).
2. Estas operaciones **NO** bloquean el hilo principal.
3. Cuando las operaciones terminan, generan **eventos**.
4. Node Captura esos eventos y ejecuta los callbacks.

Si Node no tuviera el sistema de eventos, se bloquearía y solo pordría realizar una operación a la vez.

Es por esto que muchos de los módulos de Node JS (puedes mirar la documentación) las instanciarlos generan por defecto un objeto evento al que podemos suscribirnos. Un ejemplo es el módulo `fs`, cuando usamos algunas de sus funciones como `open`, se genera un clase FileHandle las cual es un `EventEmitter`. Dicha clae tiene definidos diferentes listernes. Y de la misma manera para con muchos otros módulos de Node JS.