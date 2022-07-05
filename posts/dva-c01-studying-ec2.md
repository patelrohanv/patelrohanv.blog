---
title: DVA-C01 studying -  EC2
date: 2022-07-05T15:15:27.099Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - Elastic Compute Cloud
tags:
  - DVA-C01
  - software-dev
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

*(IPOS = Input/output operations per second )*

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
  * up to 16,000 IOPS per volume
  * up to 99.9% durability
* Provisioned IOPS SSD (io1)

  * suitable for OLTP and latency sensitive applications
  * 50 IOPS/GiB
  * up to 64,000 IOPS per volume
  * up to 99.9% durability
  * high performance and the most expensive
* Provisioned IOPS SSD (io2)

  * suitable for OLTP and latency sensitive applications
  * 500 IOPS/GiB
  * up to 64,000 IOPS per volume
  * up to 99.999% durability
  * latest generation provisioned IOPS volume
* Throughput Optimized HHD (st1)

  * suitable for Big Data, data warehouses, ETL
  * cannot be boot volume
  * max throughput of 500 MB/s per volume
  * up to 99.9% durability
* Cold HDD (sc1)

  * suitable for less frequently accessed data
  * cannot be boot volume
  * max throughput of 250 MB/s per volume
  * up to 99.9% durability
  * lowest cost

### Elastic Load Balancer

* <https://aws.amazon.com/elasticloadbalancing/>

##### What it is

### RDS -

* <https://aws.amazon.com/rds/>

##### What it is

### Elasticache

* <https://aws.amazon.com/elasticache/>

##### What it is