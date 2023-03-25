---
title: "Learning to Code SQL: Shrubbery Part Four"
date: 2023-03-25T17:16:04.885Z
summary: An iterative practice assignment to build up a virtual shrubbery. Part
  Four, SQL
tags:
  - learn-to-code
  - shrubbery
---
# Shrubbery Part 4 - SQL

## **Overview**

In this part of the assignment, you will refactor the Simple CLI Shrubbery Storefront from Part 3 to use an SQLite database for storing shrubbery information. This will help you understand how to integrate databases into your applications and manage data more efficiently.

## **Objectives**

By the end of this assignment, you will be able to:

- Use SQLite databases to store and manage data in your application
- Understand the benefits of using databases for data persistence and management

## **Instructions Part 1 - Getting Started**

1. Install the SQLite library for Python by running **`pip install pysqlite3`** if you haven't already installed it.
2. Import the required modules at the beginning of your code:

```python
import sqlite3
```

1. Create a function to set up the SQLite database and add the initial shrubbery data. For example:

```python
def setup_database():
    conn = sqlite3.connect('shrubberies.db')
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS shrubberies (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL
    )
    ''')

    # Add initial shrubbery data if the table is empty
    cursor.execute('SELECT COUNT(*) FROM shrubberies')
    if cursor.fetchone()[0] == 0:
        initial_shrubberies = [
            ("Small Shrubbery", 5.99),
            ("Medium Shrubbery", 10.99),
            ("Large Shrubbery", 15.99),
            ("Royal Shrubbery", 25.99),
        ]
        cursor.executemany('INSERT INTO shrubberies (name, price) VALUES (?, ?)', initial_shrubberies)

    conn.commit()
    return conn
```

1. Update the **`Store`** class to use the SQLite database to retrieve the list of available shrubberies. Modify the **`display_shrubberies`** method to fetch the shrubberies from the database and display them. For example:

```python
class Store:
    def __init__(self, conn):
        self.conn = conn

    def display_shrubberies(self):
        cursor = self.conn.cursor()
        cursor.execute('SELECT id, name, price FROM shrubberies')
        for row in cursor.fetchall():
            shrub_id, name, price = row
            print(f"{shrub_id}. {name}: ${price}")
```

1. Update the main loop of the store to pass the SQLite connection to the **`Store`** class. For example:

```python
conn = setup_database()
store = Store(conn)
cart = Cart()

while True:
    print("Welcome to the Shrubbery Store!")
    store.display_shrubberies()
    choice = get_user_choice()
    store.process_user_input(choice, cart)
    ...
```

1. Update the **`process_user_input`** method in the **`Store`** class to fetch the chosen shrubbery from the database using its ID and add it to the cart. For example:

```python
def process_user_input(self, input, cart):
    cursor = self.conn.cursor()
    cursor.execute('SELECT id, name, price FROM shrubberies WHERE id = ?', (input,))
    row = cursor.fetchone()
    if row:
        shrub_id, name, price = row
        shrubbery = Shrubbery(name, price)
        cart.add_item(shrubbery)
        print(f"{shrubbery.name} added to the cart.")
    else:
        print("Invalid choice. Please try again.")
```

1. Test your refactored store thoroughly and make sure it works as expected

## Instructions Part 2 - Transactions

1. Make sure you understand Steps 1-6 of the previous instructions before continuing 
2. Create a new table called **`transactions`** to store transaction data. Add the table creation statement to the **`setup_database`** function:

```python
def setup_database():
    # ... (existing code)

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY,
        transaction_date TIMESTAMP NOT NULL,
        total_amount REAL NOT NULL
    )
    ''')

    # ... (existing code)
```

1. Create a new table called **`transaction_items`** to store the details of each transaction item. Add the table creation statement to the **`setup_database`** function:

```python
def setup_database():
    # ... (existing code)

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS transaction_items (
        id INTEGER PRIMARY KEY,
        transaction_id INTEGER NOT NULL,
        shrubbery_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (transaction_id) REFERENCES transactions (id),
        FOREIGN KEY (shrubbery_id) REFERENCES shrubberies (id)
    )
    ''')

    # ... (existing code)
```

1. Add a **`checkout`** method to the **`Cart`** class to store the transaction data in the **`transactions`** and **`transaction_items`** tables. Make sure to also clear the cart after a successful checkout.

```python
class Cart:
    # ... (existing code)

    def checkout(self, conn):
        if not self.items:
            print("Your cart is empty. No transaction recorded.")
            return

        cursor = conn.cursor()
        transaction_total = self.total_cost()
        cursor.execute('INSERT INTO transactions (transaction_date, total_amount) VALUES (?, ?)', (datetime.datetime.now(), transaction_total))
        transaction_id = cursor.lastrowid

        for shrubbery, quantity in self.items.items():
            cursor.execute('SELECT id FROM shrubberies WHERE name = ?', (shrubbery.name,))
            shrubbery_id = cursor.fetchone()[0]
            cursor.execute('INSERT INTO transaction_items (transaction_id, shrubbery_id, quantity, price) VALUES (?, ?, ?, ?)', (transaction_id, shrubbery_id, quantity, shrubbery.price))

        conn.commit()
        self.items.clear()
        print("Transaction completed. Thank you for your purchase!")
```

1. Update the main loop of the store to include a new option for the user to checkout and call the **`checkout`** method of the **`Cart`** class. For example:

```python
conn = setup_database()
store = Store(conn)
cart = Cart()

while True:
    print("Welcome to the Shrubbery Store!")
    store.display_shrubberies()
    print("0. Checkout")
    choice = get_user_choice()
    if choice == 0:
        cart.checkout(conn)
        break
    store.process_user_input(choice, cart)
    # ...
```

1. Test your modified store thoroughly and make sure the checkout process works as expected, and transactions are recorded in the database.
2. Add comments to your code to explain what each part does.