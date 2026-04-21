---
title: CORS
description: Que son los CORS (Cross-Origin Resource Sharing - Intercambio de recursos de origen cruzado)
order: 8
---

## ¿Que son los CORS?

CORS (Intercambio de recursos de origen cruzado) es un mecanismo de seguridad del navegador, el cual usa cabeceras _HTTP_ para permitir que una página web acceda a recursos en un dominio diferente. El navegador **bloquea** peticiones que vienen de un **origen** no permitido, o que no tiene permisos para acceder a algún recurso alojado en otro dominio.

> **Origen:** protocolo (http/https) + dominio (ejemplo.com) + puerto (:80, :443)

Esta es una restricción predeterminada que obliga a los servidores a especificar qué dominios pueden consumir sus recursos, es una autorización que en muchos casos evita ataques maliciosos, robo de datos, etc. De manera general, cada vez que un **frontend** manda una petición a un **backend**, el navegador revisa si dicho **backend** permite peticiones del _origen_ desde donde se envió, si este _origen_ no está permitido, el navegador bloquea la respuesta.

CORS permite peticiones _HTTP_ de **origen cruzado**. Se considera una **comprobación previa** a la resolución de una petición _HTTP_.

### Cabeceras de respuesta

Las cabeceras de respuesta (ervidor a navegador) son las que configuramos en nuestro backend para autorizar el acceso a ciertos dominios:

* `Access-Control-Allow-Origin` define que dominios pueden acceder al recurso. Puede ser una lista de dominios o simplemente usar el símbolo `*` para dar acceso a cualquier dominio, **lo cual no es recomendado en producción**.
* `Access-Control-Allow-Methods` define los métodos _HTTP_ permitidos (GET, POST, PUT, PATCH, DELETE, etc).
* `Access-Control-Allow-Headers` indica qué cabeceras personalizadas se pueden enviar en la **petición real**.
* `Access-Control-Max-Age` define cuánto tiempo (en segundos) el navegador puede cachear la respuesta del **preflight** sin volver a preguntar. El navegador no vuelve a hacer un **preflight** a el mismo **origen** por `x` segundos.
* `Access-Control-Allowed-Credencials` indica si la petición puede incluir cookies o autenticación _HTTP_.

### Cabeceras de solicitud

Las cabeceras de solicitud (bavegador a servidor) son las que el navegador añade automáticamente en peticiones de origien cruzado:

* `Origin` indica el dominio de donde viene la petición.
* `Access-Control-Request-Method` (usada en **preflight**) avisa al servidor que método se usará en la **petición real**.
* `Access-Control-Request-Headers` (usada en **preflight**) avisa qué cabeceras personalizadas se incluirán.

### Preflight

Como has visto, en algunas ocaciones usamos la frase **petición real** y es porque el navegador hace dos peticiones cuando hacemos un `fetch` o `axios`. He aquí cuando entra el concepto de **preflight**, el cual es una **petición de verificación** previa que el navegador envía automáticamente antes de la **petición real** para asegurarse de que el servidor entiende y permite la operación.

> La **petición de verificación** se asegura de que el servidor permita el _origen_, el tipo de _petición_ y su _contenido_, mientras la **petición real** es lo que escribimos en código (ej: `fetch`).

El proceso se realiza de la sigueinte manera: El navegador envía una petición con el método **OPTIONS**, si el servidor responde con un **código de éxito** (ej: `200`) y las cabeceras `Access-Control-*` **correctas**, el navegador envía la petición real (GET, POST, etc)-

### Tipos de validaciones

Se debe tener en cuenta que hay dos formas en las que el navegador valida **CORS**:

1. **Validación Directa (Peticiones "Simples")**: Esta validación se realiza en operaciones muy básicas, como un `GET` o un `POST`. En esta validación el navegador **no pregunta** antes de enviar la petición (no hace el **preflight**), sino que envía la _petición real_ y luego revisa la _respuesta_, para ver si incluye una cabecera de `Access-Control-Allow-Origin` correcta, de lo contrario el navegador bloquea los datos y no deja que el código del cliente los vea.

2. **Validacipon con Preflight (Peticiones "Complejas")**: Esta hace referencia a la validación especificada anteriormente (_preflight_). El navegdor pide permiso por medio de `OPTIONS` y si el navegador le permite, envía la _petición real_. Esta validación se realiza sobre peticione que incluyen datos `JSON`, `Tokens` (Authorization) o métodos como `PUT` o `DELETE`.

## CORS middleware

Una de las mejores formas de implementar la validación de CORS en nuestro servidor es por medio de un **middleware** (como vimos en el capítulo anterior), y además de esto, uniéndolo con nuestro archivo `.env`. Veamos un ejemplo de esto en código.

Este sería nuestro **middelware** para _CORS_:

```javascript
function corsMiddleware(req, res) {
  // Leemos los orígenes permitidos desde el .env
  const originsEnv = process.env.ALLOWED_ORIGIN
  const allowedOrigins = originsEnv.split(',')

  const origin = req.headers.origin

  // Validamos que el origen está permitido
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  // Métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  // Cabeceras personalizadas permitidas
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  // Tiempo en caché permitido para no hacer preflights al mismo origen (24 horas)
  res.setHeader('Access-Control-Max-Age', '86400')
  // Acepta cookies o auth
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // Manejamos los preflights en caso de que el navegador lo envíe
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return true
  }

  return false
}

module.exports = { corsMiddleware }

```

Ahora veamos como usaríamos nuestro **middelware**:

```javascript
const server = http.createServer((req, res) => {
  const isPreflight = corsMiddleware(req, res)

  if (isPreflight) return // Corta la ejecución

  // Continúa con la lógica
  // Ej: Rutas
})
```

> Este middelware da como respuesta un `true` o un `false`. `true` da a entender que es un **preflight** y quiere decir que ya se respondió al servidor la **petición de verificación**, por lo que ya es el navegador quien decide si envía la **petición real** o no, según lo que acaba de recibir. `false` hace referencia a una **validación directa** la cual debe realizar la **petición real** y al final el navegador analizará la respuesta y decidirá si la bloquea o la deja pasar al cliente.