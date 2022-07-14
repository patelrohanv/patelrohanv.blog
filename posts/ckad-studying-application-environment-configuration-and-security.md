---
title: CKAD studying - application environment, configuration, and security
date: 2022-07-13T23:18:12.155Z
author: rohan
summary: studying for the Certified Kubernetes Application Developer exam -
  Application Environment, Configuration and Security (25%)
tags:
  - software-dev
  - CKAD
---
### Custom Resource Definitions (CRD)

* custom resource - an extension of the Kubernetes API, allows you to define your own custom Kubernetes object types and interact with them
* custom resource definition - defines a custom resource

  * you can also create custom controllers that act on custom resources (not in CKAD)
* read more -> <https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/>

### ServiceAccounts and Authentication

##### ServiceAccounts

* ServiceAccount - allows processes within containers to authenticate with the Kubernetes API

  * can be assigned permissions via role-based access control 
  * uses a token to to access to API - Pod's ServiceAccount's token is automatically mounted to each container by default (can be disabled)

sample ServiceAccount config with `automountServiceAccountToken` disabled

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-robot
automountServiceAccountToken: false
```

sample Pod spec using ^ServiceAccount with `automountServiceAccountToken` disabled for this specific Pod 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  serviceAccountName: build-robot
  automountServiceAccountToken: false
```

* read more -> <https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/> 

##### Authorization

* does the user have permission to do what they want to do?

##### Authentication

* is the user who they claim they are?

##### Users

* not represented by a Kubernetes object

  * as opposed to ServiceAccounts which are represented as Kubernetes objects 
* usually authenticate with a client certificate

  * as opposed to ServiceAccounts that usually authenticate using an API token
* usually used by real humans or tools outside the cluster

  * as opposed to ServiceAccounts that are usually used by automated processes running inside the container

Admission Control

Compute Resource Management

Application Configuration

Security Context