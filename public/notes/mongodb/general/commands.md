---
title: MongoDB en consola
descriptoon: Uso de MongoDB a través de la consola
order: 2
---

# MongoDB a través de la consola

Para acceder a nuestras bases de datos NoSQL de MongoDB tenemos varias opciones, podemos usar MongoDB Compass o como está descrito en este documento, la consola. A continuación describiremos algunos de los comandos más importantes que podemos usar a través de la consola.

## Accediendo

Para ejecutar `MongoDB` debemos abrir una consola y luego ejecutar el siguiente comando:

```bash
mongsh
```

## Algunos comandos importantes

A continuación se listan los comandos más importantes para usar en el bash de psql.

> **BD** Base de datos
> **<descripción>** Se refiere a colocar el dato solicitado pero sin necesidad de poner `<>`, ej: `\c database-name`

Comandos de navegación y consulta de información:

* **show dbs** listar bases de datos disponibles
* **use <databasename>** selección una BD sobre la cual recaerán los siguientes comandos.