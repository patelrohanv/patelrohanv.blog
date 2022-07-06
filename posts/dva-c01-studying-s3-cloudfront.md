---
title: DVA-C01 studying - S3, CloudFront
date: 2022-07-06T14:18:29.497Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - S3, CloudFront
tags:
  - DVA-C01
  - software-dev
---
### versionS3 - Simple Storage Service

##### What it is

* <https://aws.amazon.com/s3/>
* scaleable, low cost, object storage
* cannot run an operating system or database
* manages data as objects instead of files or blocks

  * you can upload any file type
  * "unlimited" storage in volume and objects count
  * 5TB max object size
  * objects are stored in buckets (analogous to folders)
* key-value store

  * key - name of the object
  * value - object's data
  * version ID
  * metadata
* data is available and durable

  * stored across multiple devices and facilities
  * 99.95%-99.99% service availability depending on tier
  * 99.999999999 (9 decimals) durability for data 
* provides tiered storage, range of options depending on use case
* has lifecycle management (rules driven)

  * automatically transition objects to cheaper storage tiers or delete old objects
* built in versioning

  * all versions of an object are stored/retrievable
  * supports retrieving version of deleted objects

###### Read-after write consistency - for PUTs of new objects

###### Eventual consistency - overwrites PUTs and DELETEs (takes time to propagate)

##### Storage Classes

* S3 Standard

  * High availability and durability 
  * designed for frequent access
  * suitable for most workloads - websites, content distribution, mobile applications, gaming applications, big data analytics
  * default storage class
* S3 Standard-Infrequent Access

  * 99.9% availability; 99.99999999999 (11 digits) durability
  * rapid access

    * data is accessed less frequently but needs rapid access when accessed
  * pay to access data

    * low per GB storage price
    * low per GB retrievable fee
  * suitable for long-term storage, backups, DR
  * Minimum storage duration: 30 days
* S3 One Zone-Infrequent Access

  * 99.5% availability; 99.99999999999 (11 digits) durability
  * similar to S3 Standard-Infrequent Access

    * **data is stored redundantly within a single AZ (all other tiers use at least 3)**
    * costs 20% less than standard
  * suitable for long-lived, infrequently accessed, non-critical data 
  * Minimum storage duration: 30 days
* S3 Glacier and S3 Glacier Deep Archive

  * very cheap storage
  * optimized for infrequently accessed data
  * pay each time data is accessed
  * only used for archiving
  * Glacier

    * 99.99% availability; 99.99999999999 (11 digits) durability
    * long term data archiving - data needs occasional access
    * retrieval times range from 1min to 12hrs 
    * Minimum storage duration: 90 days
  * Glacier Deep Archive

    * 99.99% availability; 99.99999999999 (11 digits) durability
    * archives rarely accessed data
    * default retrieval time is 12hrs
    * Minimum storage duration: 180 days
* S3 Intelligent-Tiering

  * 99.9% availability; 99.99999999999 (11 digits) durability
  * 2 tiers - frequent access; infrequent access
  * automatically moves data to the most cost-efficient tier based on access frequency
  * added monthly fee of $0.0025 per 1000 objects
  * suitable for unknown or unpredictable access patterns 
  * Minimum storage duration: 30 days

##### Buckets

* universal namespace across all AWS accounts

  * each S3 bucket is globally unique
  * URLS follow an https://<bucket>.s3.Region.amazonaws.com/<key>
* successfully uploading a file to a bucket returns a 200

##### Securing Buckets

* all newly created buckets are private by default
* access control lists (ACLs) - define which AWS accounts/groups have access and what type of access

  * 3 ACLs can be attached to individual objects in a bucket
  * applied at object level
* bucket policies - specific what actions are allowed or denied

  * applied at bucket level, not individual objects
  * policy's applied to all objects in the bucket
  * useful for groups of files that the same person or group needs to access 
  * written in JSON
* can be configured to create access logs

  * logs can be written to another bucket

##### Encryption

* server side encryption - set default encryption to encrypt all new objects being stored in a bucket

### Cloudfront

##### What it is

* <https://aws.amazon.com/cloudfront/>