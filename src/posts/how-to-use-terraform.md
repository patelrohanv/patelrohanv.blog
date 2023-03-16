---
title: How To Use Terraform
date: 2023-03-17T22:49:00.000Z
summary: "Trying to summarize what Terraform is and how it works at a very high level "
tags:
  - software-dev
---
## Introduction:

In recent years, infrastructure as code (IaC) has gained immense popularity among DevOps teams. IaC helps teams manage their infrastructure in a more efficient, scalable, and automated way. One of the most popular tools for IaC is Terraform, a product of HashiCorp. Terraform is an open-source tool that enables users to define and provision infrastructure using declarative code. In this blog post, we will dive into Terraform and explore its benefits, features, and how to get started with it.

## What is Terraform?

Terraform is a tool for building, changing, and versioning infrastructure safely and efficiently. It uses a high-level configuration language called HashiCorp Configuration Language (HCL) or JSON to define infrastructure resources. With Terraform, you can manage infrastructure for different providers such as AWS, Azure, Google Cloud Platform, and more. Terraform maintains a state file that tracks the current state of the infrastructure, which enables you to make changes to your infrastructure without having to worry about the underlying resources.

### Benefits of Terraform:

1. Declarative code: Terraform allows you to define your infrastructure as code, which means you can create and manage infrastructure resources in a consistent and repeatable way.
2. Multi-provider support: Terraform supports multiple providers, which means you can manage infrastructure across different cloud providers.
3. Infrastructure versioning: With Terraform, you can version control your infrastructure code and easily roll back to a previous version if necessary.
4. Automation: Terraform enables you to automate the provisioning of infrastructure resources, reducing manual errors and increasing efficiency.

### Getting Started with Terraform:

