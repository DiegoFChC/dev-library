---
title: Gestionando la BD
description: Gestión sobre una base de datos con MongoDB, a través de la consola.
oreder: 1
---

## Gestión de un BD en MongoDB

A continuación veremos los comandos más importantes a la hora de usar gestionar bases de datos en _MongoDB_.

### Creando un BD

En MongoDB a la hora de crear una nueva base de datos es necesario especificar una **colección** inicial. No se puede crear una base de datos vacía.

```sql
-- Selecciona un nombre para la BD
use databaseName

-- Crea la colección inicial y registra la BD
db.createCollection('collectionName')
```

### Eliminando la BD

Para eliminar una base de datos usamos el siguiente comando:

```sql
-- Elimina una base de datos
db.dropDatabase()
```

Recuerda que para selección la base de datos que será afectada, usamos el comando `use`.

{% callout type="caution" %}
Este comando elimina todas las coleecciones asociadas a la base de datos.
{% /callout %}