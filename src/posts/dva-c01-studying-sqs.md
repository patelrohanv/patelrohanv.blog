---
slug: dva-c01-sqs-sns
title: DVA-C01 studying - SQS, SNS, SES, Kinesis, Elastic Beanstalk
date: 2022-07-13T21:10:23.055Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - Simple Queue
  Service, Simple Notification Service, Simple Email Service, Kinesis, Elastic
  Beanstalk
tags: [DVA-C01, software-dev]
---
### SQS - Simple Queue Service

##### What it is

* <https://aws.amazon.com/sqs/>
* distributed message queue service (temp buffer to store messages waiting to be processed) 

  * <https://www.youtube.com/watch?v=oUJbuFMyBDk> <- good explanation of message queues 
  * helps decouple components of an application
  * **messages can contain up to 256KB of text in any format (plaintext, XML,JSON, etc)**
* **pull based, not push based - application sevices are pulling the messages from the queue rather than them being pushed out**
* guarantees messages will be processed at least once
* messages can be kept in queue from 1minute up to 14 days - default retention period is 4 days 

##### Types of Queues

* standard queues (default)

  * **best-effort ordering - messages are generally delivered in the order they were sent but will occasionally be delivered out of order or more than one copy of the message will be delivered**
  * nearly unlimited number of transactions per second
  * **guarantees that a message is delivered at least once**
* FIFO queues (first in first out)

  * **ordering is strictly preserved - messages delivered in the order they were sent**
  * no duplicate messages will ever be sent
  * **exactly-once processing - message is delivered once and remains available until a consumer processes and deletes it**
  * 300 transactions per second
  * ^minus these, same capabilities as a standard queue 
  * good usecase - banking 

##### Visibility Timeout (configuration)

* `ChangeMessageVisibility` **\- API call to change the visibility timeout of a specified message in a queue**
* the amount of time a message is invisible in the queue after a reader reads the message for processing

  * if the job is not processed within that time, the message will become visible again for another reader to read 
  * default is 30sec - need to increase if your task will take longer
  * **maximum is 12hrs**

##### Polling

* Short Polling

  * returns a response immediately even if the message queue being polled is empty
  * can result in a lot of empty responses
  * pay per response (even empty ones)
* Long Polling

  * periodically polls the queue 
  * doesn't return a response until a message arrives in the queue or the long poll times out 
  * **generally preferable to short polling - also saves money**

##### Delay Queues (configuration)

* **postpone the delivery of new messages (setting change)**

  * does not affect the delay of messages already in the queue, only new ones - standard queues
  * does affect the delay of messages already in the queue - FIFO queues
* **messages in the Delay Queue remain invisible for the delay period (0-900sec)**
* When to use:

  * large, distributed applications that need a delay in processing
  * you need to apply a delay to an entire message queue 

##### managing large messages

* for messages 256kb up to 2GB in size
* **use S3 to store the messages**
* use `Amazon SQS Extended Client Library` to manage and the `AWS SDK` for S3 and object operations

  * AWS docs default to Java for the library and SDK
  * cannot use `AWS CLI`, `AWS Management Console`, `SQS Console`, `SQS API`

##### Exam Tips

* **separate queues can be used to prioritize work**

### SNS - Simple Notification Service

##### What it is

* <https://aws.amazon.com/sns/>
* web service to setup up, operate, and send push notifications from the cloud

  * messages sent can immediately be delivered to subscribers or other applications
* can send push notifications to a Apple, Google, Android, Windows, and other devices 
* can send SMS or email or send to SQS queues or HTTP endpoints 
* can trigger Lambda function 
* uses a pub-sub model

  * <https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern>
  * **applications publish/push messages to a topic; subscribers recieve message from the topic**
* **topic - a logical access point that acts as a communication channel for recipients to subscribe to and recieve identical copies o the same notification**
* includes durable storage - prevents messages from being lost

  * all messages published to SNS are stored redundantly across multiple AZ

###### Pros

* pay-as-you-go pricing model; no up-front costs
* easy to configure from AWS management console
* scalable and highly available
* managed service with durable storage
* **supports multiple transport protocols - SMS, HTTP, HTTPS, SQS, email, etc**
* can trigger lambda functions
* instantaneous, push notifications (no polling)
* **can fannout messages to a large number of recipients - can send a message to multiple SQS queues**

### SES - Simple Email Service

##### What it is

* <https://aws.amazon.com/ses/>
* scalable, highly available email service
* pay-as-you-go model
* can be used to send emails or recieve them to an S3 bucket
* incoming emails can trigger Lambda functions and SNS notifications
* useful for automated emails -  changes in a post/group/forumn, purchase confirmations, order status and shipping updates, marketing/promotions
* differences from SNS

  * only email
  * can trigger Lamdba functions or SNS notifications (as opposed to just Lamdba functions)
  * supports incoming and outgoing email (SNS is push only)
  * only requires knowing the email address to get started - not subscription based 

### Kinesis

##### What it is

* <https://aws.amazon.com/kinesis/>
* family of services that let you collect, process, and analyze streaming data in real-time and make decisions off them

  * streaming data - small sized (in the kilobytes) data generated continuously and simulatanously by many data sources 
* Kinesis Streams

  ###### Kinesis Data Streams

  * data comes from producers; data is sent to Kinesis Streams; data is stored in shards (sequence of data  records); data in shards consumed by consumers 

    * shards retain data for 24hrs (default) up to 7 days 
  * Kinesis Shards

    * only apply to Kinesis Streams
    * each shard is a sequence of one or more data records
    * provides a fixed unit of capacity - Stream's capacity is determined by number of shards it has

      * 5 reads/s; max total read rate is 2MB/s
      * 1000 writes/s; max total write rate is 1MB/s
    * can increase a Stream's capacity by increasing the number of shards (called resharding)

  ###### Kinesis Video Streams

  * **securely stream video (used for analytics or ML) from connected devices to AWS** 
