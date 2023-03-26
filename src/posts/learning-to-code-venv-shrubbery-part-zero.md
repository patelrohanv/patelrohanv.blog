---
title: "Learning to Code venv: Shrubbery Part Zero"
date: 2023-03-26T05:01:06.560Z
summary: An iterative practice assignment to build up a virtual shrubbery. Part
  Zero, venv
tags:
  - learn-to-code
  - shrubbery
---
## **Overview**

In this assignment, you will learn about virtual environments, why they're important, and how to set up a virtual environment for your Python projects. Additionally, you will learn how to create a **`requirements.txt`** file to manage project dependencies.

## **Objectives**

By the end of this assignment, you will be able to:

- Understand the concept of virtual environments and their importance
- Set up a virtual environment for your Python projects
- Use **`pip`** to install packages and manage dependencies
- Create a **`requirements.txt`** file for your project

## **What is a Virtual Environment?**

A virtual environment is an isolated Python environment that allows you to manage dependencies for a specific project without affecting other projects or the global Python installation. This is useful for keeping your projects organized and avoiding conflicts between package versions.

## **Why are Virtual Environments Important?**

Virtual environments are important for several reasons:

1. They allow you to manage project-specific dependencies without affecting other projects or the global Python installation.
2. They help you maintain a consistent development environment across different machines and team members.
3. They make it easy to share your project's dependencies with others by providing a **`requirements.txt`** file.

## **Creating a Virtual Environment**

To create a virtual environment, follow these steps:

1. Open a terminal or command prompt.
2. Navigate to the directory where you want to create the virtual environment. This is typically the root directory of your project.
3. Run the following command to create a new virtual environment:

```bash
python3 -m venv myenv
```

Replace **`myenv`** with a descriptive name for your virtual environment. This will create a new directory with the same name as your virtual environment, containing the necessary files and scripts.

1. Activate the virtual environment:
- On Windows:

```bash
myenv\Scripts\activate
```

- On macOS and Linux:

```bash
source myenv/bin/activate
```

Once the virtual environment is activated, your terminal prompt should change to show the name of the virtual environment.

## **Using `pip` to Install Packages and Manage Dependencies**

**`pip`** is the package installer for Python. You can use it to install packages from the Python Package Index (PyPI) and manage your project's dependencies.

To install a package, run the following command:

```bash
pip install package-name
```

Replace **`package-name`** with the name of the package you want to install.

To see a list of installed packages, run the following command:

```bash
pip list
```

## **Creating a `requirements.txt` File**

A **`requirements.txt`** file is a plain text file that lists your project's dependencies, making it easy for others to install the required packages. To create a **`requirements.txt`** file, follow these steps:

1. Activate your virtual environment (if it's not already activated).
2. Run the following command to generate a **`requirements.txt`** file with the currently installed packages:

```bash
pip freeze > requirements.txt
```

1. The **`requirements.txt`** file should now be present in your project's directory. You can open it with a text editor to view its contents.

To install packages from a **`requirements.txt`** file, run the following command:

```bash
pip install -r requirements.txt
```

This will install the packages listed in the **`requirements.txt`** file into your virtual environment.

By completing this assignment, you should have a good understanding of virtual environments, their importance in managing dependencies, and how to create and use a **`requirements.txt`** file to share your project's dependencies with others.