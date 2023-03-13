---
slug: dva-c01-cloudwatch-cloudtrail
title: DVA-C01 studying - CloudWatch and CloudTrail
date: 2022-07-11T21:06:17.658Z
author: rohan
summary: studying for the AWS Certified Developer Associate exam - CloudWatch
  and CloudTrail
tags: [DVA-C01, software-dev]
---
### CloudWatch

##### What is it

* <https://aws.amazon.com/cloudwatch/>
* **monitoring service to monitor health and performance metrics of you applications and AWS resources**

  * by default can monitor compute, storage & content delivery, database & analytics, and a variety of other AWS services 
  * can even monitor estimated AWS charges 
* CloudWatch Agent - allows you to define your own metrics to monitor
* OperatingSystem-Level metrics

  * by default OS-level metrics are not sent to CloudWatch - need to use the CloudWatch agent to do this

    * memory usage, processess, CPU idle time, etc 
  * metric frequency - by default sent in 5-min intervals 

    * can enable detailed monitoring for 1-min intervals for an extra charge 
    * custom metrics default to 1-min intervals but high resolution metrics can be configured for 1-sec intervals (extra charge)
* host-level metrics

  * default EC2 metrics include CPU, network, disk, status check
* CloudWatch Logs - allows you to monitor OS and application logs 

  * system and application logs - useful to track errors and troubleshoot
* CloudWatch Alarms

  * alarms you can create to monitor any CloudWatch metric

    * cpu or memory ulitization, latency, AWS bill charges, etc. 
    * can set thresholds on the metric to trigger the alarm
  * alarms can trigger things e.g. executing an Auto Scaling policy 

###### CloudWatch Metric

* **a variable you want to monitor using CloudWatch**
* time-ordered sequence of data-points that are published to Cloudwatch

  * each data-point has a timestamp and optional unit of measurment
* for example, logging the CPU usage on an instance
* uniquely defined by a name, namespace, and zero or more dimensions

###### CloudWatch Namespaces

* **a container for CloudWatch metrics**
* AWS provides its own (e.g. AWS/EC2 for EC2 metrics) and you can create your own for custom metrics data

  * each data-point you want to publish to CloudWatch must have a specified namespace
  * each metric you create must have a specifiec namespace
* metrics in different namespaces are isolated from one another - they are not aggregated together

###### CloudWatch Dimensions

* **similar to a filter**
* name-value pair used to filter CloudWatch data
* CloudWatch can aggregate data across dimensions for some service (like EC2)

###### CloudWatch Dashboards

* **custom dashboard views you can create in CloudWatch to visualize/display specified metrics**

###### CloudWatch Actions

* CloudWatch API supports a long list of actions, <https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Operations.html>

  * actions allow you to publish, monitor, and alert on metrics
* very useful when creating custom metrics 
* `PutMetricData` (super common action)

  * publishes metric data-points to CloudWatch
  * define the name of the metric, the namespace to publish it to, the value to publish, and timestamp for the data-point
* `PutMetricAlarm` (super common action)

  * **creates an alarm associated with a metric to alert you if a threshold has been reached**

### CloudTrail

##### What is it

* [](https://aws.amazon.com/cloudwatch/)<https://aws.amazon.com/cloudtrail/>
* **records API calls (user activity) in your AWS account - events related to creation, modification, or deletion of resources (also includes failed logins)** 

  * stores log files in an S3 bucket
* by default shows the last 90 days of activity
* can be integrated with CloudWatch Logs
* **used for audit logs, not performance and metrics**