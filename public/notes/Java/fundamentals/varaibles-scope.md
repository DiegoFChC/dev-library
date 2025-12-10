---
title: Variables y scope
description: Variables en Java
order: 2
---

## Variables
Nos permiten guardar **tipos de datos** en memoria.

### Variables primitivas
La forma general de definir tipos de datos es: `tipo nombreVariable = valor;`. Podemos ver los siguientes ejemplos:

```java
int edad = 25;
double precio = 19.99;
char letra = 'A';
boolean activo = true;
byte nivel = 5;
short cantidad = 32000;
long distancia = 9876543210L; // L al final
float temperatura = 23.5f;    // f al final
```

### Variables por referencia

La forma general de definir estos tipos de datos es: `TipoReferencia nombreVariable = new TipoReferencia(parámetros);`

* String
```java
String nombre = "Diego";
String texto = new String("Diego");
```
* Arrays
```java
int[] numeros = {1, 2, 3};
int[] numeros = new int[5];
String[] nombres = {"Ana", "Luis"};
```
* Classes
```java
Persona p = new Persona();
```
* Interfaces
```java
Runnable r = () -> System.out.println("Hola");
```
* Enums
```java
enum Dia { LUNES, MARTES, MIERCOLES }
```

> Las **variables locales** (dentro de métodos) deben ser _declaradas_ e _inicializadas_ antes de usarlas, y no tienen un valor por defecto en caso de que no se les asigne valor al declararlas.
> Los **atributos de clase, atributos estáticos y elementos de arrays** se pueden declarar vacías pero tendrán un valor por defecto si no se les indica.

En las siguientes secciones ampliaremos el uso de estos tipso de variables.

## Scope
El **scope** hace referencia al ámbito donde viven nuestras variables, donde pueden ser accedidas. En java podemos encontrar los siguientes tipos de scope:

* **Scope de bloque `{ }`:** Una varible declarada dentro de `{ }` sólo existe dentro de ese bloque.
* **Scope de método:** Una variable declarada dentro de un método sólo esciste dentro de ese método.
* **Scope de clase**: Una variable de instancia en una clase es accesible por cualquier método dentro de la clase.
* **Scope de parámetro:** Los parámetros de un método sólo existen dentro del método.

### Tener en cuenta

* No puedes declarar dos variables con el mismo nombre en el mismo scope.
* Se pueden reutilizar nombres en scopes diferentes.
* Las variables locales no tienen valores por defecto.
* El scope define el tiempo de vida de una varible.

{% callout type="caution" %}
**Tiempo de vida de una variable**
* **Variables locales:** Viven sólo durante la ejecución del método.
* **Variables de clase:** Viven mientras el objeto exista.
* **Variables estáticas:** Vivien mientras la aplicación esté corriendo.
{% /callout %}

## Casting
El **casting** es el proceso de cambiar el tipo de dato de una varible a otro. A menudo es necesario cuando hacemos operaciones entre variables de diferentes tipos o cuando necesitamos asignar un tipo a una varibale de un tipo diferente.

### Casting implicito (Widening)
Casting automático. Sucede cuando **convertimos de un tipo más pequeño a uno más grande** sin riesgo de perder información:

```java
byte a = 10;
int b = a;      // implícito

int x = 100;
double y = x;   // implícito

float z = 15.3F;
double d = z;   // implícito
```

### Casting implicito (narrowing)
Casting manual. Cuando **convertimos un tipo más grande a uno más pequeño**.

```java
int x = 130;
byte b = (byte) x;  // explícito

double d = 9.8;
int i = (int) d;    // explícito -> pierde decimales
// ```