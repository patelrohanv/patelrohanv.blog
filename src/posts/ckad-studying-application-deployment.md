---
slug: ckad-application-development
title: CKAD studying - application deployment
date: 2022-07-13T23:15:13.875Z
author: rohan
summary: studying for the Certified Kubernetes Application Developer exam -
  Application Deployment (20%)
tags: [software-dev, CKAD]
---
### Deployments

* **deployment - Kubernetes object that defines a desired state for a set of replica Pods using a Pod template**

  * Kubernetes actively maintains that desired state by creating/deleting/replacing those Pods
  * Pod template provides the Pod configuration that the Deployment will use to create new Pods
* `replicas` **field sets the number of replicas - this value can be changed to scale up or down**

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

* **Rolling updates allow Deployments' update to take place with zero downtime by incrementally updating old Pod instances with new ones**
* read more -> <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment>
* rollout triggered if and only if the Deployment's Pod template is changed, e.g. if the labels or container images of the template are updated

  * Other updates, such as scaling the Deployment, do not trigger a rollout
  * trigger with `kubectl set image` to change the image version/tag 
  * trigger with `kubectl edit` to edit the deployment 
  * check status with `kubectl rollout status`
  * **roll back an update with `kubectl rollout undo`**

### Deployment Strategies

* deployment strategy - method of rolling out new code

###### Blue/Green

* **uses 2 identical production environments; new code is rolled out to the 2nd environment (green) and validated before redirecting traffic to the 2nd environment from the 1st (blue)**
* blue - active environment; green - new environment
* you can use multiple Deployments to set up blue/green environments

  * use labels and selectors on Services to direct user traffic to different Pods

###### Canary

* **uses 2 production environments; portion of user base is directed to the environment with the new code (canary) to validate before rolling out all users**
* simple way to set up a canary environment is using a Service that selects Pods from 2 different Deployments 

  * vary the number of replicas to direct fewer users to the canary 
* read more -> <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#canary-deployment>

### Helm

* **Helm is a package manager for Kubernetes applications; it allows easy installation of software in your cluster**
* Helm commands -> <https://helm.sh/docs/helm/>

###### Helm Charts

* **Helm software package, contains all the Kubernetes resource definitions needed to get applications up and running in the cluster**
* **install Charts with `helm install`**
* uninstall Charts with `helm uninstall`

###### Helm Repository

* **collection of available Charts**
* add repositories with `helm repo add`
* update your repositories after adding one with `helm repo update`
* list all packages in a repository with `helm search repo`