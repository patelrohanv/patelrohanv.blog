---
title: DVA-C01 studying - DynamoDB
date: 2022-07-07T19:21:03.667Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - DynamoDB
tags:
  - DVA-C01
  - software-dev
---
### DynamoDB

##### What it is

* <https://aws.amazon.com/dynamodb/>
* fast, flexible, fully managed NoSQL database

  * fast - consistent, single-digit millisecond latency
  * flexible data model - supports both document (JSON, HTML, and XML) and key-value data models 
* can be configured to auto-scale
* stored on SSD storage
* spread across 3 geographically distinct datacenters
* consistency models

  * Eventual Consistent Reads (default)

    * consistency across all (3) copies of the data (usually) reached within a single second
    * best read performance
  * Strong Consistent Reads

    * always reflects all successful write
    * writes are reflected across all 3 datacenters at once
    * best for read consistency 
  * DynamoDB Transactions

    * provide the ability to perform ACID Transactions (atomic, consistent, isolated, durable)
    * read or write multiple items acrosss multiple items as an all or none operation 
* Tables (think tables in SQL)

  * consist of items (rows) and attributes (columns)
  * data models

    * key-value pair (key - name of the data; data - the actual data)
    * documents i.e. JSON, HTML, and XML
* Primary Keys

  * data is stored and retrieved based on primary key
  * two types of keys - partition and composite
  * partition key

    * must be an attribute with unique values, no two items can share the same partition key
  * composite key

    * partition key + sort key
    * items can have the same partition key but must have a different sort key
    * all items with the same partition key are stored together and sorted by the sort key

##### Access Control

* authentication and access control is managed by AWS IAM
* can create IAM users with specific permissions to access and create DynamoDB tables
* can create IAM roles, enabling temporary access to DynamoDB
* restricting access to only the user's own records - IAM condition 

  * done by adding a condition to an IAM Policy, `dynamodb:LeadingKeys `