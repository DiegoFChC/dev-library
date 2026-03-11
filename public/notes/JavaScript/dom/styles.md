---
title: CSSOM
description: Modificando el CSS Object Model con JavaScript
order: 6
---

## CSS Object Model
El _CSS Object Model_ es un conjunto de APIs que permite manipular CSS desde _JavaScript_. Así como el DOM es una **API** para **HTML**, **CCSOM** (CSS Object Model) son un conjunto de **APIs** para **CSS**. Estas _APIs_ permite leer y modificar estilos _CSS_ de forma dinámica.

Estas _APIs_ permiten transformar las reglas CSS en algo que el navegador pueda entender, lo podemos ver con un ejemplo en lla siguiente imagen:

![CSSOM en forma de árbol](https://filisantillan.com/content/images/2020/10/CSSOM-Post-02-2.png)

> Imagen tomada de [CSSOM](https://filisantillan.com/bits/cssom/)

**CSSOM** es el complemento de el **DOM**. Ambos permiten el **renderizado** de nuestra web. El _DOM_ le permite al navegador saber como estructurar nuestra web, y _CSSOM_ le permite saber como se va a ver dicha estructura.

> Puedes ver más a detaller en la web [MDN - CSS Object Model](https://developer.mozilla.org/es/docs/Web/API/CSS_Object_Model)

### Objeto style
El _CSSOM_ nos permite acceder a un objeto especial en cada uno de los elementos _HTML_, el cual nos permite leer y sobreescribir los **estilos en línea** de los mismos mediante _JavaScript_. Se debe tener en cuenta que este objeto tiene sus propiedades en _camelCase_ (`background-color` pasa a ser `backgroundColor`).

{% callout type="caution" %}
El objeto `style` sólo conoce los _estilos en línea_, osea aquellos que definimos directamente en el elemento _HTML_.

Si definimos estilos en un archivo `.css` aparte, el objeto `style` nos dará esas propiedades como **cadenas vacías**.

Si queremos acceder al estilo real que el navegador está aplicando actualmente debemos usar la función `window.getComputedStyle(element)`.
{% /callout %}

```javascript
const btn = document.getElementById('myBtn')

document.documentElement.style.setProperty('--color', 'red')

btn.style.color = 'var(--color)'
btn.style.fontSize = '2rem'
btn.style.backgroundColor = '#FFFFFF'
```

En este objeto tenemos otros métodos útiles:

* `removeProperty()` permite quitar una propiedad css. Este método recibe como parámetro la propiedad _CSS_ tal cual como se escribe en _CSS_.

> Si quieres borrar todos los estilos en línea de un elemento, puedes usar `element.setAttribute('style', '')`.

* `setProperty()` permite cambiar un estilo css, introduciendo como parámetros el _nombre_ de la propiedad y el _nuevo valor_ de la propiedad.
* `getPropertyValue()` permite acceder a el valor actual de una propiedad. Recibe como parámetro el _nombre_ de la propiedad.
* `getPropertyPriority()` nos permite saber si una propiedad tiene un valor `important`.

```javascript
const btn = document.getElementById('myBtn')

btn.style.setProperty('color', 'red')
btn.style.getPropertyValue('font-family') // ej: sans-serif
btn.style.getPropertyPriority('font-size') // ej: important o vacío
```

### Computed styles
CSSOM nos provee de un método llamado `getComputedStyle()` el cual nos permite ver todos los estilos de un _elemento HTML_ que se muestran en nuestro navegador.

Puedo pasar como parámetro a este método el elemento _HTML_ y acceder a sus estilos. Además este método recibe un segundo elemento para acceder a **pseudo-elementos**, y ver sus estilos en particular.

```javascript
const btn = document.getElementById('myBtn')

const styles = getComputedStyle(btn)
console.log(styles.color) // -> ej: red

const pseudoElementStyles = getComputedStyle(btn, '::after')
console.log(pseudoElementStyles.display) // -> flex
console.log(pseudoElementStyles.getPropertyValue('display')) // -> flex
```