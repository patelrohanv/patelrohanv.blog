---
title: Learning Design Patterns with a Shrubbery
date: 2023-03-27T14:36:39.046Z
summary: An overview of Software Design Patterns, keeping the theme of a Shrubbery
tags:
  - software-dev
  - learn-to-code
  - shrubbery
---
# **Overview of Software Design Patterns**

Design patterns are reusable solutions to common problems that arise in software design. They provide a shared vocabulary, best practices, and a way to improve the structure and maintainability of your code. Design patterns are typically divided into three main categories: creational, structural, and behavioral patterns.

## **Creational Patterns**

Creational patterns focus on the process of object creation, providing various ways to create objects. This allows for flexibility, reusability, and maintainability in your code. The creational patterns include:

### Abstract Factory

The Abstract Factory pattern is a creational design pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes. It is particularly useful when you need to create objects that belong to different families, but share a common theme, and you want to enforce a consistent usage of these families of objects in your application.

```kotlin
// Abstract product classes
interface Shrubbery {
    fun getDescription(): String
}

interface Fertilizer {
    fun getNutrients(): String
}

// Concrete product classes
class OakShrubbery : Shrubbery {
    override fun getDescription(): String = "A small oak shrubbery."
}

class PineShrubbery : Shrubbery {
    override fun getDescription(): String = "A medium-sized pine shrubbery."
}

class OrganicFertilizer : Fertilizer {
    override fun getNutrients(): String = "Organic nutrients for healthy growth."
}

class SyntheticFertilizer : Fertilizer {
    override fun getNutrients(): String = "Synthetic nutrients for fast growth."
}

// Abstract factory
interface ShrubberyFactory {
    fun createShrubbery(): Shrubbery
    fun createFertilizer(): Fertilizer
}

// Concrete factory classes
class OakShrubberyFactory : ShrubberyFactory {
    override fun createShrubbery(): Shrubbery = OakShrubbery()
    override fun createFertilizer(): Fertilizer = OrganicFertilizer()
}

class PineShrubberyFactory : ShrubberyFactory {
    override fun createShrubbery(): Shrubbery = PineShrubbery()
    override fun createFertilizer(): Fertilizer = SyntheticFertilizer()
}

fun main() {
    val oakFactory: ShrubberyFactory = OakShrubberyFactory()
    val oakShrubbery = oakFactory.createShrubbery()
    val oakFertilizer = oakFactory.createFertilizer()

    println(oakShrubbery.getDescription())
    println(oakFertilizer.getNutrients())

    val pineFactory: ShrubberyFactory = PineShrubberyFactory()
    val pineShrubbery = pineFactory.createShrubbery()
    val pineFertilizer = pineFactory.createFertilizer()

    println(pineShrubbery.getDescription())
    println(pineFertilizer.getNutrients())
}
```

In this example, we have two families of related objects: **`Shrubbery`** and **`Fertilizer`**. Each family has concrete classes that implement their respective interfaces, like **`OakShrubbery`**, **`PineShrubbery`**, **`OrganicFertilizer`**, and **`SyntheticFertilizer`**.

We define an abstract factory interface called **`ShrubberyFactory`**, which declares methods for creating instances of **`Shrubbery`** and **`Fertilizer`**. Then, we create concrete factory classes, **`OakShrubberyFactory`** and **`PineShrubberyFactory`**, that implement the **`ShrubberyFactory`** interface and produce instances of the corresponding concrete classes.

In the **`main`** function, we create instances of the concrete factories, and use them to create instances of the concrete products. By using the Abstract Factory pattern, we can enforce consistency in the usage of these families of objects, and easily switch between different families without changing the client code.

### Builder

The Builder pattern is a creational design pattern that separates the construction of a complex object from its representation. It allows the same construction process to create different representations of the object. The pattern is particularly useful when the object creation involves multiple steps or requires a specific order of actions.

```kotlin
// Product class
data class Shrubbery(val type: String, val height: Int, val width: Int)

// Builder interface
interface ShrubberyBuilder {
    fun setType(type: String): ShrubberyBuilder
    fun setHeight(height: Int): ShrubberyBuilder
    fun setWidth(width: Int): ShrubberyBuilder
    fun build(): Shrubbery
}

// Concrete builder
class ShrubberyBuilderImpl : ShrubberyBuilder {
    private lateinit var type: String
    private var height: Int = 0
    private var width: Int = 0

    override fun setType(type: String): ShrubberyBuilder {
        this.type = type
        return this
    }

    override fun setHeight(height: Int): ShrubberyBuilder {
        this.height = height
        return this
    }

    override fun setWidth(width: Int): ShrubberyBuilder {
        this.width = width
        return this
    }

    override fun build(): Shrubbery {
        return Shrubbery(type, height, width)
    }
}

fun main() {
    val shrubberyBuilder: ShrubberyBuilder = ShrubberyBuilderImpl()

    val oakShrubbery = shrubberyBuilder
        .setType("Oak")
        .setHeight(3)
        .setWidth(2)
        .build()

    val pineShrubbery = shrubberyBuilder
        .setType("Pine")
        .setHeight(5)
        .setWidth(4)
        .build()

    println("Oak Shrubbery: $oakShrubbery")
    println("Pine Shrubbery: $pineShrubbery")
}
```

In this example, we have a **`Shrubbery`** data class that represents the product. The **`ShrubberyBuilder`** interface defines the methods required to set the properties of the **`Shrubbery`** object and to build the final object.

We create a concrete builder class **`ShrubberyBuilderImpl`** that implements the **`ShrubberyBuilder`** interface. The **`ShrubberyBuilderImpl`** class maintains the state of the **`Shrubbery`** object being constructed and provides fluent methods for setting the properties and building the final object.

In the **`main`** function, we create an instance of the concrete builder and use it to construct two different **`Shrubbery`** objects, **`oakShrubbery`** and **`pineShrubbery`**. The Builder pattern allows us to create complex objects step by step, making it easy to create different representations of the object while keeping the construction process separate from the product class.

### Factory Method

The Factory Method pattern is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It allows the client code to work with the superclass, while the actual object instantiation is deferred to the subclasses.

```kotlin
// Product interface
interface Shrubbery {
    fun getDescription(): String
}

// Concrete products
class OakShrubbery : Shrubbery {
    override fun getDescription(): String = "A small oak shrubbery."
}

class PineShrubbery : Shrubbery {
    override fun getDescription(): String = "A medium-sized pine shrubbery."
}

// Creator abstract class
abstract class ShrubberyCreator {
    abstract fun createShrubbery(): Shrubbery

    fun plantShrubbery() {
        val shrubbery = createShrubbery()
        println("Planting a new shrubbery: ${shrubbery.getDescription()}")
    }
}

// Concrete creators
class OakShrubberyCreator : ShrubberyCreator() {
    override fun createShrubbery(): Shrubbery = OakShrubbery()
}

class PineShrubberyCreator : ShrubberyCreator() {
    override fun createShrubbery(): Shrubbery = PineShrubbery()
}

fun main() {
    val oakCreator: ShrubberyCreator = OakShrubberyCreator()
    oakCreator.plantShrubbery()

    val pineCreator: ShrubberyCreator = PineShrubberyCreator()
    pineCreator.plantShrubbery()
}
```

In this example, we have a **`Shrubbery`** interface that serves as the product interface, and two concrete classes, **`OakShrubbery`** and **`PineShrubbery`**, implementing the **`Shrubbery`** interface.

