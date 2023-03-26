---
title: "Learning to Code Docker: Shrubbery Part Seven"
date: 2023-03-26T04:30:04.254Z
summary: An iterative practice assignment to build up a virtual shrubbery. Part
  Seven, Docker
tags:
  - learn-to-code
  - shrubbery
---
## **Overview**

In this assignment, you will learn how to create a Docker container for the Shrubbery Store API you built in the previous assignments. Docker is a platform that allows you to easily create, deploy, and run applications in containers, which are portable and self-contained units that include all the dependencies required to run the application. By dockerizing your API, you'll be able to run it consistently across different environments, making it easier to share, deploy, and scale.

## **Objectives**

By the end of this assignment, you will be able to:

- Understand the basics of Docker and containerization
- Create a Dockerfile to define your API's container
- Build a Docker image for your API
- Run your API in a Docker container

## **Instructions**

1. Install Docker on your machine by following the official installation guide for your operating system: **[https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)**.
2. Familiarize yourself with Docker's basic concepts, including containers, images, and the Dockerfile. You can read the Docker's official documentation to get started: **[https://docs.docker.com/get-started/](https://docs.docker.com/get-started/)**.
3. Create a **`Dockerfile`** in the root directory of your Shrubbery Store API project. This file will define the container's configuration, including the base image, dependencies, and the command to run your application.
4. In the **`Dockerfile`**, start with a base image that includes Python. You can use the official Python image from Docker Hub. For example, to use Python 3.9, add the following line to your **`Dockerfile`**:

```docker
FROM python:3.9
```

1. Set the working directory for your application inside the container. This is where your application's files will be copied and where the commands will be executed. Add the following line to your **`Dockerfile` :**

```docker
WORKDIR /app
```

1. Copy your application's requirements file (usually **`requirements.txt`**) into the container and install the dependencies using **`pip`**. Add these lines to your **`Dockerfile`**:

```docker
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
```

1. Copy the rest of your application's files into the container. Add the following line to your **`Dockerfile`:**

```docker
COPY . .
```

1. Expose the port your API is running on so that it can be accessed from outside the container. If your API is running on port 8000, add this line to your **`Dockerfile`**: 

```docker
EXPOSE 8000
```

1. Finally, add the command to run your API in the container. If you're using Django, you can use the **`python manage.py runserver`** command. Replace **`8000`** with the port your API is running on if it's different:

```docker
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

1. Build the Docker image for your API by running the following command in the terminal, from the directory containing your **`Dockerfile`**:

```bash
docker build -t shrubbery-store-api .
```

This command will create a Docker image named **`shrubbery-store-api`** using the configuration defined in your **`Dockerfile`**.

1. Run your API in a Docker container by executing the following command:

```bash
docker run -p 8000:8000 --name shrubbery-api-container shrubbery-store-api
```

This command will start a new container named `shrubbery-api-container` using the `shrubbery-store-api` image you built earlier. It will also map port 8000 on your local machine to port 8000 inside the container, allowing you to access your API at `http://localhost:8000`.

1. Test your API by accessing the endpoints from your web browser or using tools like **`curl`** or Postman. Ensure that the API works as expected when running inside the Docker container
2. (Optional) Learn how to use Docker Compose to manage multi-container applications. Docker Compose allows you to define and run multiple containers as part of a single application, which can be useful if you want to add a database or other services to your project. Read the official documentation to get started: **[https://docs.docker.com/compose/](https://docs.docker.com/compose/)**.
3. (Optional)  Add a **`.dockerignore`** file to your project to exclude files and directories that are not needed in the container. This can help reduce the size of your Docker image and speed up the build process. Some common files and directories to exclude include:

```bash
.git/
.gitignore
__pycache__/
*.pyc
*.pyo
*.pyd
.cache/
.pytest_cache/
*.log
*.sqlite3
*.pyc
*.pyo
*.pyd
```

1. (Optional)  Share your Dockerized API with others by pushing the image to a container registry like Docker Hub. To do this, first create an account on Docker Hub (**[https://hub.docker.com/](https://hub.docker.com/)**) and follow the official documentation for instructions on how to push your image: **[https://docs.docker.com/docker-hub/repos/](https://docs.docker.com/docker-hub/repos/)**.

Remember to test your API thoroughly to ensure that it works as expected when running inside a Docker container. By completing this assignment, you'll have a portable, self-contained API that can be easily shared, deployed, and scaled using Docker.