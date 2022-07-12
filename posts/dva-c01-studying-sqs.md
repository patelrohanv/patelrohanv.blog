---
title: DVA-C01 studying - SQS
date: 2022-07-12T17:52:58.344Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - Simple Queue Service
tags:
  - DVA-C01
  - software-dev
---
### SQS - Simple Queue Service

##### What it is

* [](https://aws.amazon.com/dynamodb/)[](https://aws.amazon.com/kms/)<https://aws.amazon.com/sqs/>
* distributed message queue service (temp buffer to store messages waiting to be processed) 

  * <https://www.youtube.com/watch?v=oUJbuFMyBDk> <- good explanation of message queues 
  * helps decouple components of an application
  * messages can contain up to 256KB of text in any format (plaintext, XML,JSON, etc)
* **pull based, not push based - application sevices are pulling the messages from the queue rather than them being pushed out**
* guarantees messages will be processed at least once
* messages can be kept in queue from 1minute up to 14 days - default retention period is 4 days 

##### Types of Queues

* standard queues (default)

  * best-effort ordering - messages are generally delivered in the order they were sent but will occasionally be delivered out of order or more than one copy of the message will be delievered
  * nearly unlimited number of transactions per second
  * guarantees that a message is delivered at least once
* FIFO queues (first in first out)

  * ordering is strictly preserved - messages delivered in the order they were sent
  * no duplicate messages will ever be sent
  * exactly-once processing - message is delivered once and remains available until a consumer processes and deletes it
  * 300 transactions per second
  * ^minus these, same capabilities as a standard queue 
  * good usecase - banking 

##### Visibility Timeout (configuration) 

* the amount of time a message is invisible in the queue after a reader reads the message for processing

  * if the job is not processed within that time, the message will become visible again for another reader to read 
  * default is 30sec - need to increase if your task will take longer
  * maximum is 12hrs

##### Polling

* Short Polling

  * returns a response immediately even if the message queue being polled is empty
  * can result in a lot of empty responses
  * pay per response (even empty ones)
* Long Polling

  * periodically polls the queue 
  * doesn't return a response until a message arrives in the queue or the long poll times out 
  * **generally preferable to short polling** - also saves money

##### Delay Queues (configuration)

* postpone the delivery of new messages (setting change)

  * does not affect the delay of messages already in the queue, only new ones - standard queues
  * does affect the delay of messages already in the queue - FIFO queues
* messages in the Delay Queue remain invisible for the delay period (0-900sec)
* When to use:

  * large, distributed applications that need a delay in processing
  * you need to apply a delay to an entire message queue 

##### managing large messages

* for messages 256kb up to 2GB in size
* use S3 to store the messages
* use `Amazon SQS Extended Client Library` to manage and the `AWS SDK` for S3 and object operations

  * AWS docs default to Java for the library and SDK
  * cannot use `AWS CLI`, `AWS Management Console`, `SQS Console`, `SQS API`

### SNS - Simple Notification Service

##### What it is

* <https://aws.amazon.com/sns/>[](https://aws.amazon.com/dynamodb/)[](https://aws.amazon.com/kms/)[](https://aws.amazon.com/sqs/)
* web service to setup up, operate, and send push notifications from the cloud

  * messages sent can immediately be delivered to subscribers or other applications
* can send push notifications to a Apple, Google, Android, Windows, and other devices 
* can send SMS or email or send to SQS queues or HTTP endpoints 
* can trigger Lambda function 
* uses a pub-sub model

  * https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
  * applications publish/push messages to a topic; subscribers recieve message from the topic
* topic - a logical access point that acts as a communication channel for recipients to subscribe to and recieve identical copies o the same notification
* includes durable storage - prevents messages from being lost

  * all messages published to SNS are stored redundantly across multiple AZ

###### Pros

* pay-as-you-go pricing model; no up-front costs
* easy to configure from AWS management console
* scalable and highly available
* managed service with durable storage
* supports multiple transport protocols - SMS, HTTP, SQS, email, etc
* can trigger lambda functions
* instantaneous, push notifications (no polling)
* can fannout messages to a large number of recipients

### SES - Simple Email Service

##### What it is

* [](https://aws.amazon.com/dynamodb/)[](https://aws.amazon.com/kms/)[](https://aws.amazon.com/ses/)<https://aws.amazon.com/ses/>
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

* [](https://aws.amazon.com/dynamodb/)[](https://aws.amazon.com/kms/)[](https://aws.amazon.com/ses/)[](https://aws.amazon.com/ses/)<https://aws.amazon.com/kinesis/>
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
    * can increase a Stream's capacity by increasing the number of shards

    ###### Kinesis Video Streams

    * securely stream video from connectect devices to AWS 
* Kinesis Data Firehose

  * capture, transform, and load data streams into AWS data stores
  * allows for near-real-time analytics
* Kinesis Data Analytics

  * analyze, query, and transform streamed data (in real-time); storing results in an AWS data store
  * uses standard SQL

### ElasticBeanstalk - 

##### What it is

* [](https://aws.amazon.com/dynamodb/)[](https://aws.amazon.com/kms/)[](https://aws.amazon.com/ses/)[](https://aws.amazon.com/ses/)[](https://aws.amazon.com/kinesis/)<https://aws.amazon.com/elasticbeanstalk/>