1. Install Terraform:
You can download Terraform from the official website ([https://www.terraform.io/downloads.html](https://www.terraform.io/downloads.html)) and follow the installation guide for your operating system.
2. Choose a cloud provider:
Decide on the cloud provider you want to use with Terraform. Terraform supports multiple cloud providers, including AWS, Azure, Google Cloud Platform, and more.
3. Create a new directory:
Create a new directory where you will store your Terraform files.
4. Initialize Terraform:
Run the `terraform init` command inside your directory to initialize Terraform. This will download the necessary plugins and modules for your chosen cloud provider.
5. Write Terraform code:
Create a new `.tf` file in your directory and write Terraform code that defines your infrastructure resources. Use the appropriate syntax for your chosen cloud provider.
6. Plan your infrastructure:
Run the `terraform plan` command to generate an execution plan for your infrastructure. This will show you what resources Terraform will create, modify, or delete.
7. Apply your infrastructure:
Run the `terraform apply` command to apply the execution plan and create or modify the resources defined in your code.
8. Verify your infrastructure:
Once Terraform has completed the `apply` command, you can verify that your infrastructure resources have been created or modified as expected. You can use the web console of your cloud provider or command-line tools to verify the resources.
9. Manage your infrastructure:
Once your infrastructure is created, you can continue to manage it using Terraform. You can modify your Terraform code and apply the changes using the `apply` command. You can also use Terraform to destroy the infrastructure resources when they are no longer needed.

### Syntax (.tf)

Terraform uses its own syntax, which is designed to be easy to read and write, and is based on HashiCorp Configuration Language (HCL) or JSON. Here's an overview of the syntax used in Terraform:

1. Resource block:
The resource block is the fundamental building block of Terraform configuration files. It is used to define an infrastructure resource that Terraform will manage. The syntax of a resource block is as follows:

```python
resource "resource_type" "resource_name" {
  argument = value
  # ...
}
```

Here, `resource_type` is the type of the infrastructure resource you want to create, such as `aws_instance` or `google_compute_instance`, and `resource_name` is a name you choose to identify the resource. The `argument = value` pairs inside the block define the properties of the resource you want to create.

1. Provider block:
The provider block is used to configure the cloud provider you want to use with Terraform. The syntax of a provider block is as follows:

```python
provider "provider_name" {
  argument = value
  # ...
}
```

Here, `provider_name` is the name of the cloud provider you want to use, such as `aws` or `google`, and `argument = value` pairs inside the block define the configuration options for the provider.

1. Variable block:
The variable block is used to define input variables that can be passed into the Terraform configuration at runtime. The syntax of a variable block is as follows:

```python
variable "variable_name" {
  type = "string"
  default = "default_value"
}
```

Here, `variable_name` is the name of the variable, and `type` and `default` are configuration options for the variable.

1. Output block:
The output block is used to define values that Terraform will output after it applies the configuration. The syntax of an output block is as follows:

```python
output "output_name" {
  value = "output_value"
}
```

Here, `output_name` is the name of the output, and `value` is the value that Terraform will output.

1. Comment:
Comments can be added to Terraform configuration files using the `#` character. Anything after `#` on a line is considered a comment and will be ignored by Terraform.

In summary, Terraform syntax consists of resource, provider, variable, and output blocks, as well as comments. The syntax is designed to be easy to read and write, and can be used to define complex infrastructure resources using a simple, declarative syntax.

## Cloud Providers

Terraform is a tool that can be used with different cloud providers, including Google Cloud Platform (GCP), AWS, and Azure. The steps to use Terraform with these cloud providers are similar, but there are some provider-specific configuration details to keep in mind. Here's an overview of how you would use Terraform with each of these cloud providers:

### Amazon Web Services (AWS)

To use Terraform with AWS, you need to create an AWS account and configure your credentials. Then, you can create a Terraform configuration file that defines your AWS resources using the **`aws`** provider.

For example, to create an AWS EC2 instance using Terraform, you could define the following resource block in your Terraform configuration file:

```python
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c94855ba95c71c99"
  instance_type = "t2.micro"
  key_name      = "example-key"
  subnet_id     = "subnet-123456"
  tags = {
    Name = "example-instance"
  }

  root_block_device {
    volume_size = 20
  }
}
```

In this example, the `provider` block specifies the AWS region that Terraform will be using. The `resource` block defines an AWS EC2 instance with the `ami`, `instance_type`, `key_name`, `subnet_id`, `tags`, and `root_block_device` attributes. The `aws_instance` resource type is specific to AWS and is used to create an EC2 instance.

When you run the `terraform plan` and `terraform apply` commands on this file, Terraform will create a new EC2 instance in the specified region with the specified AMI, instance type, key pair, subnet, tags, and root block device size.

### Google Cloud Platform (GCP)

To use Terraform with GCP, you need to create a GCP project and enable the necessary APIs. Then, you can create a Terraform configuration file that defines your GCP resources using the **`google`** provider.

For example, to create a GCP Compute Engine instance using Terraform, you could define the following resource block in your Terraform configuration file:

```python
provider "google" {
  credentials = "${file("path/to/service_account.json")}"
  project     = "my-project-id"
  region      = "us-central1"
}

resource "google_compute_instance" "example" {
  name         = "example-instance"
  machine_type = "n1-standard-1"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-10"
    }
  }

  network_interface {
    network = "default"
    access_config {
    }
  }
}
```

In this example, the `provider` block specifies the GCP credentials file path, project ID, and region that Terraform will be using. The `resource` block defines a GCP Compute Engine instance with the `name`, `machine_type`, and `zone` attributes. The `google_compute_instance` resource type is specific to GCP and is used to create a Compute Engine instance.

When you run the `terraform plan` and `terraform apply` commands on this file, Terraform will create a new Compute Engine instance in the specified zone with the specified machine type, boot disk image, and network configuration.

### Microsoft Azure

To use Terraform with Azure, you need to create an Azure account and configure your credentials. Then, you can create a Terraform configuration file that defines your Azure resources using the **`azurerm`** provider.

For example, to create an Azure Virtual Machine using Terraform, you could define the following resource block in your Terraform configuration file:

```python
provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "example-resource-group"
  location = "eastus"
}

resource "azurerm_virtual_network" "example" {
  name                = "example-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}

resource "azurerm_subnet" "example" {
  name                 = "example-subnet"
  address_prefix       = "10.0.1.0/24"
  virtual_network_name = azurerm_virtual_network.example.name
  resource_group_name  = azurerm_resource_group.example.name
}

resource "azurerm_network_interface" "example" {
  name                = "example-nic"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  ip_configuration {
    name                          = "example-ipconfig"
    subnet_id                     = azurerm_subnet.example.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_windows_virtual_machine" "example" {
  name                  = "example-vm"
  location              = azurerm_resource_group.example.location
  resource_group_name   = azurerm_resource_group.example.name
  size                  = "Standard_DS1_v2"
  admin_username        = "adminuser"
  admin_password        = "Password1234!"
  network_interface_ids = [azurerm_network_interface.example.id]

  storage_image_reference {
    publisher = "MicrosoftWindowsServer"
    offer     = "WindowsServer"
    sku       = "2019-Datacenter"
    version   = "latest"
  }

  os_disk {
    name              = "example-os-disk"
    caching           = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
}
```

In this example, the `provider` block specifies the Azure features that Terraform will be using. The `resource` blocks define an Azure resource group, virtual network, subnet, network interface, and a Windows virtual machine. The `azurerm_resource_group`, `azurerm_virtual_network`, `azurerm_subnet`, `azurerm_network_interface`, and `azurerm_windows_virtual_machine` resource types are specific to Azure and are used to create these resources.

When you run the `terraform plan` and `terraform apply` commands on this file, Terraform will create a new virtual machine in Azure with the specified resources and configurations.

## Closing Thoughts

Terraform is a powerful infrastructure-as-code tool that can help you manage your cloud infrastructure efficiently and effectively. With it, you can define your infrastructure resources in a simple, declarative syntax, and then use it to provision, configure, and manage those resources across multiple cloud providers.

Terraform provides a number of benefits, including increased productivity, reduced complexity, and improved collaboration. By defining your infrastructure resources in code, you can version control your infrastructure, automate your deployments, and ensure consistency and repeatability in your infrastructure changes.

While Terraform can be complex, its robust documentation and active community make it a great tool for anyone looking to automate their infrastructure. With it, you can spend less time managing your infrastructure and more time building great applications.