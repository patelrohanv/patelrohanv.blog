---
title: "Learning to Code Functions: Shrubbery Part Two"
date: 2023-03-25T16:55:22.812Z
summary: An iterative practice assignment to build up a virtual shrubbery. Part
  Two, Functions
tags:
  - learn-to-code
  - shrubbery
---
## **Overview**

In this part of the assignment, you will refactor the Simple CLI Shrubbery Storefront from Part 1 to use functions. This will make the code more modular, organized, and easier to maintain.

## **Objectives**

By the end of this assignment, you will be able to:

- Use functions to modularize your code and make it more reusable
- Understand the importance of functions in organizing and maintaining code

## **Instructions**

1. Review the code from Part 1 of the assignment and identify the major parts of the store that can be converted into functions. Some examples include:
    - Displaying available shrubberies
    - Getting user input for adding or removing items from the cart
    - Updating the shopping cart
    - Displaying the shopping cart contents and total cost
2. Create functions for each of the identified parts. Make sure to include docstrings to describe what each function does and what parameters it takes, if any. For example:

```python
def display_available_shrubberies(shrubberies):
    """
    Display the list of available shrubberies with their names and prices.

    :param shrubberies: A dictionary of shrubberies and their prices.
    """
    print("Available Shrubberies:")
    for name, price in shrubberies.items():
        print(f"{name}: ${price}")
```

3. Update the main loop of the store to call the newly created functions instead of having the code directly in the loop. For example:

```python
while True:
    print("Welcome to the Shrubbery Store!")
    display_available_shrubberies(shrubberies)
    choice = get_user_choice()
    ...
```

1. Test your refactored store thoroughly and make sure it works as expected.
2. Add comments to your code to explain what each part does.
3. As an optional exercise, consider adding more features to the store, such as allowing users to update the quantity of items in the cart or applying discounts.
4. Reflect on how using functions has improved the organization and maintainability of your code.