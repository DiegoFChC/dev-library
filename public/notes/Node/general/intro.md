---
title: Node JS
description: Que es node y algunos aspectos relevantes.
order: 1
---

## Node JS

Node JS es un **ambiente o entorno de ejecución** de JavaScript. Permite crear aplicaciones de servidor, da a JavaScript la facilidad de no ser sólo para la web sino para el servidor.

## REPL

Este es un interprete que interactua con nuestro sistema operativo. Podemos ejecutarlo desde consola con el comando `node`.

> **REPL:** Read, eval, print, loop.

### Ejecución

Para ejecutar un archivo `.js`.

```bash
node fileName.js
```

## Node JS vs Navegador

Node permite interactuar con el sistema interactivo (os, process, etc), y JS en el navegador permite acceder a características únicas del navegador (document, window, etc).

## Event loop
El **event loop** es el mecanismo que usa _Node JS_ para manejar **muchas operaciones al mismo tiempo** usando un sólo hilo. Esto permite realizar tareas **asincrónicas**, lo cual ayuda a que _Node JS_ no se bloquee esperando operaciones lentas. El _event loop_ es un ciclo que revisa constantemente que tareas hay pendientes y cuando ejecutar.

El _event loop_ tiene varios componentes importantes que veremos a continuación.

* **Call stack:** Es donde se ejecuta el código **síncrono**.
* **libuv:** Es la librería que implementa el _event loop_ en node. Es usada para las tareas lentas (filesystem, timers, network, etc). Esta librería provee una capa abstracta para operacion I/O asincrónicas (capa abstracta `->` gestiona), evitando que la aplicación se bloquee esperando a que se finalicen estas tareas.
* **Callback queue:** Por lo general las tareas asíncronas tienen un **callback** que se ejecuta al terminar la operación. Estas _callbacks_ son almacenadas en esta cola cada vez que termina la tarea y se ejecutan cuando el **call stack** está vacío (no hay tareas síncronas por ejecutar).

En general el ciclo del **event loop** lo podemos ver de la siguiente manera:

```javascript
while (program_is_active) {
  // -> Ejecuta código síncrono
  // -> Revisa timers
  // -> Revisa I/O callbacks
  // -> Revisa eventos de red
  // -> Ejecuta callbacks pendientes
}
```

## Objetos y variables globales

Son objetos incluidos cuando abrimos un interprete, en este caso Node JS

* **globalThis**: Objeto global en toda nuestra aplicación. Nos da acceso a varaibles como `console`, `Math` y más.
* **__diraname**: Permite acceder a la dirección donde me encuentro.
* **__filename**: Ruta completa con el archivo.
* **module**: Puede separar una aplicación JS en múltiples archivos
* **require**: Permite importar esos archivos separados por *module*.
* **process**: Da información del sistema.