---
title: "Learning to Code HTTP: Shrubbery Part Six"
date: 2023-03-26T04:14:46.114Z
summary: An iterative practice assignment to build up a virtual shrubbery. Part
  Six, HTTP
tags:
  - learn-to-code
  - shrubbery
---
## **Overview**

In this part of the assignment, you will build upon your existing Django project from Part 5. You will create RESTful API endpoints for shrubberies and transactions using the Django REST framework, which will allow clients to interact with your application using GET, POST, DELETE, and PUT HTTP methods.

## **Objectives**

By the end of this assignment, you will be able to:

- Install and configure the Django REST framework
- Create serializers for your models
- Implement API views for each HTTP method (GET, POST, DELETE, and PUT)
- Define URL patterns for your API endpoints
- Test your API endpoints using a tool like Postman or **`curl`**

## **Setting up Django REST framework**

1. Install the Django REST framework using pip:

```bash
pip install djangorestframework
```

2.  Add **`'rest_framework'`** to the **`INSTALLED_APPS`** list in your project's **`settings.py`** file:

```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
]
```

## **Creating Serializers**

Serializers are a way to convert complex data types, such as Django models or Python data structures, into more easily consumable data formats like JSON or XML. They also allow you to convert parsed data (e.g., JSON received in an API request) back into complex data types, such as Django model instances.

1. In your app folder, create a new file named **`serializers.py`**.
2. In the **`serializers.py`** file, import your models and the Django REST framework, and create serializers for your Shrubbery and Transaction models. For example:

```python
from rest_framework import serializers
from .models import Shrubbery, Transaction

class ShrubberySerializer(serializers.ModelSerializer):
    class Meta:
        model = Shrubbery
        fields = ['id', 'name', 'price', 'description']
```

In this example, **`ShrubberySerializer`** is a subclass of **`serializers.ModelSerializer`**, and it specifies the **`Shrubbery`** model in the **`Meta`** class. The **`fields`** attribute in the **`Meta`** class defines which fields from the model should be included in the serialization and deserialization process.

By using serializers, you can easily convert your Django models or other complex data types into a format that is suitable for transmission over an API and back, while also handling data validation and transformation.

## **Implementing API Views**

API views are the components responsible for handling incoming HTTP requests and returning HTTP responses. They define the logic for processing different types of requests (GET, POST, PUT, DELETE, etc.) and contain the code for interacting with your data models, serializers, and other components of your application.

API views in Django REST framework can be created in various ways:

- **Function-based views**: These are regular Python functions that are decorated with the **`@api_view`** decorator provided by the Django REST framework. The decorator allows you to specify the HTTP methods that the view should accept and ensures that only those methods are allowed.
    
    Here's an example of a function-based API view:
    
    ```python
    from rest_framework.decorators import api_view
    from rest_framework.response import Response
    from .models import Shrubbery
    from .serializers import ShrubberySerializer
    
    @api_view(['GET'])
    def shrubbery_list(request):
        shrubberies = Shrubbery.objects.all()
        serializer = ShrubberySerializer(shrubberies, many=True)
        return Response(serializer.data)
    ```
    
    In this example, the **`shrubbery_list`** function handles GET requests for a list of shrubberies. The **`@api_view(['GET'])`** decorator specifies that only GET requests are allowed. The function retrieves all shrubberies from the database, serializes them using **`ShrubberySerializer`**, and returns the serialized data as an HTTP response.
    
- **Class-based views**: These are Python classes that inherit from one or more base classes provided by the Django REST framework. Class-based views allow you to reuse and organize your code more effectively by taking advantage of object-oriented programming principles.
    
    Here's an example of a class-based API view:
    
    ```python
    from rest_framework import generics
    from .models import Shrubbery
    from .serializers import ShrubberySerializer
    
    class ShrubberyList(generics.ListCreateAPIView):
        queryset = Shrubbery.objects.all()
        serializer_class = ShrubberySerializer
    ```
    
    In this example, the **`ShrubberyList`** class inherits from **`generics.ListCreateAPIView`**, a base class provided by the Django REST framework that implements the logic for handling GET and POST requests. The **`queryset`** and **`serializer_class`** attributes define the data source and serializer to be used in processing the requests.
    
    API views are an essential part of any Django REST framework application, as they define the logic for processing incoming HTTP requests and returning the appropriate responses. By using function-based or class-based views, you can create a flexible and organized structure for your API endpoints that can handle various types of requests and interact with your data models and serializers.
    
    So with that, let’s give yinz some work: 
    
