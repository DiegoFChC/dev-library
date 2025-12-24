---
title: MongoDB
description: Introducción a MongoDB
order: 1
---

## Que es MongoDB 

MongoDB es una base de datos NoSQL (no relacional) de documentos que almacena datos en formatos flexibles similares a JSON (llamados BSON), en lugar de tablas y filas de las bases de datos relacionales. Ideal para manejar grandes volúmenes de datos, ofrece flexibilidad para cambiar estructuras. Permite escalabilidad horizontal y es orientado a documentos.

## SQL vs NoSQL
En bases de datos relacionales:

* Tenemos **tablas** y **registros**.
* Una tabla contiene registros.
* La **tabla** tiene una estructura definida. Cada registro tiene todos los datos de la tabla (asi esten en `null` el campo sigue existiendo).

En bases de datos no relacionales:

* Tenemos **colecciones** y **documentos**.
* Una colección contiene documentos.
* Una **colección** no tiene una estructura definida, cada documento puede tener estructuras distintas entre documentos.