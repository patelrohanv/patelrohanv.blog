---
title: Getting Started with Git - Beginners Guide
date: 2023-03-25T16:52:15.264Z
summary: Quick getting started guide for Git
tags:
  - learn-to-code
---
## **Overview**

Git is a distributed version control system that helps developers manage and track changes to their code. This beginner's guide will introduce you to the basics of Git, covering the essential commands and concepts you need to start using Git in your projects.

## **Installing Git**

1. Visit the official Git website (**[https://git-scm.com/](https://git-scm.com/)**) and download the appropriate version of Git for your operating system.
2. Follow the installation instructions to install Git on your computer. The default settings are generally sufficient.

## **Configuring Git**

After installing Git, you'll need to configure it with your name and email address. Open a terminal or command prompt and run the following commands:

```python
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## **Creating a Local Git Repository**

1. Create a new folder for your project, or navigate to an existing project folder.
2. Open a terminal or command prompt and navigate to the project folder using the **`cd`** command.
3. Run **`git init`** to initialize a new Git repository in the project folder. This will create a hidden **`.git`** folder containing the necessary Git files.

## **Adding Files to the Repository**

1. Create a new file or make changes to an existing file in your project folder.
2. Run **`git add .`** to stage all changes in the project folder for commit. You can also add specific files by running **`git add <file>`**.
3. Run **`git commit -m "Your commit message"`** to create a new commit containing the staged changes. Replace "Your commit message" with a brief description of the changes.

## **Checking the Status and History of the Repository**

1. Run **`git status`** to see the status of your repository, including any changes that have been made but not yet committed.
2. Run **`git log`** to view the commit history of your repository. This will show a list of all commits, including their commit messages, authors, and timestamps.

## **Cloning a Remote Repository**

1. Find the URL of the remote Git repository you want to clone. This is often displayed on the repository's web page.
2. Run **`git clone <repository-url>`** to clone the remote repository to a new folder on your local machine.

## **Adding a Remote Repository**

1. Navigate to your local Git repository using the terminal or command prompt.
2. Run **`git remote add origin <repository-url>`** to add a remote repository with the name "origin". Replace "<repository-url>" with the URL of the remote Git repository.
3. Run **`git remote -v`** to verify that the remote repository has been added successfully.

## **Pushing Changes to a Remote Repository**

1. Make sure you have committed all your local changes.
2. Run **`git push origin master`** to push your local commits to the remote repository's "master" branch. If you are using a different branch, replace "master" with the appropriate branch name.

## **Pulling Changes from a Remote Repository**

1. Run **`git pull origin master`** to fetch changes from the remote repository's "master" branch and merge them into your local repository. Replace "master" with the appropriate branch name if you are using a different branch.

## **Creating and Switching Branches**

1. Run **`git branch <branch-name>`** to create a new branch with the specified name.
2. Run **`git checkout <branch-name>`** to switch to the specified branch.
3. Run **`git branch`** to see a list of all branches and an indicator of the current branch.

## **Merging Branches**

1. Ensure you are on the branch you want to merge changes into (usually the "master" branch). You can switch to the desired branch using **`git checkout <branch-name>`**.
2. Run **`git merge <source-branch>`** to merge changes from the specified source branch into the current branch.
3. If there are any merge conflicts, Git will notify you. You will need to manually resolve these conflicts by editing the affected files, and then stage and commit the changes.
4. After resolving conflicts and committing the changes, run **`git branch -d <source-branch>`** to delete the source branch, as it's no longer needed.

## **Rebasing**

Rebasing is an alternative to merging that allows you to integrate changes from one branch into another by rewriting the commit history. Instead of creating a new merge commit, rebasing moves the entire branch to a new base commit, making the commit history appear linear. This can help keep your project history clean and organized.

### **How to Rebase**

1. Ensure you are on the branch that you want to rebase (the feature branch). You can switch to the desired branch using **`git checkout <branch-name>`**.
2. Run **`git fetch`** to fetch the latest changes from the remote repository.
3. Run **`git rebase <base-branch>`** to start the rebase process. Replace **`<base-branch>`** with the name of the branch you want to rebase onto (usually the "master" or "main" branch).
4. If there are any conflicts during the rebase, Git will pause the process and notify you. You will need to manually resolve these conflicts by editing the affected files, and then stage the changes using **`git add <file>`**.
5. After resolving conflicts and staging the changes, continue the rebase process by running **`git rebase --continue`**. If you want to abort the rebase process, you can run **`git rebase --abort`**.
6. Once the rebase is complete, you'll need to force-push the changes to the remote repository using **`git push --force-with-lease origin <branch-name>`**.

## **Comparing Rebasing and Merging**

Both rebasing and merging are methods for integrating changes from one branch into another. However, they have some key differences that can affect how you manage your project history.

### **Rebasing**

- Rebasing rewrites the commit history, creating a linear sequence of commits.
- It moves the entire feature branch to a new base commit, replaying the commits one by one.
- Rebasing can result in a cleaner and more readable commit history.
- It is more complicated to perform and can cause confusion for those unfamiliar with the process.
- Rebasing requires a force-push to update the remote repository, which can overwrite changes and cause data loss if not done carefully.

### **Merging**

- Merging creates a new merge commit that brings together the changes from two branches.
- It preserves the original commit history, including parallel development on different branches.
- Merging is simpler to perform and more familiar to most developers.
- It can result in a cluttered commit history, especially when working on complex projects with multiple branches.
- Merging does not require a force-push, making it safer for updating remote repositories.

When deciding whether to use rebasing or merging, consider your team's familiarity with Git, your project's complexity, and your goals for maintaining a clean commit history. In some cases, a combination of both methods might be the best approach. For example, you could use rebasing to keep feature branches up-to-date with the main branch during development, and then use merging to combine the feature branches into the main branch once they're complete.

## **Stashing Changes**

1. If you have uncommitted changes that you want to save temporarily without creating a commit, you can use **`git stash save "Description of changes"`**.
2. Run **`git stash list`** to view a list of all stashed changes.
3. To apply the most recent stash and remove it from the stash list, run **`git stash pop`**. To apply a specific stash without removing it, run **`git stash apply <stash-name>`**.
4. To discard a stash, run **`git stash drop <stash-name>`**.

## **.gitignore**

1. Create a file named **`.gitignore`** in the root of your repository.
2. Add patterns or filenames to the **`.gitignore`** file to specify files or directories that Git should ignore when checking for changes. For example:

```
bash
*.log
node_modules/

```

This will ignore all files with a **`.log`** extension and the **`node_modules`** directory.

https://github.com/github/gitignore → repository of useful gitignore templates

## **Summary**

This beginner's guide to Git covers the essential commands and concepts you need to start using Git in your projects. As you gain more experience with Git, you'll likely discover more advanced features that can help you manage your code more efficiently. For more detailed information, consult the official Git documentation at **[https://git-scm.com/docs](https://git-scm.com/docs)**.