1. In your app folder, open the **`views.py`** file.
2. Import the necessary components from the Django REST framework and your models and serializers. Then, create API views for each HTTP method (GET, POST, DELETE, and PUT) for both shrubberies and transactions. For example:

```python
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Shrubbery, Transaction
from .serializers import ShrubberySerializer, TransactionSerializer

@api_view(['GET', 'POST'])
def shrubbery_list(request):
    if request.method == 'GET':
        shrubberies = Shrubbery.objects.all()
        serializer = ShrubberySerializer(shrubberies, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ShrubberySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remaining views for other methods and models go here
```

## **Defining URL Patterns**

In Django, URL patterns are used to define the structure of the URLs in your application and map them to the corresponding views that handle the incoming HTTP requests. URL patterns are created using regular expressions or simple path converters, which help Django identify the appropriate view function or class to process the request.

The main components of URL patterns in Django are:

- **URL Dispatcher**: The URL dispatcher is the component responsible for matching the requested URL with the defined URL patterns in your application. When a user sends an HTTP request to your application, the URL dispatcher examines the request's URL and searches for a matching pattern in your URL configuration.
- **URL Configuration**: The URL configuration is a Python module (usually named **`urls.py`**) that contains a list of URL patterns. Each Django app can have its own **`urls.py`** file, which is typically imported and included in the project's main URL configuration file. This allows you to organize the URL structure of your application in a modular way.
- **URL Patterns**: URL patterns are created using the **`path()`** or **`re_path()`** functions from the **`django.urls`** module. The **`path()`** function uses simple path converters to define URL patterns, while the **`re_path()`** function uses regular expressions for more complex patterns. Each URL pattern is associated with a view function or class that handles the incoming requests.

Here's an example of a simple URL configuration:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('shrubberies/', views.shrubbery_list, name='shrubbery_list'),
    path('shrubberies/<int:pk>/', views.shrubbery_detail, name='shrubbery_detail'),
]
```

In this example, two URL patterns are defined:

- The first pattern is for the URL **`shrubberies/`**, which is mapped to the **`shrubbery_list`** view. This view is expected to handle the requests related to the list of shrubberies (e.g., listing all shrubberies or creating a new shrubbery).
- The second pattern is for the URL **`shrubberies/<int:pk>/`**, which includes a path converter **`<int:pk>`**. This pattern is mapped to the **`shrubbery_detail`** view and captures an integer parameter **`pk`** that represents the primary key of a specific shrubbery. This view is expected to handle requests related to individual shrubberies (e.g., retrieving, updating, or deleting a specific shrubbery).

By defining URL patterns in your Django application, you can create a well-structured and organized URL scheme that maps each URL to the appropriate view function or class. This allows users to access different parts of your application using meaningful and readable URLs.

So now your work:

1. In your app folder, open the **`urls.py`** file.
2. Import your views and define URL patterns for your API endpoints:

```python
from django.urls import path
from . import views

urlpatterns = [
		path('shrubberies/', views.shrubbery_list, name='shrubbery_list'),
    path('transactions/', views.transaction_list, name='transaction_list'),
    # Other URL patterns for additional views go here
]
```

## **Testing Your API Endpoints**

1. Start the Django development server if it's not already running:

```bash
python manage.py runserver
```

1. Use a tool like **[Postman](https://www.postman.com/)** or **`curl`** to test your API endpoints. Make sure you can perform GET, POST, DELETE, and PUT requests for both shrubberies and transactions.

For example, using **`curl`**:

- List all shrubberies (GET):

```bash
curl -X GET http://127.0.0.1:8000/myapp/api/shrubberies/
```

• Create a new shrubbery (POST):

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "Sample Shrubbery", "price": 25.99, "description": "A beautiful shrubbery."}' http://127.0.0.1:8000/myapp/api/shrubberies/
```

• Update a shrubbery (PUT):

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Shrubbery", "price": 29.99, "description": "An updated description."}' http://127.0.0.1:8000/myapp/api/shrubberies/1/
```

• Delete a shrubbery (DELETE):

```bash
curl -X DELETE http://127.0.0.1:8000/myapp/api/shrubberies/1/
```

Replace "myapp" with the name of your app and adjust the example URLs, data, and IDs as necessary.

1. Ensure that your API endpoints work as expected, and verify that the changes you make through the API are reflected in your database.

## **Summary**

In this part of the assignment, you have implemented RESTful API endpoints for your Django application using the Django REST framework. This allows clients to interact with your application using standard HTTP methods, making it easy to build a frontend or other applications that use your API.