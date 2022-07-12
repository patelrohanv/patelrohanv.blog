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
* When to use:

  * large, distributed applications that need a delay in processing
  * you need to apply a delay to an entire message queue 

##### managing large messages

* for messages 256kb up to 2GB in size
* use S3 to store the messages
* use `Amazon SQS Extended Client Library` to manage and the `AWS SDK` for S3 and object operations

  *

### SNS - Simple Notification Service

##### What it is

* <https://aws.amazon.com/sns/>[](https://aws.amazon.com/dynamodb/)[](https://aws.amazon.com/kms/)[](https://aws.amazon.com/sqs/)

### SES - Simple Email Service

##### What it is

* [](https://aws.amazon.com/dynamodb/)[](https://aws.amazon.com/kms/)[](https://aws.amazon.com/ses/)<https://aws.amazon.com/ses/>

### Kinesis - 

##### What it is

* [](https://aws.amazon.com/dynamodb/)[](https://aws.amazon.com/kms/)[](https://aws.amazon.com/ses/)[](https://aws.amazon.com/ses/)<https://aws.amazon.com/kinesis/>

### ElasticBeanstalk - 

##### What it is

* [](https://aws.amazon.com/dynamodb/)[](https://aws.amazon.com/kms/)[](https://aws.amazon.com/ses/)[](https://aws.amazon.com/ses/)[](https://aws.amazon.com/kinesis/)<https://aws.amazon.com/elasticbeanstalk/>