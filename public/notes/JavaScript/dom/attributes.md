---
title: Atributos
description: Gestión de atributos en nodos del DOM
order: 3
---

## Atributos
Hace referencia a valorea adicionales que definimos directamente en las etiquetas HTML. EN general se usan para definir comportamientos o la apariencia inicial de una etiqueta. Por lo general son cadenas de texto.

`JavaScript` nos dota de ciertas herramientas para interactuar con los atributos de un elemento:

* `hasAttribute(name)` verifica si el atributo `name` existe. Retorna `true` o `false`.
* `getAttribute(name)` obtiene el valor del atributo `name` como una cadena. Si no existe retorna `null`.
* `setAttribute(name, newValue)` establece o actualiza el valor de un atributo.
* `removeAttribute(name)` elimina el atributo por completo del elemento.

> `node.attributes` retorna una lista con los atributos disponibles para el nodo.

### Atributos globales
Los atributos globales son aquellos que se pueden aplicar a casi todos los `elemetos HTML` para controlar su comportamiento general o estilo, entro ellos tenemos:

* `id`: Asigna un identificador único al elemento en todo el `document`.
* `class`: Asigna una o más clases al elemento,
* `style`: Permite aplicar reglas de `CSS` directamente (estilos en línea) sobre un elemento.
* `title`: Define un texto informativo (tooltip) que aparece cuando el usuario para el mouse sibre un elemento.
* `lang`: Indica el idioma del contenido del elemento (ej: lang='es')
* `data-`: Atributos personalizados. Puedes encontrar más acerca de ellos al final de esta sección.

### Atributos específicos
Los atributos específicos son aquellos que funcionan en etiquetas particulares para habilitar su funcionalidad principal. Algunas de ellas son:

| Atributo        | Etiqueta(s)                     | Descripción                  |
|-----------------|---------------------------------|------------------------------|
|`href`           |`<a>`, `<link>`                  | Indica el destino del enlace o la ubicación del recurso. |
|`src`	          |`<img>`, `<script>`, `<iframe>`  |	Especifica la ruta del archivo (imagen, script o video). |
|`alt`	          |`<img>`	                        | Texto alternativo que se muestra si la imagen no carga o para lectores de pantalla (accesibilidad). |
|`placeholder`	  |`<input>`, `<textarea>`	        | Muestra un texto de ayuda temporal dentro de un campo de texto. |
|`type`	          |`<input>`, `<button>`	          | Define la naturaleza del elemento (ej. text, password, submit). |
|`name`	          |`<input>`, `<meta>`	            | Asigna un nombre al dato que será enviado en un formulario. |
|`value`	        |`<input>`, `<option>`	          | Establece el valor predeterminado o actual del elemento. |
|`required`	      |`<input>`, `<select>`	          | Indica que el campo debe completarse antes de enviar un formulario. |

> Puede encontrar la lista completa en [MDN](https://developer.mozilla.org/es/docs/Web/HTML/Reference/Attributes).

### Atributos de accesibilidad (ARIA)
Estos atributos permiten incrementar la accebilidad de nuestra web para personas con discapacidad. Para esto en podemos usar:

* `aria-` permite describir estados que el `HTML` nativo no cubre (ej: aria-expanded='true' indica que un menú está abierto.)
* `role` define que **es** el elemento (ej: role='button' en un `<div>` que actúa como botón)

## Atributos personalizados
`HTML` nos permite agregar datos propios en las etiquetas html, para esto se usan los atributos que inician con `data-`. Estos datos serán guardados en el `dataset` de cada elemento y podremos acceder desde **JavaScript** a estos etributos. **Nota:** los nombres dentro del `dataset` se convierten a formato _camelCase_. Veamos el siguiente ejemplo:

```html
<div id='user' data-user-id='123'></div>
```

```javascript
const user = document.getElementById('user')

console.log(user.dataset.userId) // -> 123
```

> Podemos seguir accediendo a este tipo de atributos con `getAttribute(name)`