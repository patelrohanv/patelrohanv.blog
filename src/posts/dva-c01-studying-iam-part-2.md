---
slug: dva-c01-iam-part-2
title: DVA-C01 studying - IAM (Part 2)
date: 2022-07-11T20:06:43.502Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - Identity and
  Access Management (part 2)
tags: [DVA-C01, software-dev]
---
### IAM - Identity and Access Management

##### Web Identity Federation

* simplifies authentication and authorization for web applications
* allows users to access AWS services after (successfully) authenticating with a web-based identity provider 

  * provider must be OpenID Connect compatible
* **authenticate with provider -> successful authentication returns an authentication code from the provider -> authentication code is used for temporary security credentials -> temporary credentials authorize access to AWS resources** 

###### Amazon Cognito

* <https://aws.amazon.com/cognito/>
* provides web ID federation, including: **single sign-up, single sign-in, guest user access, multi-factor authentication**
* acts as an identity broker - manages authentication between your application and web ID providers (Facebook, Amazon, Google) (no extra code)

  * providers authenticate with Cognito -> Cognito provides temporary credentials -> temporary credentials map to an IAM role
* **seamless- synchronizes data across multiple devices** 

  * tracks association between user identity and the different devices it signed in from 
  * uses Push Synchronization to push updates and synchronize user data across mulitple devices
  * (under the hood) sends an SNS silent push notification to all the devices associated with the user identity whenever data stored in the cloud changes 
* recommended for all mobile applications that use AWS services
* secure - no need for applications to embed or store AWS credentials locally
* **User Pools - user directories used to managed sign-up, sign-in** 

  * users can sign in directly to the User Pool or use a provider -> returns a JWT token
* **Identity Pools - enable you to provide temporary AWS credentials** 

  * uses the JWT token and swaps it for temproary credentials
  * **supports anonymous guest users and federation through 3rd party ID providers**

##### Inline Policies

* managed by you
* **embedded in a single user, group, or role (one-to-one relationship)**

  * **deleting the user, group, or role deletes the policy**
* **managed policies recommended over inline policies**

  * inline policies are useful for tight controls

##### AWS Managed Policies

* IAM policy created and managed by AWS 

  * **AWS occsionally updates the permissions defined in their policies**
  * **available to any AWS account**
* **allows you to assign permissions without having to create your own policy**

  * cannot be changed or modified 
* **can be applied to multiple users, groups, and/or roles**

##### Customer Managed Policies

* **standalone policy created and managed by you**
* **can be attached to multiple users, groups, and/or roles (limited to those within your organization)**
* recommended when AWS Managed Policies don't meet your needs

##### STS AssumeRoleWithWebIdentity

* is an STS (security token service) API call

  * `assume-role-with-web-itentity`
* **returns temporary security credentials for users authenicated by mobile application, web application, or web ID provider**

  * Cognito is reccommended over this for mobile applications
* process

  1. user signs into web ID provider
  2. provider returns a JWT token
  3. `assume-role-with-web-itentity` call is made with the JWT token to STS
  4. STS returns temporary AWS credentials to the user
  5. use can access AWS resources 
* within `AssumedRoleUser`, the `Arn` and `AssumedRoleID` are used to programmatically reference the temporary credentials, not an IAM role or user

##### Cross-account access

* **set up to deleate access to resources in different AWS accounts instead of creating individual IAM users in each different account**