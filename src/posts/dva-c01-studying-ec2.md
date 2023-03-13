---
slug: dva-c01-ec2
title: DVA-C01 studying -  EC2, EBS, Elastic Load Balancer, RDS, Elasticache,
  Systems Manager Parameter Store
date: 2022-07-05T15:15:27.099Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - Elastic
  Compute Cloud, Elastic Block Store, Elastic Load Balancer, Relational Database
  Service, Elasticache, Systems Manager Parameter Store
tags: [DVA-C01, software-dev]
---
### EC2 - Elastic Compute Cloud

##### What it is

* <https://aws.amazon.com/ec2/>
* a secure, resizable compute capacity in the hosted on AWS
* instances are similar to a VM, some differences <https://www.alibabacloud.com/topic-center/a/fcsoqejo9rg1-whats-the-difference-between-vms-and-ec2-instances-alibaba-cloud>
* hosted on AWS, not your own datacenter
* can scale capacity on demand (when you need it)

  * no wasted capacity; grows/shrinks as needed 
* provides root/admin access to your instances
* pay only for what you use (pay as you go model)
* unlike physical servers, no long term investment in hardware; no need to requisition a server, no need to find physical space for the new server, no need to wire up networking, no need for IT to install and manage the OS. EC2 allows you to be up and running in minutes instead of months

##### Pricing Models

* <https://aws.amazon.com/ec2/pricing/>
* On Demand

  * pay by the hour or second depending on the type of instance
  * only pay for the time your instance is running
  * flexible and low cost
  * useful for applications with short-term, spiky, or unpredictable workloads
  * useful for proof of concept work
* Reserved (Savings Plans)

  * reserve EC2 capacity for 1 or 3 years
  * up to 72% discount from On Demand (Standard Reserved Instances)
  * up to 54% discount from On Demand (Convertible Reserved Instances)

    * has the option to change to a difference instance type of equal or greater value
  * operate at a regional level, discount doesn't apply to instances in regions outside your reserved one
  * useful for applications with predictable usage and/or specific capacity requirements
  * Scheduled Reserved Instances

    * launch within a time window you define 
    * useful if you have a predictable, reoccurring schedule
* Spot Instances

  * purchase unused capacity
  * up to 90% discount, prices based on supply and demand
  * set a maximum price you want to pay for the instance, actually price fluctuates depending on supply/demand

    * instance is hibernated or terminated when the maximum is exceeded
  * useful for applications with a flexible start/end time
  * useful for applications that only make sense at low compute prices
  * useful for applications with urgent needs for large amounts of additional capacity
* Dedicated Hosts

  * a physical server dedicated for you
  * most expensive option
  * good option for software licenses tied to specific hardware or compliance/regulatory requirements against multitenant hardware
  * can be purchased on demand or reserved
* Savings Plans

  * save up to 72% on all AWS Compute usage (region and instance type agnostic)
  * commit to a 1 or 3 years for a specific amount of computer power (measured $/hr)
  * includes EC2 in addition to serverless services 
* AWS Pricing Calculator - useful for getting cost estimates
* REMEMBER TO TURN OFF SERVICES YOU'RE NOT USINGInstance Type

##### Instance types

* <https://aws.amazon.com/ec2/instance-types/>
* NOT REQUIRED TO MEMORIZE FOR ASSOCIATE CERTIFICATIONS
* Hardware

  * instance type determines the hardware your instance runs on
* Capabilities

  * instance type determines the computer, memory, and storage capabilities of the instance
  * grouped by families 

### EBS- Elastic Block Store

##### What it is

* <https://aws.amazon.com/ebs/>
* storage volumes (disks) you can attach to your instance 

  * can be used like system storage - file systems, databases, operating systems, data storage, install applications/services, etc.
* Designed for mission critical, production, workloads

  * highly available
  * automatic replication within a single availability zone
  * dynamically scaleable for capacity and volume type

##### Volume Types

*(IPOS = Input/output operations per second)*

*(OLTP = online transaction processing)*

*(ETL = extract, transform, and load)*

* IOPS vs Throughput

  * IOPS

    * ability to r/w quickly
    * measures number of r/w operations per second
    * metric for quick transactions, low latency apps, transactional workloads
  * Throughput

    * ability to deal with large datasets
    * measures the number of bits r/w per second (MB/s)
    * metric for large datasets, large I/O sizes, complex queries
* General Purpose SSD (gp2)

  * suitable for boot disks and general applications
  * suitable for applications that are not latency sensitive
  * up to 16,000 IOPS per volume
  * up to 99.9% durability
* Provisioned IOPS SSD (io1)

  * suitable for OLTP and latency sensitive applications
  * 50 IOPS/GiB
  * up to 64,000 IOPS per volume
  * up to 99.9% durability
  * high performance and the most expensive
* Provisioned IOPS SSD (io2)

  * suitable for OLTP, I/O intensive applications, large databases, latency sensitive workloads
  * 500 IOPS/GiB
  * up to 64,000 IOPS per volume
  * up to 99.999% durability
  * latest generation provisioned IOPS volume
  * same price as io1
* Provisioned IOPS SSD io2 Block Express

  * provides high performance, sub-millisecond latency SAN performance in the cloud
  * suitable for the largest, most critical, high-performance applications
  * support up to 64 TB and 256,000 IOPS per volume
* Throughput Optimized HHD (st1)

  * suitable for Big Data, data warehouses, ETL, log processing, throughput intensive workloads
  * cannot be boot volume
  * max throughput of 500 MB/s per volume
  * up to 99.9% durability
* Cold HDD (sc1)

  * suitable for less frequently accessed data
  * suitable for applications where performance is not a factor
  * cannot be boot volume
  * max throughput of 250 MB/s per volume
  * up to 99.9% durability
  * lowest cost

