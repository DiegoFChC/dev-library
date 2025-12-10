---
title: Condicionales
description: Estructuras condicionales en Java.
order: 6
---

## Estructura if
* `if`: Ejecuta un bloque de código solo si la condición dentro del paréntesis es verdadera (true).

```java
if (condition) {
  // code
};
```

* `if-else`: Si la condición es verdadera, se ejecuta el bloque if; si es falsa (false), se ejecuta el bloque else.

```java
if (condition) {
  // code
} else {
  // code
};
```

* `if-else` `if-else`: Permite evaluar múltiples condiciones de forma secuencial. Una vez que una condición se cumple, se ejecuta su bloque y el resto de las condiciones anidadas se ignoran.

```java
if (condition) {
  // code
} else if (condition) {
  // code
} else {
  // code
};
```

## Estructura switch
Permite evaluar una variable o valor para múltiples casos, evitando usar muchos `if-else`. Mejora la legibilidad.

```java
switch (variable) {
  case variableValue:
    // code
    break;
  case otherVariableValue:
    // code
    break;
  default:
    // Default result
    // Code
};
```

Podemos usar la misma sintaxis para asignar un avlor a una variable:

```java
int weekDay = 3;
String dayName = switch (weekDay) {
  case 1 -> 'Monday';
  case 2 -> 'Tuestday';
  case 3 -> 'Wednesday';
  default -> 'Invalid day'
};
// Wednesday
```

## Codicional ternario
Permite hacer un `if-else` de forma corta.

```java
// condition ? result1 : result 2;
String result = (random < 10) ? "Result 1" : "Result 2";
```

## Operadores lógicos
Entre los principales operadores lógicos tenemos:

| Operador      | Descripción            |
| ------------- | ---------------------- |
| `==`          | Es igual               |
| `!=`          | Es distinto            |
| `<`           | Menor                  |
| `<=`          | Menor o igual          |
| `>`           | Mayor                  |
| `>=`          | Mayor o igual          |
| `%%`          | Operador lógico and    |
| `||`          | Operador lógico or     |
| `!`           | Operador lógico not    |

> En general son usadas en los bloques condicionales.