---
title: Design Patterns - behavioral
date: 2022-07-18T17:39:22.135Z
author: Anonymous
summary: summary of behavioral software design patterns
tags:
  - software-dev
  - design-patterns
---
# Behavioral patterns

* patterns specifically concerned with communication between objects

### Chain of Responsibility

* delegates commands to a chain of processing objects

### Command

* creates objects that encapsulate actions and parameters

### Iterator

* accesses the elements of an object sequentially without exposing its underlying representation

### Mediator

* allows loose coupling between classes by being the only class that has detailed knowledge of their methods

### Memento

* provides the ability to restore an object to its previous state (undo)

### Observer

*  allows a number of observer objects to see an event (publish/subscribe pattern)

### State

* allows an object to alter its behavior when its internal state changes

### Strategy

* allows one of a family of algorithms to be selected on-the-fly at runtime

### Template Method

* defines the skeleton of an algorithm as an abstract class, allowing its subclasses to provide concrete behavior

### Visitor

* separates an algorithm from an object structure by moving the hierarchy of methods into one object