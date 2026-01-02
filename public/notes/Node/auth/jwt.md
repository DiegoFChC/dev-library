---
title: JWT
description: JSON Web Token
order: 1
---

## JWT - JSON Web Tokens
Estándar abierto que define un formato compacto y autocontenido para la transferencia segura de información entre partes como un objeto JSON. JSON encriptado.

En general se usa par autenticación y autorización en aplicaciones web y servicios API.

{% callout %}
* **Autenticación:** Confirma quien eres. Verifica identidad.
* **Autorización:** Que permisos tienes, a que recursos puedes acceder.
{% /callout %}

## Partes de un JWT
De forma general un JWT tiene la siguiente forma:

```javascript
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
```

> Estaremos usando este ejemplo para las siguientes explicaciones.

### Header
Contiene el tipo de token a utilizar y el algoritmo de firma a usar.

```javascript
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload
(Carga útil) Contiene la información que se quiere transmitir, como claims (Ej: caso datos del usuario). Los claims están codificados en JSON.

> **Claim:** propiedades de la entidad.

```javascript
// eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0

{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
```

Tipos de **claims:**

* **Registrados:** Claims predefinidos.
  * sub -> subject (ej: id del usuario)
  * exp -> expiration time (Tiempo en que expira el token)
  * Entre otros
* **Públicos:** Los denifinos como querramos.
* **Privados:** Claims personalizados que contienen información propia de nuestra aplicación.
  * name
  * admin

### Signature (firma)
Se crea mediante la combinación del `header` + `Payload` (codificada en base64) + `clave secreta`. Se usa para verificar que el token no ha sido alterado durante su transferencia (cliente-servidor).

```javascript
// KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
a-string-secret-at-least-256-bits-long
```

> La clave secreta es un **secreto único** que sirve para **firmar** el token.

Lo podemos ver asi:

```javascript
HMACSHA256(
  base64UrlEncode(header) + '.' +
  base64UrlEncode(payload),
  secretKey
)
```

## Ventajas
Entre las principales ventajas de usar JWT tenemos:

* Permite **Autenticación sin estado**, no usa sesiones o cookies. La información de autenticación se incluye en el token.
* Compatible con variedad de lenguajes de programación y plataformas.
* Al estar firmado digitalmente, garantiza que la información no ha sido alterada en el camino.

> Que un JWT (JSON Web Token) esté firmado digitalmente significa que su contenido está protegido criptográficamente para garantizar autenticidad e integridad sin necesidad de consultar una base de datos para cada petición.

## Ciclo de vida de un JWT

* **Creación:** Se crea un JWT (Ej: inicio de sesion)
* **Firma:** Luego de creado, se firma usando un algoritmo de firma y clave secreta. Aqui se crea el `signature`.
* **Transmisión**: Se envía al cliente (ej: frontend, otro backend). El cliente lo almacena y reenvía par asolicitudes.
* **Validación:** Cuando el servidor recibe un JWT, se valida el token: valida firma y expiración.
* **Claims**: (Datos del usuario) El servidor usa la información que viene en el payload.
* **Actualización:** En algunos casos se hace (ej: nuevo inicio de sesion, el token actual expira.)
* **Expiración:** El token ha expirado. El token ya no es válido y se debe solicitar uno nuevo.