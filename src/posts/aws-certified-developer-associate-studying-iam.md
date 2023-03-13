---
slug: dva-c01-iam
title: DVA-C01 studying -  IAM
date: 2022-07-05T05:10:05.420Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - Identity and
  Access Management
tags: [DVA-C01, software-dev]
---
### IAM - Identity and Access Management

#### What it does?

* manage users and their level of access to the AWS console and services
* centralized control over your AWS account
* shared access to your AWS account
* granular permissions for different users within your organization
* identity federation (being able to log in using other identity providers e.g. Active Directory, Okta, and other OpenID Connect (OIDC) or SAML 2.0 (Security Assertion Markup Language 2.0) services)
* provide multi factor authentication support
* grants temporary access as necessary
* allows setting password policies (<https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html>)
* integrates with other AWS services
* supports PCI DSS compliance

#### Terminology

* Users - end users aka people
* Groups - collection of users with common/shared permissions
* Roles - define a set of permissions and access that you can assign to either users or AWS services
* Policy - document that defines one or more permissions

  * can be assigned to a user, group, or role
  * <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_policy-summary-examples.html> (examples)

#### Notes

* IAM is global, not regional
* Root account is created when you first set up your AWS account

  * has complete admin access
  * not recommended for routine work; this should be done through users, groups, and roles
  * new users have no permissions when created
  * Always recommended to set up MFA for root
* Access Keys

  * access key ID and secret access key are created when a new user is created
  * THIS IS NOT A PASSWORD 
  * used for programmatic access to the AWS e.g. api and cli
  * can only view both the access key ID and secret access key ONCE when the account is created

    * afterwards the access key ID is still viewable but the secret access key is not
    * need to regenerate them both if you lose the secret access key