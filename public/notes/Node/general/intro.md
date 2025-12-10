---
title: Node JS
description: Que es node y algunos aspectos relevantes.
order: 1
---

## Node JS

Node JS es un **ambiente o entorno de ejecución** de JavaScript. Permite aplciaciones de servidor, da a JavaScript la facilidad de no ser sólo para la web sino para el servidor.

## REPL

Este es un interprete que interactua con nuestro sistema operativo. Podemos ejecutarlo desde consola con el comando `node`.

> **REPL:** Read, eval, print, loop.

## Ejecución

Para ejecutar un archivo `.js`.

```bash
node fileName.js
```

## Node JS vs Navegador

Node permite interactuar con el sistema interactivo (os, process, etc), y JS en el navegador permite acceder a características únicas del navegador (document, window, etc).

## Objetos y variables globales

Son objetos incluidos cuando abrimos un interprete, en este caso Node JS

* **globalThis**: Objeto global en toda nuestra aplicación. Nos da acceso a varaibles como `console`, `Math` y más.
* **__diraname**: Permite acceder a la dirección donde me encuentro.
* **__filename**: Ruta completa con el archivo.
* **module**: Puede separar una aplicación JS en múltiples archivos
* **require**: Permite importar esos archivos separados por *module*.
* **process**: Da información del sistema.