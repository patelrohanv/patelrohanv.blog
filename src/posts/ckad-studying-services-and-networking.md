---
slug: ckad-application-networking
title: CKAD studying - services and networking
date: 2022-07-14T22:13:09.971Z
author: rohan
summary: studying for the Certified Kubernetes Application Developer exam -
  Services and Networking (20%)
tags: [software-dev, CKAD]
---
### NetworkPolicies

* Pods communicate with eachother, even if on different nodes, over a virtual cluster network managed by Kubernetes
* NetworkPolicy - Kubernetes object that lets you restrict network traffic to/from Pods within the cluster network; granular control

  * can be used to block specific network traffic
* **non-isolated pods - any Pod not selected by any NetworkPolicies**

  * **open to all incoming/outgoing network traffic**
* **isolated pods - any Pod selected by at least 1 NetworkPolicy**

  * **only open to network traffic allowed by the NetworkPolicy(s)**

sample NetworkPolicy selecting Pods with label `role=db`, applies rules on incoming and outgoing traffic

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - ipBlock:
            cidr: 172.17.0.0/16
            except:
              - 172.17.1.0/24
        - namespaceSelector:
            matchLabels:
              project: myproject
        - podSelector:
            matchLabels:
              role: frontend
      ports:
        - protocol: TCP
          port: 6379
  egress:
    - to:
        - ipBlock:
            cidr: 10.0.0.0/24
      ports:
        - protocol: TCP
          port: 5978
```

* read more on network policies -> <https://kubernetes.io/docs/concepts/services-networking/network-policies/>

##### Exam Tips

* **Default deny policies block traffic in a Namespace by default, but the traffic will be allowed if another NetworkPolicy allows it**
*  **empty podSelector will apply the NetworkPolicy to all Pods in the same Namespace as the NetworkPolicy**

### Services

* **service - allows you to expose an application running across multiple Pods to the network**

  * **clients communicating with a service have their traffic automatically routed to an underlying Pod**

##### Service Types

* **ClusterIP Service - exposes the application within the cluster network where it can be accessed by other Pods**
* **NodePort Service - exposes the application externally by listening on an external port on each cluster node**

sample Service mapping port 80 to port 9376 on any Pod with the app=MyApp label.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

* read more on services -> <https://kubernetes.io/docs/concepts/services-networking/service/>

### Ingress

* **Ingress - Kubernetes object that manages external access to the application, routing to at least 1 Service**

  * provides more powerful featues than a NodePort service
  * normally used in the context of cloud computing platforms
  * **you need an Ingress controller to implement the functionality on Ingress objects**

    * Ingress controllers are not started automatically with a cluster
  * read more on Ingress controllers -> <https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/> 
* ingress routing - ingress routes traffic to a Service, that then routes it to a Pod

  * **client -> Ingress -> Service -> Pods**

sample Ingress object, `ingressClassName` is the name of the controller, `rules` manage the routing 

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: minimal-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx-example
  rules:
  - http:
      paths:
      - path: /testpath
        pathType: Prefix
        backend:
          service:
            name: test
            port:
              number: 80
```

* read more on ingress -> <https://kubernetes.io/docs/concepts/services-networking/ingress/>