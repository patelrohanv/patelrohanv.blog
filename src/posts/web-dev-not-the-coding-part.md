---
title: "Web dev: not the coding part"
date: 2023-03-13T21:32:17.659Z
summary: |
  Web dev: not the coding part
  Assuming you know a programming language
tags:
  - software-dev
---
# Web dev: not the coding part

### Assuming you know a programming language

So this is gonna sound like a whole lotta things you need to learn but I promise you it’s not, *just remember you’re learning concepts and some of many tools that implement them, you’re not learning the underlying nuts and bolts of how it works*. Also there’s a whole lotta jargon for otherwise simple concepts

Soo with all that, making a web app:

- Before you do anything, you should understand the concepts of web development. The internet nothing more than the transportation system that connects a bunch of computers, there’s a lot of different ways devices can interface and connect with another but those are specializations and careers in themselves. All you need to be familiar with starting off with is HTTP/HTTPS (both the same, S is secure, HTTP is easier to test with)
- You’re gonna see the words **REST**, **API** and **JSON** a lot. They stand for Representational State Transfer, Application Programming Interface, and JavaScript Object Notation, very complicated words for otherwise simple ideas.

## TLDR on HTTP(s)

- **Hypertext Transfer Protocol** - a **protocol** (a set of rules) originally designed to **transfer** a certain sort of file called a HTML (**Hypertext** Markup Language) file
    - basically a protocol to transfer websites from one computer to another
- **HTTPS** - protocol amended make HTTP **secure**
    - the message being sent is encrypted (privacy)
    - provides authentication (not to be confused with authorization), websites using https require a certificate from trusted authorities to prove that the website is exactly who they claim to be
- HTTP is a protocol designed for transferring HTML files, used to transfer websites from one computer to another. HTTPS is a modification of the protocol that makes HTTP secure by encrypting the message being sent for privacy and providing authentication. Websites using HTTPS require a certificate from trusted authorities to prove their identity, which is distinct from authorization.

## Representing data in JSON

### But first a pivot to CSV

- CSV (Comma Separated Values) is a way of representing data in a tabular format. Each row represents a single record, and each column represents an attribute of that record. For example, let's consider the following data that represents customer orders:

```python
order_id, customer_id, product_name, quantity, price
1001, 12345, "Widget A", 2, 19.99
1002, 23456, "Widget B", 1, 29.99
1003, 34567, "Widget C", 3, 9.99
1004, 45678, "Widget D", 2, 39.99
```

- Here, the first row represents the column names and subsequent rows represent the data records. If we want to retrieve the order details for order number 1003, we would need to scan the `order_id`  column until we find a row with the value 1003, and then we would retrieve the corresponding values in the other columns.

### What if we tried to represent that differently?

```json
[
  {
    "order_id": 1001,
    "customer_id": 12345,
    "product_name": "Widget A",
    "quantity": 2,
    "price": 19.99
  },
  {
    "order_id": 1002,
    "customer_id": 23456,
    "product_name": "Widget B",
    "quantity": 1,
    "price": 29.99
  },
  {
    "order_id": 1003,
    "customer_id": 34567,
    "product_name": "Widget C",
    "quantity": 3,
    "price": 9.99
  },
  {
    "order_id": 1004,
    "customer_id": 45678,
    "product_name": "Widget D",
    "quantity": 2,
    "price": 39.99
  }
]
```

- Here, each record is represented as an object in the list, with the keys corresponding to the column names in the CSV.
- While CSV is a structured way of representing data in a tabular format, JSON is less structured and can be used to represent more complex data structures.
    - JSON can also be more easily parsed by computer programs due to its flexibility and key-value format.

### Back to JSON

- JSON is an alternative way to represent data when compared to how data is structured in SQL. In SQL, data is structured in flat tables where columns represent attributes and rows represent entries containing values for each of the columns' headers. This is essentially data that can be imported/exported as CSV or an Excel workbook. For instance, if we wanted to get information where `id` is 3, we would get back an entry for `first_name` carlie and `last_name` comma.
- On the other hand, data in JSON is less structured and cannot always be cleanly mapped to a table. It is stored in a key-value format wrapped in curly braces and can be represented as:
    - single objects `{"key": "value", "otherKey": "otherValue"`
    - lists of objects `[{"key": "value", "otherKey": "otherValue"}, {"key": "thisValue", "otherKey": "thatValue"}]`