We define an abstract class **`ShrubberyCreator`** that has an abstract method **`createShrubbery()`** for creating **`Shrubbery`** instances. The **`ShrubberyCreator`** class also has a method **`plantShrubbery()`** that plants a new shrubbery and prints its description. The actual creation of the shrubbery is delegated to the **`createShrubbery()`** method, which is implemented by the concrete creator classes.

We create two concrete creator classes, **`OakShrubberyCreator`** and **`PineShrubberyCreator`**, that extend the **`ShrubberyCreator`** abstract class and override the **`createShrubbery()`** method to return instances of the corresponding concrete **`Shrubbery`** classes.

In the **`main`** function, we create instances of the concrete creator classes and call their **`plantShrubbery()`** method. The Factory Method pattern allows us to encapsulate the object creation process and delegate it to the concrete creator classes, making it easy to add new types of shrubberies without changing the client code.

### Object Pool

The Object Pool pattern is a creational design pattern that involves maintaining a pool of reusable objects instead of creating and destroying them on demand. This pattern can be useful when object creation is expensive or slow, and the objects can be reused multiple times. The Object Pool pattern can improve performance by reducing the overhead of creating and destroying objects, especially in situations where the demand for objects fluctuates or is unpredictable.

```kotlin
import java.util.concurrent.ConcurrentLinkedQueue

// Reusable class
class Shrubbery(val type: String) {
    fun trim() {
        println("Trimming $type shrubbery")
    }
}

// Object pool
class ShrubberyPool {
    private val available = ConcurrentLinkedQueue<Shrubbery>()

    fun acquire(type: String): Shrubbery {
        return available.poll() ?: Shrubbery(type)
    }

    fun release(shrubbery: Shrubbery) {
        available.add(shrubbery)
    }
}

fun main() {
    val shrubberyPool = ShrubberyPool()

    // Acquire a shrubbery
    val shrubbery1 = shrubberyPool.acquire("Oak")
    shrubbery1.trim()

    // Release the shrubbery
    shrubberyPool.release(shrubbery1)

    // Acquire another shrubbery (reusing the first one)
    val shrubbery2 = shrubberyPool.acquire("Oak")
    shrubbery2.trim()

    // Release the second shrubbery
    shrubberyPool.release(shrubbery2)
}
```

In this example, we have a **`Shrubbery`** class representing a reusable object. We create an **`ShrubberyPool`** class that manages the pool of reusable **`Shrubbery`** objects. The pool uses a **`ConcurrentLinkedQueue`** to store available objects.

The **`ShrubberyPool`** class provides two methods: **`acquire`** and **`release`**. The **`acquire`** method returns an available object from the pool if one exists, or it creates a new object if the pool is empty. The **`release`** method adds an object back to the pool when it's no longer needed, making it available for reuse.

In the **`main`** function, we create an instance of the **`ShrubberyPool`** and use it to acquire a **`Shrubbery`** object. We then release the object back to the pool and acquire another one. In this example, the second **`Shrubbery`** object is actually the same as the first one, demonstrating the reusability aspect of the Object Pool pattern.

### Prototype

The Prototype pattern is a creational design pattern that involves creating new objects by cloning an existing object, instead of creating them from scratch. This can be useful when the object creation process is resource-intensive, or when the object's state is complex and difficult to initialize directly. By leveraging the Prototype pattern, you can create new objects efficiently by copying the existing object and potentially modifying some of its properties.

```kotlin
// Prototype interface
interface ShrubberyPrototype : Cloneable {
    fun trim()

    public override fun clone(): ShrubberyPrototype
}

// Concrete prototype class
class Shrubbery(private val type: String) : ShrubberyPrototype {
    override fun trim() {
        println("Trimming $type shrubbery")
    }

    override fun clone(): ShrubberyPrototype {
        return Shrubbery(type)
    }
}

fun main() {
    // Create a prototype object
    val oakShrubbery = Shrubbery("Oak")
    oakShrubbery.trim()

    // Clone the prototype object
    val clonedOakShrubbery = oakShrubbery.clone()
    clonedOakShrubbery.trim()

    // Create another prototype object
    val pineShrubbery = Shrubbery("Pine")
    pineShrubbery.trim()

    // Clone the second prototype object
    val clonedPineShrubbery = pineShrubbery.clone()
    clonedPineShrubbery.trim()
}
```

In this example, we define a **`ShrubberyPrototype`** interface that extends **`Cloneable`**. This interface declares the **`trim`** method and a **`clone`** method to create a copy of the object.

We implement the **`ShrubberyPrototype`** interface in the **`Shrubbery`** class. The **`Shrubbery`** class has a **`type`** property and implements the **`trim`** and **`clone`** methods. The **`clone`** method creates a new **`Shrubbery`** object with the same **`type`** property.

In the **`main`** function, we create a prototype **`Shrubbery`** object and then clone it. We also create another prototype object with a different type and clone that one as well. The cloned objects have the same state as their prototypes but are distinct instances.

### Singleton

The Singleton pattern is a creational design pattern that ensures a class has only one instance and provides a global point of access to that instance. This can be useful when you need to coordinate actions across a system or when you want to share data between different parts of your application.

Kotlin provides a straightforward way to implement the Singleton pattern using the **`object`** keyword.

```kotlin
// Singleton class
object ShrubberyManager {
    private val shrubberies = mutableListOf<Shrubbery>()

    fun addShrubbery(shrubbery: Shrubbery) {
        shrubberies.add(shrubbery)
    }

    fun removeShrubbery(shrubbery: Shrubbery) {
        shrubberies.remove(shrubbery)
    }

    fun listShrubberies() {
        println("Shrubberies:")
        shrubberies.forEach { shrubbery ->
            println("- ${shrubbery.type}")
        }
    }
}

// Simple class to represent a shrubbery
data class Shrubbery(val type: String)

fun main() {
    // Add shrubberies to the ShrubberyManager
    ShrubberyManager.addShrubbery(Shrubbery("Oak"))
    ShrubberyManager.addShrubbery(Shrubbery("Pine"))

    // List the shrubberies
    ShrubberyManager.listShrubberies()

    // Remove a shrubbery
    ShrubberyManager.removeShrubbery(Shrubbery("Oak"))

    // List the shrubberies again
    ShrubberyManager.listShrubberies()
}
```

In this example, we use the **`object`** keyword to create a Singleton class called **`ShrubberyManager`**. This class manages a list of **`Shrubbery`** objects and provides methods to add, remove, and list shrubberies.

We also create a simple **`Shrubbery`** data class with a **`type`** property.

In the **`main`** function, we demonstrate the usage of the Singleton by adding and removing shrubberies and listing them. Since the **`ShrubberyManager`** is an **`object`**, there is only one instance of it, and we can access it directly using its name.

With this approach, Kotlin guarantees that there will be only one instance of the **`ShrubberyManager`** in the application, and it provides a global point of access to it.

## **Structural Patterns**

Structural patterns are concerned with the composition of classes and objects, defining the relationships between them. These patterns help ensure that the structure of your code is efficient, scalable, and maintainable. The structural patterns include:

### Adapter

The Adapter pattern is a structural design pattern that allows objects with incompatible interfaces to work together. It does so by wrapping one of the objects in an adapter that implements the expected interface, effectively making the objects compatible. This pattern can be particularly useful when you need to integrate a third-party library or legacy code with a new system.

