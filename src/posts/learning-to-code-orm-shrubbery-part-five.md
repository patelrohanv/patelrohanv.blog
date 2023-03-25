---
title: "Learning to Code ORM: Shrubbery Part Five"
date: 2023-03-25T17:17:25.244Z
summary: An iterative practice assignment to build up a virtual shrubbery. Part
  Five, ORM
tags:
  - learn-to-code
  - shrubbery
---
# Shrubbery Part 5 - ORM

## **Overview**

In this part of the assignment, you will refactor the Simple Shrubbery Storefront from Part 4 to use Django and its built-in ORM for database management. You'll learn how to create a Django application, define models, and perform CRUD operations using the ORM.

## **Objectives**

By the end of this assignment, you will be able to:

- Set up a Django web application
- Use Django's built-in ORM to manage data
- Perform CRUD operations for Shrubbery and Transaction models using Django ORM

## **Instructions**

1. Install Django by running **`pip install django`**.
2. Create a new Django project by running **`django-admin startproject shrubbery_store`**. This will create a new folder named **`shrubbery_store`** with the basic Django project structure.
3. Change the working directory to the newly created project folder by running **`cd shrubbery_store`**.
4. Create a new Django app within the project by running **`python manage.py startapp store`**. This will create a new folder named **`store`** with the basic Django app structure.
5. Define the **`Shrubbery`**, **`Transaction`**, and **`TransactionItem`** models in the **`models.py`** file of the **`store`** app:

```python
from django.db import models

class Shrubbery(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    transaction_date = models.DateTimeField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Transaction {self.id} - {self.transaction_date}"

class TransactionItem(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    shrubbery = models.ForeignKey(Shrubbery, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"TransactionItem {self.id} - {self.shrubbery.name}"
```

1. Run **`python manage.py makemigrations store`** and **`python manage.py migrate`** to create the tables in the SQLite database.
2. Refactor the **`Store`** class from Part 4 to use the Django ORM for CRUD operations. You can remove the **`__init__`** and **`setup_database`** methods, as the Django ORM will handle the database connection:

```python
from store.models import Shrubbery, Transaction, TransactionItem

class Store:

    def display_shrubberies(self):
        shrubberies = Shrubbery.objects.all()
        for index, shrubbery in enumerate(shrubberies, start=1):
            print(f"{index}. {shrubbery.name} - ${shrubbery.price}")

    def add_shrubbery(self, shrubbery):
        new_shrubbery = Shrubbery(name=shrubbery.name, price=shrubbery.price)
        new_shrubbery.save()

    def update_shrubbery(self, shrubbery):
        updated_shrubbery = Shrubbery.objects.get(id=shrubbery.id)
        updated_shrubbery.name = shrubbery.name
        updated_shrubbery.price = shrubbery.price
        updated_shrubbery.save()

    def delete_shrubbery(self, shrubbery_id):
        shrubbery = Shrubbery.objects.get(id=shrubbery_id)
        shrubbery.delete()

    def process_user_input(self, choice, cart):
        # ... (existing code)
```

1. Refactor the **`Cart`** class to use the Django ORM for checkout: