---
title: Eventos
description: Que son los eventos en el DOM, que los puede generar y como detectarlos.
oreder: 4
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

Veamos el sigueinte ejemplo donde podemos mostrar un mensaje en la ventana cada vez que el usuario da _click_ sobre un botón:

```javascript
const button = document.querySelector('button')

button.addEventListener('click', () => {
  alert('This is a new message')
})
```

En este caso el _detector_ es `click` y el _manejador_ es la `función` que muestra el `alert`.

> Podemos asignar más de un `eventListener` a un mismo elemento.

#### Otros métodos
Podemos asignar manejadores de eventos a los elementos de otras formas, aunque la más recomendada sigue siendo `addEventListener`.

Los **event handler properties** son propiedades que podemos asignar a algunos elementos directamente para que reaccionen a ciertos eventos. Ejemplo de esto son los `button`, a los cuales les podemos asignar ciertas propiedades como `onClick`, es igual a detectar el evento `click` pero sin usar `addEventListener()`:

```javascript
const myFunction = () => {
  alert('This is a new message')
}

button.onclick = myFunction
```

Algo a tener en cuenta es que a diferencia de `addEventListener`, este tipo de propiedades solo se pueden asignar una vez a un elemento, si se hace más de una, no se están añadiendo nuevos eventos, sino reemplazando el que se había asignado previamente.

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