```kotlin
// Target interface
interface ShrubberyCutter {
    fun cutShrubbery(shrubbery: Shrubbery)
}

// Adaptee class
class OldShrubberyCutter {
    fun trimShrubbery(shrubbery: Shrubbery) {
        println("Trimming ${shrubbery.type} shrubbery with the old cutter")
    }
}

// Adapter class
class ShrubberyCutterAdapter(private val oldShrubberyCutter: OldShrubberyCutter) : ShrubberyCutter {
    override fun cutShrubbery(shrubbery: Shrubbery) {
        oldShrubberyCutter.trimShrubbery(shrubbery)
    }
}

// Simple class to represent a shrubbery
data class Shrubbery(val type: String)

fun main() {
    val oldCutter = OldShrubberyCutter()
    val adapter = ShrubberyCutterAdapter(oldCutter)

    val shrubbery = Shrubbery("Pine")
    adapter.cutShrubbery(shrubbery)
}
```

In this example, we define a **`ShrubberyCutter`** interface, which represents the target interface that we want our code to work with. The **`ShrubberyCutter`** interface has a **`cutShrubbery`** method.

We also define an **`OldShrubberyCutter`** class, which represents the existing, incompatible class (the Adaptee). This class has a **`trimShrubbery`** method with the same functionality but a different name.

To make the **`OldShrubberyCutter`** compatible with the **`ShrubberyCutter`** interface, we create an Adapter class called **`ShrubberyCutterAdapter`**. This adapter implements the **`ShrubberyCutter`** interface and takes an instance of **`OldShrubberyCutter`** as a constructor parameter. The adapter's **`cutShrubbery`** method simply delegates the call to the **`trimShrubbery`** method of the **`OldShrubberyCutter`**.

In the **`main`** function, we create an instance of the **`OldShrubberyCutter`** and wrap it in a **`ShrubberyCutterAdapter`**. We then use the adapter to cut a shrubbery, demonstrating that the adapter makes the **`OldShrubberyCutter`** compatible with the **`ShrubberyCutter`** interface.

### Bridge

The Bridge pattern is a structural design pattern that decouples an abstraction from its implementation, allowing the two to vary independently. This pattern can be useful when you want to separate a complex system into smaller, more manageable components, or when you want to create a system that can be extended without affecting existing code.

```kotlin
// Abstraction
interface ShrubberyRenderer {
    fun renderShrubbery(shrubbery: Shrubbery)
}

// Refined abstraction
class ColorfulShrubberyRenderer(private val color: String) : ShrubberyRenderer {
    override fun renderShrubbery(shrubbery: Shrubbery) {
        println("Rendering a $color ${shrubbery.type} shrubbery")
    }
}

// Implementor
interface ShrubberyPlatform {
    fun drawShrubbery(renderer: ShrubberyRenderer, shrubbery: Shrubbery)
}

// Concrete Implementor
class ShrubberyGarden(private val platform: ShrubberyPlatform) : ShrubberyPlatform {
    override fun drawShrubbery(renderer: ShrubberyRenderer, shrubbery: Shrubbery) {
        println("Drawing a shrubbery in the garden...")
        platform.drawShrubbery(renderer, shrubbery)
    }
}

// Simple class to represent a shrubbery
data class Shrubbery(val type: String)

fun main() {
    val garden = ShrubberyGarden(object : ShrubberyPlatform {
        override fun drawShrubbery(renderer: ShrubberyRenderer, shrubbery: Shrubbery) {
            renderer.renderShrubbery(shrubbery)
        }
    })

    val shrubbery = Shrubbery("Pine")
    val renderer = ColorfulShrubberyRenderer("Green")

    garden.drawShrubbery(renderer, shrubbery)
}
```

In this example, we define a **`ShrubberyRenderer`** interface, which represents the abstraction. This interface has a **`renderShrubbery`** method. We also define a **`ColorfulShrubberyRenderer`** class, which refines the abstraction by adding a color property.

We then define a **`ShrubberyPlatform`** interface, which represents the implementor. This interface has a **`drawShrubbery`** method that takes a **`ShrubberyRenderer`** and a **`Shrubbery`** as parameters. The **`ShrubberyGarden`** class is a concrete implementor that implements the **`ShrubberyPlatform`** interface.

In the **`main`** function, we create an instance of **`ShrubberyGarden`**, passing an anonymous object implementing the **`ShrubberyPlatform`** interface as a parameter. We also create a **`Shrubbery`** object and a **`ColorfulShrubberyRenderer`** object. We then call the **`drawShrubbery`** method of the **`ShrubberyGarden`**, passing the renderer and the shrubbery as parameters. This demonstrates how the Bridge pattern allows the abstraction and its implementation to vary independently.

### Composite

The Composite pattern is a structural design pattern that allows you to compose objects into tree structures to represent part-whole hierarchies. This pattern is useful when you want to treat individual objects and compositions of objects uniformly.

```kotlin
// Component
interface ShrubberyComponent {
    fun display(depth: Int)
}

// Leaf
class Shrubbery(val type: String) : ShrubberyComponent {
    override fun display(depth: Int) {
        println("${"-".repeat(depth)} $type")
    }
}

// Composite
class ShrubberyGroup : ShrubberyComponent {
    private val shrubberyComponents = mutableListOf<ShrubberyComponent>()

    fun add(shrubberyComponent: ShrubberyComponent) {
        shrubberyComponents.add(shrubberyComponent)
    }

    fun remove(shrubberyComponent: ShrubberyComponent) {
        shrubberyComponents.remove(shrubberyComponent)
    }

    override fun display(depth: Int) {
        println("${"-".repeat(depth)} Group")
        shrubberyComponents.forEach { it.display(depth + 2) }
    }
}

fun main() {
    val pine = Shrubbery("Pine")
    val oak = Shrubbery("Oak")

    val shrubberyGroup = ShrubberyGroup()
    shrubberyGroup.add(pine)
    shrubberyGroup.add(oak)

    val topLevelGroup = ShrubberyGroup()
    topLevelGroup.add(Shrubbery("Maple"))
    topLevelGroup.add(shrubberyGroup)

    // Displays the tree structure of the shrubberies
    topLevelGroup.display(0)
}
```

In this example, we define a **`ShrubberyComponent`** interface, which represents the component. This interface has a **`display`** method that takes an integer parameter representing the depth in the tree structure.

The **`Shrubbery`** class represents a leaf node in the tree structure and implements the **`ShrubberyComponent`** interface. The **`display`** method prints the type of the shrubbery with indentation based on the depth.

The **`ShrubberyGroup`** class represents a composite node in the tree structure and also implements the **`ShrubberyComponent`** interface. It maintains a list of child components and provides **`add`** and **`remove`** methods to manage the child components. The **`display`** method prints "Group" with indentation based on the depth, and then iterates through the child components, calling their **`display`** method with an incremented depth.

In the **`main`** function, we create individual **`Shrubbery`** objects and **`ShrubberyGroup`** objects. We add **`Shrubbery`** objects to the **`shrubberyGroup`** and then add both individual **`Shrubbery`** objects and the **`shrubberyGroup`** to the **`topLevelGroup`**. Finally, we call the **`display`** method on the **`topLevelGroup`** to display the tree structure of the shrubberies.

### Decorator

The Decorator pattern is a structural design pattern that allows you to attach new responsibilities to objects dynamically without changing their underlying structure. Decorators provide a flexible alternative to subclassing for extending functionality.

