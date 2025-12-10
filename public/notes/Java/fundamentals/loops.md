---
title: Ciclos
description: Ciclos, bucles o loops en Java.
order: 7
---

## Estructura for
Es útil cuando sabes cuántas veces necesitas repetir el código. Tiene tres partes en su declaración: expresión inicial, condición y expresión de actualización.

- Una **expresión inicial** que se ejecuta una sola vez, antes de la primer iteración;
- Una **condición** que debe cumplirse para ejecutar el bloque de código;
- Una **expresión de actualización** que se ejecuta al final de cada iteración;

Por lo tanto, el bucle va a iterar sobre el bloque de código tantas veces como se cumpla la condición, y teniendo disponible dentro de su contexto los valores de las expresiones inicial y final.

```java
for (initialExp; condition; finalExp){
  // code
};
```

```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Número: " + i);
};
```

## Estructura for-each
Se utiliza para iterar sobre los elementos de un array o una colección de manera más concisa y legible que el bucle for estándar. Facilita la iteración sobre colecciones (como arrays o ArrayList) sin usar índices.

```java
for (type item : array) {
  // code
};
```

```java
String[] frutas = {"Manzana", "Banana", "Cereza"};

for (String fruta : frutas) {
    System.out.println("Fruta: " + fruta);
}
```

## Estructura while
Se ejecuta **mientras una condición específica sea verdadera**. La condición se evalúa antes de cada iteración, por lo que si la condición es falsa desde el principio, el cuerpo del bucle no se ejecutará nunca.

```java
while (condition) {
  // code
};
```

```java
int contador = 1;
while (contador <= 5) {
    System.out.println("Contador: " + contador);
    contador++; // Importante actualizar la variable para evitar bucles infinitos
}
```

## Estructura do-while
Similar al `while`, pero **la condición se evalúa después de cada iteración**. Esto garantiza que el bloque de código se ejecute **al menos una vez**, incluso si la condición es falsa desde el principio.

```java
do {
  // code
} while (condition);
```

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
int numero;

do {
    System.out.println("Introduce un número positivo: ");
    numero = scanner.nextInt();
} while (numero <= 0); // El bucle continúa mientras el número no sea positivo
```