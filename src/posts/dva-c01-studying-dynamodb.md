---
slug: dva-c01-dynamodb
title: DVA-C01 studying - DynamoDB
date: 2022-07-07T19:21:03.667Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - DynamoDB
tags: [DVA-C01, software-dev]
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
    * read or write multiple items across multiple items as an all or none operation 
* Tables (think tables in SQL)

  * consist of items (rows) and attributes (columns)
  * data models

    * key-value pair (key - name of the data; data - the actual data)
    * documents i.e. JSON, HTML, and XML
* Primary Keys

  * data is stored and retrieved based on primary key
  * also known as hashattribute
  * two types of keys - partition and composite
  * partition key

    * **must be an attribute with unique values, no two items can share the same partition key**
  * composite key

    * partition key + sort key
    * items can have the same partition key but must have a different sort key
    * **all items with the same partition key are stored together and sorted by the sort key**
* Sort Keys

  * also known as rangeattribute
  * used to group and sort data entries

##### Access Control

* authentication and access control is managed by AWS IAM
* can create IAM users with specific permissions to access and create DynamoDB tables
* can create IAM roles, enabling temporary access to DynamoDB
* restricting access to only the user's own records - IAM condition 

  * done by adding a condition to an IAM Policy, `dynamodb:LeadingKeys`

##### Indexes

* secondary index 

  * allows performing more flexible querying based on an attribute that is not the primary key
  * allows for fast queries on specific columns instead of the the entire dataset - gives a different, smaller view of the data
  * uses global secondary indexes and local secondary instances
  * local secondary index

    * can only be done when you are creating a table and it has the same partition key as your original table but a different sort key - allows for faster queries on this smaller view of the data
    * **can only be created when you create the table, can't be added, removed, or modified after**
  * global secondary index

    * **can be created ad-hoc or when you create the table; can be deleted anytime**
    * uses a different partition and sort key - results in an entirely different smaller view of the data
    * still allows for faster queries using the alternative partition and sort key
    * **initial quota is 20 per table, can be increased by raising a ticket to AWS support**

##### Querying data

* Query API - finds items in a table based on the primary key and a distinct value to search for 

  * can use an optional sort key name to narrow down results
  * by default returns all the attributes for the items you select

    * `ProjectExpression` can be used to only get specific attributes 
  * always sorted by sort key

    * defaults to ascending order
    * `ScanIndexForward` - can be used to reverse the sorted order (only relates to queries)
  * all queries are eventually consistent - can be explicitly be set to strongly consistent
* Scans - examines every item in the table

  * **by default, returns all data attributes**

    * `ProjectExpression` can be used to only get specific attributes 
  * results can be filtered after being run
* comparing queries and scans

  * querying is more efficient than scanning

    * scans dump the entire table and then filters it - as the table grows the longer this takes
    * a scan on a large table can use up the provisioned throughput for a large table in just a single operation
* improving performance (query and scans)

  * **setting a smaller page size**
  * running more smaller operates helps mitigate throttling
  * in general avoid using scans - design tables to favor: Query API, Get API, or BatchGetItem API
  * scans are sequential by default, **can be parallelized**

    * logically divides the table into segments and scans each segment in parallel
    * avoid parallel scans if your table's already under heavy read/write from other applications
  * isolate scans to specific tables and segregate them from mission-critical traffic

##### API Calls

* CLI commands make calls to the DynamoDB API
* user must have the correct IAM permissions to run the commands
* **list of operations** <https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.API.html> 

###### Common Commands

* `describe-table` - returns information about the table (status, creation date, primary key, indexes, etc)
* `scan` - reads and returns every item and it's attributes in a table; use a FilterExpression to trim it down
* `query` - queries a table based on a partition key
* `delete-item` - deletes an item based on the primary key
* `delete-table` - deletes a table 

##### Provisioned Throughput

* measured in capacity units

  * read capacity units and write capacity units can be specified when you create the table
  * **write capacity - 1 x 1KB write/s** 
  * **read capacity - 1 x strongly consistent 4KB read/s OR  2 x eventually consistent 4KB read/s (default)**
* larger reads/writes = consuming more capacity units = more cost
* **limit can be increased by raising a ticket to AWS support**

###### ProvsionedThroughputExceededException

* **exception thrown when your request rate too high for the provisioned read/write capacity on your table**

  * can happen to a variety of AWS services, not just DynamoDB
* if you're using the AWS SDK, it will automatically retry the requests till it succeeds
* if not:

  * **reduce your request frequency**
  * **implement exponential backoff**
* **exponential backoff - using progressively longer waits between consecutive retries to improve flow control** (already implemented in every AWS SDK)

##### On Demand Capacity

* pricing model for dynamoDB
* DynamoDB instantly scales up or down based on activity
* benefits:

  * unknown workloads
  * unpredictable traffic
  * applications with spiky, short-lived peaks
  * great for usecases where it makes sense to have a pay per request model
* downsides - unpredictable costs 

##### Provisioned Capacity

* pricing model for dynamoDB
* benefits:

  * read/write capacity can be forecasted
  * predictable application traffic (consistent or gradually increasing)
  * control over cost

##### DynamoDB Accelerator (DAX)

* **fully managed, clustered, in-memory cache for DynamoDB**
* up to 10x read performance (not write) improvement

  * microsecond performance
* ideal for ready heavy workloads - gaming, auctions, retail, etc
* write-through caching service

  * data is written to the cache and backend store (DynamoDB) at the same time
  * allows for API calls to point to the cache instead of the store

    * cache hit returns the result
    * cache miss results in an eventually consistent `GetItem` from the cluster to the store
* reduces read load on DynamoDB

  * could potentially let you reduce the provisioned read capacity on your table
* not suitable for 

  * usecases requiring strongly consistent reads; only suitable for eventually consistent reads
  * predominantly write-heavy applications
  * applications that don't perform a high volume of reads
  * usescases that don't require a microsecond response time

##### DynamoDB Streams

* **time ordered sequence of item level modifications (insert, update, delete)**
* written to logs, encrypted at rest, and stored for 24hrs
* usecases:

  * can be used for auditing or transaction archives
  * can be used to replay transactions to a different table
  * can be used as an eventsource to trigger other services (like lamdba)
* dedicated endpoint separate from the main table
* by default primary key is recorded - can also store before and after images (state of an item before and after a change)

##### Time To Live (TTL)

* defines an expiry time for your data;  item marked for deletion after expired
* useful for removing irrelevant or old data
* reduces cost; automatically removes unnecessary data