```kotlin
// Component
interface Shrubbery {
    fun getDescription(): String
    fun getCost(): Double
}

// Concrete Component
class BasicShrubbery : Shrubbery {
    override fun getDescription() = "Basic Shrubbery"

    override fun getCost() = 10.0
}

// Decorator
abstract class ShrubberyDecorator(private val shrubbery: Shrubbery) : Shrubbery {
    override fun getDescription() = shrubbery.getDescription()

    override fun getCost() = shrubbery.getCost()
}

// Concrete Decorator
class FertilizedShrubbery(private val shrubbery: Shrubbery) : ShrubberyDecorator(shrubbery) {
    override fun getDescription() = "${shrubbery.getDescription()}, Fertilized"

    override fun getCost() = shrubbery.getCost() + 5.0
}

// Another Concrete Decorator
class PrunedShrubbery(private val shrubbery: Shrubbery) : ShrubberyDecorator(shrubbery) {
    override fun getDescription() = "${shrubbery.getDescription()}, Pruned"

    override fun getCost() = shrubbery.getCost() + 7.5
}

fun main() {
    val basicShrubbery: Shrubbery = BasicShrubbery()
    val fertilizedShrubbery: Shrubbery = FertilizedShrubbery(basicShrubbery)
    val prunedAndFertilizedShrubbery: Shrubbery = PrunedShrubbery(fertilizedShrubbery)

    println("Basic Shrubbery: ${basicShrubbery.getDescription()} costs ${basicShrubbery.getCost()}")
    println("Fertilized Shrubbery: ${fertilizedShrubbery.getDescription()} costs ${fertilizedShrubbery.getCost()}")
    println("Pruned and Fertilized Shrubbery: ${prunedAndFertilizedShrubbery.getDescription()} costs ${prunedAndFertilizedShrubbery.getCost()}")
}
```

In this example, we have a **`Shrubbery`** interface, which represents the Component. It has two methods: **`getDescription()`** and **`getCost()`**.

The **`BasicShrubbery`** class is the Concrete Component that implements the **`Shrubbery`** interface. It provides a basic description and cost for a shrubbery.

The **`ShrubberyDecorator`** is an abstract class that also implements the **`Shrubbery`** interface. It takes a **`Shrubbery`** object as a constructor parameter and delegates the **`getDescription()`** and **`getCost()`** methods to the wrapped **`Shrubbery`** object.

We then define two Concrete Decorator classes: **`FertilizedShrubbery`** and **`PrunedShrubbery`**. Both extend the **`ShrubberyDecorator`** class and override the **`getDescription()`** and **`getCost()`** methods to add their specific functionality and cost.

In the **`main`** function, we create instances of the **`BasicShrubbery`**, **`FertilizedShrubbery`**, and **`PrunedShrubbery`**. We then demonstrate how decorators can be combined to create a pruned and fertilized shrubbery. Finally, we print the descriptions and costs of each shrubbery.

### Facade

The Facade pattern is a structural design pattern that provides a simplified interface to a more complex subsystem. It is particularly useful when you want to hide the complexities of a system and provide a cleaner, more straightforward interface for clients to interact with.

```kotlin
// Complex subsystem classes
class SoilPreparation {
    fun prepare() {
        println("Preparing the soil...")
    }
}

class Planting {
    fun plantShrubbery() {
        println("Planting the shrubbery...")
    }
}

class Watering {
    fun water() {
        println("Watering the shrubbery...")
    }
}

class Fertilizing {
    fun fertilize() {
        println("Fertilizing the shrubbery...")
    }
}

// Facade class
class ShrubberyGardener {
    private val soilPreparation = SoilPreparation()
    private val planting = Planting()
    private val watering = Watering()
    private val fertilizing = Fertilizing()

    fun plantShrubbery() {
        soilPreparation.prepare()
        planting.plantShrubbery()
        watering.water()
        fertilizing.fertilize()
        println("Shrubbery successfully planted!")
    }
}

fun main() {
    val shrubberyGardener = ShrubberyGardener()
    shrubberyGardener.plantShrubbery()
}
```

In this example, we have a complex subsystem that consists of several classes, each representing a step in the process of planting a shrubbery: **`SoilPreparation`**, **`Planting`**, **`Watering`**, and **`Fertilizing`**. Each class has a method to perform its specific task.

The **`ShrubberyGardener`** class serves as the Facade in this example. It simplifies the process of planting a shrubbery by hiding the complexity of the subsystem behind a single method: **`plantShrubbery()`**. Inside this method, it instantiates the subsystem classes and calls their respective methods in the correct order.

In the **`main`** function, we create an instance of the **`ShrubberyGardener`** facade and call its **`plantShrubbery()`** method to plant a shrubbery. Clients only need to interact with the facade, making it easier for them to use the subsystem.

### Flyweight

The Flyweight pattern is a structural design pattern that optimizes memory usage by sharing common data between similar objects. It is particularly useful when you have a large number of objects that share common properties, allowing you to reduce the memory footprint by storing these shared properties in a separate flyweight object.

```kotlin
// Flyweight class
data class ShrubberyType(val name: String, val color: String, val height: Double)

// Object that uses the Flyweight
class Shrubbery(val type: ShrubberyType, val x: Int, val y: Int) {
    fun display() {
        println("Displaying shrubbery of type ${type.name} with color ${type.color} and height ${type.height} at position ($x, $y)")
    }
}

// Flyweight factory
class ShrubberyTypeFactory {
    private val shrubberyTypes = mutableMapOf<String, ShrubberyType>()

    fun getShrubberyType(name: String, color: String, height: Double): ShrubberyType {
        val key = "$name-$color-$height"
        return shrubberyTypes.getOrPut(key) { ShrubberyType(name, color, height) }
    }
}

fun main() {
    val factory = ShrubberyTypeFactory()

    val shrubberyType1 = factory.getShrubberyType("Round", "Green", 1.5)
    val shrubberyType2 = factory.getShrubberyType("Tall", "Red", 3.0)

    val shrubberies = listOf(
        Shrubbery(shrubberyType1, 0, 0),
        Shrubbery(shrubberyType1, 1, 1),
        Shrubbery(shrubberyType2, 2, 2),
        Shrubbery(shrubberyType2, 3, 3)
    )

    shrubberies.forEach { it.display() }
}
```

In this example, the **`ShrubberyType`** class serves as the Flyweight. It represents the shared data (name, color, and height) for different shrubberies. The **`Shrubbery`** class is the object that uses the Flyweight, and it has a reference to the **`ShrubberyType`** instance and its own unique properties, such as **`x`** and **`y`** coordinates.

The **`ShrubberyTypeFactory`** class is responsible for creating and managing the flyweight objects. It maintains a map of existing flyweight instances and creates a new one only if an instance with the requested properties does not already exist.

In the **`main`** function, we create a **`ShrubberyTypeFactory`** instance and use it to get two different **`ShrubberyType`** instances. We then create a list of **`Shrubbery`** instances, some of which share the same **`ShrubberyType`**. Finally, we display the shrubberies, demonstrating that they share the same **`ShrubberyType`** instances while having their own unique properties.

### Proxy

The Proxy pattern is a structural design pattern that provides an object acting as an interface to another object, the "real" subject. This pattern is useful when you want to control access to the real subject, enhance its behavior, or delay its instantiation or loading.

