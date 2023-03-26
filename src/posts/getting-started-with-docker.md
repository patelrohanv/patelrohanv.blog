---
title: Getting Started with Docker
date: 2023-03-26T04:32:56.530Z
summary: Quick getting started guide for Docker
tags:
  - learn-to-code
---
## **Overview**

Docker is a platform that allows you to develop, ship, and run applications inside containers. Containers are lightweight, portable, and self-sufficient units that contain everything needed to run an application, including the runtime, system libraries, and dependencies. This guide will provide you with an introduction to Docker and help you get started with the basics.

## **Objectives**

By the end of this guide, you will be able to:

- Understand the basics of Docker and containerization
- Install Docker on your machine
- Use Docker commands to manage containers and images
- Create a Dockerfile for your application
- Build and run your application in a Docker container

## **Docker Basics**

### **What is Docker?**

Docker is an open-source platform that simplifies the process of building, running, and deploying applications by using containers. Containers allow developers to package an application and its dependencies into a single, portable unit that can run consistently across various environments.

### **What are Containers?**

Containers are lightweight, portable units that encapsulate an application and its dependencies. They run in isolation from the host system and other containers, ensuring that each application runs consistently regardless of the underlying infrastructure.

### **What are Images?**

Images are the basis for containers. They are like templates that define the environment and dependencies needed to create a container. Docker images are built from a set of instructions called a Dockerfile.

## **Installing Docker**

To install Docker on your machine, follow the official installation guide for your operating system:

- Windows: **[https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)**
- macOS: **[https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)**
- Linux: **[https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)**

## **Basic Docker Commands**

### **docker run**

The **`docker run`** command is used to create and start a new container from an image. For example, to run a container using the official Python image:

```bash
docker run -it python:3.9
```

### **docker ps**

The **`docker ps`** command lists all running containers. To list all containers, including stopped ones, use the **`-a`** flag:

```bash
docker ps -a
```

### **docker images**

The **`docker images`** command lists all images available on your machine:

```bash
docker iamges
```

### **docker pull**

The **`docker pull`** command downloads an image from a container registry like Docker Hub:

docker pull python:3.9

```bash
docker pull python:3.9
```

### **docker build**

The **`docker build`** command is used to build a Docker image from a Dockerfile:

```bash
docker build -t my-image-name .
```

### **docker rm**

The **`docker rm`** command is used to remove one or more containers:

```bash
docker rm container_id
```

### **docker rmi**

The **`docker rmi`** command is used to remove one or more images:

```bash
docker rmi image_id
```

## **Creating a Dockerfile**

A Dockerfile is a script that contains instructions on how to build a Docker image. Here is an example Dockerfile for a Python application:

```docker
# Use the official Python image as the base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file into the container and install the dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application's files into the container
COPY . .

# Expose the port the application will run on
EXPOSE 8000

# Start the application
CMD ["python", "app.py"]
```

## **Building and Running a Docker Container**

To build a Docker image from a Dockerfile, run the following command in the same directory as the Dockerfile:

```bash
docker build -t my-image-name .
```

Replace **`my-image-name`** with a descriptive name for your image. The **`-t`** flag is used to specify a tag for the image, and the **`.`** at the end tells Docker to use the current directory as the build context.

After building the image, you can run a container using the **`docker run`** command:

```bash
docker run -p 8000:8000 --name my-container-name my-image-name
```

Replace **`my-container-name`** with a descriptive name for your container. The **`-p`** flag maps a network port on the host to a port inside the container. In this example, port 8000 on the host machine is mapped to port 8000 inside the container, which is the port the application is running on.

To access your application, navigate to **`http://localhost:8000`** in your web browser. If your application is running on a different port, replace 8000 with the appropriate port number.

## **Stopping and Removing Containers**

To stop a running container, use the **`docker stop`** command followed by the container's name or ID:

```bash
docker stop my-container-name
```

To remove a stopped container, use the **`docker rm`** command followed by the container's name or ID:

```bash
docker rm my-container-name
```

You can also remove a container and its associated image with the **`docker rmi`** command:

```bash
docker rmi my-image-name
```

## **Docker Compose**

Docker Compose is a tool that simplifies the management of multi-container applications. With Docker Compose, you can define and run multiple containers as part of a single application using a YAML configuration file called **`docker-compose.yml`**.

To install Docker Compose, follow the official installation guide: **[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)**

An example **`docker-compose.yml`** file for a simple Python application with a Redis service might look like this:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
  redis:
    image: "redis:alpine"
```

To start your application using Docker Compose, run the following command in the same directory as the **`docker-compose.yml`** file:

```bash
docker-compose up
```

To stop your application, press **`Ctrl+C`** or run the following command in a separate terminal window:

```bash
docker-compose down
```