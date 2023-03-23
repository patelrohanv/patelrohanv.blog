---
title: "Learning to Code: Hangman"
date: 2023-03-23T14:02:37.332Z
summary: practice problem to make a game of hangman in Python
tags:
  - learn-to-code
---
# Assignment : Simple Calculator
## Overview
In this assignment, you will build a simple calculator using Python. The calculator will be able to perform basic arithmetic operations such as addition, subtraction, multiplication, and division. The user will be prompted to enter two numbers and select an operation to perform.

## Objectives
By the end of this assignment, you will be able to:

- Use Python's built-in input() function to accept user input
- Use Python's built-in arithmetic operators to perform basic calculations
- Use conditional statements to control program flow

## Starter Code
```python
# Define a function to perform addition
def add(num1, num2):
    return num1 + num2

# Define a function to perform subtraction
def subtract(num1, num2):
    return num1 - num2

# Define a function to perform multiplication
def multiply(num1, num2):
    return num1 * num2

# Define a function to perform division
def divide(num1, num2):
    return num1 / num2

# Get the user's input
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

# Print the menu of operations
print("Operations:")
print("1. Addition")
print("2. Subtraction")
print("3. Multiplication")
print("4. Division")

# Get the user's choice of operation
choice = int(input("Enter your choice (1-4): "))

# Perform the chosen operation and print the result
if choice == 1:
    result = add(num1, num2)
    print(num1, "+", num2, "=", result)
elif choice == 2:
    result = subtract(num1, num2)
    print(num1, "-", num2, "=", result)
elif choice == 3:
    result = multiply(num1, num2)
    print(num1, "*", num2, "=", result)
elif choice == 4:
    result = divide(num1, num2)
    print(num1, "/", num2, "=", result)
else:
    print("Invalid choice!")
```
## Instructions
1. Run the starter code and test out the calculator to make sure you understand how it works.
2. Modify the code to add error handling for cases where the user inputs a non-numeric value for num1 or num2.
3. Modify the code to add error handling for cases where the user attempts to divide by zero.
4. Modify the code to add additional operations, such as calculating the square root of a number or raising a number to a power.
5. Modularize the code by creating separate functions for each operation (e.g. add(), subtract(), multiply(), divide()).
6. Add comments to your code to explain what each part does.
7. Test your calculator thoroughly and make sure it works as expected.