* Kinesis Data Firehose

  * capture, transform, and load data streams into AWS data stores
  * allows for near-real-time analytics
  * no shards (no data retention) - all capacity and sizing is automated for you
  * no need for consumers to consume data
  * no BI tools
  * data comes from producers; data is sent to Kinesis Firehose; Firehose stores transformed data in AWS data stores
* Kinesis Data Analytics

  * analyze, query, and transform streamed data (**in real-time**); storing results in an AWS data store
  * **uses standard SQL**
  * data comes from producers; data is sent to Kinesis Firehose or Kinesis Data Streams; Kinesis Data Analytics runs SQL on data; data stored in AWS data stores

###### Consumers

* Kinesis Client Library runs on the consumer instance

  * tracks the number of shards in your system
  * discovers new shards after resharding
  * ensures that for every shard, there is a record processor
  * manages the number of record processors relative to the number of shards and consumers

    * will load balance if you have multiple consumers
* generally number of consumer instances should not be higher than the number of shards 

  * exceptions being failure or standby purposes
* you never need multiple consumers to handle the processing load one shard; one consumer can process multiple shards

  * **CPU utilization should be the metric for increasing/decreasing your consumer quantity - best practice use an Auto Scaling group based on CPU load**

### ElasticBeanstalk -

##### What it is

* <https://aws.amazon.com/elasticbeanstalk/>
* **service to deploy and scale applications - "quickest and easiest way"**

  * supports go, ruby, node, java, .net, and php
  * supports tomcat and docker
  * allows developers to deploy code without worrying about the underlying infrastructure 
* handles

  * infrastructure - provisioning AWS resources; load balancing; scaling; monitoring metrics and health (+ dashboarding)
  * application platform - installing and managing the stack; patches/updates on the OS and applicaiton platform 
* gives you complete administrative control over the AWS resources it creates/manages
* **no additional charges for using ElasticBeanstalk - only pay for the resources you create/deploy**

##### Updating Applications

* All at once deployment - deploys to all hosts concurrently

  * will result in a total outage (service interruption)
  * not ideal for mission-critical production systems
  * failure results in a rollback (another outage)
  * useful for dev/testing
* rolling update - deploys the new version in batches

  * reduces your capacity during the update process 
  * not ideal for performance sensitive systems
* rolling with additional batch - launches an additional batch of instances; then deploys the new version in batches

  * maintains full capacity during the update
  * failure results in doing another rolling update to undo the changes
* immutable - deploys new version to a fresh group of instances; then deletes the old instances

  * old instances deleted when new instances pass their healthchecks
  * if deployment fails, delete the new instances - no need to rollback changes
  * preferred for mission-critical systems
* traffic splitting - deploys new version to a fresh group of instances; then forwards a percentage of incoming traffic to the new version for a specified evaluation period

  * similar to immut
  * enables canary testing during deployments

##### Customizing Elastic Beanstalk environment

* Amazon Linux 1 - configuration files (old way but still supported)

  * define packages to install; Linux users and groups to create; shell commands to run; services to enable; load balancer configurations
  * YAML or JSON format
  * file must be have a  `.config` file extension
  * must be inside a folder named `.ebextensions` at the root level of the application's repo
* Amazon Linux 2

  * **use `Buildfile`, `Procfile`, and `platform hooks` to configure** 
  * Buildfile - commands that run for a short time, then exit on completion

    * Buildfile must be at root level in the application's repo
    * `process_name`: `command` format
    * e.g. 'make: ./build.sh' (build.sh must be in the directory)
  * Procfile - long running application processes (continuously running)

    * Procfile must be at root level in the application's repo
    * `process_name`: `command` format
    * e.g. `app: bin/app` (bin must be in the directory, app must be in bin)
    * Elastic Beanstalk monitors and restarted terminated processes 
  * platform hooks - custom scripts or executable files that run at specified stages in the EC2 provisioning process

    * stored in dedicated folders in the application's repo
    * `.platform/hooks/prebuild` - files that run before building, setting up, and configuring 
    * `.platform/hooks/predeploy` - files that run after building, setting up, and configuring but before deploying
    * `.platform/hooks/postdeploy` - files that run after deploying

##### RDS and Elastic Beanstalk

* 2 options
* launch RDS within Elastic Beanstalk

  * launch RDS instance from Elastic Beanstalk console
  * RDS is created within the Elastic Beanstalk environment
  * **terminating the environment terminates the database**
  * useful for dev/testing - inflexible 
  * no need to configure security groups
* launch RDS outside Elastic Beanstalk

  * launch RDS from RDS console or AWS CLI
  * allows for tearing down the application environment without affecting the database
  * preferred for prod - more flexible
  * need to add a security group to your environment's Auto Scaling group
  * need to provide connection string information to your application servers (using Elastic Beanstalk environment properties)

##### Windows Web Application Migration Assistant

* formerly known as .NET Migration Assistant
* **interactive powershell utility - enables migrating a .NET application or entire website from Windows servers to Elastic Beanstalk**

##### Deploying Docker Containers using Elastic Beanstalk

* can deploy a Docker container to a single EC2 instance
* can deploy multiple Docker instances to an ECS cluster
* to deploy a Docker application, upload your code bundle to Elastic Beanstalk

  * code can be uploaded from local or an S3 bucket
* **upgrading - use console to upload your code and deploy a new version; bundle your Dockerfile and application code into a zip file and upload** 

  * Elastic Beanstalk will also manage old versions
* if using CodeCommit to store your code, you must use the Elastic Beanstalk CLI (out of scope for exam)