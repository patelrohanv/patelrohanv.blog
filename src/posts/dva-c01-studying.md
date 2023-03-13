---
slug: dva-c01-lambda-api-step
title: DVA-C01 studying - Lambda, API Gateway, Step Functions, X-Ray
date: 2022-07-06T18:50:31.300Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - Lambda, API
  Gateway, Step Functions, X-Ray
tags: [DVA-C01, software-dev]
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

##### deploying code to lambda

* **CloudFomartion `Aws::Lambda::Function` resource can create a Lambda function**
* **zip your code and upload it to Lambda - must upload via S3 then Lambda if the package is more than 50MB**
* **write code directly in Lambda's web IDE** 

##### Pricing - request volume, run duration,  and memory used

* first 1 million requests - free

  * $0.20 per month per 1 million requests after
* charged in 1ms increments

  * price depends on how much memory you allocated to the Lambda function
* $0.00001667 per GB-second

  * first 400,000 GB-seconds per month free 

##### Versioning

* **when you create a function, it is by default $LATEST**
* **new versions of the function (new code) becomes $LATEST**
* **you can still reference other versions of the function through aliases that reference that version - easy rollback**
* if you use an alias instead of $LATEST in your application, it will not change the version of function it's calling when you change the function

  * need to explicitly update your alias

##### Concurrent Execution Limit

* **default 1,000 *per region*, afterwards you'll see rejections**

  * **`TooManyRequestsException`**
  * **status code 429**
  * **the throughput limit was exceeded**
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

##### misc

* **timeout issues - review logs of the API call and adjust the timeout settings** 

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
* **supports easy rollback to restore a previous stage** 
* integrates with CloudWatch

  * can log API calls, latencies, errors, etc 
* supports throttling

  * `Per-client throttling limits` **can be used to limit a client's API key to specified limits and quotas**
* **supports importing your own APIs**

  * **import a definition file - OpenAPI protocol (formerly known as Swagger)** 

    * <https://swagger.io/blog/api-strategy/difference-between-swagger-and-openapi/>
  * can create a new or update an existing API
  * handling legacy protocols e.g. SOAP (returns XML instead of JSON)

    * **configure API Gateway as a SOAP web service passthrough**
    * **use API Gateway to transform XML into JSON**

##### Caching

* when enabled, default TTL is 300s
* caches your endpoint's response

  * looks up response in the cache instead of making a new request to your application
  * **reduces number of request made to your application from API Gateway**
  * improves (reduces) latency

##### Throttling

* **default limit for steady-state requests - 10,000 requests/second per Region**
* **maximum 5,000 concurrent requests across all APIs per region**

  * increases on this limit can be requested through AWS support
* **Exceeding these limit returns a `429 Too Many Requests` error**

### Step Functions

##### What it is

* <https://aws.amazon.com/step-functions/>
* provides visual interface for serverless applications
* allows you to automate/orchestrate your serverless applications

  * run serverless applications as a series of steps - executing in order (automatically triggering)
  * logs the state of each step - helpful for isolating and debugging errors 

##### Workflows

* Standard Workflows

  * **long running (up to a year)**

    * durable
    * great for auditable workflows
  * full execution history is available for 90 days
  * **at-most-once - tasks are never executed more than once**

    * can explicitly specify to retry requests
  * **non-idempotent**

    * causes a change a change in state
    * identical requests will always cause a change in state
* Express Workflows

  * short lived (up to 5mins)

    * great for high-volume, event-processing workloads
  * at-least-once - tasks run at least one time or need to be run concurrently
  * idempotent

    * identical requests result in no change in state
  * can be synchronous or asynchronous 
  * **not all Express workflows return the result after finishing**
* Synchronous Express Workflows

  * **return the result after the workflow finishes**
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
* provides an end-to-end view of your overall application
* service that collects data about requests being served by your application
* helps developer analyze and/or debug distributed applications
* provides a visualization of your applications components - Service Map
* **services that provide integration with X-Ray: Elastic Load Balancing, Lambda, API Gateway, EC2, Elastic Container Service, Elastic Beanstalk, SNS, SQS, DyamoDB**

  * automatically captures API calls
* **X-Ray can integrate with S3**

  * traces upstream requests to update your buckets
  * if a service is using the X-Ray SDK to trace requests, S3 can send the tracing headers to downstream event subscribers 
* integrates with: java, python, go,  nodejs, ruby, and .net
* X-Ray agent/daemon needs to be installed on your instance or container

  * use the X-Ray SDK to instrument (configure) the data it's gathering - HTTP requests, errors, etc
  * X-Ray SDK gathers information and sends it off to X-Ray daemon that buffers it in a queue and sends them to X-Ray (the actual service) in batches 
  * **both the X-Ray SDK and X-Ray daemon need to be on the system you want to connect**
* on-premise servers or EC2 instances

  * install X-Ray daemon on your instance or server
* Elastic Beanstalk

  * install X-Ray daemon on the EC2 instance inside the environment
* Elastic Container Service

  * install X-Ray daemon in it's own container on your ECS cluster (not on the same container as the application)

##### Annotations

* annotations can be used to record additional information about requests - done during instrumenting (configuring)
* key-value pairs that are indexed - allows for filtering and searching