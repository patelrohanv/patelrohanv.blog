---
slug: dva-c01-ci-cd
title: DVA-C01 studying - CodeCommit, CodeBuild, CodeDeploy, CodePipeline,
  CodeArtifact, ECS, CloudFormation
date: 2022-07-13T21:14:28.019Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - CodeCommit,
  CodeBuild, CodeDeploy, CodePipeline, CodeArtifact, Elastic Container Service,
  CloudFormation
tags: [DVA-C01, software-dev]
---
CI/CD tldr - making small incremental changes with as much of integration, building, testing, and deployed automated as possible. 

Countinuous integration - integrating or merging code changes frequently 

Continuous delivery - automating build, test, deployment

Continuous deployment - fully automated release process to staging or prod after change passes the pipeline 

[relevant white paper](https://docs.aws.amazon.com/whitepapers/latest/practicing-continuous-integration-continuous-delivery/practicing-continuous-integration-continuous-delivery.pdf)

### CodeCommit

##### What it is

* <https://aws.amazon.com/codecommit/>
* **managed source and version control service - fully managed private git repo**

##### Exam Tips

* You can set up notification rules for a repository so that repository users receive emails about the repository event types you specify. Notifications are sent when events match the notification rule settings. You can create an Amazon SNS topic to use for notifications or use an existing one in your AWS account

### CodeBuild

##### What it is

* <https://aws.amazon.com/codebuild/>
* **automated build service - compiling code, running tests, packaging; DOES NOT DEPLOY**

### CodeDeploy

##### What it is

* <https://aws.amazon.com/codedeploy/>
* **automated code deployments - AWS instances or on-prem**
* 2 types of deployment - in-place; blue/green
* In-Place deployments - application is stopped on each instance and new release is installed

  * also called a Rolling Update
  * reduces capacity during deployment
  * Lambda is not supported 
  * rolling back involves a re-deploy
  * great for 1st time deployments
* Blue / Green - new instances are provisioned and the new release is installed on the new instances

  * blue - active deployment; green - new release 
  * no capacity reduction
  * green instances can be created ahead of time
  * easy to switch between old and new release (easy rollback)
  * you pay for 2 environments until you tear down the old one
  * safest option, no reduced capacity and easy to roll back 

##### AppSpec File

* **configuration file that defines the parameters used in a deployment**
* supports JSON and YAML

  * **EC2 or on-prem -> YAML only**
  * **Lambda -> YAML or JSON supported**
* 4 sections of the file

  * version (reserved for future use) - only allowed value is  0.0
  * os (operating system version) - linux, windows
  * files (configuration files and packages) - location of the file(s) and where they need copied
  * **hooks (lifecycle event hooks) - scripts running at specified times in the deployment lifecycle** 
* `appspec.yml,` `/Scripts`, `/Config`, and `/Source` all go in root level of repo

##### Lifecycle Event Hooks

* Run Order - order life cycle hooks are run
* In-Place deployment run order - <https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#appspec-hooks-server>

  * broadly 3 phases: de-registering with load balancer; installing; re-registering

### CodePipeline

##### What it is

* <https://aws.amazon.com/codepipeline/>
* fully managed CI/CD service - **automated orchestratration of the end-to-end workflow from push to release**

  * **code change -> build -> test -> package -> deploy**
* integrates with many AWS and 3rd party services

### CodeArtifact

##### What it is

* <https://aws.amazon.com/codeartifact/>
* artifact (software package) repository service

  * **artifacts contain documentation, compiled application code, deployable packages, libraries**
* securely store, publish, and share artifacts (and versions) - compiled from in-house or open source code repositories
* integrates with public repositories e.g. npm, pypi, maven (**external connections**)

  * **allows IT to make approved versions of packages available** 
  * **aws\[repository <-> upstream repo] \[<-> public repo]external**
  * my-app <-> my-npm-store <-> npm registry
* integrates with CI/CD system

### ECS - Elastic Container Service

##### What it is

* <https://aws.amazon.com/ecs/>
* fully managed container orchestration service
* container - virtualized operating environment (not VM); standardized unit; lends nicely to microservices

  * containerized microservices - highly scalable, fault tolerant, easy to maintain relative to monoliths 
* supports docker or windows containers
* allows for quickly deployment  and scale containerized workloads
* ECS will run your containers on clusters of virtual machines
* EC2 provides more control over the installation, configuration, and management of the compute environment relative to Fargate

###### Fargate

* <https://aws.amazon.com/fargate/>
* serverless compute for containers - no need to mess with EC2 instance

###### ECR - Elastic Container Registry

* <https://aws.amazon.com/ecr/>
* image registry service
* store built images - Docker or Windows Container

### CloudFormation

##### What it is

* <https://aws.amazon.com/cloudformation/>
* manage, configure, and provision your AWS infrastructure as code

  * done with a CloudFormation template (YAML or JSON)
* template

  * parameters - allows you to input custom values
  * conditions - make decisions based on parameters
  * **resources - mandatory section; the resources CloudFormation will create and their properties**
  * **outputs - outputs user-defined data relating to resources; can be used as an input for another CloudFormation stack**
  * mappings - custom mappings
  * **transform - specifies one or more macros AWS CloudFormation uses to process your template**

    * `Transform: AWS::Serverless-2016-10-31` **is required for AWS SAM template files.**
    * can be used to re-use code in S3
* benefits

  * infrastructure is provisioned consistently 
  * code is more efficient than manual configuration
  * version control - file can be reviewed by others with access to the repo
  * free to use - you will be charged for AWS resources created by CloudFormation
  * can manage updates and dependencies
  * can roll back to a previous state 
* write CloudFormation template -> upload to S3 bucket -> CloudFormation reads the template in the bucket and makes the relevant API calls -> result is called a "stack" (the set of resources CloudFormation builds from the template)

###### Serverless Application Model (SAM)

* **extension for CloudFormation to define Serverless applications**
* uses simplified syntax for defining serverless resources
* SAM CLI used for packaging your deployment code, uploading it to S3, and deploying 

  * `sam package` - packages for application and uploads to S3
  * `sam deploy` - deploys serverless application using CloudFormation

###### Nested Stacks

* **stacks that create other stacks - enables re-using CloudFormation code**

  * **one Cloudformation template referencing another (the one referencing uses the `Stack` resource type in it's template's `Resources` section)**
  * **useful for frequently used configurations - load balancers, web servers, application servers**

##### Exam Tips

* Specifying the disable-rollback option or on-failure DO_NOTHING enumeration during a create-stack operation will preserve successfully provisioned resources during a stack create operation
* Create operations set to "Preserve successfully provisioned resources" preserves the state of successful resources, while failed resources will stay in a failed state until the next update operation is performed
*  By default, the “automatic rollback on error” feature is enabled. This will direct CloudFormation to only create or update all resources in your stack if all individual operations succeed. If they do not, CloudFormation reverts the stack to the last known stable configuration.
* CloudFormation allows for the rolling back to prior stacks and is AWS's go to Infrastructure as code solution