### Elastic Load Balancer

* <https://aws.amazon.com/elasticloadbalancing/>

##### What it is

* distributes network traffic across multiple servers

##### Load Balancer Types

* Application Load Balancer

  * suitable for load balancing HTTP and HTTPS traffic
  * operate at Layer 7 and are application aware (<https://en.wikipedia.org/wiki/OSI_model>) - NOT ON EXAM

    * Layer 7 is the application layer - HTTP, what the end user sees, high level APIs, remote file access
    * Layer 6 is the presentation layer - transitioning data between the network and application: character encoding, data compression and encryption/decryption
    * Layer 5 is the session layer - manages communication sessions 
    * Layer 4 is the transport layer - transmitting data segments between two points on the network using TCP and UDP
    * Layer 3 is the network layer - logically routing packets based on IP address
    * Layer 2 is the data link layer - transmitting data frames between 2 nodes (MAC addresses) on the physical layer
    * Layer 1 is the physical layer - transmitting raw bits over physical devices
  * supports advanced routing based on HTTP headers
* Network Load Balancer

  * suitable for load balancing TCP traffic  - high performance
  * operates at Layer 4
  * capable of handling millions of requests/s with low latency
  * most expensive
* Classic Load Balancer

  * legacy option
  * supports some Layer 7 specific features like X-Forwarded-For headers and sticky sessions

    * X-Forwarded-For header - allows you to identify the originating IP address of the client
  * supports some  Layer 4 load balancing for applications the rely solely on TCP 
* Gateway Load Balancer

  * provides load balancing for 3rd party services like firewalls and Intrusion Detection and Prevention Systems
* 504 Error

  * Error 504 Gateway Timeout
  * means the application (target) has failed to respond

    * load balancer could not connect to the target
    * your application is probably having issues
    * solve the error by identifying the problem and fixing your application

### Route53

* <https://aws.amazon.com/route53/>
* highly available and scalable cloud Domain Name System (DNS) 

  * <https://www.cloudflare.com/learning/dns/what-is-dns/>

[](https://aws.amazon.com/route53/)

### RDS - Relational Database Service

* <https://aws.amazon.com/rds/>

##### What it is

* traditional, tabular database in the cloud

  * supports Microsoft SQL Server, Oracle Database, MySQL, PostgreSQL, MariaDB, Amazon Aurora 
  * Aurora scales automatically and is compatible with MySQL or PostgreSQL
* can launch a relational database with multiple availability zones, failover capability, and automated backups within minutes (would normally take a week plus in traditional datacenters)

##### OLTP vs OLAP

* Online Transaction Processing (OLTP)

  * process data from transactions in real time
  * focused on data processing and handling a large volume of small transactions 
  * what RDS is designed for, processing lots of small transactions
* Online Analytics Processing (OLAP)

  * process complex quieries to analyze historical data (not real time)
  * focused on data analysis with large volumes of data and complex, long-running queries
  * not suitable for RDS, consider using a data warehouse like RedShift

##### Multi-AZ and read replicas

* Mutli-AZ

  * exact copy of your production database in another availability zone (primary and standby)
  * standby instance is not typically available unless the primary instance is down, RDS will then automatically failover to the standby without an admin
  * RDS handles the replication for you
  * supports all RDS database engines
  * used for disaster recovery, **not for scalability**
* Read Replicas

  * read-only copy of your production database
  * great for read heavy workloads and reduces the load on your primary instance 
  * can be in the same AZ as your primary database instance or cross AZ (different AZ) or cross region (entirely different region)
  * each read replica has its own DNS endpoint
  * read replicas can be promoted to be their own independent databases (adds write access but breaks replication from the original primary instance)
  * used for scaling read performance
  * requires automatic backups
  * multiple read replicas supported

##### Backups and Snapshots

* Automated Backups

  * enabled by default
  * creates full daily backups or snapshots during your defined backup window

    * during the backup window your storage I/O may be suspended for a couple seconds
  * uses transaction logs to replay transactions
  * allows for a point-in recovery for **any point in time** within your retention period 
  * stored in S3, free storage equal to your RDS instance type
* Database Snapshot

  * manual process (not automated)
  * creates a snapshot of the storage volume attached to the DB instance
  * allows you to backup to a known state
  * no retention period
  * stored in S3, free storage equal to your RDS instance type
* Restored versions of a database will always be a **new** RDS instance with a **new** DNS endpoint
* Encryption

  * enable encryption at **creation time**
  * completely integrated with KMS (AES-256 encryption) 
  * includes all the underlying storage, automated backups, snapshots, logs, read-replicas, etc. 
  * you cannot enable encryption on an existing unencrypted RDS instance

    * workaround. take a snapshot of the unencrypted database, encrypt the snapshop, perform a db restore using the encrypted snapshop 

### Elasticache

* <https://aws.amazon.com/elasticache/>

##### What it is

* web service that makes it easy to deploy, operate, and scale an in-memory cache (key-value datastore) in the cloud

  * supports Redis and Memcached
* great for read-heavy database workloads - cache the results for faster access instead of querying the database
* useful for storing session data
* Memcached

  * great for basic object caching, simple usecases
  * scales horizontally, but no: persistence, mutli-AZ, or failover
* Redis

  * supports sophisticated caching: sorting and ranking data; complex datatypes like lists and hashes
  * includes enterprise features like persistence, replication, mutli-AZ, and failover

##### When to use an in-memory cache

* good choice for read heavy data that doesn't change often
* not a good choice for heavy write loads
* not a good choice for OLAP usecases

### Systems Manager Parameter Store

* <https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html>
* way to store confidential information

  * passwords, database connections, licenses, etc 
  * store as plaintext or encrypted using KMS
* parameters can be referenced using parameter name
* integrates with other AWS services