---
title: Recorriendo el DOM
description: Como recorrer el DOM con JS
order: 2
---

## Traversing
Traversing se refiere a la acción de recorrer el DOM. Esto lo podemos hacer por medio del objeto global `document`.

``` javascript
document // Objeto global
document.body // Referencia al body del HTML
```

Esta herramienta nos permite acceder a los difernetes nodos, al igual que cambiar sus características e añadir interactividad.

Cabe destacar que los únicos nodos superiores a los que se puede acceder directamente desde el document son: `body`, `head`, `DOCTYPE` y `HTML`.

## Tipos de nodos
El DOM nos da acceso a diferentes tipos de nodos:

* __Nodos de tipo elemento:__ Representan cualquier etiqueta de HTML.
* __Nodos de tipo texto:__ Representan los textos.
* __Nodos de tipo atributo:__ Representan los atributos de las etiquetas.
* __Nodos de tipo comentario:__ Representan los comentarios del HTML.
* __Nodo raíz:__ Representa el objeto `document`.

## Acceso a los hijos de los nodos

Para acceder a los hijos de un nodo puedo usar `childNodes`, el cual me retorna una *lista de nodos*. Este atributo me da **todos** los nodos hijo de un elemento, incluyendo texto, comentario, espacios (tomados como texto), etc.

Para acceder sólo a los nodos de tipo elementos (etiquetasa html) podemos usar el atributo `children`. Se debe tener en cuanta que `children` me retorna no una lista de nodos sino una *colleción HTML* ya que solo tiene elementos HTML.

Veamos la diferencia con el siguiente ejemplo:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOM</title>
  </head>
  <body>

    <!-- Hey! This is a comment -->

    <div class="container">
      <button>Click 1</button>
      <button>Click 2</button>
      <button>Click 3</button>
    </div>

    <script src='script.js'></script>
  </body>
</html>
```

```javascript
// script.js
const body = document.body

console.log(body.childNodes) // -> NodeList(11) [text, comment, text, div.container, text, script, text, comment, text, script, text]

console.log(body.children) // -> HTMLCollection(3) [div.container, script, script]
```

Tenemos otros atributos para acceder a los hijos de un nodo:

* `childNodes` Nodos hijos
* `children` Elementos hijos
* `firstChild` Primer nodo de un padre (cualquier tipo de nodo).
* `firstElementChild` Primer nodo _tipo Elemento_ de un padre.
* `lastChild` Último nodo de un padre (cualquier tipo de nodo)
* `lastElementChild` Último nodo _tipo Elemento_ de un padre.
* `hasChildNodes` _true_ si el contenedor tiene nodos hijos

**Nota:** Se debe tener en cuenta que javascript solo tendrá en cuenta los nodos que están por encima de la etiqueta script en nuestro html

> Los espacios son nodos de tipo texto

Nodos y elementos hermanos
* `nextSibling` Siguiente nodo hermano del nodo actual
* `nextElementSibling` Siguiente elemento hermano del nodo actual
* `previousSibling` Nodo
* `previousElementSibling` Elemento

Padres o ancentros
* `parentNode` Padre del nodo actual, retorna un nodo
* `parentElement` Padre del nodo actual, retorna un elemento

Selectores
* `getElementById` Retorna un nodo de tipo elemento en base a su id
* `getElementsByClassName` Retorna los nodos de tipo elemento que coincidan con el nombre de clase dado
* `getElementsByTagName` Retorna todos los nodos de tipo elemento que coinciden con el nombre de etiqueta especificado.
* `getElementsByName` Retorna los elementos que contengan en su elemento name el texto especifiado. **Nota:** Este solo se puede usar sobre el nodo *document*
* `querySelector` Permite integrar selectores de css para buscar elementos en el DOM. Retorna el primer elemento que encuentre.
* `querySelectorAll` Permite integrar selectores de css para buscar un conjunto de elementos en el DOM.

### NodeList vs HTMLCollection
* **NodeList:** Contiene cualquier tipo de nodo.
  * Se puede recorrer con forEach.
  * No se actualiza al cambiar el DOM.
  * Para recorrerlo puedo convertirlo en array: `Array.from(data)`
* **HTMLCollection:** Contiene nodos de tipo elemento.
  * No se puede recorrer con forEach. Se actualiza al cambiar el DOM.
  * Puedo acceder a los elementos por su posción usando el atributo `.item(n)`.

**Nota:** `childNodes es una excepción, ya que si se actualiza al cambiar el DOM.`

> `console.dir` nos permite ver todas las propiedades de un objeto.

