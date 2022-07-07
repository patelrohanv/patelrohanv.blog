---
title: DVA-C01 studying - Lambda, API Gateway, Step Functions, X-Ray
date: 2022-07-06T18:50:31.300Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - Lambda, API
  Gateway, Step Functions, X-Ray
tags:
  - DVA-C01
  - software-dev
---
### Serverless Computing

##### What it is

* <https://aws.amazon.com/serverless/>
* allows you to run application code on the cloud without needing to manage a server
* AWS handles managing the infrastructure

  * capacity provisioning
  * patching
  * auto scaling
  * high availability
* Advantages

  * speed to market - no server management overhead
  * automatic scaling
  * lower costs 

    * never need to pay for over-provisioning
    * event driven so you only get charged when the code is triggered to run
* AWS services include: Lambda, API Gateway, DynamoDB, S3, SNS, SQS

### Lambda

##### What it is

* <https://aws.amazon.com/lambda/>

  * similar to Microsoft Azure Functions <https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview> and <https://azure.microsoft.com/en-us/services/functions/#features>
* serverless compute - run your code on AWS without provisioning a server

  * lambda handles everything needed to run the code (including runtime environment)
* supports: java, python, go, c#, nodejs, ruby, and powershell

  * as a developer, you are only responsible for uploading your code, not what it runs on
* built in auto-scaling and high availability
* event-driven

  * can be triggered by events from other services
  * can be triggered by HTTP requests (using API Gateway)

##### Pricing - request volume, run duration,  and memory used

* first 1 million requests - free

  * $0.20 per month per 1 million requests after
* charged in 1ms increments

  * price depends on how much memory you allocated to the Lambda function
* $0.00001667 per GB-second

  * first 400,000 GB-seconds per month free 

##### Versioning

* when you create a function, it is by default $LATEST
* new versions of the function (new code) becomes $LATEST
* you can still reference other versions of the function through aliases that reference that version
* if you use an alias instead of $LATEST in your application, it will not change the version of function it's calling when you change the function

##### Concurrent Execution Limit

* default 1,000 **per region**, afterwards you'll see rejections

  * TooManyRequestsException
  * status code 429
  * the throughput limit was exceeded
* increases on this limit can be requested through AWS support
* Reserved Concurrency

  * guarantees a set number of concurrent executions always be available to the specific function

    * limits the function's concurrent executions to this number instead of the default

##### accessing VPC resources

* need to allow the function to connect to the private subnet
* VPC information Lambda needs:

  * private subnet ID
  * security group ID (with required access) - allows your function to access VPC resources
  * (configuration doable in the AWS Console)
* VPC information is used to set up ENIs using an IP from the private subnet CIDR range

### API Gateway

##### What it is

* <https://aws.amazon.com/api-gateway/>
* API - application programming interface; API Gateway supports:

  * REST - uses JSON
  * Websocket APIs
  * SOAP - uses XML (god have mercy if you're still using SOAP)
* provides a single endpoint for all client traffic interacting with the backend of your application

  * connects to applications running on Lambda, EC2, Elastic Beanstalk, and AWS services i.e.  DynamoDB, Kinesis, etc 
  * supports multiple endpoints
  * supports multiple versions
* integrates with CloudWatch

  * can log API calls, latencies, errors, etc 
* supports throttling

### Step Functions

##### What it is

* <https://aws.amazon.com/step-functions/>
* provides visual interface for serverless applications
* allows you to orchestrate your serverless applications

  * run serverless applications as a series of steps - executing in order (automatically triggering)
  * logs the state of each step - helpful for isolating and debugging errors 

##### Workflows

* Standard Workflows

  * long running (up to a year)

    * durable
    * great for auditable workflows
  * full execution history is available for 90 days
  * at-most-once - tasks are never executed more than once

    * can explicitly specify to retry requests
  * non-idempotent

    * causes a change a change in state
    * identical requests will always cause a change in state
* Express Workflows

  * short lived (up to 5mins)

    * great for high-volume, event-processing workloads
  * at-least-once - tasks run at least one time or need to be run concurrently
  * idempotent

    * identical requests result in no change in state
* Synchronous Express Workflows

  * workflow begins -> waits till it is finished -> returns the result -> next step is triggered
  * the workflow must complete before the next step is executed

    * next task depends on prior task
* Asynchronous Express Workflows

  * workflow begins -> workflow is confirmed to be running
  * results of the workflow are available in CloudWatch logs
  * tasks can be executed without needing the prior step to wait for the workflow to finish

    * next task does not depend on prior task

### X-Ray

##### What it is

* <https://docs.aws.amazon.com/xray/latest/devguide/xray-api.html>
* service that collects data about requests being served by your application
* helps developer analyze and/or debug distributed applications
* provides a visualization of your applications components - Service Map
* integrates with: Elastic Load Balancing, Lambda, API Gateway, EC2, Elastic Container Service, Elastic Beanstalk, SNS, SQS, DyamoDB

  * automatically captures API calls
* integrates with: java, python, go,  nodejs, ruby, and .net
* X-Ray Agent needs to be installed on your EC2 instance

  * configure using the X-Ray SDK
  * X-Ray SDK gathers information and sends it off to X-Ray