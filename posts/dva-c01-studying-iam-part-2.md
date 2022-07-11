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
* acts as an identity broker - manages authentication between your application and web ID providers (Facebook, Amazon, Google) (no extra code)

  * providers authenticate with Cognito -> Cognito provides temporary credentials -> temporary credentials map to an IAM role
* seamless- synchronizes data across multiple devices 

  * tracks association between user identity and the different devices it signed in from 
  * uses Push Synchronization to push updates and synchronize user data across mulitple devices
  * (under the hood) sends an SNS silent notification to all the devices associated with the user identity whenever data stored in the cloud changes 
* recommended for all mobile applications that use AWS services
* secure - no need for applications to embed or store AWS credentials locally
* User Pools - user directories used to managed sign-up, sign-in 

  * users can sign in directly to the User Pool or use a provider -> returns a JWT token
* Identity Pools - enable you to provide temporary AWS credentials 

  * uses the JWT token and swaps it for temproary credentials

##### Inline Policies

##### Managed Policies

##### Customer Managed Policies

##### STS AssumeRoleWithWebIdentity