```kotlin
interface Shrubbery {
    fun display(): String
}

class RealShrubbery(private val name: String) : Shrubbery {
    init {
        loadShrubbery(name)
    }

    private fun loadShrubbery(name: String) {
        println("Loading shrubbery $name")
    }

    override fun display(): String {
        return "Displaying shrubbery $name"
    }
}

class ShrubberyProxy(private val name: String) : Shrubbery {
    private var realShrubbery: RealShrubbery? = null

    override fun display(): String {
        if (realShrubbery == null) {
            realShrubbery = RealShrubbery(name)
        }
        return realShrubbery!!.display()
    }
}

fun main() {
    val shrubberyProxy = ShrubberyProxy("Round")
    println("Shrubbery proxy created")

    // The real subject is created and loaded only when it's needed
    println(shrubberyProxy.display())
}
```

In this example, we have a **`Shrubbery`** interface that both the **`RealShrubbery`** class and the **`ShrubberyProxy`** class implement. The **`RealShrubbery`** class represents the actual subject, and its constructor simulates loading the shrubbery, which may be an expensive operation.

The **`ShrubberyProxy`** class acts as a proxy for the **`RealShrubbery`**. It has a reference to a **`RealShrubbery`** instance, but it doesn't instantiate it right away. Instead, it creates the real subject only when it's needed, in this case, when the **`display`** method is called.

In the **`main`** function, we create a **`ShrubberyProxy`** instance, which doesn't load the actual shrubbery yet. When we call the **`display`** method on the proxy, it instantiates the **`RealShrubbery`**, loads it, and then calls its **`display`** method.

This example demonstrates the lazy loading technique, which is just one of the many use cases for the Proxy pattern. Other use cases include access control, caching, or even adding functionality to the real subject without modifying it.

## **Behavioral Patterns**

Behavioral patterns define the ways in which objects interact and communicate with one another, encapsulating the logic behind these interactions. They help improve the flexibility, maintainability, and reusability of your code by decoupling components. The behavioral patterns include:

### Chain of Responsibility

The Chain of Responsibility pattern is a behavioral design pattern that enables you to create a chain of objects that can handle a request. Each object in the chain can either handle the request or pass it to the next object in the chain. This pattern is useful for decoupling the sender of a request from the receiver by allowing multiple objects to handle the request.

```kotlin
abstract class ShrubberyHandler {
    private var nextHandler: ShrubberyHandler? = null

    fun setNext(handler: ShrubberyHandler): ShrubberyHandler {
        nextHandler = handler
        return handler
    }

    fun handleRequest(request: String) {
        if (canHandleRequest(request)) {
            processRequest(request)
        } else {
            nextHandler?.handleRequest(request)
        }
    }

    abstract fun canHandleRequest(request: String): Boolean

    abstract fun processRequest(request: String)
}

class ShrubberySizeHandler : ShrubberyHandler() {
    override fun canHandleRequest(request: String): Boolean {
        return request.contains("size")
    }

    override fun processRequest(request: String) {
        println("Handling size request: $request")
    }
}

class ShrubberyColorHandler : ShrubberyHandler() {
    override fun canHandleRequest(request: String): Boolean {
        return request.contains("color")
    }

    override fun processRequest(request: String) {
        println("Handling color request: $request")
    }
}

fun main() {
    val sizeHandler = ShrubberySizeHandler()
    val colorHandler = ShrubberyColorHandler()

    sizeHandler.setNext(colorHandler)

    val requests = listOf("size:small", "color:green", "size:large", "color:red")

    for (request in requests) {
        sizeHandler.handleRequest(request)
    }
}
```

In this example, we have an abstract **`ShrubberyHandler`** class that represents a generic handler in the chain. It has a reference to the next handler, which is initially **`null`**. The **`setNext`** method allows us to create the chain by setting the next handler in the chain. The **`handleRequest`** method checks if the handler can handle the request, and if so, processes it. Otherwise, it passes the request to the next handler in the chain.

We then have two concrete handler classes: **`ShrubberySizeHandler`** and **`ShrubberyColorHandler`**, both extending **`ShrubberyHandler`**. Each of them overrides the **`canHandleRequest`** and **`processRequest`** methods to define their specific behavior.

In the **`main`** function, we create the handler objects and set up the chain. We then iterate through a list of requests and call the **`handleRequest`** method on the first handler in the chain (**`sizeHandler`**). Each request is processed by the appropriate handler in the chain based on its content.

This example demonstrates a simple use case for the Chain of Responsibility pattern. It can be extended and adapted to more complex scenarios, such as handling different types of requests, adding more handlers, or even using a more sophisticated mechanism for determining which handler should process a request.

### Command

The Command pattern is a behavioral design pattern that turns a request into a stand-alone object that contains all the information about the request. This allows you to pass requests as method arguments, delay or queue request execution, and support undoable operations.

```kotlin
// Command interface
interface ShrubberyCommand {
    fun execute()
}

// Concrete command classes
class PlantShrubberyCommand(private val shrubbery: String) : ShrubberyCommand {
    override fun execute() {
        println("Planting shrubbery: $shrubbery")
    }
}

class TrimShrubberyCommand(private val shrubbery: String) : ShrubberyCommand {
    override fun execute() {
        println("Trimming shrubbery: $shrubbery")
    }
}

// Invoker class
class ShrubberyGardener {
    private val commandQueue = mutableListOf<ShrubberyCommand>()

    fun addCommand(command: ShrubberyCommand) {
        commandQueue.add(command)
    }

    fun executeCommands() {
        for (command in commandQueue) {
            command.execute()
        }
        commandQueue.clear()
    }
}

fun main() {
    val gardener = ShrubberyGardener()

    gardener.addCommand(PlantShrubberyCommand("Rose"))
    gardener.addCommand(TrimShrubberyCommand("Rose"))
    gardener.addCommand(PlantShrubberyCommand("Lilac"))

    gardener.executeCommands()
}
```

In this example, we have a **`ShrubberyCommand`** interface that represents the Command. This interface has a single method **`execute()`** that concrete command classes must implement.

We then create two concrete command classes, **`PlantShrubberyCommand`** and **`TrimShrubberyCommand`**, both implementing the **`ShrubberyCommand`** interface. Each of these command classes has a **`shrubbery`** property and an implementation of the **`execute()`** method to perform the specific action.

The **`ShrubberyGardener`** class serves as the invoker. It maintains a queue of commands and provides methods to add commands to the queue and execute them in order. In this example, the **`executeCommands()`** method iterates through the queue, executes each command, and clears the queue afterward.

In the **`main`** function, we create a **`ShrubberyGardener`** object and add a few commands to its queue. We then call the **`executeCommands()`** method to execute all the commands in the queue.

The Command pattern allows us to encapsulate requests and their associated data in command objects. This can help simplify code, enable reusability of commands, and make it easy to add new commands to the system.

### Interpreter

The Interpreter pattern is a behavioral design pattern that defines a representation for a language's grammar and provides an interpreter to evaluate expressions in the language. This pattern is useful when you need to implement a simple language, perform calculations, or process structured text data.

