---
title: Otro
description: Valores, tipos y operadores comunmente usados en JavaScript.
order: 10
---

## Variables

### const

- Ámbito de bloque
- No permite la reasignación (cambiar de valor)
- No permite ser declarada sin ser inicializada, ej: `const a; // error`
- Si utilizo una variable **const** y luego la creo, sale **error**

### var

- Ámbito global
- Permite la reasignación (cambiar de valor)
- Permite ser delarada sin ser inicializada, ej: `var a; // undefined`
- Si utilizo una variable y luego la creo, con **var** inicia **undefined**
- Puedo re-declarar la variable
    
```javascript
  var a;
  var a;
```
    

### let

- Ámbito de bloque
- Permite la reasignación (cambiar de valor)
- Permite ser delarada sin ser inicializada, ej: `var a; // undefined`
- Si utilizo una variable **let** y luego la creo, sale **error**
- No puedo re-declarar la variable
    
```javascript
  let a;
  let a; // error
```
    

## Scope

Ámbito, contexto o alcance de las variables

## Hoisting

Nos habla de como funcionan las fases de creación y ejecución de variables. Se colocan las funciones y variables al inicio del programa. 

## Control de flujo

El **control de flujo** (*Control flow*) es, en ciertos lenguajes de programación como en JavaScript, el orden en que son ejecutadas las instrucciones en el código.

El código JavaScript se ejecuta, a grandes rasgos, en un orden líneal, desde la primera línea de código hasta la última. Sin embargo, este orden se altera cuando el intérprete (el navegador) encuentra un bloque de código que cambia el flujo.

A los bloques de código que tienen la capacidad de alterar el flujo de ejecución de nuestro código JavaScript se les conoce como **estructuras de control**.

## Control structures

### Block statement

La **sentencia de bloque** es una estructuras sencilla, que se utiliza simplemente para agrupar declaraciones, y no modifica el flujo de ejecución.

```javascript
{
  ...;
	...;
}
```

### Conditional statement

La **sentencia condicional** se utilizan para ejecutar un bloque de código únicamente si se cumple cierta condición.

```javascript
if (condition) {
	...;
} else if (condition) {
	...;
} else {
	...
}

condición ? expr1 : expr2
// condición -> Una expresion que se evalúa como true o false
// expr1, expr2 -> Expresión con valores de algún tipo.
```

## Iterations statement

Las **sentencias de iteración**, también llamadas *bucles* o *loops*, se utilizan para ejecutar un bloque de código de forma reiterativa, y basada en alguna condición.

### while

La **sentencia while** itera sobre un bloque de código continuamente mientras la condición indicada sea verdadera.

```javascript
while (condition) {
	...;
}
```

### do … while

La **sentencia do…while** funciona igual que **while**, pero con la diferencia de que el bloque de código se ejecuta al menos una vez, independientemente del valor de la condición.

```javascript
do {
 ...;
} while (condition);
```

### for

La **sentencia for** recibe tres argumentos que determinan la forma de iteración del bloque de código.

- Una **expresión inicial** que se ejecuta una sola vez, antes de la primer iteración;
- Una **condición** que debe cumplirse para ejecutar el bloque de código;
- Una **expresión final** que se ejecuta al final de cada iteración;

Por lo tanto, el bucle va a iterar sobre el bloque de código tantas veces como se cumpla la condición, y teniendo disponible dentro de su contexto los valores de las expresiones inicial y final.

```javascript
for (expresionInicial; condition; expresionFinal) {
	...;
}
```

### for … in

La **sentencia for…in** itera sobre los elementos de un objeto en un orden arbitrario, ejecutando el bloque de código una vez por cada uno.

El valor a la izquierda de `in` representa el nombre de la propiedad del objeto correspondiente a la iteración en curso.

```javascript
var automovil = {
  marca: "Audi",
  modelo: "A1",
  año: 2020
}

for (var dato in automovil) {
  console.log(dato + " es " + automovil[dato]);
}
```

### for … of

When a **for** loop looks like this, with the word **of** after a variable definition, it will loop over the elements of the value given after of. This works not only for arrays but also for strings and some other data structures.

```javascript
for (let entry of JOURNAL) {
	console.log(`${entry.events.length} events.`);
}
```

### Sentencia switch

La **sentencia switch** evalúa una expresión, comparando su valor con otro valor llamado `case`. Cuando los valores coinciden, se ejecuta el código comprendido desde el `case` hasta el final del bloque `switch`, o hasta encontrar una sentencia `break`.

Si ninguno de los `case` coincide con la expresión evaluada, se buscará una sentencia `default`, y si esta presente, se ejecutará el código que le sigue.

```javascript
switch (condition) {
	case a:
		...;
		break;
	case b:
		...;
		break;
	...;
	default:
		...;
}
```

### Sentencia break

La **sentencia break** interrumpe abruptamente la ejecución de un **bloque**, **sentencia de iteración** o **sentencia switch**.

`break;`

### Sentencia continue

La **sentencia continue** interrumpe la iteración en curso, y hace que se *continúe* con la siguiente.

`continue;`