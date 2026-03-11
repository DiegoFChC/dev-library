---
title: Eventos
description: Que son los eventos en el DOM, que los puede generar y como detectarlos.
order: 4
---

## ¿Que es un evento?
Un evento es algo que sucede en el sistema o web que estamos desarrollando, el cual, al ocurrir, nos avisa para que realicemos una u otra acción. Se pueden ver como disparadores que podemos detectar para realizar ciertas acciones. Veamos los siguientes ejemplos:

* El usuario selecciona, hace clic o pasa el ratón por encima de cierto elemento.
* El usuario presiona una tecla del teclado.
* El usuario redimensiona o cierra la ventana del navegador.
* Una página web terminó de cargarse.
* Un formulario fue enviado.
* Un vídeo se reproduce, se pausa o termina.
* Ocurrió un error.

Puedes ver una lista más completa de los eventos en [MDN](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Events).

A cada _evento_ le podemos asociar un **manejador de eventos** (tambien llamado _detector de eventos_), que hace referencia a un bloque de código que se ejecutará cuando _x_ o _y_ evento se lance. A el proceso de asignar un bloque de código a un evento se le llama **registro de manejador de eventos**.

{% callout type="caution" %}
Aunque al **manejador de eventos** usualmente se le llame tambien **detector de eventos**, hablando estrictamente, estos términos hacen referencia a dos procesos distintos. _Los detectores de eventos_ están pendientes a que ocurra un evento, mientras que _el manejador_ es el código que se ejecuta en respuesta del evento.
{% /callout %}

> **Nota:** Los eventos en la web no son parte del núcleo del lenguaje JavaScript, éstos están definidos como parte de las API del navegador.

### Registrando eventos
El mecanismo recomendado para registrar manejadores de eventos es usando el método `addEventListener()`. Podemos suscribir este método a un elemento del DOM, el `document`, una ventana o un `XMLHttpRequest`, para que reaccionen a los eventos. Este recibe varios dos parámetros:

* `eventType`: Cadena de texto que especifica el tipo de evento a detectar.
* `handler`: Función que se llamará al detectar el evento.
  
> Algunos eventos, como `click`, están disponibles prácticamente en cualquier elemento. Mientras que otros son más específicos y solo son útiles en ciertas situaciones.

Veamos el siguiente ejemplo donde podemos mostrar un mensaje en la ventana cada vez que el usuario da _click_ sobre un botón:

```javascript
const button = document.querySelector('button')

button.addEventListener('click', () => {
  alert('This is a new message')
})
```

En este caso el _detector_ es `click` y el _manejador_ es la `función` que muestra el `alert`.

> Podemos asignar más de un `eventListener` a un mismo elemento.

Los manejadores no necesarimente deben estar definidos en el mismo _listener_, podemos definirlos aparte y luego asignarlos a nuestro _listener_. Esto nos abre la puerta al uso de `this`.

```javascript
const btn = document.querySelector('button')
function myFunction (e) {
  console.log(e.currentTarget.tagName) // -> BUTTON
  console.log(this.tagName) // -> BUTTON
}

const otherFunction = (e) => {
  console.log(e.currentTarget.tagName) // -> BUTTON
  console.log(this.tagName) // -> undefined
  console.log(this) // -> Contexto de la función contenedora
}

btn.addEventListener('click', myFunction)
btn.addEventListener('click', otherFunction)
```

{% callout type="caution" %}
El objeto `this` tiene un comportamiento diferente si se usa en una _arrow fucntion_ o en una declaración de `function` normal. Si llamamos `this` desde una función definida con `fuction`, este hará referencia al `currentTarget` o elemento que disparó el evento. Si llamamos `this` desde una función definida con _arrow function_ `() => {}`, ete hará referencia al contexto de la función que contiene a el elemento que disporó el evento (en este caso `window` será el contexto).
{% /callout %}

#### Otros métodos
Podemos asignar manejadores de eventos a los elementos de otras formas, aunque la más recomendada sigue siendo `addEventListener`.

Los **event handler properties** son propiedades que podemos asignar a algunos elementos directamente para que reaccionen a ciertos eventos. Ejemplo de esto son los `button`, a los cuales les podemos asignar ciertas propiedades como `onclick`, es igual a detectar el evento `click` pero sin usar `addEventListener()`:

