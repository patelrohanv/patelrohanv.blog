---
title: CKAD studying - application observability and maintenance
date: 2022-07-13T23:16:50.425Z
author: rohan
summary: studying for the Certified Kubernetes Application Developer exam -
  Application Observability and Maintenance (15%)
tags:
  - software-dev
  - CKAD
---
### API Deprecation Policy

* read up on Kubernetes API -> <https://kubernetes.io/docs/concepts/overview/kubernetes-api/>
* deprecation - process of providing  advanced warning of changes to the API, giving consumers time to update their code/processes 
* read up on the deprecation policy -> <https://kubernetes.io/docs/reference/using-api/deprecation-policy/>
* apiVersion - field on a Kubernetes object that indicates which version of the API it is designed to be compatible with
* deprecation window - period after deprecation that API versions are still supported

  * GA (general availablity) versions are supported the longer of 12 months or 3 releases after being deprecated
* migration guide - details on API changes with each version of Kubernetes

  * read up -> <https://kubernetes.io/docs/reference/using-api/deprecation-guide/>
*

### Probes and Health Checks

### Monitoring

### Container Logging

### Debugging