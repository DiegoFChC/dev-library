---
title: Number
description: Descriptión general del tipo Number en JavaScript
order: 2
---

## Tipo Number

El tipo **Number** es usado para representar valores núméricos, ya sean enteros o decimales.

```bash
13 → Integer
9.81 → Fractional number
2.998e8 → Scientific notation # This is 2.998x10^8 = 299.800.000
```

Este tipo permite realizar operaciones aritmeticas sobre él, tales como:

* **( + )** Suma

```javascript
7 + 3 // -> 10
```

* **( - )** Resta

```javascript
15 - 7 // -> 8
```

* **( * )** Multiplicación

```javascript
7 * 3 // -> 21
```

* **( / )** División

```javascript
20 / 5 // -> 4
```

* **( % )** Múdulo (residuo)

```javascript
314 % 100 // -> 14
```

* **( ** )** Potencia

```javascript
2 ** 3 // -> 8
```

### Números especiales

Existen tres valores especiales que se consideran números, auqnue no se comportan como números normales:

* **Infinity** Infinito positivo
* **-Infinity** Infinito negativo
* **NaN** Not a Number. Este valor es obtenido al hacer operaciones que no produzcan resultados significativos, como `0 / 0` o `Infinity - Infinity`.