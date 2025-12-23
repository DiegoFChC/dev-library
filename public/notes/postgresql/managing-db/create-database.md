---
title: Gestionando la BD
description: Gestión sobre una base de datos con PostgreSQL
oreder: 1
---

## Gestión de un BD en postgreSQL

A continuación veremos los comandos más importantes a la hora de usar gestionar bases de datos en _postgeSQL_.

* Para crear una base de datos usamos el comando `CREATE DATABASE <name>;`. Tambien tenemos otras opciones que complementan este comando, las cuales permiten especificar otros datos acerca de nuestra base de datos, algnos son:
  * `OWNER` Define que usuario es dueño de la base de datos.
  * `ENCODING` Codificación de la base de datos. Se recomienda `UTF8`.
  * `LC_COLLATE` Controla cómo se ordenan los textos.
  * `LC_CTYPE` COntrola cómo se comparan letras. **No se puede cambiar una vez definida**.
  * `TEMPLATE` Si queremos usar una base de datos como plantilla.

```sql
CREATE DATABASE mi_app
OWNER postgres
TEMPLATE template0
ENCODING 'UTF8'
LC_COLLATE 'es_ES.UTF-8'
LC_CTYPE 'es_ES.UTF-8';
```

> Los comandos en SQL se escriben en **mayúscula**. También es necesario terminar siempre con el símbolo `;`.

* Para eliminar un base de datos existente:

```sql
DROP DATABASE ecommerce;

-- Mejor forma
DROP DATABASE IF EXISTS ecommerce;
```

* Para modificar las propiedades de una base de datos uamos la palabra reervada `ALTER`.
  * `OWNER` cambia el nombre del propietario.
  * `RENAME` cambia el nombre de la base de datos.
  * `SET` cambia configuraciones (ej: `SET timezone TO UTC;`)
  * `RESET` restaura un valor a su valor por defecto.

```sql
-- Cambiar propietario
ALTER DATABASE ecommerce OWNER TO diego;
-- Cambiar nombre
ALTER DATABASE ecommerce RENAME TO my_app;
-- Cambiar configuración (timezone)
ALTER DATABASE ecommerce SET timezone TO 'UTC';
-- Restaurar valor por defecto
ALTER DATABASE ecommerce RESET timezone;
```

* Para documentar objetos de la base de datos usamos `COMMENT`.

```sql
COMMENT ON DATABASE ecommerce IS 'Base de datos principal del proyecto';
```

* Dar y quitar permisos en la base de datos por medio de `GRANT` y `REVOKE` respectivamente. Entre los permisos más comunes tenemos:
  * `CONNECT`
  * `CREATE`
  * `TEMP`

```sql
-- Dar permiso
GRANT CONNECT ON DATABASE ecommerce TO diego;

-- Quitar permiso
REVOKE CONNECT ON DATABASE ecommerce FROM deigo;
```

* Saber a que base de datos estamos conectadados actualmente:

```sql
SELECT current_database();
```

* Terminar las conexiones a una base de datos:

```sql
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'ecommerce';
```