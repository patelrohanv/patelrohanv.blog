---
slug: dva-c01-kms
title: DVA-C01 studying - KMS
date: 2022-07-11T19:39:40.729Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - Key
  Management Service
tags: [DVA-C01, software-dev]
---
### KMS - Key Management Service

##### What it is

* [](https://aws.amazon.com/dynamodb/)<https://aws.amazon.com/kms/>
* **managed service for creating and controlling the encryption keys used to encrypt your data**

  * **encryption keys are Single-Region by default**
* **can be multi-tenant**
* seamless integration with a plethora of AWS services (usually a checkbox in the console when configuring services)
* makes it simple to encrypt your data with encryption keys you manage
* when to use:

  * anytime you are storing secret/sensitive data e.g. passwords, credentials, secrets, financial data, customer data
* **cannot use AWS managed keys in cryptographic operations directly** 
* **list of CLI commands** <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/index.html>

  * `aws kms encrypt` **command to encrypt files into ciphertext using a customer master key**
  * `aws kms decrypt` **command to decrypt ciphertext encrypted with a KMS CMK**
  * `aws kms rencrypt` **command to encrypt files using a customer master key**
  * `aws kms enable-key-rotation` **command to enable automatic key rotation every 365 days**
  * `aws kms re-encrypt`  **encrypts data on the server side with a new CMK without exposing the plaintext of the data on the client side**

##### CMK - Customer Master Key

* encrypt/decrypt up to 4kb of data
* used to generate/encrypt/decrypt the Data Key
* Data Key - key used to encrypt/decrypt your data

  * CMK encrypts the Data Key (under 4kb), the Data Key encrypts your data (likely over 4kb) - envelope encryption
* properties

  * can be aliased - alias can be referenced in applications
  * tracks the date/time it was created 
  * can have a user added description
  * tracks it's state - enabled, disabled, pending deletion, or unavailable 
  * key material can either be user generated externally or generated via AWS
  * **cannot be exported outside of KMS**
* example setup process

  1. create an alias
  2. add a description
  3. chose a Key Material
  4. set Key Administrative Permssions - IAM users and roles that can administer (not use) the key through the KMS API 
  5. set Key Usage Permission - IAM users and roles that can use the key to encrypt/decrypt data

##### Envelope Encryption

* process for encrypting data

  * encrypts plaintext data with a data key, and then encrypting the data key with another key
* typically used for files greater than 4KB in size
* encryption process

  1. CMK exists in KMS
  2. `aws kms generate-data-key`or** `GenerateDataKey` used to create Data Key**
  3. CMK encrypts the Data Key
  4. Data Key encrypts your data
  5. encrypted Data Key is stored locally with the data (not in KMS) - used later for decryption purposes 
* decryption process

  1. encrypted data exists with encrypted Data Key
  2. CMK uses KMS API to run a decrypt operation on the Data Key - decrypted Data Key returns in plaintext
  3. decrypted Data Key used to decrypt the data
  4. decrypted Data Key is deleted from memory
* why use?

  * network performance - encrypting data directly with KMS requires it must be transfered over the network
  * envelop encryption ensures that only the key, not the data, is sent over the network - avoids need to transfer large amounts of data to KMS (over the network)
  * **protects encryption key**