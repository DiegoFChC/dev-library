---
title: PostgreSQL
description: Que es una base de datos y cual es el rol de PostgreSQL
order: 1
---

## Que es una base de datos
Una **base de datos** es una colección de datos interrelacionados que son administrados por una herramienta de software. Tenemos varios tipos:

* **Relacionales (SQL)**: Organizan los datos en tablas (relaciones) compuestas por filas y columnas interconectadas entre sí.
* **No relacionales (NoSQL)**: Son más flexibles y se adaptan a estructuras de datos más libres.

## Sistema gestor de base de datos
Un _sistema gestor de bases de datos_ (DBMS) es una herramienta de software que permite la gestión de bases de datos, o datos alojados en disco.

Todo gestor de bases de datos se caracteriza por seguir, utilizar o incorporar un **modelo de datos** (ej: relacional, no relacional) y un **lenguaje de consulta** (ej: SQL).

Los _DBMS_ permiten:

* Control de acceso y concurrencia a la bd.
* Proteger los datos almacenados en la bd.
* Copias de seguridad y recuperación en caso de fallas, lo cual no permite pérdida de datos en gran medida.
* Integridad de los datos.

## PostgreSQL

Es un motor o **sistema gestor de base de datos** (DBMS), que permite usar **SQL** para consultas en bases de datos. El ser un _gestor de bases de datos_ significa que es un intermediario entre los datos físicos y los usuarios o aplicaciones, no se encarga de guardar la información sino de administrarla, protegerla y facilitar su recuperación eficiente.

_PostgreSQL_ es un gestor relacional, lo que significa que organiza los datos en _relaciones_ (tablas) compuestas por filas y columnas.

### SQL en PostgreSQL

El lenguaje de consulta estructurado **SQL** es un lenguaje usado para comunicarse con los _sistemas de gestión de bases de datos_. Permite interacturar con bases de datos mediante operaciones de consulta, inserción, actualización y eliminación de registros.