```kotlin
// Expression interface
interface ShrubberyExpression {
    fun interpret(context: String): Boolean
}

// Terminal expression
class ShrubberyTerminalExpression(private val data: String) : ShrubberyExpression {
    override fun interpret(context: String): Boolean {
        return context.contains(data)
    }
}

// Or expression
class ShrubberyOrExpression(private val expr1: ShrubberyExpression, private val expr2: ShrubberyExpression) : ShrubberyExpression {
    override fun interpret(context: String): Boolean {
        return expr1.interpret(context) || expr2.interpret(context)
    }
}

// And expression
class ShrubberyAndExpression(private val expr1: ShrubberyExpression, private val expr2: ShrubberyExpression) : ShrubberyExpression {
    override fun interpret(context: String): Boolean {
        return expr1.interpret(context) && expr2.interpret(context)
    }
}

fun main() {
    // Create terminal expressions
    val roseExpression = ShrubberyTerminalExpression("Rose")
    val lilacExpression = ShrubberyTerminalExpression("Lilac")

    // Create combined expressions
    val roseOrLilacExpression = ShrubberyOrExpression(roseExpression, lilacExpression)
    val roseAndLilacExpression = ShrubberyAndExpression(roseExpression, lilacExpression)

    // Interpret expressions
    println("Garden has Rose or Lilac: ${roseOrLilacExpression.interpret("Rose, Lilac")}")
    println("Garden has Rose and Lilac: ${roseAndLilacExpression.interpret("Rose, Lilac")}")
}
```

In this example, we define a **`ShrubberyExpression`** interface that represents the abstract syntax tree of our simple language. This interface has a single method, **`interpret()`**, which takes a context (in this case, a **`String`**) and returns a **`Boolean`** value.

We then create **`ShrubberyTerminalExpression`**, which is a terminal expression representing specific data in our language (in this case, the name of a shrubbery). It implements the **`interpret()`** method by checking if the context contains the specific data.

We also create two non-terminal expressions, **`ShrubberyOrExpression`** and **`ShrubberyAndExpression`**. Each of these classes takes two **`ShrubberyExpression`** objects and implements the **`interpret()`** method by performing the appropriate logical operation (OR or AND) on the results of the **`interpret()`** method calls on the two expressions.

In the **`main`** function, we create instances of the terminal and non-terminal expressions and test their interpretations.

The Interpreter pattern is suitable when you have a well-defined grammar for a simple language, and the performance of the interpreter is not critical. In cases where the language is more complex or performance is crucial, you may want to consider using other techniques such as parsing or compilation.

### Iterator

The Iterator pattern is a behavioral design pattern that provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. The pattern defines an interface for traversing a collection of elements and decouples the client code from the internal structure of the collection.

In Kotlin, the Iterator pattern is implemented by default in the standard library for many collections, such as lists and sets.

```kotlin
// Aggregate interface
interface ShrubberyCollection {
    fun createIterator(): ShrubberyIterator
}

// Iterator interface
interface ShrubberyIterator {
    fun hasNext(): Boolean
    fun next(): String
}

// Concrete aggregate
class ShrubberyList(private val shrubberies: List<String>) : ShrubberyCollection {
    override fun createIterator(): ShrubberyIterator {
        return ShrubberyListIterator(shrubberies)
    }
}

// Concrete iterator
class ShrubberyListIterator(private val shrubberies: List<String>) : ShrubberyIterator {
    private var index = 0

    override fun hasNext(): Boolean {
        return index < shrubberies.size
    }

    override fun next(): String {
        if (!hasNext()) throw NoSuchElementException()
        return shrubberies[index++]
    }
}

fun main() {
    val shrubberyList = ShrubberyList(listOf("Rose", "Lilac", "Tulip"))

    val iterator = shrubberyList.createIterator()
    while (iterator.hasNext()) {
        val shrubbery = iterator.next()
        println(shrubbery)
    }
}
```

In this example, we define a **`ShrubberyCollection`** interface that represents the aggregate object. This interface has a single method, **`createIterator()`**, which returns a **`ShrubberyIterator`** object.

We then create a **`ShrubberyIterator`** interface, which defines two methods: **`hasNext()`** and **`next()`**. The **`hasNext()`** method checks if there is a next element in the collection, and the **`next()`** method returns the next element.

Next, we create a concrete aggregate, **`ShrubberyList`**, which implements the **`ShrubberyCollection`** interface. It holds a list of shrubberies and creates a **`ShrubberyListIterator`** when the **`createIterator()`** method is called.

The **`ShrubberyListIterator`** is a concrete iterator that implements the **`ShrubberyIterator`** interface. It takes the list of shrubberies as a parameter and provides the **`hasNext()`** and **`next()`** methods to traverse the list.

In the **`main`** function, we create an instance of **`ShrubberyList`** with a list of shrubberies, create an iterator using the **`createIterator()`** method, and then use the iterator to traverse the shrubberies and print them.

In Kotlin, you can use built-in iterators for most collections, so you don't usually need to implement the Iterator pattern from scratch like in this example. However, this example demonstrates the core concept of the pattern and how you can implement it if needed for a custom collection.

### Mediator

The Mediator pattern is a behavioral design pattern that defines an object that encapsulates how a set of objects interact. This pattern is used to promote loose coupling between objects by keeping them from referring to each other explicitly, and it lets you vary their interaction independently.

```kotlin
// Mediator interface
interface ShrubberyMediator {
    fun notify(sender: ShrubberyComponent, event: String)
}

// Abstract component
abstract class ShrubberyComponent(val mediator: ShrubberyMediator) {
    fun changed(event: String) {
        mediator.notify(this, event)
    }
}

// Concrete components
class ShrubberyPicker(mediator: ShrubberyMediator) : ShrubberyComponent(mediator) {
    fun pickShrubbery(shrubbery: String) {
        println("Shrubbery picked: $shrubbery")
        changed("PICKED")
    }
}

class ShrubberyProcessor(mediator: ShrubberyMediator) : ShrubberyComponent(mediator) {
    fun processShrubbery() {
        println("Processing shrubbery...")
        changed("PROCESSED")
    }
}

// Concrete mediator
class ShrubberyManager : ShrubberyMediator {
    private val picker = ShrubberyPicker(this)
    private val processor = ShrubberyProcessor(this)

    override fun notify(sender: ShrubberyComponent, event: String) {
        when (event) {
            "PICKED" -> processor.processShrubbery()
            "PROCESSED" -> println("Shrubbery processed!")
        }
    }

    fun start() {
        picker.pickShrubbery("Rose")
    }
}

fun main() {
    val shrubberyManager = ShrubberyManager()
    shrubberyManager.start()
}
```

In this example, we define a **`ShrubberyMediator`** interface, which represents the mediator. The interface has a single method, **`notify()`**, which is called when a component has an event that may require interaction with other components.

We create an abstract **`ShrubberyComponent`** class that represents the components that will interact through the mediator. The class takes a **`ShrubberyMediator`** as a parameter and has a **`changed()`** method that notifies the mediator of an event.

We create two concrete components, **`ShrubberyPicker`** and **`ShrubberyProcessor`**. These components inherit from **`ShrubberyComponent`** and implement their own behavior. The **`ShrubberyPicker`** has a **`pickShrubbery()`** method that picks a shrubbery and notifies the mediator, while the **`ShrubberyProcessor`** has a **`processShrubbery()`** method that processes a shrubbery and also notifies the mediator.

We then create a concrete mediator, **`ShrubberyManager`**, which implements the **`ShrubberyMediator`** interface. The manager holds instances of the **`ShrubberyPicker`** and **`ShrubberyProcessor`** and implements the **`notify()`** method to handle their interactions. In this example, when the picker picks a shrubbery, the processor processes it.

