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

  * best-effort ordering
* FIFO queues (first in first out)

  * ordering is strictly preserved