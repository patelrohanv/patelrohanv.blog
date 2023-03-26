---
title: "Readable Code: Calculator Part 2"
date: 2023-03-26T17:43:17.864Z
summary: Short overview of writing code that is organized vs unorganized
tags:
  - learn-to-code
---
# Readable Code

Let’s compare the Following two implementations of a programming called `[calculator.py](http://calculator.py)` that is trying to implement a basic CLI calculator.

## First Implementation

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
while True:
    try:
        num1 = float(input("Enter the first number: "))
        num2 = float(input("Enter the second number: "))
        break
    except ValueError:
        print("Invalid input! Please enter a valid number.")
        continue

# Print the menu of operations
print("Operations:")
print("1. Addition")
print("2. Subtraction")
print("3. Multiplication")
print("4. Division")

# Get the user's choice of operation
while True:
    try:
        choice = int(input("Enter your choice (1-4): "))
        if choice < 1 or choice > 4:
            print("Invalid choice! Please enter a number between 1 and 4.")
            continue
        break
    except ValueError:
        print("Invalid input! Please enter a valid number.")
        continue

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
    # Check for division by zero
    if num2 == 0:
        print("Error! Cannot divide by zero.")
    else:
        result = divide(num1, num2)
        print(num1, "/", num2, "=", result)
```

## Second Implementation

```python
# Define a function to perform addition
def add(num1: float, num2: float):
    print("You are adding:", num1, "and", num2)
    return num1 + num2

# Define a function to perform subtraction
def subtract(num1: float, num2: float):
    rint("You are subtracting:", num2, "from", num1)
    return num1 - num2

# Define a function to perform multiplication
def multiply(num1: float, num2: float):
    print("You are multiplying:", num1, "by", num2)
    return num1 * num2

# Define a function to perform division
def divide(num1: float, num2: float):
    print("You are dividing:", num1, "by", num2)
    return num1 / num2

def calculator(choice: int):
    # Get the user's input
    try:
        num1: float = float(input("Enter the first number: "))
        num2: float = float(input("Enter the second number: "))
        # Perform the chosen operation and print the result
        if choice == 1:
            result: float = add(num1, num2)
            print(num1, "+", num2, "=", result)
        elif choice == 2:
            result: float = subtract(num1, num2)
            print(num1, "-", num2, "=", result)
        elif choice == 3:
            result: float = multiply(num1, num2)
            print(num1, "*", num2, "=", result)
        elif choice == 4:
            # Check for division by zero
            if num2 == 0:
                print("Error! Cannot divide by zero.")
            else:
                result: float = divide(num1, num2)
                print(num1, "/", num2, "=", result)
    except ValueError:
        print("Invalid input! Please enter a valid number.")

def main():
# Get the user's choice of operation
    while True:
        # Print the menu of operations
        print("Operations:")
        print("1. Addition")
        print("2. Subtraction")
        print("3. Multiplication")
        print("4. Division")
        print("0. Quit")

        # Get the user's choice
        try:
            choice: int = int(input("Enter your choice (1-4) or 0 to quit: "))
            if choice == 0:
                break
            if choice < 0 or choice > 4:
                print("Invalid choice! Please enter a number between 1 and 4.")
                continue
            calculator(choice)
        except ValueError:
            print("Invalid input! Please enter a valid number.")
            continue

# Read https://www.geeksforgeeks.org/python-main-function/
if __name__=="__main__":
    main()
```

When it comes to writing code, it is not only important that it works correctly but also that it is easy to read, understand, and maintain. In this comparison, we will analyze these two pieces of Python code that perform a simple calculator operation and discuss why the second one is more readable and better organized.

First, let's take a look at the first piece of code. It defines four functions to perform addition, subtraction, multiplication, and division, which is good for organizing the code's functionality. However, the main code that interacts with the user is mixed in with the definitions, making it harder to read and understand. Additionally, the code uses a lot of repetition to check for invalid inputs, which could be avoided with better organization.

The second piece of code addresses these issues by organizing the code into separate functions and using input parameters to communicate between them. Instead of checking for invalid inputs multiple times, the code uses a try-except block to handle them once and for all. The main function, **`calculator`**, takes an input parameter **`choice`** to determine which operation to perform, and the **`add`**, **`subtract`**, **`multiply`**, and **`divide`** functions each take two input parameters, **`num1`** and **`num2`**, to perform the corresponding operation.

Moreover, the second piece of code provides more information to the user by printing the operation that they are performing. This can be helpful to avoid confusion, especially for subtraction, where it might not be clear which number is being subtracted from which. The code also provides a **`0`** option for quitting the calculator, making it more user-friendly.

Overall, the second piece of code is more readable and better organized. It separates the functionality into distinct functions, reduces repetition, handles invalid inputs more elegantly, and provides more information to the user. These characteristics make it easier to read, understand, and maintain, which is crucial for any codebase. Let’s briefly dig into each of these:

## Separating Functionality into Functions

One of the most important things we can do to make code easier to read and understand is to separate functionality into distinct functions. This makes it easier to identify what each part of the code does and to modify or replace individual functions as needed. In the first piece of code, the main code that interacts with the user is mixed in with the function definitions, making it harder to read and understand. In the second piece of code, the **`add`**, **`subtract`**, **`multiply`**, and **`divide`** functions are separated from the code that interacts with the user, making it much clearer what each part of the code does.

## Reducing Repetition

Another key aspect of writing code that is easy to read and understand is to reduce repetition. In the first piece of code, there is a lot of repetition when checking for invalid inputs, which can make the code harder to read and understand. In the second piece of code, the try-except block handles invalid inputs once and for all, reducing repetition and making the code easier to read.

## Handling Invalid Inputs

Handling invalid inputs can be a challenge, especially when working with user input. In the first piece of code, the code uses a lot of repetition to check for invalid inputs, which can make the code harder to read and understand. In the second piece of code, the try-except block handles invalid inputs elegantly and provides a clear error message to the user, making the code easier to read and use.

## Providing More Information to the User

Finally, providing more information to the user can make code easier to read and understand. In the second piece of code, the code prints the operation that the user is performing, making it easier for the user to understand what is happening. This can be particularly helpful when performing subtraction, where it might not be clear which number is being subtracted from which.