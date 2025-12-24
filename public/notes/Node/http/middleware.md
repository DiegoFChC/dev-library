---
title: Middleware en Node JS
descrioción: Que son y como usar middleware en NodeJS
order: 7
---

## Middleware

Un middleware es una función que se ejecuta **antre la llegada del request y el handler final**.

```bash
Request → middleware(s) → controller → response
```

Puede tener algunas de las siguientes funciones:

* Validar
* Transformar
* Proteger
* Interceptar

No se debe confundir con los **controllers**. Los controladores se encargan de cosas como:

* Definir que endpoint se está solicitando
* Que lógica se debe ejecutar
* Que devuelvo

A diferendia de los middlewares que se encargan de cosas como:

* Validar su está autorizado
* Verificar IDs
* Verificar Content-Type
  
De forma conceptual lo podemos ver como:

```javascript
(req, res, next) => {
  // hago algo
  // si todo va bien → next()
  // si no → respondo y corto
}
```

Algunos ejemplo de middlewares que podríamos tener en Node JS (puro) son:

* `bodyParser` parsear el body (stream) cuando llega la petición.
* `urlParser` parsear la url para obtener datos como: url, method, contentType, searchParams, etc.
* `validUUID` validar si un id es correcto.

> Proyecto asociado al capítulo de HTTP para comprender mejor los conceptos: [Github](https://github.com/DiegoFChC/Node-JS-mini-projects/tree/main/4-users-api-rest)