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
  * designed for 
* S3 Standard-Infrequent Access
* S3 One Zone-Infrequent Access
* S3 Glacier and S3 Glacier Deep Archive
* Intelligent-Tiering
* Relative Costs

##### Buckets

* universal namespace across all AWS accounts

  * each S3 bucket is globally unique
  * URLS follow an https://<bucket>.s3.Region.amazonaws.com/<key>
* successfully uploading a file to a bucket returns a 200

##### Securing Buckets

* access control lists (ACLs) - define which AWS accounts/groups have access and what type of access

  * 3 ACLs can be attached to individual objects in a bucket
* bucket policies - specific what actions are allowed or denied

##### Encryption

* server side encryption - set default encryption to encrypt all new objects being stored in a bucket

### Cloudfront

##### What it is

* <https://aws.amazon.com/cloudfront/>