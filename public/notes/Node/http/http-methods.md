---
title: Métodos HTTP
description: Descripción de los métodos HTTP
order: 4
---

## Métodos HTTP
Los métodos HTTP son los que definen la acción que el cliente quiere realizar sobre los recursos.

```javascript
req.method
```

Por ejemplo:
* GET /users → obtener usuarios
* POST /users → crear usuario
* DELETE /users/3 → eliminar usuario

> **Idempontente** se refiere a los métodos que al llamarlos varias veces tienen el mismo efecto que ejecutarlos una sola vez. No cambian el estado del servidor más allá de la primera llamada.

### GET
Solicita datos. Repetirlo devuelve los mismos datos y no modifica el servidor.

* No modifica estado
* Idempotente

### POST
Crea un nuevo recurso. Cada POST a la misma URL crea un nuevo recurso.

* Crea recursos
* Envía datos en el body
* No idempotente

### PUT
Actualiza o reemplaza un recurso por completo. Repetirlo deja el mismo recurso actualizado.

* Actualiza todo el recurso
* Idempotente

### PATCH
Modifica parcialmente un recurso. Si no se implementa con cuidado, puede generar estados diferentes con cada llamada. 

* Actualiza parte del recurso
* No idempotente

### DELETE
Elimina un recurso. Repetirlo después de la primera vez no tiene efecto adicional.

* Elimina
* Idempotente

### HEAD
El método HEAD es idéntico a un GET, pero el servidor responde solo con los encabezados (headers), omitiendo el cuerpo de la respuesta. 

* Idempotente

Usado para:

* validar existencia
* caché
* performance

### OPTIONS
El método OPTIONS se usa para descubrir qué opciones de comunicación están disponibles para un recurso o para el servidor en general. 

* Idempotente

Muy usado en:

* CORS
* navegadores