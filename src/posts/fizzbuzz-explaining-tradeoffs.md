---
title: "FizzBuzz: Explaining tradeoffs"
date: 2023-04-08T17:45:39.672Z
summary: "Going through a dozen or so implementations of FizzBuzz across Kotlin
  and Python and the tradeoffs to keep in mind when implementing something "
tags:
  - learn-to-code
---
# FizzBuzz: Explaining tradeoffs

FizzBuzz is a classic programming problem often used in coding interviews as a basic test of a candidate's programming abilities. The task is simple: Write a program that prints the numbers from 1 to 100. However, for multiples of 3, print "Fizz" instead of the number, and for multiples of 5, print "Buzz." For numbers which are multiples of both 3 and 5, print "FizzBuzz."

In this blog post, we will explore various ways to implement the FizzBuzz program in Kotlin and discuss their trade-offs. By examining these different approaches, you will gain insights into Kotlin's features and learn to choose the most suitable implementation for your specific needs.

# First in Kotlin

## **1. Using if-else Statements**

One of the most straightforward ways to implement FizzBuzz is by using if-else statements. This approach is simple and easy to understand.

```kotlin
fun main() {
    for (i in 1..100) {
        if (i % 3 == 0 && i % 5 == 0) {
            println("FizzBuzz")
        } else if (i % 3 == 0) {
            println("Fizz")
        } else if (i % 5 == 0) {
            println("Buzz")
        } else {
            println(i)
        }
    }
}
```

**Trade-offs:**

- Pros: Easy to read and understand.
- Cons: The code is repetitive and not as concise as it could be. It also requires multiple checks for each number.

## **2. Using a StringBuilder**

Another approach is to use a **`StringBuilder`** to build the output for each number. This method helps reduce the number of checks per number and makes the code slightly more concise.

```kotlin
fun main() {
    for (i in 1..100) {
        val output = StringBuilder()
        if (i % 3 == 0) {
            output.append("Fizz")
        }
        if (i % 5 == 0) {
            output.append("Buzz")
        }
        if (output.isEmpty()) {
            output.append(i)
        }
        println(output)
    }
}
```

**Trade-offs:**

- Pros: Reduces the number of checks per number and makes the code slightly more concise.
- Cons: The code is a bit more complex than the if-else approach, and it may be slightly slower due to the overhead of creating a **`StringBuilder`** for each number.

## **3. Using a when Expression**

Kotlin's **`when`** expression can be used as an alternative to if-else statements, making the code more concise and expressive.

```kotlin
fun main() {
    for (i in 1..100) {
        println(
            when {
                i % 15 == 0 -> "FizzBuzz"
                i % 3 == 0 -> "Fizz"
                i % 5 == 0 -> "Buzz"
                else -> i
            }
        )
    }
}
```

**Trade-offs:**

- Pros: The code is more concise and expressive than the if-else approach.
- Cons: There is still some repetition, and multiple checks are performed for each number.

## **4. Using Extension Functions and String Interpolation**

Kotlin allows you to create extension functions, which can help make the code more modular and reusable. Using string interpolation, we can also make the code more concise.

```kotlin
fun Int.isDivisibleBy(divisor: Int): Boolean = this % divisor == 0

fun main() {
    for (i in 1..100) {
        val fizz = if (i.isDivisibleBy(3)) "Fizz" else ""
        val buzz = if (i.isDivisibleBy(5)) "Buzz" else ""
        println(if (fizz.isNotEmpty() || buzz.isNotEmpty()) "$fizz$buzz" else i)
    }
}
```

**Trade-offs:**

- Pros: The code is more modular and reusable, thanks to extension functions. String interpolation helps make the code more concise.
- Cons: The code is slightly more complex than the previous implementations due to the use of extension functions.

## **5. Using Sequences and map**

This approach uses Kotlin's sequences and the **`map`** function to create a more functional and concise solution.

```kotlin
fun fizzBuzz(i: Int): String = when {
    i % 15 == 0 -> "FizzBuzz"
    i % 3 == 0 -> "Fizz"
    i % 5 == 0 -> "Buzz"
    else -> i.toString()
}

fun main() {
    (1..100)
        .asSequence()
        .map { fizzBuzz(it) }
        .forEach(::println)
}
```

**Trade-offs:**

- Pros: A more functional and concise solution, which separates the logic for generating the FizzBuzz string from the loop that prints the values.
- Cons: It may be slightly slower and have a higher memory footprint than other solutions due to the creation of a sequence and use of **`map`**.

## **6. Using a Range and forEachIndexed**

This approach uses Kotlin's range and the **`forEachIndexed`** function to create a more idiomatic solution.

```kotlin
fun main() {
    (1..100).forEachIndexed { index, _ ->
        println(
            when {
                (index + 1) % 15 == 0 -> "FizzBuzz"
                (index + 1) % 3 == 0 -> "Fizz"
                (index + 1) % 5 == 0 -> "Buzz"
                else -> index + 1
            }
        )
    }
}
```

