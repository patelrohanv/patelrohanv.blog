---
title: Getting Started with Django
date: 2023-03-26T02:46:25.768Z
summary: Quick getting started guide for Django
tags:
  - learn-to-code
---
## **Overview**

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. This beginner's guide will introduce you to the basics of Django, covering the essential concepts and steps you need to start building web applications with it.

## **Installing Django**

Before installing Django, make sure you have Python installed on your system. Django requires Python 3.6 or later.

1. Open a terminal or command prompt and run the following command to install Django using pip:

```bash

pip install djangopip install django
```

1. Verify the installation by running:

```bash
django-admin --version
```

This should display the installed Django version.

## **Creating a Django Project**

1. In the terminal or command prompt, navigate to the folder where you want to create your Django project.
2. Run the following command to create a new Django project:

```bash
django-admin startproject myproject
```

Replace "myproject" with your desired project name. This command will create a new folder with the same name as your project, containing the necessary Django files.

1. Navigate to the newly created project folder using the **`cd`** command:

```bash
cd myproject
```

## **Running the Development Server**

1. In the terminal or command prompt, run the following command to start the Django development server:

```bash
python manage.py runserver
```

1. Open a web browser and visit **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**. You should see the default Django welcome page.

## **Creating a Django App**

1. In the terminal or command prompt, make sure you are in your project folder (where the **`manage.py`** file is located).
2. Run the following command to create a new Django app:

```bash
python manage.py startapp myapp
```

Replace "myapp" with your desired app name. This command will create a new folder with the same name as your app, containing the necessary Django files.

1. In your project's **`settings.py`** file, add your app to the **`INSTALLED_APPS`** list:

```bash
INSTALLED_APPS = [
    # ...
    'myapp',
]
```

## **Creating a Model**

1. In your app folder, open the **`models.py`** file.
2. Define a new model by creating a new class that inherits from **`django.db.models.Model`**. For example:

```bash
from django.db import models

class Shrubbery(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return self.name
```

1. In the terminal or command prompt, run the following command to create a new migration based on your model changes:

```bash
python manage.py makemigrations

```

1. Run the following command to apply the migration and create the database table for your model:

## **Creating Views and Templates**

1. In your app folder, open the **`views.py`** file.
2. Create a new view function that queries your model and renders a template. For example:

```python
from django.shortcuts import render
from .models import Shrubbery

def shrubbery_list(request):
    shrubberies = Shrubbery.objects.all()
    return render(request, 'myapp/shrubbery_list.html', {'shrubberies': shrubberies})
```

1. In your app folder, create a new folder named **`templates`**. Inside the **`templates`** folder, create another folder with the same name as your app (e.g., **`myapp`**).
2. Inside the **`templates/myapp`** folder, create an HTML file with a name corresponding to the one you used in the **`render()`** function of your view (e.g., **`shrubbery_list.html`**). Add your desired HTML content and use Django's template language to display the data from your model. For example:

```html
{% for shrubbery in shrubberies %}
    <h2>{{ shrubbery.name }}</h2>
    <p>Price: {{ shrubbery.price }}</p>
    <p>{{ shrubbery.description }}</p>
{% endfor %}
```

## **Configuring URLs**

1. In your app folder, create a new file named **`urls.py`**.
2. In the newly created **`urls.py`** file, define the urlpatterns list, which maps URL patterns to views. For example:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('shrubberies/', views.shrubbery_list, name='shrubbery_list'),
]
```

1. In your project's **`urls.py`** file (located in the project folder, not the app folder), import the **`include`** function and add a new entry to the **`urlpatterns`** list to include your app's URLs:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myapp/', include('myapp.urls')),
]
```

Replace "myapp" with the name of your app.

## **Testing Your Application**

1. Start the Django development server if it's not already running:

```bash
python manage.py runserver
```

1. Open a web browser and visit the URL path you configured in your app's **`urls.py`** file (e.g., **[http://127.0.0.1:8000/myapp/shrubberies/](http://127.0.0.1:8000/myapp/shrubberies/)**). You should see the content you defined in your template, populated with data from your model.

## **Summary**

This beginner's guide to Django has covered the essential concepts and steps to create a simple web application using the framework. As you gain more experience with Django, you'll likely discover more advanced features that can help you build more complex applications. For more detailed information and tutorials, consult the official Django documentation at **[https://docs.djangoproject.com/](https://docs.djangoproject.com/)**.