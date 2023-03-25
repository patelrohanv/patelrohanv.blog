---
title: "Learning to Code Classes: Shrubbery Part Three"
date: 2023-03-25T16:55:52.905Z
summary: An iterative practice assignment to build up a virtual shrubbery. Part
  Three, Classes
tags:
  - learn-to-code
  - shrubbery
---
# Shrubbery Part 3 - Classes

## **Overview**

In this part of the assignment, you will refactor the Simple CLI Shrubbery Storefront from Part 2 to use classes. This will help you to further organize the code and make it more reusable and maintainable.

## **Objectives**

By the end of this assignment, you will be able to:

- Use classes to structure your code and create reusable components
- Understand the benefits of object-oriented programming in organizing and maintaining code

## **Instructions**

1. Review the code from Part 2 of the assignment and identify components that can be converted into classes. Consider creating classes for the following components:
    - Shrubbery
    - Cart
    - Store
2. Create a **`Shrubbery`** class that represents a single shrubbery with properties such as **`name`** and **`price`**. Add a method to display the shrubbery information. For example:

```python
class Shrubbery:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def display(self):
        print(f"{self.name}: ${self.price}")
```

1. Create a **`Cart`** class that represents the shopping cart. The class should have methods for adding, removing, and displaying items in the cart, as well as calculating the total cost. For example:

```python
class Cart:
    def __init__(self):
        self.items = {}

    def add_item(self, shrubbery, quantity=1):
        self.items[shrubbery] = self.items.get(shrubbery, 0) + quantity

    def remove_item(self, shrubbery, quantity=1):
        if shrubbery in self.items:
            self.items[shrubbery] -= quantity
            if self.items[shrubbery] <= 0:
                del self.items[shrubbery]

    def display(self):
        for shrubbery, quantity in self.items.items():
            print(f"{shrubbery.name} x {quantity}")

    def total_cost(self):
        return sum(shrubbery.price * quantity for shrubbery, quantity in self.items.items())
```

1. Create a **`Store`** class that represents the shrubbery store. The class should have a list of available shrubberies and methods for displaying the shrubberies, processing user input, and managing the shopping cart. For example:

```python
class Store:
    def __init__(self, shrubberies):
        self.shrubberies = shrubberies

    def display_shrubberies(self):
        for shrubbery in self.shrubberies:
            shrubbery.display()

    def process_user_input(self, input, cart):
        # Implement the logic to process user input, add or remove items from the cart, and handle errors.
        pass
```

1. Update the main loop of the store to use instances of the **`Store`**, **`Cart`**, and **`Shrubbery`** classes. For example:

```python
store = Store(shrubberies)
cart = Cart()

while True:
    print("Welcome to the Shrubbery Store!")
    store.display_shrubberies()
    choice = get_user_choice()
    store.process_user_input(choice, cart)
    ...
```

1. Test your refactored store thoroughly and make sure it works as expected.
2. Add comments to your code to explain what each part does.
3. As an optional exercise, consider adding more features to the store, such as applying discounts or allowing users to update the quantity of items in the cart.
4. Reflect on how using classes has improved the organization, reusability, and maintainability of your