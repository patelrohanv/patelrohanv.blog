---
slug: misc-software-notes
title: misc software dev notes
date: 2022-08-17T19:56:39.201Z
author: rohan
summary: "talking points on miscellaneous software dev topics "
tags: [software-dev]
---
Between explaining topics to jr devs and teaching at the "devops and software engineering" class at a coding bootcamp, wrote up some quick talking points on a handful of common topics 

# Software Development Life Cycle (SDLC) - Week 1

* the different stages of developing an application: planning -> design -> implementation -> testing -> deployment/shipping
* Methodology -> set of practices around the SDLC
* Agile

  * Focus on short feedback loops; regular and consistent communication between parties, interactively building a product through working software as a series of minimum viable products, and responding to change
  * **Practiced in most modern software teams, though more often than not, not implemented well** 
  * **Does not prescribe specific practices, teams should be regularly adapting to what works for them**
  * Kanban -> practice of visualizing your workflow into a board with each column representing each step; aims to limit the backlog from building up by limiting the number of tasks that can be work-in-progress  
  * Scrum -> practice of organizing work into regularly-timed sprints (intervals, usually 1-4 weeks);  typically involves sprint planning (writing stories, sizing/pointing stories, deciding which stories will be worked on for the sprint), regularly checking in as a team on the status of stories/blockers (standup), demoing the sprint’s stories for stakeholder feedback, and discussing/implementing any practice changes for the next sprint (retrospective)
* Waterfall

  * Focus on working in a series of progressive, one-directional stages before releasing

    * Every step is completed before the next one can begin
    * Gather Requirements -> Design Application -> Implement Design -> Test implementation -> Deploy to production -> Maintenance
  * Not designed for adapting to change; practical for building physical products, not the most practical for building software

# Git - Week 1

* Version control system, manage and track changes in your repository (code)
* Supports branching and merging to separate stable code from development 
* Local git history can be backed up (pushed) to remote repositories like Github, Bitbucket, Gitlab, etc 
* Basic commands

  * `git init` - create a new git repository locally
  * `git clone` - clone a copy of an existing git repository
  * `git add` - add files/changes in a git repository to staging
  * `git commit` - commit changes in staging to git repository’s history
  * `git log` - view a git repository’s commit history
  * `git status` - list all the uncommitted changes and those that are and are not added to staging
  * `git pull` - fetch and merge changes from the remote repository
  * `git push` - sent changes to the remote repository

# Docker - Week 1, 2

* Runs your code inside container instead of a virtual machine

  * VM -> essentially an entire virtual computer with an operating system
  * Container -> only virtualizes the kernel
* Containerization refers to the practice of isolating software in an operating environment with lower overhead than running a full virtual machine

  * takes advantage of some cool features in the Linux kernel to provide a level of isolation from the host operating system and other containers
  * Isolation is nice in software because you can completely control and reproduce the environment your software runs in
  * Because containers are so lightweight, you can ship them around as a deployable unit from your development, to staging, and eventually production environments
  * No matter where you run the container, you’re running the exact same system, complete with the same OS, libraries, and configuration.
* Dockerfile -> instructions for docker how to build an image

  * image can be exported as is or as a tar (zip)
* Docker image -> templates telling Docker how to configure the environment and run the code
* Docker container -> an instance running an image
* Registry -> application to store and distribute Docker built images

  * Docker Hub is Docker’s own hosted image registry
  * AWS, Google Cloud, and Azure all include their own container registries as well
  * artifact stores can be used for more than just container images
* Ports -> creates a firewall rule which maps a container port to a port on the Docker host to the outside world
* Data
* Networking
* Logs

# Devops - Week 2, 3, 4

* Bridging the gap between traditional operations and development where development was responsible for writing, testing, building, patching, and maintaining the codebase while operations was responsible for taking the built software and running it, setting up and managing the servers, their operating systems, networking, the physical hardware

  * Development was usually staffed by software engineers 
  * Operations was usually staffed by SysAdmins and Network/Infrastructure Engineers 
  * Operations handled production, if a bug is found, they report it to development, development pushes a fix and builds the patch, Operations then installs the patched version
* General catchall term nowadays for all the parts of software development that aren’t related to writing the code itself, usually covers most of the build pipeline
* Nowadays a lot of the (hopefully automated) build pipeline is the process of building and deploying your code: from writing the code, to pushing it to a remote git repository, to running your test suite on the new push, to compiling and building your code, to pushing the built output to an artifact store, to building a docker image to run the output and pushing git up to the artifact store, to deploying the image to run as a container

  * Most of these tools all run on the web and are either hosted locally or on the cloud; each is usually administrable, configurable, scriptable, and extendable 
* Can be extended to DevSecOps by integrating security with tools like code analysis, vulnerability scans, etc

# Cloud Computing - Week 2

* Outsourcing your IT infrastructure to the cloud

  * Renting someone else’s hardware that you can access from anywhere instead of buying and managing your own physical hardware

# Common Services - Cloud or OnPrem - Week 2, 3, 4

