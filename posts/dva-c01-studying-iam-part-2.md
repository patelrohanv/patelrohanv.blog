---
title: DVA-C01 studying - IAM (Part 2)
date: 2022-07-11T20:06:43.502Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - Identity and
  Access Management (part 2)
tags:
  - DVA-C01
  - software-dev
---
### IAM - Identity and Access Management

##### Web Identity Federation

* simplifies authentication and authorization for web applications
* allows users to access AWS services after (successfully) authenticating with a web-based identity provider
* successful authentication returns an authentication code from the provider -> authentication code is used for temporary security credentials -> temporary credentials authorize access to AWS resources 

###### Amazon Cognito

* <https://aws.amazon.com/cognito/>
* provides web ID federation, including: single sign-up, single sign-in, guest user access
* acts as an identity broker - manages authentication between your application and web ID providers (no extra code)
* supports multiple devices - synchronizes data 
* recommended for all mobile applications that use AWS services

##### Inline Policies 

##### Managed Policies

##### Customer Managed Policies

##### STS AssumeRoleWithWebIdentity