- Therefore, JSON makes it easy to represent more complex data. For instance, you could represent a single entry from the CSV example above 
as follows:
    
    ```python
      id, first_name, last_name
      0, fizz, "buzz
      1, foo, "bar
      2, carlie, comma
      3, steve, separated
      4, victor, values
    ```
    
    - We can represent a single entry as:
    
    ```json
    {
      "id": 0,
      "firstName": "fizz",
      "lastName": "buzz"
    }
    ```
    
    - Moreover, JSON can represent more intricate data, like this:
    
    ```json
    {
      "name": "John Smith",
      "sku": "20223",
      "price": 23.95,
      "shipTo":
        {
          "name": "Jane Smith",
          "address": "123 Maple Street",
          "city": "Pretendville",
          "state": "NY",
          "zip": "12345"
        },
      "billTo" :
        {
        "name": "John Smith",
        "address": "123 Maple Street",
        "city": "Pretendville",
        "state": "NY",
        "zip": "12345"
        }
    },
    
    ```
    

## Interfacing with an API

- an interface is some layer that sits between you and some thing that lets you interact with the thing in a common, standardized way, thus abstracting away the inner workings of the thing from your ability to use said thing
    - For example cars, a car's interface includes its: steering wheel, pedals, gearshift, mirrors, dashboard, etc. You use this interface to drive the car and monitor how it's doing. Once you learn the interface of one car, you can generally apply that knowledge to driving any other, since most cars share the same or similar interfaces
    - Or another example, when you go to a restuarant, you interface with the cooks in the kitchen through the menu, the menu tells you what you can order and what adjustments can be made but you don't need to know how to make the food in order to order it
    - so with computers, an API is basically a list of commands that a computer system or program will understand. When writing software that intends to connect to other software, a programmer will use the other software's API to make their own program talk to it. In a way, using a program's API is like "speaking its language".
    - [borrowed a lot of language from this post](https://www.reddit.com/r/explainlikeimfive/comments/rypnmj/eli5_what_is_a_rest_api/hrrd0l8/)

## RESTful

- **Representational State Transfer** (REST) - a set of commands commonly used with web transactions
    - a way for computers to talk to one another
    - widely accepted as a set of guidelines for creating stateless, reliable web APIs
    - A web API that obeys the REST constraints is informally described as **RESTful**
    - RESTful APIs are loosely based on HTTP methods such as POST, GET, PUT, PATCH and DELETE
        - `GET` - requests that the target resource transfer a representation of its state.
        - `POST` - requests that the target resource process the representation enclosed in the request according to the semantics of the target resource
        - `DELETE` - requests that the target resource delete its state
        - `PUT` - requests that the target resource create or update its state with the state defined by the representation enclosed in the request
        - `PATCH` - requests that the target resource modify its state according to the partial update defined in the representation enclosed in the request
    - HTTP requests are used to access data or resources in the web application via URL-encoded parameters
        - for example the `/r/explainlikeimfive` in [https://www.reddit.com/r/explainlikeimfive/](https://www.reddit.com/r/explainlikeimfive/)
    - Responses are generally formatted in JSON
- what it means to be **stateless**
    - when you send a command to a REST API, that API processes your request, (potentially sends you back a result), and then immediately forgets all about you

### Let’s add some code

Let’s consider this basic Flask app

```python
from flask import Flask

app = Flask(__name__)

@app.route('/hello/<name>')
def hello(name):
    return f'Hello {name}'

if __name__ == '__main__':
    app.run()
```

Or the same basic app with Django

```python
from django.http import HttpResponse
from django.urls import path

def hello(request, name):
    return HttpResponse(f"Hello {name}")

urlpatterns = [
    path('hello/<str:name>/', hello),
]
```

- In this code, we are creating a simple Flask web application that has a single route, `/hello/<name>`. If we make a GET request to this URL with a name parameter, e.g. by running `curl [http://localhost:5000/hello/roha](http://localhost:5000/hello/rohani)n` in the terminal or using a tool like Postman or Insomnia, we should get back the response `"Hello rohan".`
- So how does this work?
    - First, we create a Flask application instance by calling `Flask(__name__)`.
    - We then define a function called `hello` that takes a `name` parameter and returns a greeting with that name.
        - We use the `@app.route` decorator to associate this function with the `/hello/<name>` URL path in our application.
        - This means that when a user makes a request to this path, Flask will invoke the `hello` function and pass it the value of the `name` parameter as an argument.
- Note that in Django, we define URL patterns in a separate `urlpatterns` list, rather than using a decorator like in Flask. Also, we import `HttpResponse` and `path` from the `django.http` and `django.urls` modules, respectively.

## Interacting with SQL

- **CRUD** stands for Create Read Update Delete -ing data, it describes the operations that are supported but not how they are implemented
- So let's say we wanted to create a banking application, we may have a table in our SQL database for users and accounts defined as

```sql
CREATE TABLE users
id INT PRIMARY KEY
first_name VARCHAR(15) NOT NULL
middle_name VARCHAR(15)
last_name VARCHAR(15) NOT NUlL

```

with data that might look like

```
id, first_name, middle_name, last_name,
0, Andy, , Account
1, Billy, Bob, Bank
2, Carlie, C, Credit
3. Donald, , Debit

```

and

```sql
CREATE TABLE accounts
id INT PRIMARY KEY
account_type VARCHAR(10)
balance DECIMAL
user_id INT
FOREIGN KEY (user_id) REFERENCES users(id)

```

with data that might look like

```
id, account_type, balance, user_id
0, checking, 3000, 0
1, savings, 1000, 0
2, checking, 5000, 1
3, checking, 500, 2
4, savings, 9000, 1
5, savings, 2000, 3
6, checking, 2000, 3

```

How would we now interact with these two sets of data such that we can then do create, read, update, and delete operations on them? (there's a lot of different ways to do this, I'm going to focus on Object-Relation Mapping (ORM) and REST

### What is an ORM and why use it?

- An ORM stands for object-relational mapping.
- The relational part refers to a relational database composed of tables and relationships.
- An object refers to an instance of a class in object-oriented programming (OOP) jargon.
- The ORM maps tables to classes, connecting the dots between OOP and relational databases.
- It provides an intuitive way to interact with the database without the need for complex SQL queries.

### Quick Crashcourse on OOP

- OOP is a programming paradigm that revolves around using objects.
- Objects hold data in the form of fields or attributes, and procedures in the form of methods and functions that can interact with its fields.
- The creation of an object allows you to create many similar pieces of code without having to re-write the code each time, avoiding boilerplate code.
- Objects are used to model the data that needs to be stored, specifying the fields to represent and the functionality it should provide.
- To implement objects, you first need to write a blueprint for the object called a 'class'.
- Creating an instance of the object is done by calling the object's constructor, which builds a particular version of the object based on the blueprint.

A class can have both methods (or 'functions' - basically, things that every object of that class can do) and properties (see below for examples of properties).

```python
from django.db import models

class Vehicle(models.Model):
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    color = models.CharField(max_length=50)
    mileage = models.IntegerField(default=0)

    def add_mileage(self, miles):
        self.mileage += miles
        self.save()

    def get_mileage(self):
        return self.mileage
```

```python
# Create a new vehicle instance
my_car = Vehicle(make="Toyota", model="Corolla", year=2022, color="blue", mileage=1000)

# Add some miles to the vehicle
my_car.add_mileage(500)

# Print the current mileage of the vehicle
print("Current mileage:", my_car.get_mileage())
```

so here we define the blueprint for what fields a vehicle should have and the functionality it provides, `add_mileage` which lets a developer interacting with a vehicle object to add to its current mileage.
and then in the next snippet, we create an instance of a vehicle called car and interact with it

### So why use an ORM?

consider the code below that is querying the accounts table to get the balance of an account whose `id=1` and `account_type="checking"`

```python
from django.db import connection

# Get a cursor to execute SQL queries
with connection.cursor() as cursor:
    # Define the SQL query to retrieve the account balance
    sql = "SELECT balance FROM accounts WHERE id = 1 and account_type = 'checking'"
    # Execute the query and fetch the results
    cursor.execute(sql)
    record = cursor.fetchone()
    # Extract the balance value from the record
    balance = record[0]
    # Print the balance
    print(balance)
```

now compare it abstracting all that behind an object

so first we define our class that will represent our table

```python
from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=15)
    middle_name = models.CharField(max_length=15)
    last_name = models.CharField(max_length=15)

class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_type = models.CharField(max_length=10)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
```

now we can interact with those classes in place of writing queries 

```python
# Create a new user
user = User.objects.create(
    first_name='John',
    middle_name='M',
    last_name='Doe'
)

# Create a new account associated with the user
account = Account.objects.create(
    user=user,
    account_type='checking',
    balance=1000.00
)

# Query for the account using the same user and account type
account = Account.objects.get(user=user, account_type='checking')
print(account.balance)
```

so in place of writing queries, we are directly running them against the database, and parsing the raw result that comes back, we can represent the underlying database tables with a class (following the opinions of our ORM library), and interact with our data through objects and the ORM library's available API functions

why? you're going to have a significantly slower feedback loop and development cycle, in addition to increasing your room for error if you are writing manually or using templates and then need to debug

- raw SQL vs ORMs, when to use which
    - use ORMs for stateful CRUD (domain model persistence)
    - use SQL for stateless querying (relational model interaction)
    - or in other words, ORMs aren't for querying; SQL isn't for complex CRUD

## Tying it all together

So how does all of this fit together in the context of building a web app?

First, you would use HTTP/HTTPS to transfer data between the client (e.g. a web browser or a mobile app) and the server (which runs the web app).

Next, you would use REST APIs to define the interface that the client will use to interact with the server. The client can use HTTP requests to send data to the server, and the server can use HTTP responses to send data back to the client. The data being sent back and forth can be represented in JSON format.

To actually build the web app, you would use a programming language and a web framework. The web framework would handle many of the low-level details of handling HTTP requests and responses, as well as interfacing with the database (using an ORM) to store and retrieve data.

Here's an example of how all of this might look in code using Python and the Flask web framework:

```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(15), nullable=False)
    middle_name = db.Column(db.String(15))
    last_name = db.Column(db.String(15), nullable=False)
    accounts = relationship("Account", back_populates="user")

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    account_type = db.Column(db.String(10), nullable=False)
    balance = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = relationship("User", back_populates="accounts")

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(first_name=data['first_name'], middle_name=data.get('middle_name'), last_name=data['last_name'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize())

@app.route('/accounts', methods=['POST'])
def create_account():
    data = request.get_json()
    user = User.query.get(data['user_id'])
    account = Account(account_type=data['account_type'], balance=data['balance'], user=user)
    db.session.add(account)
    db.session.commit()
    return jsonify(account.serialize())

@app.route('/users/<int:user_id>/accounts')
def get_user_accounts(user_id):
    user = User.query.get(user_id)
    accounts = [account.serialize() for account in user.accounts]
    return jsonify(accounts)

if __name__ == '__main__':
    app.run()
```

In this example, we're using Flask to define three endpoints:

- `/users`, which creates a new user in the database
- `/accounts`, which creates a new account associated with an existing user in the database
- `/users/<int:user_id>/accounts`, which retrieves all of the accounts associated with a particular user

We're also using SQLAlchemy to define two tables, `User` and `Account`, and to handle interactions with the database.

Notice that we're using JSON to represent the data being sent back and forth between the client and server. We're also using an ORM (SQLAlchemy) to handle interactions with the database, which means that we're working with Python objects instead of raw SQL queries.

Of course, this is just one example, and there are many different ways to build a web app depending on your requirements and preferences.