**Trade-offs:**

- Pros: A more idiomatic Kotlin solution that takes advantage of the language's features.
- Cons: Slightly more complex and less readable than other solutions due to the use of **`forEachIndexed`** and the need to increment the index by 1.

# Now in Python

## **1. Basic If-Elif-Else**

This is a simple implementation using if-elif-else statements.

```python
for i in range(1, 101):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
```

**Trade-offs:**

- Pros: Simple and easy to read.
- Cons: Not as modular or reusable.

## **2. Using Functions and String Concatenation**

This approach separates the logic for generating the FizzBuzz string from the loop that prints the values.

```python
def fizz_buzz(i):
    result = ""
    if i % 3 == 0:
        result += "Fizz"
    if i % 5 == 0:
        result += "Buzz"
    return result if result else i

for i in range(1, 101):
    print(fizz_buzz(i))

```

**Trade-offs:**

- Pros: More modular and reusable.
- Cons: Slightly more complex than the basic implementation.

## **3. Using List Comprehension and the Ternary Operator**

This approach uses list comprehension and the ternary operator to create a more concise solution.

```python
fizz_buzz_list = [
    "Fizz" * (i % 3 == 0) + "Buzz" * (i % 5 == 0) or i
    for i in range(1, 101)
]

for value in fizz_buzz_list:
    print(value)
```

**Trade-offs:**

- Pros: More concise and a more functional approach.
- Cons: Less readable for those unfamiliar with list comprehensions and ternary operators.

## **4. Using a Generator and String Formatting**

This approach uses a generator function and the **`str.format()`** method to create a more functional and modular solution.

```python
def fizz_buzz_gen(start, end):
    for i in range(start, end + 1):
        yield "Fizz" * (i % 3 == 0) + "Buzz" * (i % 5 == 0) or str(i)

for value in fizz_buzz_gen(1, 100):
    print(value)
```

**Trade-offs:**

- Pros: More functional and modular, which separates the logic for generating the FizzBuzz string from the loop that prints the values.
- Cons: Slightly more complex than other solutions due to the use of a generator function.

## **5. Using a Dictionary and a List**

This approach uses a dictionary and a list to store the FizzBuzz conditions and to generate the output.

```python
conditions = {3: "Fizz", 5: "Buzz"}

for i in range(1, 101):
    output = "".join([word for divisor, word in conditions.items() if i % divisor == 0])
    print(output or i)
```

**Trade-offs:**

- Pros: More flexible and extensible, as you can easily add more conditions by updating the dictionary.
- Cons: Slightly more complex and less readable than simpler implementations.

## **6. Using Lambda Functions and Higher-Order Functions**

This approach uses lambda functions and higher-order functions to create a more functional solution.

```python
fizz_buzz_conditions = [
    (lambda i: i % 3 == 0, "Fizz"),
    (lambda i: i % 5 == 0, "Buzz"),
]

def fizz_buzz(i, conditions):
    output = "".join([word for condition, word in conditions if condition(i)])
    return output or i

for i in range(1, 101):
    print(fizz_buzz(i, fizz_buzz_conditions))
```

**Trade-offs:**

- Pros: More functional and modular, allowing for easy extension by adding more conditions.
- Cons: Less readable for those unfamiliar with functional programming concepts.

## **7. Using Enumerate and List Slicing**

This approach uses **`enumerate()`** and list slicing to generate the FizzBuzz sequence without a loop or conditional statements.

```python
fizz_buzz_list = [""] * 100
for i in range(2, 100, 3):
    fizz_buzz_list[i] = "Fizz"
for i in range(4, 100, 5):
    fizz_buzz_list[i] += "Buzz"

for i, value in enumerate(fizz_buzz_list, start=1):
    print(value or i)
```

**Trade-offs:**

- Pros: No loop or conditional statements, more efficient in some cases.
- Cons: Less readable and more difficult to understand, not as modular or reusable.

# Something actually readable (Go)

## 1. Simple Loop and Conditionals

```go
package main

import "fmt"

func main() {
    for i := 1; i <= 100; i++ {
        if i % 15 == 0 {
            fmt.Println("FizzBuzz")
        } else if i % 3 == 0 {
            fmt.Println("Fizz")
        } else if i % 5 == 0 {
            fmt.Println("Buzz")
        } else {
            fmt.Println(i)
        }
    }
}
```

**Trade-offs:**

- Simplicity: Easy to understand and implement.
- Readability: Clear and straightforward code.
- Modularity: Limited, as the logic is embedded in the main function.
- Runtime: Efficient since there's only one loop.
- Memory: Minimal memory overhead.

## 2. Function and Switch Statement

```go
package main

import "fmt"

func fizzBuzz(n int) string {
    switch {
    case n % 15 == 0:
        return "FizzBuzz"
    case n % 3 == 0:
        return "Fizz"
    case n % 5 == 0:
        return "Buzz"
    default:
        return fmt.Sprintf("%d", n)
    }
}

func main() {
    for i := 1; i <= 100; i++ {
        fmt.Println(fizzBuzz(i))
    }
}
```

