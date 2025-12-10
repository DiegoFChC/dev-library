---
title: Path
description: Módulo path
order: 4
---

## Módulo path

El módulo `path` permite trabajar con rutas de archivos y directorios de manera independiente del sistema operativo. Nos permite conocer sus direcciones y demas.

Node es multiplataforma, path nos permite ejecutar ciertos comandos dependiendo del sistema en que estemos. Path nos permite generalizar la forma en que nos dirigimos a un archivo o directorio, este módulo se encarga de traducir las rutas a los diferentes sistemas.

{% callout type="danger" %}
En node no debes pasar rutas escritas completamente, ya que cada sistema operativo puede tener diferentes formas de separar los argumentos.
{% /callout %}

```javascript
const path = require('path')

console.log(path.sep) // Separador
console.log(path.join('/public', 'dist', '/styles', 'main.css')) // Une rutas de directorios o carpetas, y lo adapta al sistema operativo

const filePath = path.join('/public', 'dist', '/styles', 'main.css')
console.log(path.basename(filePath)) // Extrae una url y devuelve la base -> main.css
console.log(path.dirname(filePath)) // Ruta de los directorios sin la base o archivo final -> \public\dist\styles
console.log(path.parse(filePath)) // Da la misma información de la ruta en forma de objeto
/*
{
  root: '\\',
  dir: '\\public\\dist\\styles',
  base: 'main.css',
  ext: '.css',
  name: 'main'
}
*/

console.log(path.resolve('dist')) // Alternativa a join, intenta buscar la ruta al darle solo una parte
```

### Algunas funcionalidades
Algunos de los métodos que nos provee el módulo **path** son:

* **sep**: Permite saber que separador se usa en el sistema operativo actual.
* **join**: Une rutas con los separadores de cada sistema operativo.
* **basename**: Devuelve el nombre del fichero o archivo de la url con su extensión.
  * `path`: url de donde saca el fichero.
  * `extensión`: quita la extensión del fichero.
* **extname**: Da la extensión de un fichero.