---
title: CKAD studying - application deployment
date: 2022-07-13T23:15:13.875Z
author: rohan
summary: studying for the Certified Kubernetes Application Developer exam -
  Application Deployment (20%)
tags:
  - software-dev
  - CKAD
---
### Deployments

* deployment - Kubernetes object that defines a desired state for a set of replica Pods using a Pod template

  * Kubernetes actively maintains that desired state by creating/deleting/replacing those Pods
  * Pod template provides the Pod configuration that the Deployment will use to create new Pods
* `replicas` field sets the number of replicas - this value can be changed to scale up or down

sample Pod template, more reading -> <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

^ run with `kubectl apply -f <file_name>`

to scale, use `kubectl scale`

```shell
kubectl scale --replicas=3 rs/foo                                 # Scale a replicaset named 'foo' to 3
kubectl scale --replicas=3 -f foo.yaml                            # Scale a resource specified in "foo.yaml" to 3
kubectl scale --replicas=3 deployment/mysql                       # Scale deployment/mysql (Deployment named mysql) to 3
kubectl scale --current-replicas=2 --replicas=3 deployment/mysql  # If the deployment named mysql's current size is 2, scale mysql to 3
kubectl scale --replicas=5 rc/foo rc/bar rc/baz                   # Scale multiple replication controllers
```

can also scale by using `kubectl edit` to edit the deployment



### Rolling Updates

### Deployment Strategies

### Helm