* Identity and Access Management -> services to administer/control policies for individual and group authentication (who can access) and authorization (who has what permissions) for your organization’s resources 
* Serverless compute

  * Deploy and run code without provisioning virtual or physical machines
  * Cloud provider fully manages starting and stopping virtual machines as necessary to serve requests
  * Does not hold resources in volatile memory; computing is rather done in short bursts with the results persisted to storage
  * Requests are billed by an abstract measure of the resources required to satisfy the request, rather than per virtual machine, per hour
  * When an app is not in use, there are no computing resources allocated to the app; pricing is based on the actual amount of resources consumed by an application
  * Named so because the business or person that owns the system does not have to purchase, rent or provide servers or virtual machines for the back-end code to run on
  * Developers of serverless applications are not concerned with capacity planning, configuration, management, maintenance, fault tolerance, or scaling of containers, VMs, or physical servers
* Database as a Service (DBaaS) -> abstracting away the hosting of database infrastructure and management operations to a service

  * Provides automated and dynamic scaling to adapt to workload changes
  * Provides high availability - maintains high uptime, automatically reroute traffic during instance failures
* Object Storage -> manages data as objects instead of file systems or block storage 

  * Each object typically contains it’s data, metadata, and a global identifier 
  * Useful for unstructured data that is written once and read one or many times after, static data like images, documents, and video
* Secrets Management -> Centrally store, access, and distribute secrets

  * Secrets can include: API keys, AWS IAM/STS credentials, SQL/NoSQL databases, X.509 certificates, SSH credentials, etc
* Software Build -> process(es) of converting source code files into standalone software artifact(s) that can be run on a physical or virtual computer

  * Processes usually involves version control (checking out the specific point in the log you want to build), code quality analysis (checking that code quality standards are met), and compilation (converting the code from human readable to computer readable)
  * Build Pipeline -> build processes are typically automated as tasks in conjunction with automatically running tests

    * Typically handled with utilities and services, e.g. make, Gradle, Maven, GitHub Actions, TeamCity, Jenkins, etc. 
  * The CI half of CI/CD -> frequent merging of several small changes into a main branch with triggers for automated tests and builds  
* Artifact Repository -> securely store generated software artifacts, dependencies, metadata, and documentation

  * Artifacts can include: container images, binary artifacts, java jars, executables, and software packages
* Software Deployment -> process(es) that make a software system available for use on a web server, device install, etc

  * The CD half of CI/CD -> release at any time with a simple and repeatable deployment process

# Continuous Integration and Continuous Delivery (or Deployment) - CI/CD - Week 3

* Continuous Integration -> frequent merging of several small changes into a main branch with triggers for automated tests and builds 
* CD -> release at any time with a simple and repeatable deployment process

  * Continuous Delivery ->  producing software in short cycles with high speed and frequency
  * Continuous Deployment -> rolling out completely new software functionality automatically

### Amazon Web Services - AWS - Week 2

* serverless compute -  AWS Lambda
* Elastic Compute Cloud (EC2)
* Identity and Access Management (IAM)
* DBaaS - Relational Database Service (RDS) 
* Container registry service - Elastic Container Registry (ECR)

### Google Cloud Platform - GCP - Week 3

* serverless compute - Cloud Functions
* Google Cloud Shell
* DBaaS - Google Cloud SQL
* IAM - IAM 
* Object Storage - Google Storage Bucket
* Secrets Management - Secret Manager
* Cloud Build
* Cloud Run
* Artifact Repository 
* Cloud Deploy

### Microsoft Azure - Week 4

* serverless compute - Azure Functions
* Azure CLI
* Kubernetes service - Azure Kubernetes Service (AKS)
* Container registry service - Azure Container Registry
* DBaaS - Azure Database for PostgreSQL

# Testing - Week 3

* Arrange, act, assert -> good tests should have three iterative stages, first arrange your inputs, second call function with the arranged inputs, lastly make your asserts to verify that your function is functioning as intended
* Unit testing -> testing code by unit of functionality 

  * Ideally each unit test should run as independently from one another
  * Testing your code by the smallest piece as possible
* Integration tests -> testing that units of code work together in features
* Regression tests -> test that new changes are not breaking already working stuff
* Test Doubles 

  * Dummy objects -> passed around but never actually used; usually they are just used to fill parameter lists.
  * Fake objects -> have working implementations, but usually take some shortcut which makes them not suitable for production (an in memory database is a good example)
  * Stubs -> provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test
  * Spies -> stubs that also record some information based on how they were called
  * Mocks -> objects pre-programmed with expectations which form a specification of the calls they are expected to receive
* Refactoring -> modifying the code without changing the functionality (tests still pass)
* Test Driven Development -> writing your tests first, then developing the code to make the test pass

  * How -> gather requirements, tasks, stories, etc.; write tests to arrange an input, call a function; validate that it works as expected; run the test (knowing it will fail); refactor the function to  make the test pass
  * Why -> code that is hard to test is usually poorly designed; helps you catch bugs and keep your code decoupled I.e. easier to test. Software is built in units, units are integrated into features 

# Kubernetes - Week 4

* A container orchestration tool - responsible for allocating and scheduling containers, abstracting away things like networking and storage volumes between them, monitoring the health of containers, repairing unhealthy containers
* Kubernetes manages a bunch of Nodes (VMs or bare metal) as a cluster; each Node runs a bunch of Docker Containers 
* Abstracts the infrastructure (cloud, self hosted, etc) away