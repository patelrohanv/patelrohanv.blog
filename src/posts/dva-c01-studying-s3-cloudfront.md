---
slug: dva-c01-s3-cloudfront
title: DVA-C01 studying - S3, CloudFront
date: 2022-07-06T14:18:29.497Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - S3, CloudFront
tags: [DVA-C01, software-dev]
---
### S3 - Simple Storage Service

##### What it is

* `https://aws.amazon.com/s3/`
* scaleable, low cost, object storage
* cannot run an operating system or database
* manages data as objects instead of files or blocks

  * you can upload any file type
  * **"unlimited" storage in volume and objects count**
  * **5TB max object size (largest object in a PUT is 5GB) (no minimum size - can upload a 0byte file)**
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

##### Cross Origin Resource Sharing (CORS)

* **sharing resources between services in the same origin, e.g. one bucket trying to use a file in another**
* grant read access to your buckets and files
* edit CORS setting in your bucket

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

  * **each S3 bucket is globally unique**
  * **URLS follow an https://`bucket`.s3.`Region`.amazonaws.com/`key` or https://`bucket`.s3-`Region`.amazonaws.com/`key`**
* **by default all S3 buckets and objects are private**
* **successfully uploading a file to a bucket returns a 200**

##### Securing Buckets

* all newly created buckets are private by default
* access control lists (ACLs) - define which AWS accounts/groups have access and what type of access

  * 3 ACLs can be attached to individual objects in a bucket
  * applied at object level - granular control
* bucket policies - specific what actions are allowed or denied

  * applied at bucket level, not individual objects
  * policy's applied to all objects in the bucket
  * useful for groups of files that the same person or group needs to access 
  * written in JSON (AWS provides a policy creator tool)
* can be configured to create access logs

  * logs can be written to another bucket
  * not enabled by default
* **S3 objects are private by default, owners can create a presigned URL (using their own credentials) to grant time limited permission to access the object**
* helpful CloudFront services for securing access 

  * **CloudFront Signed Cookies**
  * **CloudFront Origin Access Identity**
  * **CloudFront Signed URLs** 

##### Encryption

* encryption in transit

  * SSL/TLS
  * HTTPS
* server side encryption (encryption at rest)

  * set default encryption to encrypt all new objects being stored in a bucket
  * SSE-S3 - S3 managed keys (AES-256encryption)
  * SSE-KMS - AWS Key Management Service 
  * SSE-C - customer provided keys
  * **Exam tip, remember all three and that S3 is AES-256**
* client side encryption (encryption at rest)

  * you encrypt the files yourself before you upload them
* Enforcing server side encryption

  * selecting the encryption setting in the console for your bucket
  * bucket policy

    * for example, policy to deny put object requests that don't include the **"s3:x-amz-server-side-encryption": "true"** header to enforce server-side encryption
    * another example, policy to deny requests that do not use "**aws:SecureTransport": "false"** to enforce HTTPS/SSL

### Cloudfront

##### What it is

* <https://aws.amazon.com/cloudfront/>
* content delivery network (<https://www.cloudflare.com/learning/cdn/what-is-a-cdn/>)
* easy, cost efficient way to distribute content with low latency and high data transfer speeds

  * speeds up the delivery of your content
* can deliver your entire website
* 200+ global edge locations
* requests are automatically routed to the nearest edge location
* optimized to work with AWS services but can work seamlessly with a non-AWS origin server (which stores your originals)
* objects in it are cached for a period of time

  * called Time to Live
  * default TTL is 1 day
  * objects are automatically cleared after their TTL
  * costs money to clear an object from the cache before TTL

##### Terminology

* edge location - where the content is being cached

  * not read only, supports writes (PUTs)
  * separate to an AWS Region or AZ
  * users can access edge locations instead of having to access origin each time they make a request
* origin - where all the files on the CDN will originate from

  * origins can be S3 bucket, EC2 Instance, an Elastic Load Balancer, Route53, etc.
* distribution - name given to the origin and configuration settings
* web distribution - typically used for websites

  * HTTP/HTTPS
* RTMP - typically used for media streaming

  * stands for Adobe Real Time Messaging Protocol
* Origin Access Identity (OAI) - special CloudFront User that can access files in our bucket and serve them to users

  * allows us to restrict access to the bucket, in which case, users must use the CloudFront url instead of the S3 bucket url

##### S3 Transfer Acceleration

* enables fast, easy, and secure transfers of data between users and an S3 bucket
* as data arrives at an edge location, it gets routed to the relevant Amazon S3 bucket

  * optimizes the network path between the two

##### AllowedMethods

* need to specify which HTTP methods your distribution will support (3 options)

  * GET, HEAD (read only)
  * GET, HEAD, OPTIONS (read only)
  * GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE (r/w)
* HTTP methods <https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods>