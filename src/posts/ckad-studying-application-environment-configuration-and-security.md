---
slug: ckad-application-configuration
title: CKAD studying - application environment, configuration, and security
date: 2022-07-13T23:18:12.155Z
author: rohan
summary: studying for the Certified Kubernetes Application Developer exam -
  Application Environment, Configuration and Security (25%)
tags: [software-dev, CKAD]
---
### Custom Resource Definitions (CRD)

* **custom resource - an extension of the Kubernetes API, allows you to define your own custom Kubernetes object types and interact with them**
* custom resource definition - defines a custom resource

  * you can also create custom controllers that act on custom resources (not in CKAD)
* **you can interact with custom objects using regular `kubectl` commands**

  * `kubectl get <custom_object>` to get a list of custom_object objects 
* read more -> <https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/>

### ServiceAccounts and Authentication

##### ServiceAccounts

* **ServiceAccount - allows processes within containers to authenticate with the Kubernetes API**

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

sample Pod spec using ^ServiceAccount with `automountServiceAccountToken` disabled for this specific Pod. **`spec.serviceAccountName` specifies the service acount that it uses** 

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
* read more -> <https://kubernetes.io/docs/reference/access-authn-authz/authentication/>

##### Users

* not represented by a Kubernetes object

  * as opposed to ServiceAccounts which are represented as Kubernetes objects 
* usually authenticate with a client certificate

  * as opposed to ServiceAccounts that usually authenticate using an API token
* usually used by real humans or tools outside the cluster

  * as opposed to ServiceAccounts that are usually used by automated processes running inside the container
* **both users and ServiceAccounts can receive authorization using role-based access control (RBAC)**

###### role-based access control (RBAC)

* **system for managing authorization - allows for defining what users and groups have access to do within a Kubernetes cluster**
* **Role always sets permissions within a particular namespace**

  * must specify a namespace when creating a role
* **use `RoleBinding` to connect a Role (with it's permissions) to a ServiceAccount**

sample Role object 

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

* read more -> <https://kubernetes.io/docs/reference/access-authn-authz/rbac/>

### Admission Control

* **admission controller - intercept requests to the Kubernetes API after authentication and authorization but before any objects are persisted**

  * can be used to validate, deny, or modify requests
  * multiple come built in; supports creating your own
  * **run `kube-apiserver -h | grep enable-admission-plugins` to list the enabled plugins**  
* `kube-apiserver --enable-admission-plugins=...` **is the flag on the `kube-apiserver` command to enable/add admission controllers**
* `kube-apiserver --disable-admission-plugins=` **is the flag on the `kube-apiserver` command to disable admission controllers; supersedes `--enable-admission-plugins` if a controller appears in both**
* read more on admission controllers-> <https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/>

### Compute Resource Management

* resource requests - gives the cluster an idea of how many resources a container is **expected** to use

  * cluster uses this to select a node with enough available resources
* **resource limits - sets an upper limit on how many resources a container is allowed to use** 

  * cluster uses this to terminate a container process using more than the resources limit

sample Pod spec with resource requests and limits 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: frontend
spec:
  containers:
  - name: app
    image: images.my-company.example/app:v4
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
  - name: log-aggregator
    image: images.my-company.example/log-aggregator:v6
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```

* read more on resource management -> <https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/>
* **ResourceQuota - kubernetes object that sets limits on the resources used within a Namespace**

  * **enforced via an admission controller - the `--enable-admission-plugins=`flag must have `ResourceQuota` in it**
  * **denies requests trying to create or modify a resource outside the limit**

sample ResourceQuota object

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: pods-high
spec:
  hard:
    cpu: "1000"
    memory: 200Gi
    pods: "10"
  scopeSelector:
    matchExpressions:
    - operator : In
      scopeName: PriorityClass
      values: ["high"]
```

* read more on resource quotas -> <https://kubernetes.io/docs/concepts/policy/resource-quotas/>

### Application Configuration

##### storing configuration data

* **ConfigMap - object that stores configuration data for the applications in the form of key-value pairs**

  * can be passed to containers at runtime
  * read more on ConfigMaps -> <https://kubernetes.io/docs/concepts/configuration/configmap/>

sample ConfigMap object

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: game-demo
data:
  # property-like keys; each key maps to a simple value
  player_initial_lives: "3"
  ui_properties_file_name: "user-interface.properties"

  # file-like keys
  game.properties: |
    enemy.types=aliens,monsters
    player.maximum-lives=5    
  user-interface.properties: |
    color.good=purple
    color.bad=yellow
    allow.textmode=true    
```

* **Secrets - stores data to be passed into containers, but specifically sensitive data e.g. passwords, tokens**

  * optionally can be encrypted 
  * **use `kubectl create secret` to create a secret with the specified file(s)**
  * use a Kustomization file to create a secret
  * use a config file for a Secret object to create a secret 
  * read more on Secrets -> <https://kubernetes.io/docs/concepts/configuration/secret/>

sample Secret object

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm
```

##### passing configuration data

* volume mounts - data appears in the container's filesystem at runtime

  * each top-level key becomes a file name
* environment variables - data appears as environment variables in the container at runtime

  * option to specify specific keys and variable names for each piece of data

### Security Context

* **security context - part of the Pod and container spec that allows for control over advanced and OS-level security-related settings: privelleged mode, which user executes the container process, etc**
* use `securityContext.runAsUser` in the yaml to specify and to run a container process as that user 

###### usecases

* customizing the UID and/or GID used by the container process
* enable/disable privilege escalation for the container process
* setting the container's root filesysystem to read-only

sample Pod spec with `securityContext` being set on the both the Pod and container

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo-2
spec:
  securityContext:
    runAsUser: 1000
  containers:
  - name: sec-ctx-demo-2
    image: gcr.io/google-samples/node-hello:1.0
    securityContext:
      runAsUser: 2000
      allowPrivilegeEscalation: false
```

* read more on security context -> <https://kubernetes.io/docs/tasks/configure-pod-container/security-context/>