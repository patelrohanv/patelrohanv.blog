---
title: "Learning to Code Loops: Shrubbery Part One"
date: 2023-03-25T16:53:42.690Z
summary: An iterative practice assignment to build up a virtual shrubbery. Part
  One, Loops
tags:
  - learn-to-code
  - shrubbery
---
## **Overview**

In this assignment, you will build a simple command line interface (CLI) storefront for a shrubbery using Python. The store will have a list of shrubberies with their names and prices. The user will be able to view the list of available shrubberies, add them to their shopping cart, and checkout.

## **Objectives**

By the end of this assignment, you will be able to:

- Use Python's built-in data structures to store and manipulate data
- Create loops and conditional statements to control program flow
- Implement a basic store interface using loops

## **Starter Code**

```python
# List of available shrubberies with their names and prices
shrubberies = {
    "Small Shrubbery": 5.99,
    "Medium Shrubbery": 10.99,
    "Large Shrubbery": 15.99,
    "Royal Shrubbery": 25.99,
}

# Initialize an empty shopping cart
cart = {}

# Loop until the user chooses to exit the store
while True:
    # Print the list of available shrubberies
    print("Welcome to the Shrubbery Store!")
    print("Available Shrubberies:")
    for name, price in shrubberies.items():
        print(f"{name}: ${price}")

    # Get the user's choice
    choice = input("Enter the name of the shrubbery you want to add to your cart, or type 'checkout' to proceed: ")

    # Check if the user wants to checkout
    if choice.lower() == "checkout":
        break

    # Check if the chosen shrubbery is available in the store
    if choice in shrubberies:
        # Add the shrubbery to the cart or update its quantity
        cart[choice] = cart.get(choice, 0) + 1
        print(f"{choice} added to the cart.")
    else:
        print("Invalid choice. Please try again.")

# Calculate the total cost
total = sum(shrubberies[item] * quantity for item, quantity in cart.items())

# Print the shopping cart contents and the total cost
print("\nYour cart:")
for item, quantity in cart.items():
    print(f"{item} x {quantity}")
print(f"Total: ${total:.2f}")
```

## **Instructions**

1. Run the starter code and test the store to make sure you understand how it works.
2. Modify the code to display the shopping cart contents and total cost before asking for the user's choice.
3. Add the ability for the user to remove items from the cart.
4. Add error handling to prevent the user from inputting invalid choices.
5. Modify the code to allow the user to view their shopping cart and choose to continue shopping or proceed to checkout.
6. Modularize the code by creating functions for each of the major parts of the store (e.g. displaying available shrubberies, getting user input, updating the shopping cart).
7. Add comments to your code to explain what each part does.
8. Test your store thoroughly and make sure it works as expected.