```javascript
const myFunction = () => {
  alert('This is a new message')
}

button.onclick = myFunction
```

Algo a tener en cuenta es que a diferencia de `addEventListener`, este tipo de propiedades solo se pueden asignar una vez a un elemento, si se hace más de una, no se están añadiendo nuevos eventos, sino reemplazando el que se había asignado previamente.

> Si queremos prevenir el comportamiento por defecto de un elemento, usando _event handler properties_, podemos hacer un `return false` al final de nuestra función (similar a hacer `e.preventDefault()`).

Otra forma de asignar manejadores es por medio de los **manejadores de evento en línea**, los cuales permiten asignar código JavaScript directamente a los elementos html por medio de atributos, vemos el siguiente ejemplo:

```html
<button onclick='myFunction()'>I'm a button</button>

<script>
  const myFunction = () => {
    alert('This is a new message')
  }
</script>
```

{% callout type="danger" %}
No uses los **manejadores de eventos en línea**. Permite insertar código JavaScript directamente en un atributo. _**Nunca deberías utilizar atributos HTML para manejar eventos** — Estos están obsoletos y utilizarlos es mala práctica_ (MDN).
{% /callout %}

### Eliminando eventos
Algo importante a tener en cuenta es que así como podemos asignar **manejadores de eventos** a un elemento, podemos eliminarlos usando el método `removeEventListener()`. Por ejemplo, pordemos quitar el manejador que asignamos al botón en el ejemplo anteriror:

```javascript
button.removeEventListener('click', () => {
  alert('This is a new message')
})

// En caso de que nuestra función esté declarada aparte podemos hacer lo siguiente:
const myFunction = () => {
  alert('This is a new message')
}

button.removeEventListener('click', myFunction)
```

Otra forma de hacerlo es usando un `AbortSignal`, al pasarlo como parámetro de nuestro `addEventListener()`.

> Un **AbortSignal** representa un objeto señal que permite comunicarse con operaciones asincrónicas y abortarlas si se requiere por medio del objeto `AbortController`.

```javascript
const controller = new AbortController()

button.addEventListener('click', myFunction, {
  signal: controller.signal // -> Asignamos el controlador
})

// Eliminamos el manejador a través del controlador
controller.abort()
```

{% callout type="info" %}
Es importante tener en cuenta el remover los manejadores, quizás en proyectos pequeños no sea muy importante, pero cuando estos crecen es necesario hacerlo, para evitar conflictos y mejorar el rendimiento en nuestra aplicación. Además al remover un manejador se nos abre la puerta a asignar mas de un manejador a un mismo elemento sin tener conflictos de funcionalidad.
{% /callout %}

## El objeto event
A menudo los **manejadores de eventos** reciben un parámetro, lo escriben de muchas formas, `event`, `evt` o `e`, sin importar como se escriba, este es un parámetro al que cada **manejador** tiene acceso automáticamente despues de ser asignado a un elemento del DOM. `event` es un objeto que el navegador crea automáticamente cuando ocurre una acción en el DOM, y contiene toda la información contextual de lo que acaba de suceder sobre un elemento del **DOM**.

Entre las propiedades más comunes del objeto `event` tenemos:

* `target`: El elemento **HTML** exacto que disparó el evento. No es necesariamente el elemento que tienen el **manejador**, sino que puede ser uno de sus hijos.
* `currentTarget`: Es el elemento al que se le asignó el **manejador**. Así des click en uno de sus hijos, esta propiedad te permite acceder a el elmento **HTML** principal.
* `preventDefault()`: Método que cancela la acción por defecto del navegador. Ej: Al enviar un formulario podemos evitar que los datos se manden automáticamente a un backend, para hacer validaciones sobre los campos digitados antes de ser enviados.
* `stopPropagation()`: Define la propagación del evento hacia otros elementos del DOM (bubbling). Lo entenderemos mejor en el siguiente tema.
* `clientX` / `clientY`: Indican la posición exacta del ratón en el momento del evento.

