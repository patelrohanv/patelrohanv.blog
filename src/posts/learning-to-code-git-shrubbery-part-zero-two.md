---
title: "Learning to Code Git: Shrubbery Part Zero.Two"
date: 2023-03-26T05:02:04.068Z
summary: An iterative practice assignment to build up a virtual shrubbery. Part
  Zero.Two, Git
tags:
  - how-to-code
  - shrubbery
---
## **Overview**

In this assignment, you will learn how to set up version control using Git for your local projects. This will cover initializing a Git repository, committing changes, and working with branches.

## **Objectives**

By the end of this assignment, you will be able to:

- Understand the basics of version control and Git
- Set up a local Git repository for your project
- Commit changes to your repository
- Work with branches

## **Introduction to Version Control and Git**

Version control is a system that records changes to a file or set of files over time, allowing you to revert to a specific version later if needed. Git is a distributed version control system, which means that every user has a full copy of the repository, including its entire history.å

Using Git for version control offers several benefits:

1. It allows you to track changes and revert to previous versions if needed.
2. It makes collaborating with others on a project easier by providing a structured way to manage changes.
3. It serves as a backup of your code, making it easier to recover from mistakes or hardware failures.

## **Setting Up a Local Git Repository**

To set up a local Git repository for your project, follow these steps:

1. Open a terminal or command prompt.
2. Navigate to the root directory of your project.
3. Run the following command to initialize a new Git repository:

```bash
git init
```

This will create a new **`.git`** directory in your project's root directory, which contains the necessary files and metadata for your Git repository.

## **Committing Changes to Your Repository**

To commit changes to your repository, follow these steps:

1. Make changes to your project files.
2. Run the following command to see the status of your repository, including any changed or new files:

```bash
git status
```

1. Add the changed files to the staging area using the **`git add`** command:

```bash
git add file1 file2
```

Replace **`file1`** and **`file2`** with the names of the files you want to add. You can use **`git add .`** to add all changed files in the repository.

1. Commit the changes to your repository with a descriptive commit message using the **`git commit`** command:

```bash
git commit -m "Your commit message here"
```

Replace "Your commit message here" with a meaningful description of the changes you made.

## **Working with Branches**

Branches in Git allow you to work on different features or bug fixes in parallel without affecting the main codebase. To create a new branch, follow these steps:

1. Run the following command to create a new branch and switch to it:

```bash
git checkout -b new-branch-name
```

Replace **`new-branch-name`** with a descriptive name for your branch.

1. Make changes to your project files and commit them as described in the previous section.
2. To switch back to the main branch (usually called **`master`** or **`main`**), run the following command:

```bash
git checkout master
```

1. To merge your changes from the new branch into the main branch, run the following command:

```bash
git merge new-branch-name
```

Replace **`new-branch-name`** with the name of the branch you want to merge.

By completing this assignment, you should have a good understanding of how to set up version control using Git for your local projects, commit changes, and work with branches.