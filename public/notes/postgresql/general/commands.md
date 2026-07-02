---
title: PostgreSQL en consola
descriptoon: Uso de PostgreSQL a través de la consola
order: 2
---

## PostgreSQL a través de la consola

Para acceder a nuestras bases de datos `PostgreSQL` tenemos varias opciones, podemos usar pgAdmin o como está descrito en este documento, la consola. A continuación describiremos algunos de los comandos más importantes que podemos usar a través de la consola.

> Recuerda tener instalado PostgreSQL en tu sistema, ya que usaremos el comando `psql` en la consola para acceder a nuestas bases de datos.

### Accediendo

Para ejecutar el gestor de bases de datos de `PostgreSQL` debemos abrir una consola y luego ejecutar el siguiente comando:

```bash
psql -p [puerto] [base_datos] [usuario]
```

* **Puerto:** Identifica el puerdo donde va a estar activa nuestra base de datos, por lo general el puerto 5432.
* **Base de datos:** Nombre de la base de datos a la que queremos acceder.
* **Usuario:** Nombre de usaurio del sistema.

Si queremos entrar a una base de datos genérica que viene preinstalada por PostgrSQL podemos acceer de la siguiente manera:

```bash
psql -p 5432 postgres postgres
```

> Recuerta tener tu **contraseña** a la hora de acceder.

### Algunos comandos importantes

A continuación se listan los comandos más importantes para usar en el bash de psql.

{% callout %}
* **BD** Base de datos
* **<descripción>** Se refiere a colocar el dato solicitado pero sin necesidad de poner `<>`, ej: `\c database-name`
{% /callout %}

Comandos de navegación y consulta de información:

* **`\?`** Lista todos los comandos disponibles en la cosola.
* **\l** Lista todas las BD disponibles.
* **\c** Información de la base de datos activa.
* **\c <BD>** Para conectarse a una BD.
* **\d** Listar todas las relaciones de una BD.
* **\dt** Lista de las tablas de la BD.
* **\d <table_name>** Esquema de una tabla.
* **\d+ <table_name>** Esquema de una tabla con más detalle. 
* **\dn** Esquema de la BD actual. 
* **\df** Funciones disponibles para la BD.
* **\dv** Vistas de la BD.
* **\du** Lista de usuarios y sus roles en la BD.

Comandos de inspección y ejecución:

* **\h** Información de todas las consultas SQL disponible en consola.
* **\q** Cierra el gesto de BD.
* **\! cls** Limpiar terminal.
* **\g** Ejecuta el comando anterior.
* **\s** Historial de comandos ejecutados.
* **\s <file_name>** Guardar lista de comandos ejecutados.
* **\i <file_name>** Ejecutar comandos desde un archivo.
* **\e** Permite abrir un editor de texto plano, escribir comandos y ejecutar en lote. \e abre el editor de texto, escribir allí todos los comandos, luego guardar los cambios y cerrar, al cerrar se ejecutarán todos los comandos guardados.
* **\ef** Equivalente al comando anterior pero permite editar también funciones en PostgreSQL