> Lee más acerca de esto en [MDN: ¿Que es un evento?](https://developer.mozilla.org/es/docs/Web/API/Event) y en [MDN: Referencia a Eventos](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Events)

### Burbujeo de eventos - Event Bubbling
El burbujeo de eventos o **event bubbling** hace referencia a como el navegador maneja los eventos sobre elementos anidados.

Veamos el siguiente ejemplo:

```html
<body>
  <div>
    <span>
      <button>Click me!!!</button>
    </span>
  </div>
</body>
```

> `button` es hijo de `span`, `span` es hijo de `div`, `div` es hijo de `body` y `body` es hijo de `document`.

Cuando hacemos _click_ sobre el `button` es como si también hicieramos _click_ sobre el `span`, el `div`, `body` y el `document`. Esta es la idea general de **bubbling**, si un evento se dispara en un elemento hijo, este evento se propaga hacia sus ancestros. Claro está que el evento actuará según lo definido en su **manejador**. Añadamos algo de `JavaScript`.

```javascript
const body = document.querySelector('body')
const div = document.querySelector('div')
const span = document.querySelector('span')
const button = document.querySelector('button')

body.addEventListener('click', (e) => {
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
})
div.addEventListener('click', (e) => {
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
})
span.addEventListener('click', (e) => {
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
})
button.addEventListener('click', (e) => {
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
})
```

Las salidas esperadas bajo **bubbling** serían:

```bash
// Acción: Click sobre el body
-> Hiciste click sobre el elemento BODY

// Acción: Click sobre el div
-> Hiciste click sobre el elemento DIV
-> Hiciste click sobre el elemento BODY

// Acción: Click sobre el span
-> Hiciste click sobre el elemento SPAN
-> Hiciste click sobre el elemento DIV
-> Hiciste click sobre el elemento BODY

// Acción: Click sobre el button
-> Hiciste click sobre el elemento BUTTON
-> Hiciste click sobre el elemento SPAN
-> Hiciste click sobre el elemento DIV
-> Hiciste click sobre el elemento BODY
```

Este comportamiento puede ser util en muchas ocasiones, pero en otras puede ser contraproducente. Para cambiar un poco este comportamiento podemos usar `stopPropagation()`.

### stopPropagation() para Bubbling
`stopPropagation()` que vienen en el objeto `event` nos da una solución a el _event bubbling_. Cuando en un **manejador** llamamos al evento `stopPropagation()`, este detienen el efecto _bubbling_, evitando que el evento burbujee hacia los ancestros del elemento emisor. Cambiemos un poco el _JavaScript_ de el ejemplo anterior:

```javascript
const body = document.querySelector('body')
const div = document.querySelector('div')
const span = document.querySelector('span')
const button = document.querySelector('button')

body.addEventListener('click', (e) => {
  e.stopPropagation()
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
})
div.addEventListener('click', (e) => {
  e.stopPropagation()
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
})
span.addEventListener('click', (e) => {
  e.stopPropagation()
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
})
button.addEventListener('click', (e) => {
  e.stopPropagation()
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
})
```

Ahora la salida esperada evitando **bubbling** sería:

```bash
// Acción: Click sobre el body
-> Hiciste click sobre el elemento BODY

// Acción: Click sobre el div
-> Hiciste click sobre el elemento DIV

// Acción: Click sobre el span
-> Hiciste click sobre el elemento SPAN

// Acción: Click sobre el button
-> Hiciste click sobre el elemento BUTTON
```

> Tenemos otro método llamado `stopInmediatePropagation()`, pero este evita que se agregen varios manejadores de eventos a un mismo elemento del DOM.

### Captura de eventos
Una alternativa a la propagación de eventos es la **captura de eventos** o **event capture**. Lo que permite la _captura de eventos_ es invertir el orden en que los eventos se lanzan, con _bubbling_ los eventos son emitidos desde el `target` más anidado, pero con _event capture_ los eventos se emiten desde el `currentTarget`, osea el primer elemento padre, hasta llegar al `target` exacto donde se quería llegar.

Para que esti suceda, al método `addEventListener()` debemos pasar la opción `capture`. Veámoslo en nuestro ejemplo:

```javascript
const body = document.querySelector('body')
const div = document.querySelector('div')
const span = document.querySelector('span')
const button = document.querySelector('button')

body.addEventListener('click', (e) => {
  e.stopPropagation()
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
}, { capture: true })
div.addEventListener('click', (e) => {
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
}, { capture: true })
span.addEventListener('click', (e) => {
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
}, { capture: true })
button.addEventListener('click', (e) => {
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
}, { capture: true })
```

La salida esperada bajo _captura de eventos_ sería:

```bash
// Acción: Click sobre el body
-> Hiciste click sobre el elemento BODY

// Acción: Click sobre el div
-> Hiciste click sobre el elemento BODY
-> Hiciste click sobre el elemento DIV

// Acción: Click sobre el span
-> Hiciste click sobre el elemento BODY
-> Hiciste click sobre el elemento DIV
-> Hiciste click sobre el elemento SPAN

// Acción: Click sobre el button
-> Hiciste click sobre el elemento BODY
-> Hiciste click sobre el elemento DIV
-> Hiciste click sobre el elemento SPAN
-> Hiciste click sobre el elemento BUTTON
```

{% callout %}
En caso de que pongas `{ capture: true }` sólo en algunos de los elementos, la salida debería mostrar en último lugar los elementos que no tienen el `capture`, en orden de _bubbling_.

```javasscript
const body = document.querySelector('body')
const div = document.querySelector('div')
const span = document.querySelector('span')
const button = document.querySelector('button')

body.addEventListener('click', (e) => {
  e.stopPropagation()
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
}, { capture: true })
div.addEventListener('click', (e) => {
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
})
span.addEventListener('click', (e) => {
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
})
button.addEventListener('click', (e) => {
  console.log(`Hiciste click sobre el elemento ${e.currentTarget.tagName}`)
}, { capture: true })

// Acción: Click sobre el button
// -> Hiciste click sobre el elemento BODY
// -> Hiciste click sobre el elemento BUTTON
// -> Hiciste click sobre el elemento SPAN
// -> Hiciste click sobre el elemento DIV
```
{% /callout %}

### Delegación de eventos
La _delegación de eventos_ hace referencia a una técnica donde se aprovecha el comportamiento de _bubbling_. Imaginemos que tenemos 100 elementos dentro otro elemento HTML, si quisiéramos  añadir un **manejador** individual a cada elemento hijo, podríamos usar un `for` recorriendo los hijos y asignando los _manejadores_, pero el **_bubbling_** nos permite simplemente añadir el _manejador_ al elemento contenedor y que sus hijos _burbujeen_ hacia él y luego dicho elemento contenedor determine el comportamiento de sus hijos (o el hijo al que se le dió click).

> Si doy click al `hijo 43`, como dicho elemento está dentro de un `contenedor`, el _bubbling_ permitirá que primero se detecte el `hijo 43` y luego el `contenedor`. Ya estando en el contenedor, este puede acceder al `target` y ejecutar el código que desee. Mira el ejemplo en [MDN: Delegación de eventos](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/Events#delegaci%C3%B3n_de_eventos)

## Eventos comunes
A continuación vemos algunos eventos comunes:

### Mouse

* `click`: Se dispara al dar click sobre un elemento.
* `dblclick`: Se dispara al dar sobre click sobre un elemento.
* `mouseover` / `mouseout`: Se disparan al cuando el puntero del mouse entra (pasa por encima) al elemento, o cuando sale del elemento.
* `focus` / `blur`: Se disparan cuando el elemento que tiene este evento es enfocado (focus), o cuando pierde su foco (blur).
* `mousemove`: Se dispara cuando el ratón se mueve sobre el elemento.

### Teclado (Keyboard Events)
* `keydown`: Al presionar una tecla.
* `keyup`: Al soltar una tecla.
* `keypress`: Al presionar una tecla que produce un carácter.

### Formularios
* `submit`: Al enviar un formulario.
* `change`: Cuando el valor de un elemento cambia (como un `<select>`).
* `focus` / `blur`: Cuando un elemento gana o pierde el foco.

### Ventana (Window/Document Events)
* `load`: Cuando la página y todos sus recursos (imágenes, CSS) terminan de cargar.
* `resize`: Al cambiar el tamaño de la ventana del navegador.
* `scroll`: Al desplazarse por la página.