Finally, in the **`main`** function, we create an instance of **`ShrubberyManager`** and call the **`start()`** method, which starts the picking and processing of a shrubbery. The interactions between the picker and the processor are handled by the mediator, keeping them loosely coupled.

### Memento

The Memento pattern is a behavioral design pattern that provides the ability to restore an object to its previous state, which is useful for implementing undo/redo functionality or creating snapshots of the object's state.

```kotlin
// Memento class
data class ShrubberyMemento(val height: Double)

// Originator class
class Shrubbery(var height: Double) {
    fun save(): ShrubberyMemento {
        return ShrubberyMemento(height)
    }

    fun restore(memento: ShrubberyMemento) {
        height = memento.height
    }
}

// Caretaker class
class ShrubberyCaretaker {
    private val mementos = mutableListOf<ShrubberyMemento>()

    fun saveState(shrubbery: Shrubbery) {
        mementos.add(shrubbery.save())
    }

    fun restoreState(shrubbery: Shrubbery, index: Int) {
        if (index < mementos.size) {
            shrubbery.restore(mementos[index])
        }
    }
}

fun main() {
    val shrubbery = Shrubbery(2.0)
    val caretaker = ShrubberyCaretaker()

    caretaker.saveState(shrubbery)
    println("Initial height: ${shrubbery.height}")

    shrubbery.height = 3.5
    caretaker.saveState(shrubbery)
    println("Updated height: ${shrubbery.height}")

    caretaker.restoreState(shrubbery, 0)
    println("Restored height: ${shrubbery.height}")
}
```

In this example, we define a **`ShrubberyMemento`** class that stores the state of a **`Shrubbery`** object. The **`Shrubbery`** class represents the originator, which has a mutable **`height`** property. It has two methods, **`save()`** and **`restore()`**, which are responsible for saving the current state and restoring a previous state from a memento, respectively.

The **`ShrubberyCaretaker`** class is responsible for managing the mementos. It stores the mementos in a list and provides methods **`saveState()`** and **`restoreState()`** to save and restore the state of a **`Shrubbery`** object.

In the **`main`** function, we create a **`Shrubbery`** object and a **`ShrubberyCaretaker`**. We then save the initial state of the shrubbery and modify its height. After that, we save the updated state and finally restore the initial state using the caretaker. The output of the program demonstrates the changes and restoration of the shrubbery's height.

### Observer

The Observer pattern is a behavioral design pattern that defines a one-to-many dependency between objects. When one object (the subject) changes its state, all its dependent objects (the observers) are notified and updated automatically. This pattern is useful when you need to maintain consistency between related objects without making them tightly coupled.

```kotlin
// Observer interface
interface ShrubberyObserver {
    fun update(newHeight: Double)
}

// Concrete Observer class
class ShrubberyDisplay : ShrubberyObserver {
    private var height: Double = 0.0

    override fun update(newHeight: Double) {
        height = newHeight
        display()
    }

    fun display() {
        println("Shrubbery height: $height")
    }
}

// Subject class
class Shrubbery {
    private val observers = mutableListOf<ShrubberyObserver>()
    var height: Double = 0.0
        set(value) {
            field = value
            notifyObservers()
        }

    fun addObserver(observer: ShrubberyObserver) {
        observers.add(observer)
    }

    fun removeObserver(observer: ShrubberyObserver) {
        observers.remove(observer)
    }

    private fun notifyObservers() {
        for (observer in observers) {
            observer.update(height)
        }
    }
}

fun main() {
    val shrubbery = Shrubbery()
    val display = ShrubberyDisplay()

    shrubbery.addObserver(display)

    shrubbery.height = 2.0
    shrubbery.height = 3.5
}
```

In this example, we define a **`ShrubberyObserver`** interface that represents the observer. The **`ShrubberyDisplay`** class is a concrete observer that implements the **`ShrubberyObserver`** interface. It has a **`height`** property and two methods: **`update()`** to update its state when notified and **`display()`** to display the current height.

The **`Shrubbery`** class represents the subject. It maintains a list of observers and a **`height`** property. When the **`height`** property is changed, the **`notifyObservers()`** method is called, which iterates through the list of observers and calls their **`update()`** methods with the new height value.

In the **`main`** function, we create a **`Shrubbery`** object and a **`ShrubberyDisplay`** object. We then register the display as an observer of the shrubbery. When we change the height of the shrubbery, the display is notified and updates its state to reflect the new height.

### State

The State pattern is a behavioral design pattern that allows an object to change its behavior when its internal state changes. Instead of using conditionals to manage state-dependent behavior, the State pattern delegates this behavior to separate state objects.

```kotlin
// State interface
interface ShrubberyState {
    fun grow(shrubbery: Shrubbery)
}

// Concrete State classes
class SmallShrubberyState : ShrubberyState {
    override fun grow(shrubbery: Shrubbery) {
        println("Growing from small to medium")
        shrubbery.currentState = MediumShrubberyState()
    }
}

class MediumShrubberyState : ShrubberyState {
    override fun grow(shrubbery: Shrubbery) {
        println("Growing from medium to large")
        shrubbery.currentState = LargeShrubberyState()
    }
}

class LargeShrubberyState : ShrubberyState {
    override fun grow(shrubbery: Shrubbery) {
        println("Cannot grow further, already large")
    }
}

// Context class
class Shrubbery {
    var currentState: ShrubberyState = SmallShrubberyState()

    fun grow() {
        currentState.grow(this)
    }
}

fun main() {
    val shrubbery = Shrubbery()

    shrubbery.grow() // Growing from small to medium
    shrubbery.grow() // Growing from medium to large
    shrubbery.grow() // Cannot grow further, already large
}
```

In this example, we define a **`ShrubberyState`** interface that represents the state. It has a single method, **`grow()`**, which takes a **`Shrubbery`** object as a parameter. We also define three concrete state classes that implement the **`ShrubberyState`** interface: **`SmallShrubberyState`**, **`MediumShrubberyState`**, and **`LargeShrubberyState`**. Each concrete state class defines the **`grow()`** method to change the shrubbery's state and print a message.

The **`Shrubbery`** class represents the context. It maintains a reference to the current state object through the **`currentState`** property. It also provides a **`grow()`** method, which delegates the growing behavior to the current state object.

In the **`main`** function, we create a **`Shrubbery`** object with an initial state of **`SmallShrubberyState`**. We then call the **`grow()`** method three times. Each time the method is called, the behavior changes based on the current state of the shrubbery.

### Strategy

The Strategy pattern is a behavioral design pattern that allows you to define a family of algorithms, encapsulate each one, and make them interchangeable. The Strategy pattern lets the algorithm vary independently from clients that use it.

```kotlin
// Strategy interface
interface PruningStrategy {
    fun prune(): String
}

// Concrete Strategy classes
class LightPruningStrategy : PruningStrategy {
    override fun prune(): String {
        return "Light pruning"
    }
}

class ModeratePruningStrategy : PruningStrategy {
    override fun prune(): String {
        return "Moderate pruning"
    }
}

class HeavyPruningStrategy : PruningStrategy {
    override fun prune(): String {
        return "Heavy pruning"
    }
}

// Context class
class Shrubbery(private var pruningStrategy: PruningStrategy) {
    fun setPruningStrategy(strategy: PruningStrategy) {
        pruningStrategy = strategy
    }

    fun performPruning(): String {
        return pruningStrategy.prune()
    }
}

fun main() {
    val shrubbery = Shrubbery(LightPruningStrategy())
    println(shrubbery.performPruning()) // Light pruning

    shrubbery.setPruningStrategy(ModeratePruningStrategy())
    println(shrubbery.performPruning()) // Moderate pruning

    shrubbery.setPruningStrategy(HeavyPruningStrategy())
    println(shrubbery.performPruning()) // Heavy pruning
}
```

