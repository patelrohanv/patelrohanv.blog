---
slug: ckad-application-observability
title: CKAD studying - application observability and maintenance
date: 2022-07-13T23:16:50.425Z
author: rohan
summary: studying for the Certified Kubernetes Application Developer exam -
  Application Observability and Maintenance (15%)
tags: [software-dev, CKAD]
---
### API Deprecation Policy

* read up on Kubernetes API -> <https://kubernetes.io/docs/concepts/overview/kubernetes-api/>
* **deprecation - process of providing  advanced warning of changes to the API, giving consumers time to update their code/processes** 
* read up on the deprecation policy -> <https://kubernetes.io/docs/reference/using-api/deprecation-policy/>
* apiVersion - field on a Kubernetes object that indicates which version of the API it is designed to be compatible with
* deprecation window - period after deprecation that API versions are still supported

  * **GA (general availability) versions are supported the longer of 12 months or 3 releases after being deprecated**
* migration guide - details on API changes with each version of Kubernetes

  * read up -> <https://kubernetes.io/docs/reference/using-api/deprecation-guide/>

### Probes and Health Checks

* Probe - part of the container spec that allows you to customize how Kubernetes detects the state of a container 

  * probes can run a command inside the container, e.g. making an HTTP request or attempting a TCP socket connection
* read up on container probes -> <https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes>
* how to configure -> <https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/>

##### Types of Probes

* **Liveness - probes that check whether a container is healthy; unhealthy means it needs restarted**

sample Pod with a `livenessProbe` that  uses a shell command to check healthiness

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-exec
spec:
  containers:
  - name: liveness
    image: k8s.gcr.io/busybox
    args:
    - /bin/sh
    - -c
    - touch /tmp/healthy; sleep 30; rm -f /tmp/healthy; sleep 600
    livenessProbe:
      exec:
        command:
        - cat
        - /tmp/healthy
      initialDelaySeconds: 5
      periodSeconds: 5
```

sample Pod with a `livenessProbe` that uses HTTP to check healthiness

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-http
spec:
  containers:
  - name: liveness
    image: k8s.gcr.io/liveness
    args:
    - /server
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
        httpHeaders:
        - name: Custom-Header
          value: Awesome
      initialDelaySeconds: 3
      periodSeconds: 3
```

* Readiness - probes that determine when a container is fully started up and ready to receive user traffic

sample Pod with a `readinessProbe` and `livenessProbe` that tries making a TCP connection to check readiness and healthiness

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: goproxy
  labels:
    app: goproxy
spec:
  containers:
  - name: goproxy
    image: k8s.gcr.io/goproxy:0.1
    ports:
    - containerPort: 8080
    readinessProbe:
      tcpSocket:
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 10
    livenessProbe:
      tcpSocket:
        port: 8080
      initialDelaySeconds: 15
      periodSeconds: 20
```

* Startup - probes that check container health during startup for slow-starting containers

### Monitoring

* monitoring - process of gathering data on the performance of containerized applications
* access data with Metrics API

  1. install Metrics Server (component that gathers the metrics data for the Metrics API to return) -> <https://github.com/kubernetes-sigs/metrics-server> -> `kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml`
  2. **use `kubectl top` to view metrics data (Pod resource usage)** once the Metrics Server gathered it (takes a few moments to gather data)

### Container Logging

* container log - stores stdout/stderr console output for each container

  * `kubectl logs [-f] [-p] POD [-c CONTAINER]` **\- use to view logs**
  * <https://jamesdefabia.github.io/docs/user-guide/kubectl/kubectl_logs/>
  * **Data written to standard output will appear in the container log**

### Debugging

* high-level process

  1. locate the problem - identify which component(s) are not working
  2. gather info  on broken components
  3. make changes 
* check object status - quick way to locate broken Pod in the cluster

  * **use `kubectl get pods` to check the status of all Pods in a Namespace**
  * <https://jamesdefabia.github.io/docs/user-guide/kubectl/kubectl_get/>
* check object configuration - gather more information on the relevant object(s)

  * **use** `kubectl describe (-f FILENAME | TYPE [NAME_PREFIX | -l label] | TYPE/NAME)` **or view the full object manifest**
* check logs - container level and potentially cluster level to get more insight into what's going on

  * **use** `kubectl logs [-f] [-p] POD [-c CONTAINER]` **to view container logs**