---
title: Manejo de clases en el DOM
description: Manejo de clases en el DOM usando JavaScript
order: 5
---

## Clases
Las clases en _HTML_ y _CSS_ son atributos que nos permiten agrupar elementos para posteriormente aplicarles estilos comunes más facilmente. Permiten identificar, estilizar o manipular múltiples elementos con las mismas carácterísticas.

Entre los métodos más importantes que nos proveen los _elementos HTML_ podemos encontrar:

* `className` permite acceder a las clases de un elemento _HTML_. Tambien puede ser usado para reemplazar todas las clases
* `classList` permite acceder a una colección con cada clase del elemento _HTML_. Sólo lectura.
  * `item` permite acceder a una clase específica de un elemento _HTML_ por medio de su index.
  * `add` permite agregar una nueva clase al elemento _HTML_ sin modificar las que ya tenía.
  * `remove` permite quitar una clase al elemento _HTML_. Se puede quitar más de una clase a la vez.
  * `toggle` permite alternar una clase entre `add` y `remove`. 
  * `contains` permite saber si un elemento _HTML_ contiene o no una clase específica. Retorna `true` o `false`
  * `replace` permite cambiar una clase existente por una nueva. Recibe dos parámetros, el primero hace referencia a la clase a reemplazar, el segundo corresponde a la nueva clase.

```javascript
const btn = document.querySelector('button')

btn.classList.item(2)
btn.classList.add('show')
btn.classList.remove('show', 'otherClass')
btn.classList.toggle('show')
btn.classList.contains('show')
btn.classList.replace('show', 'newShow')
```