In this example, we define a **`PruningStrategy`** interface that represents the strategy. It has a single method, **`prune()`**, which returns a **`String`** describing the pruning process. We also define three concrete strategy classes that implement the **`PruningStrategy`** interface: **`LightPruningStrategy`**, **`ModeratePruningStrategy`**, and **`HeavyPruningStrategy`**. Each concrete strategy class defines the **`prune()`** method with a specific behavior.

The **`Shrubbery`** class represents the context. It maintains a reference to the current strategy object through the **`pruningStrategy`** property. It provides a **`setPruningStrategy()`** method to change the strategy at runtime and a **`performPruning()`** method, which delegates the pruning behavior to the current strategy object.

In the **`main`** function, we create a **`Shrubbery`** object with an initial strategy of **`LightPruningStrategy`**. We then call the **`performPruning()`** method to print the pruning process. After that, we change the strategy using the **`setPruningStrategy()`** method and call **`performPruning()`** again to demonstrate how the behavior changes based on the current strategy.

### Template Method

The Template Method pattern is a behavioral design pattern that defines the skeleton of an algorithm in a base class but lets subclasses override specific steps of the algorithm without changing its structure.

```kotlin
// Abstract base class with the template method
abstract class ShrubberyCare {

    fun care() {
        prepareTools()
        prune()
        water()
        cleanUp()
    }

    protected open fun prepareTools() {
        println("Preparing tools for shrubbery care.")
    }

    protected abstract fun prune()

    protected open fun water() {
        println("Watering the shrubbery.")
    }

    protected open fun cleanUp() {
        println("Cleaning up after shrubbery care.")
    }
}

// Concrete classes
class LightCareShrubbery : ShrubberyCare() {
    override fun prune() {
        println("Performing light pruning.")
    }
}

class HeavyCareShrubbery : ShrubberyCare() {
    override fun prune() {
        println("Performing heavy pruning.")
    }

    override fun cleanUp() {
        println("Cleaning up thoroughly after heavy shrubbery care.")
    }
}

fun main() {
    val lightCareShrubbery = LightCareShrubbery()
    val heavyCareShrubbery = HeavyCareShrubbery()

    println("Light care:")
    lightCareShrubbery.care()

    println("\nHeavy care:")
    heavyCareShrubbery.care()
}
```

In this example, we define an abstract base class **`ShrubberyCare`** that represents the template method. The **`care()`** method is the template method that consists of several steps: **`prepareTools()`**, **`prune()`**, **`water()`**, and **`cleanUp()`**. Some of these steps are defined as abstract methods, like **`prune()`**, which means subclasses must provide an implementation for them. Other steps have a default implementation but are marked as **`open`**, allowing subclasses to override them if needed.

We define two concrete subclasses, **`LightCareShrubbery`** and **`HeavyCareShrubbery`**, which inherit from **`ShrubberyCare`**. Both subclasses provide their own implementation of the **`prune()`** method. The **`HeavyCareShrubbery`** class also overrides the **`cleanUp()`** method to provide a different cleanup behavior.

In the **`main`** function, we create instances of **`LightCareShrubbery`** and **`HeavyCareShrubbery`** and call their **`care()`** methods. This demonstrates how the template method ensures that the algorithm's structure remains the same while allowing subclasses to provide their own implementations of specific steps.

### Visitor

The Visitor pattern is a behavioral design pattern that allows you to separate algorithms from the objects on which they operate. It lets you define a new operation without changing the classes of the objects you work with.

```kotlin
// Element interface
interface Shrubbery {
    fun accept(visitor: ShrubberyVisitor)
}

// Concrete elements
class OakShrubbery : Shrubbery {
    fun oakSpecificOperation() {
        println("Performing an operation specific to Oak shrubbery.")
    }

    override fun accept(visitor: ShrubberyVisitor) {
        visitor.visitOakShrubbery(this)
    }
}

class PineShrubbery : Shrubbery {
    fun pineSpecificOperation() {
        println("Performing an operation specific to Pine shrubbery.")
    }

    override fun accept(visitor: ShrubberyVisitor) {
        visitor.visitPineShrubbery(this)
    }
}

// Visitor interface
interface ShrubberyVisitor {
    fun visitOakShrubbery(oakShrubbery: OakShrubbery)
    fun visitPineShrubbery(pineShrubbery: PineShrubbery)
}

// Concrete visitor
class ShrubberyCareVisitor : ShrubberyVisitor {
    override fun visitOakShrubbery(oakShrubbery: OakShrubbery) {
        println("Caring for an Oak shrubbery.")
        oakShrubbery.oakSpecificOperation()
    }

    override fun visitPineShrubbery(pineShrubbery: PineShrubbery) {
        println("Caring for a Pine shrubbery.")
        pineShrubbery.pineSpecificOperation()
    }
}

fun main() {
    val shrubberies: List<Shrubbery> = listOf(OakShrubbery(), PineShrubbery())
    val visitor = ShrubberyCareVisitor()

    for (shrubbery in shrubberies) {
        shrubbery.accept(visitor)
    }
}
```

In this example, we have an **`Shrubbery`** interface representing the element interface with an **`accept`** method. We also have two concrete elements, **`OakShrubbery`** and **`PineShrubbery`**, which implement the **`Shrubbery`** interface and their own specific operations.

The **`ShrubberyVisitor`** interface is the visitor interface with methods for each type of concrete element. We have a **`ShrubberyCareVisitor`** class implementing the **`ShrubberyVisitor`** interface, which defines how to care for different types of shrubberies.

In the **`main`** function, we create a list of **`Shrubbery`** objects and a **`ShrubberyCareVisitor`** object. We iterate through the list of shrubberies and call their **`accept`** method with the visitor. This allows the visitor to perform operations on the different types of shrubberies without modifying their classes.

The Visitor pattern is particularly useful when you want to perform various operations on a set of objects with different classes and don't want to pollute their classes with methods unrelated to their primary responsibilities.

## Conclusion

In conclusion, software design patterns are reusable solutions to common problems that arise in software design. They provide a shared language and best practices that can improve the efficiency and maintainability of your code. Design patterns can be classified into three main categories: creational, structural, and behavioral.

Creational patterns focus on the process of object creation, providing mechanisms to create objects in a flexible and efficient manner. Examples include the Abstract Factory, Builder, Factory Method, Object Pool, Prototype, and Singleton patterns.

Structural patterns deal with the composition of classes and objects to form larger structures. They help ensure that the architecture of your software is scalable and robust. Examples of structural patterns include the Adapter, Bridge, Composite, Decorator, Facade, Flyweight, and Proxy patterns.

Behavioral patterns define the ways in which objects interact and communicate with one another. They help to improve the flexibility of communication between objects and to better manage complex interactions. Examples of behavioral patterns are the Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, and Visitor patterns.

By understanding and applying design patterns, developers can create more flexible, reusable, and maintainable software. It's essential to remember that design patterns should not be treated as one-size-fits-all solutions; instead, they should be considered as a toolbox of techniques that can be adapted to the specific requirements of your projects. Always keep in mind the context and trade-offs of each pattern, and use them judiciously to enhance the quality and readability of your code.