**Trade-offs:**

- Simplicity: Slightly more complex than the first implementation due to the use of a function.
- Readability: Clear code, but the switch statement without an expression may be unfamiliar to some developers.
- Modularity: More modular, as the logic is separated into a function.
- Runtime: Similar efficiency as the first implementation.
- Memory: Minimal memory overhead, though slightly more than the first implementation due to the function call.

## 3. Using an Anonymous Function

```go
package main

import (
    "fmt"
)

func main() {
    fizzBuzz := func(n int) string {
        switch {
        case n % 15 == 0:
            return "FizzBuzz"
        case n % 3 == 0:
            return "Fizz"
        case n % 5 == 0:
            return "Buzz"
        default:
            return fmt.Sprintf("%d", n)
        }
    }

    for i := 1; i <= 100; i++ {
        fmt.Println(fizzBuzz(i))
    }
}
```

**Trade-offs:**

- Simplicity: Introduces the concept of anonymous functions, making it slightly more complex than the basic implementation.
- Readability: Clear code, but the use of an anonymous function may be unfamiliar to some developers.
- Modularity: Moderate, as the logic is encapsulated within an anonymous function.
- Runtime: Similar efficiency as the first implementation.
- Memory: Minimal memory overhead, comparable to the second implementation.

## 4. Using a Custom Type and Method

```go
package main

import (
    "fmt"
)

type FizzBuzz int

func (n FizzBuzz) String() string {
    switch {
    case n % 15 == 0:
        return "FizzBuzz"
    case n % 3 == 0:
        return "Fizz"
    case n % 5 == 0:
        return "Buzz"
    default:
        return fmt.Sprintf("%d", n)
    }
}

func main() {
    for i := 1; i <= 100; i++ {
        fmt.Println(FizzBuzz(i))
    }
}
```

**Trade-offs:**

- Simplicity: More complex than the basic implementation, as it uses a custom type and method.
- Readability: Clean code, but the use of a custom type and method may be more difficult for some developers to understand.
- Modularity: High, as the logic is encapsulated within a method for the custom type.
- Runtime: Similar efficiency as the first implementation.
- Memory: Minimal memory overhead, comparable to the second implementation.

## 5. Using a Map

```go
package main

import (
	"fmt"
)

func main() {
	fizzBuzzMap := map[int]string{
		3: "Fizz",
		5: "Buzz",
	}

	for i := 1; i <= 100; i++ {
		output := ""
		for k, v := range fizzBuzzMap {
			if i%k == 0 {
				output += v
			}
		}
		if output == "" {
			output = fmt.Sprintf("%d", i)
		}
		fmt.Println(output)
	}
}
```

**Trade-offs:**

- Simplicity: Slightly more complex than the basic implementation due to the use of a map.
- Readability: The use of a map can make the code more readable and easy to extend by adding new conditions without modifying the loop.
- Modularity: Moderate, as the logic is built into the loop, but the map makes it easy to add new conditions.
- Runtime: Potentially slower due to the overhead of iterating over the map and appending strings.
- Memory: Additional memory overhead from the map, but still relatively minimal.

# Conclusion

In conclusion, implementing FizzBuzz can be approached in numerous ways, and the choice of implementation depends on the specific goals and constraints of the project. When considering different implementations, it's crucial to keep in mind various trade-offs in terms of design, complexity, modularity, readability, memory usage, runtime performance, and language features.

Design and complexity are essential factors, as they determine how easy it is to understand, maintain, and extend the code. Simpler solutions might be more straightforward and quicker to implement, but they may lack flexibility when it comes to adding new features or adjusting the rules. More complex solutions, on the other hand, could offer greater modularity and extensibility at the cost of increased development time and steeper learning curves for developers unfamiliar with the chosen approach.

Readability is another vital aspect, as it impacts the ease of understanding the code and consequently affects maintainability. Ideally, a FizzBuzz implementation should be self-explanatory and not require extensive comments to explain its functionality. Choosing the right language features can contribute to enhanced readability, but it's essential to balance this with other considerations, such as performance and compatibility.

Memory usage and runtime performance are also important trade-offs to consider, especially in situations where resources are limited, or the code must run efficiently. Some implementations may trade off memory for speed or vice versa, depending on the specific requirements of the project.

Lastly, leveraging language features can lead to more concise and expressive code, but it's essential to consider the target audience and their familiarity with the language. When using advanced language features or functional programming concepts, be aware that they can reduce readability for developers who are not well-versed in these areas.

In summary, when implementing FizzBuzz or any other algorithm, it's crucial to weigh the trade-offs between various factors, such as design, complexity, modularity, readability, memory usage, runtime performance, and language features. Striking the right balance between these aspects will lead to code that is efficient, maintainable, and easy to understand, ensuring its long-term success and adaptability.