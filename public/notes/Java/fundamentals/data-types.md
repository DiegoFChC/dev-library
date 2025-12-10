---
title: Tipos de datos
description: Tipos de datos en Java
order: 1
---

## Primitivos
Son valores básicos, no son objetos. Tiene un tamaño y rango definidos, y se almacenan directamente en memoria.

* **Enteros:** Se recomienda usar estos tipos dependiendo de lo que contendrán, para no ocupar espacio innecesariamente.

| Tipo    | Tamaño  | Rango                                                |
| ------- | ------- | ---------------------------------------------------- |
| `byte`  | 1 byte  | -128 a 127                                           |
| `short` | 2 bytes | -32,768 a 32,767                                     |
| `int`   | 4 bytes | -2,147,483,648 a 2,147,483,647                       |
| `long`  | 8 bytes | Muy grande (≈ ±9.22e18) — se indica con `L` al final |

* Decimales (punto flotante)

| Tipo     | Tamaño  | Precisión                                       |
| -------- | ------- | ----------------------------------------------- |
| `float`  | 4 bytes | Precisión sencilla — se indica con `f` al final |
| `double` | 8 bytes | Precisión doble (más recomendado)               |

* Carácter

| Tipo   | Tamaño  | Descripción                                  |
| ------ | ------- | -------------------------------------------- |
| `char` | 2 bytes | Un único carácter Unicode (ej: `'A'`, `'#'`) |

* Booleanos

| Tipo      | Valor            |
| --------- | ---------------- |
| `boolean` | `true` o `false` |

## Por referencia
Son tipos que apuntan a objetos en memoria.

* **String:** Permite crear texto en las aplicaciones
```java
String text = new String('Diego');
String nombre = "Diego";
```
* Arrays
```java
int[] numeros = {1, 2, 3};
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