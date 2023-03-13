---
slug: ckad-application-design
title: CKAD studying - application design and build
date: 2022-07-13T23:12:40.285Z
author: rohan
summary: studying for the Certified Kubernetes Application Developer exam -
  Application Design and Build (20%)
tags: [software-dev, CKAD]
---
### Container Images

* image - lightweight, standalone file containing all the software and executables needed to run a container

  * allows us to package the application to run in a container
* `Dockerfile` - defines what is contained in an image (using Docker)

  * **image is built from the `Dockerfile` with `docker build`** - <https://docs.docker.com/engine/reference/commandline/build/> or `docker image build` <https://docs.docker.com/engine/reference/commandline/image_build/>
  * **image can be saved to a file with `docker save`** - <https://docs.docker.com/engine/reference/commandline/save/> or `docker image save` <https://docs.docker.com/engine/reference/commandline/image_save/>

Dockerfile Format

```dockerfile
# INSTRUCTION arguments
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
```

### Jobs and CronJobs

* (Kubernetes) Job - containerized single task designed to be run successfully to completion

  * part of the Batch API
  * sample Job config -> more documentation at <https://kubernetes.io/docs/concepts/workloads/controllers/job/>

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi
spec:
  template:
    spec:
      containers:
      - name: pi
        image: perl:5.34
        command: ["perl",  "-Mbignum=bpi", "-wle", "'print bpi(2000)'"]
      restartPolicy: Never
  backoffLimit: 4
  activeDeadlineSeconds: 100
```

^ run with `kubectl apply -f <file_name>`

* **CronJob - job(s) running periodically according a to a schedule**

  * uses cron expressions for `schedule` - <https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm>
  * sample CronJob manifest -> more documentation at <https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/>

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: "* * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: hello
            image: busybox:1.28
            imagePullPolicy: IfNotPresent
            command:
            - /bin/sh
            - -c
            - date; echo Hello from the Kubernetes cluster
          restartPolicy: OnFailure
```

^ run with `kubectl apply -f <file_name>`

* `restart policy` for a Job or CronJob Pod must be `OnFailure` or `Never` - jobs are meant to run once to completion
* `activeDeadlineSeconds` **can be used in the Job spec to terminate long running jobs** 

  * sets a time limit for a Job to execute; process will be terminated if it takes too long

### Pods

* pods - group of one or more containers, with shared storage and network resources, and a specification for how to run the containers

  * smallest deployable units of computing that you can create and manage in Kubernetes
* sample pod config -> more documentation at <https://kubernetes.io/docs/concepts/workloads/pods/>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
```

^ run with `kubectl apply -f <file_name>`

### Multi-Container Pods

* multi-container pods - Pods that include multiple containers working together
* **only use when the containers need to be tightly coupled, e.g. sharing network or storage volume resources** 

  * most of the time, running multiple Pods to run multiple containers is the preferred method 

##### Design Patterns

* **sidecar - additional container performs task to assist the main container**

  * e.g. sidecar container making updates to the files in a shared volume that the main container serves
* **ambassador - additional container proxies network traffic to/from the main container**
* **adapter - additional container transforms the main container's output** 

  * e.g. adapter container transforming log data coming from the main container into a standard format

### Init Containers

* init container - **container that runs to complete a task before the Pod's main container starts up** 

  * can use a separate image from the main container
  * can be used to delay the startup of the main container's startup until preconditions are met
  * **can contribute to security, e.g. isolating start-up sets like consuming secrets from the main container**
* add init containers to a pod using `initContainers` in the Pod spec
* sample pod specification with init containers -> more documentation at <https://kubernetes.io/docs/concepts/workloads/pods/init-containers/>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
  - name: myapp-container
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  initContainers:
  - name: init-myservice
    image: busybox:1.28
    command: ['sh', '-c', "until nslookup myservice.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for myservice; sleep 2; done"]
  - name: init-mydb
    image: busybox:1.28
    command: ['sh', '-c', "until nslookup mydb.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for mydb; sleep 2; done"]
```

^ run with `kubectl apply -f <file_name>`

### Container Storage

* full documentation -> <https://kubernetes.io/docs/concepts/storage/volumes/>
* volume - provides external storage for containers outside of the container file system

  * defined in the Pod spec - details of where and how the data is stored
* volumeMounts 

  * defined in the container spec - defines the path where the volume data will appear at runtime
  * attaches the volume to a specific container 

##### Volume Types

* volume type - defines where and how the data storage is handled

  * `hostPath` **\- data is stored in a specific location directly on the host file system, on the Kubernetes node where the Pod is running**

    * more reading -> <https://kubernetes.io/docs/concepts/storage/volumes/#hostpath>
  * `type: Directory` **\- mounts an existing directory on the host**
  * `type: DirectoryOrCreate` **\- mounts a directory on the host; creates if it doesn't exist**
  * `type: File` **\- mounts an existing (single) file on the host**
  * `type: FileOrCreate` **\- mounts a (single) file on the host; creates if it doesn't exist**

sample spec using hostPath

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: k8s.gcr.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /test-pd
      name: test-volume
  volumes:
  - name: test-volume
    hostPath:
      # directory location on host
      path: /data
      # this field is optional
      type: Directory
```

* `emptyDir` **\- data is stored in an automatically managed location on the host file system; data is deleted if Pod is deleted (temporary storage)**

  * more reading -> <https://kubernetes.io/docs/concepts/storage/volumes/#emptydir>
  * more reading on ephemeral volumes -> <https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/>

sample spec using emptyDir

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: k8s.gcr.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /cache
      name: cache-volume
  volumes:
  - name: cache-volume
    emptyDir: {}
```

* `persistentVolumeClaim` **\- data is stored using a `PersistentVolume`**

  * defines a request to consume a storage resource - includes details on the type of storage needed
  * **automatically binds to an available `PersistentVolume` that needs the provided requirements**
  * mounted in a Pod like any other volume
  * more reading -> <https://kubernetes.io/docs/concepts/storage/volumes/#persistentvolumeclaim>

###### Persistent Volumes

* `PersistentVolume` **\- defines an abstract storage resource ready for the Pods to consume**

  * allows you to abstract storage details away from Pods; treats storage volume like a resource
  * defines details about the type and amount of storage provided
* more reading on persistent volumes -> <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>

sample `PersistentVolume` - defines the abstract stroage resource

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: block-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  volumeMode: Block
  persistentVolumeReclaimPolicy: Retain
  fc:
    targetWWNs: ["50060e801049cfd1"]
    lun: 0
    readOnly: false
```

sample `PersistentVolumeClaim` - defines request to consume abstract storage resource

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: block-pvc
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Block
  resources:
    requests:
      storage: 10Gi
```

sample Pod spec using the `PersistentVolumeClaim` - requests abstract storage resource

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-block-volume
spec:
  containers:
    - name: fc-container
      image: fedora:26
      command: ["/bin/sh", "-c"]
      args: [ "tail -f /dev/null" ]
      volumeDevices:
        - name: data
          devicePath: /dev/xvda
  volumes:
    - name: data
      persistentVolumeClaim:
        claimName: block-pvc
```