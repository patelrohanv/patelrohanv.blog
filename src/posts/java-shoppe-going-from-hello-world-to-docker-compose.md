---
title: "Java Shoppe: Going from Hello World to Docker-Compose"
date: 2023-04-07T21:35:34.952Z
summary: "Decided to redo the shrubbery project I posted as a single iterative
  assignment in Kotlin "
tags:
  - learn-to-code
---
# Java Shoppe

# Part Zero: Hello  Git

## **Overview**

In this assignment, you will set up a Kotlin project, create a simple Hello World program, and initialize a Git repository for your Java Shoppe project. This initial setup will help you to become familiar with Kotlin and to prepare your development environment for the upcoming assignments.

## **Objectives**

By the end of this assignment, you will be able to:

- Set up a Kotlin project and run a simple Hello World program
- Initialize a Git repository and commit your code

## **Instructions**

### **Kotlin Hello World**

1. Install the Java Development Kit (JDK) on your machine if you haven't already. You can follow the official installation guide for your operating system: **[https://www.oracle.com/java/technologies/javase-jdk14-downloads.html](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html)**.
2. Install the Kotlin compiler on your machine by following the official installation guide: **[https://kotlinlang.org/docs/command-line.html](https://kotlinlang.org/docs/command-line.html)**.
3. Create a new directory for your Java Shoppe project. You can use the command line or your file explorer to do this. For example, using the command line:

```bash
mkdir JavaShoppe
cd JavaShoppe
```

1. Create a new file named **`HelloWorld.kt`** in your project directory. This file will contain your simple Kotlin Hello World program.
2. Open the **`HelloWorld.kt`** file in your favorite text editor or integrated development environment (IDE). Add the following Kotlin code to create a simple Hello World program:

```kotlin
fun main() {
    println("Hello, World!")
}
```

6. Compile and run your Kotlin Hello World program using the command line. From the directory containing the **`HelloWorld.kt`** file, run the following commands:

```bash
kotlinc HelloWorld.kt -include-runtime -d HelloWorld.jar
java -jar HelloWorld.jar
```

You should see the output "Hello, World!" in your terminal.

### **Git Setup**

1. Install Git on your machine if you haven't already. You can follow the official installation guide for your operating system: **[https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)**.
2. Configure your Git username and email by running the following commands in your terminal:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace "Your Name" and "**[your.email@example.com](mailto:your.email@example.com)**" with your actual name and email address.

1. Initialize a new Git repository in your Java Shoppe project directory. From the command line, run the following command:

```bash
git init
```

1. Add your Kotlin Hello World program to the Git repository by running the following commands:

```bash
git add HelloWorld.kt
git commit -m "Initial commit with Hello World program"
```

You have now successfully set up a Kotlin project with a simple Hello World program and initialized a Git repository for your Java Shoppe project. This initial setup will serve as the foundation for the upcoming assignments.

# **Part One: Loops**

## **Overview**

In this assignment, you will build a simple command line interface (CLI) storefront for a Java Café using Kotlin. The café will have a list of beverages with their names and prices. The user will be able to view the list of available beverages, add them to their order, and checkout.

## **Objectives**

By the end of this assignment, you will be able to:

- Use Kotlin's built-in data structures to store and manipulate data
- Create loops and conditional statements to control program flow
- Implement a basic store interface using loops

## **Starter Code**

```kotlin
import java.util.Scanner

fun main() {
    // List of available beverages with their names and prices
    val beverages = mapOf(
        "Espresso" to 2.99,
        "Cappuccino" to 3.49,
        "Latte" to 3.99,
        "Mocha" to 4.29
    )

    // Initialize an empty order
    val order = mutableMapOf<String, Int>()

    // Loop until the user chooses to exit the store
    val input = Scanner(System.`in`)
    while (true) {
        // Print the list of available beverages
        println("Welcome to the Java Café!")
        println("Available Beverages:")
        beverages.forEach { (name, price) ->
            println("$name: $$price")
        }

        // Get the user's choice
        print("Enter the name of the beverage you want to add to your order, or type 'checkout' to proceed: ")
        val choice = input.nextLine()

        // Check if the user wants to checkout
        if (choice.lowercase() == "checkout") {
            break
        }

        // Check if the chosen beverage is available in the store
        if (beverages.containsKey(choice)) {
            // Add the beverage to the order or update its quantity
            order[choice] = order.getOrDefault(choice, 0) + 1
            println("$choice added to the order.")
        } else {
            println("Invalid choice. Please try again.")
        }
    }

    // Calculate the total cost
    val total = order.entries.sumOf { (item, quantity) -> beverages.getValue(item) * quantity }

    // Print the order contents and the total cost
    println("\nYour order:")
    order.forEach { (item, quantity) ->
        println("$item x $quantity")
    }
    println("Total: $%.2f".format(total))
}
```

## **Instructions**

1. Run the starter code and test the store to make sure you understand how it works.
2. Modify the code to display the order contents and total cost before asking for the user's choice.
3. Add the ability for the user to remove items from the order.
4. Add error handling to prevent the user from inputting invalid choices.
5. Modify the code to allow the user to view their order and choose to continue shopping or proceed to checkout.
6. Modularize the code by creating functions for each of the major parts of the store (e.g. displaying available beverages, getting user input, updating the order).
7. Add comments to your code to explain what each part does.
8. Test your store thoroughly and make sure it works as expected.

# Part 2 - Functions

## **Overview**

In this part of the assignment, you will refactor the Simple CLI Java Café Storefront from Part 1 to use functions. This will make the code more modular, organized, and easier to maintain.

## **Objectives**

By the end of this assignment, you will be able to:

- Use functions to modularize your code and make it more reusable
- Understand the importance of functions in organizing and maintaining code

## **Instructions**

1. Review the code from Part 1 of the assignment and identify the major parts of the store that can be converted into functions. Some examples include:
    - Displaying available beverages
    - Getting user input for adding or removing items from the order
    - Updating the order
    - Displaying the order contents and total cost
2. Create functions for each of the identified parts. Make sure to include comments to describe what each function does and what parameters it takes, if any. For example:

```kotlin
/**
 * Display the list of available beverages with their names and prices.
 *
 * @param beverages A map of beverages and their prices.
 */
fun displayAvailableBeverages(beverages: Map<String, Double>) {
    println("Available Beverages:")
    beverages.forEach { (name, price) ->
        println("$name: $$price")
    }
}
```

1. Update the main loop of the store to call the newly created functions instead of having the code directly in the loop. For example:

```kotlin
fun main() {
    // ... (previous code)

    while (true) {
        println("Welcome to the Java Café!")
        displayAvailableBeverages(beverages)
        val choice = getUserChoice()
        // ...
    }

    // ... (previous code)
}
```

1. Test your refactored store thoroughly and make sure it works as expected.
2. Add comments to your code to explain what each part does.
3. As an optional exercise, consider adding more features to the store, such as allowing users to update the quantity of items in the order or applying discounts.
4. Reflect on how using functions has improved the organization and maintainability of your code.

# Part 3 - Classes

## **Overview**

In this part of the assignment, you will refactor the Simple CLI Java Café Storefront from Part 2 to use classes. This will help you to further organize the code and make it more reusable and maintainable.

## **Objectives**

By the end of this assignment, you will be able to:

- Use classes to structure your code and create reusable components
- Understand the benefits of object-oriented programming in organizing and maintaining code

## **Instructions**

1. Review the code from Part 2 of the assignment and identify components that can be converted into classes. Consider creating classes for the following components:
    - Beverage
    - Order
    - Café
2. Create a **`Beverage`** class that represents a single beverage with properties such as **`name`** and **`price`**. Add a method to display the beverage information. For example:

```kotlin
class Beverage(val name: String, val price: Double) {
    fun display() {
        println("$name: $$price")
    }
}
```

1. Create an **`Order`** class that represents the shopping order. The class should have methods for adding, removing, and displaying items in the order, as well as calculating the total cost. For example:

```kotlin
class Order {
    private val items = mutableMapOf<Beverage, Int>()

    fun addItem(beverage: Beverage, quantity: Int = 1) {
        items[beverage] = items.getOrDefault(beverage, 0) + quantity
    }

    fun removeItem(beverage: Beverage, quantity: Int = 1) {
        if (items.containsKey(beverage)) {
            items[beverage] = (items[beverage] ?: 0) - quantity
            if (items[beverage] ?: 0 <= 0) {
                items.remove(beverage)
            }
        }
    }

    fun display() {
        items.forEach { (beverage, quantity) ->
            println("${beverage.name} x $quantity")
        }
    }

    fun totalCost(): Double {
        return items.entries.sumOf { (beverage, quantity) -> beverage.price * quantity }
    }
}
```

1. Create a **`Cafe`** class that represents the Java Café. The class should have a list of available beverages and methods for displaying the beverages, processing user input, and managing the shopping order. For example:

```kotlin
class Cafe(private val beverages: List<Beverage>) {
    fun displayBeverages() {
        beverages.forEach { it.display() }
    }

    fun processUserInput(input: String, order: Order) {
        // Implement the logic to process user input, add or remove items from the order, and handle errors.
    }
}
```

1. Update the main loop of the store to use instances of the **`Cafe`**, **`Order`**, and **`Beverage`** classes. For example: 

```kotlin
fun main() {
    // ... (previous code)

    val cafe = Cafe(beverageList)
    val order = Order()

    while (true) {
        println("Welcome to the Java Café!")
        cafe.displayBeverages()
        val choice = getUserChoice()
        cafe.processUserInput(choice, order)
        // ...
    }

    // ... (previous code)
}
```

1. Test your refactored store thoroughly and make sure it works as expected.
2. Add comments to your code to explain what each part does.
3. As an optional exercise, consider adding more features to the store, such as applying discounts or allowing users to update the quantity of items

# Part 4 - Gradle

## **Overview**

In this part of the assignment, you will set up Gradle in your Java Shoppe project. Gradle is a build automation tool that allows you to manage dependencies, build, and test your Kotlin projects efficiently. By setting up Gradle, you will create a more organized project structure and streamline your build process.

## **Objectives**

By the end of this assignment, you will be able to:

- Set up a Gradle project for your Kotlin application
- Understand the basics of Gradle build scripts
- Manage your project's dependencies using Gradle

## **Instructions**

### **Gradle Setup**

1. Install Gradle on your machine if you haven't already. You can follow the official installation guide for your operating system: **[https://gradle.org/install/](https://gradle.org/install/)**.
2. In your Java Shoppe project directory, run the following command to create a new Gradle project:

```bash

gradle init --type kotlin-application
```

This command will create a new Gradle project with the necessary files and directories, including the **`build.gradle.kts`** (Kotlin-based build script) file, and a **`src/main/kotlin`** directory for your Kotlin source files.

1. Move your existing Kotlin source files (e.g., **`Beverage.kt`**, **`Order.kt`**, **`Cafe.kt`**, and **`Main.kt`**) into the **`src/main/kotlin`** directory.
2. Open the **`build.gradle.kts`** file in your favorite text editor or integrated development environment (IDE). The file should look similar to this:

```kotlin
plugins {
    kotlin("jvm") version "1.5.31"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.7.0")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.7.0")
}

tasks {
    test {
        useJUnitPlatform()
    }
}
```

1. Review the contents of the **`build.gradle.kts`** file. It includes the following sections:
    - **`plugins`**: Specifies the plugins used by the project, including the Kotlin JVM plugin.
    - **`group`** and **`version`**: Set the group and version of your project.
    - **`repositories`**: Specifies the repositories used to download dependencies, such as Maven Central.
    - **`dependencies`**: Lists your project's dependencies, including the Kotlin standard library and JUnit for testing.
    - **`tasks`**: Defines the tasks for your project, such as the **`test`** task that uses the JUnit platform.
2. To build your project, run the following command in your project directory:

```bash
gradle build
```

This command will compile your Kotlin source files and create a JAR file in the **`build/libs`**

# Part 5 - SQL

## **Overview**

In this part of the assignment, you will refactor the Simple CLI Java Café Storefront from Part 3 to use an SQLite database for storing beverage information. This will help you understand how to integrate databases into your applications and manage data more efficiently.

## **Objectives**

By the end of this assignment, you will be able to:

- Use SQLite databases to store and manage data in your application
- Understand the benefits of using databases for data persistence and management

## **Instructions Part 1 - Getting Started**

1. Install the SQLite library for Kotlin/Java by adding the following dependency to your **`build.gradle`** file:

```kotlin
dependencies {
    // ... (previous dependencies)

    implementation("org.xerial:sqlite-jdbc:3.36.0.3")
}
```

1. Import the required modules at the beginning of your code:

```kotlin
import java.sql.Connection
import java.sql.DriverManager
```

1. Create a function to set up the SQLite database and add the initial beverage data. For example:

```kotlin
fun setupDatabase(): Connection {
    val conn = DriverManager.getConnection("jdbc:sqlite:beverages.db")

    conn.createStatement().use { stmt ->
        stmt.execute(
            """
            CREATE TABLE IF NOT EXISTS beverages (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                price REAL NOT NULL
            )
            """.trimIndent()
        )

        // Add initial beverage data if the table is empty
        val count = stmt.executeQuery("SELECT COUNT(*) FROM beverages").getInt(1)
        if (count == 0) {
            val initialBeverages = listOf(
                "Small Coffee" to 2.99,
                "Medium Coffee" to 3.99,
                "Large Coffee" to 4.99,
                "Espresso" to 1.99,
            )

            val preparedStatement = conn.prepareStatement("INSERT INTO beverages (name, price) VALUES (?, ?)")
            for ((name, price) in initialBeverages) {
                preparedStatement.setString(1, name)
                preparedStatement.setDouble(2, price)
                preparedStatement.addBatch()
            }
            preparedStatement.executeBatch()
        }
    }

    return conn
}
```

1. Update the **`Cafe`** class to use the SQLite database to retrieve the list of available beverages. Modify the **`displayBeverages`** method to fetch the beverages from the database and display them. For example:

```kotlin
class Cafe(private val conn: Connection) {
    fun displayBeverages() {
        val stmt = conn.createStatement()
        val resultSet = stmt.executeQuery("SELECT id, name, price FROM beverages")
        while (resultSet.next()) {
            val id = resultSet.getInt("id")
            val name = resultSet.getString("name")
            val price = resultSet.getDouble("price")
            println("$id. $name: $$price")
        }
    }
}
```

1.  Update the main loop of the store to pass the SQLite connection to the **`Cafe`** class. For example:

```kotlin
fun main() {
    // ... (previous code)

    val conn = setupDatabase()
    val cafe = Cafe(conn)
    val order = Order()

    while (true) {
        println("Welcome to the Java Café!")
        cafe.displayBeverages()
        val choice = getUserChoice()
        cafe.processUserInput(choice, order)
        // ...
    }

    // ... (previous code)
}
```

1. Update the **`processUserInput`** method in the **`Cafe`** class to fetch the chosen beverage from the database using its ID and add it to the order. For example:

```kotlin
fun processUserInput(input: String, order: Order) {
    try {
        val beverageId = input.toInt()
        val stmt = conn.createStatement()
        val resultSet = stmt.executeQuery("SELECT id, name, price FROM beverages WHERE id = $beverageId")

        if (resultSet.next()) {
            val id = resultSet.getInt("id")
            val name = resultSet.getString("name")
            val price = resultSet.getDouble("price")
            val beverage = Beverage(name, price)
            order.addItem(beverage)
            println("$name added to the order.")
        } else {
            println("Invalid choice. Please try again.")
        }
    } catch (e: NumberFormatException) {
        println("Invalid input. Please enter a number.")
    }
}
```

1. Test your refactored store thoroughly and make sure it works as expected.

## **Instructions Part 2 - Transactions**

1. Make sure you understand Steps 1-6 of the previous instructions before continuing.
2. Create a new table called **`transactions`** to store transaction data. Add the table creation statement to the **`setupDatabase`** function:

```kotlin
fun setupDatabase(): Connection {
    // ... (existing code)

    conn.createStatement().use { stmt ->
        stmt.execute(
            """
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY,
                transaction_date TIMESTAMP NOT NULL,
                total_amount REAL NOT NULL
            )
            """.trimIndent()
        )

        // ... (existing code)
    }

    return conn
}
```

1. Create a new table called **`transaction_items`** to store the details of each transaction item. Add the table creation statement to the **`setupDatabase`** function:

```kotlin
fun setupDatabase(): Connection {
    // ... (existing code)

    conn.createStatement().use { stmt ->
        stmt.execute(
            """
            CREATE TABLE IF NOT EXISTS transaction_items (
                id INTEGER PRIMARY KEY,
                transaction_id INTEGER NOT NULL,
                beverage_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                price REAL NOT NULL,
                FOREIGN KEY (transaction_id) REFERENCES transactions (id),
                FOREIGN KEY (beverage_id) REFERENCES beverages (id)
            )
            """.trimIndent()
        )

        // ... (existing code)
    }

    return conn
}
```

1. Add a **`checkout`** method to the **`Order`** class to store the transaction data in the **`transactions`** and **`transaction_items`** tables. Make sure to also clear the order after a successful checkout.

```kotlin
class Order {
    // ... (existing code)

    fun checkout(conn: Connection) {
        if (items.isEmpty()) {
            println("Your order is empty. No transaction recorded.")
            return
        }

        val transactionTotal = totalCost()
        val stmt = conn.prepareStatement("INSERT INTO transactions (transaction_date, total_amount) VALUES (?, ?)")
        stmt.setTimestamp(1, java.sql.Timestamp(System.currentTimeMillis()))
        stmt.setDouble(2, transactionTotal)
        stmt.executeUpdate()
        val transactionId = stmt.generatedKeys.getInt(1)

        val itemStmt = conn.prepareStatement("INSERT INTO transaction_items (transaction_id, beverage_id, quantity, price) VALUES (?, ?, ?, ?)")
        for ((beverage, quantity) in items) {
            val bevStmt = conn.prepareStatement("SELECT id FROM beverages WHERE name = ?")
            bevStmt.setString(1, beverage.name)
            val resultSet = bevStmt.executeQuery()
            val beverageId = resultSet.getInt("id")
```

# Part 6 - ORM

## **Overview**

In this part of the assignment, you will refactor the Simple Café from Part 4 to use a Kotlin ORM for database management. You'll learn how to set up a Kotlin project with the Exposed ORM library, define models, and perform CRUD operations using the ORM.

## **Objectives**

By the end of this assignment, you will be able to:

- Set up a Kotlin project with the Exposed ORM library
- Use the Exposed ORM to manage data
- Perform CRUD operations for Beverage and Order models using the Exposed ORM

## **Instructions**

1. Set up a new Kotlin project with the necessary dependencies for Exposed ORM. Add the following dependencies to your **`build.gradle`** file:

```kotlin

dependencies {
		implementation("org.jetbrains.exposed:exposed-core:0.35.1")
		implementation("org.jetbrains.exposed:exposed-dao:0.35.1")
		implementation("org.jetbrains.exposed:exposed-jdbc:0.35.1")
		implementation("org.xerial:sqlite-jdbc:3.36.0.3")
}
```

2. Define the **`Beverage`** and **`Order`** models using Exposed ORM's **`Table`** class. Create a new file named **`Models.kt`** with the following content:

```kotlin
import org.jetbrains.exposed.dao.IntIdTable

object Beverages : IntIdTable() {
    val name = varchar("name", 255)
    val price = decimal("price", 10, 2)
}

object Orders : IntIdTable() {
    val orderDate = datetime("order_date")
    val totalAmount = decimal("total_amount", 10, 2)
}

object OrderItems : IntIdTable() {
    val order = reference("order", Orders)
    val beverage = reference("beverage", Beverages)
    val quantity = integer("quantity")
    val price = decimal("price", 10, 2)
}
```

1. Initialize the database connection and create tables for the models. Add the following code to your **`main`**
 function

```kotlin
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

fun main() {
    Database.connect("jdbc:sqlite:cafe.db", "org.sqlite.JDBC")

    transaction {
        SchemaUtils.create(Beverages, Orders, OrderItems)
    }

    // ... (existing code)
}
```

1. Refactor the **`Cafe`** class from Part 4 to use the Exposed ORM for CRUD operations. You can remove the **`setupDatabase`** method, as the Exposed ORM will handle the database connection:

```kotlin
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

class Cafe {
    // ... (existing code)

    fun displayBeverages() {
        transaction {
            Beverages.selectAll().forEachIndexed { index, row ->
                println("${index + 1}. ${row[Beverages.name]} - $${row[Beverages.price]}")
            }
        }
    }

    fun addBeverage(beverage: Beverage) {
        transaction {
            Beverages.insert {
                it[name] = beverage.name
                it[price] = beverage.price
            }
        }
    }

    fun updateBeverage(beverage: Beverage) {
        transaction {
            Beverages.update({ Beverages.id eq beverage.id }) {
                it[name] = beverage.name
                it[price] = beverage.price
            }
        }
    }

    fun deleteBeverage(beverageId: Int) {
        transaction {
            Beverages.deleteWhere { Beverages.id eq beverageId }
        }
    }

    fun processUserInput(choice: Int, order: Order) {
        // ... (existing code)
    }
}
```

1. Refactor the **`Order`** class to use the Exposed ORM for checkout:

```kotlin
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

class Order {
    // ... (existing code)

    fun checkout() {
        if (items.isEmpty()) {
            println("Your order is empty. No transaction recorded.")
            return
        }

        transaction {
            val orderId = Orders.insertAndGetId {
                it[orderDate] = LocalDateTime.now()
                it[totalAmount] = getTotalAmount()
            }.value

            items.forEach { (beverage, quantity) ->
                OrderItems.insert {
                    it[order] = orderId
                    it[this.beverage] = beverage.id
                    it[this.quantity] = quantity
                    it[price] = beverage.price
                }
            }
        }

        println("Order successfully recorded!")
    }
}
```

With these changes, your Kotlin project will now utilize the Exposed ORM to manage data in your SQLite database.

# Part 7 - HTTP

## **Objectives**

By the end of this assignment, you will be able to:

- Install and configure the Ktor framework
- Create data classes and routes for the Cafe API
- Implement GET, POST, DELETE, and PUT endpoints
- Test your API endpoints using a tool like Postman or **`curl`**

## **Setting up Ktor framework**

1. Add Ktor dependencies to your **`build.gradle.kts`** file:

```kotlin
dependencies {
    implementation("io.ktor:ktor-server-core:1.6.3")
    implementation("io.ktor:ktor-server-netty:1.6.3")
    implementation("io.ktor:ktor-serialization:1.6.3")
}
```

1. 1. Create a **`main`** function in your **`Main.kt`** file to start the Ktor server:

```kotlin
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun main() {
    embeddedServer(Netty, port = 8080) {
        // Server configuration will go here
    }.start(wait = true)
}
```

## **Creating Data Classes and Routes**

1. Create a **`Beverage`** data class in a new file **`models.kt`**:

```kotlin
data class Beverage(val id: Int, val name: String, val price: Double)
```

1. Create a new file **`routes.kt`** and define your routes for the Cafe API: 

```kotlin
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*

fun Application.registerBeverageRoutes() {
    routing {
        route("/beverages") {
            get {
                // GET all beverages
            }
            post {
                // POST a new beverage
            }
        }
        route("/beverages/{id}") {
            get {
                // GET a specific beverage by id
            }
            put {
                // PUT (update) a specific beverage by id
            }
            delete {
                // DELETE a specific beverage by id
            }
        }
    }
}
```

## **Implementing GET, POST, DELETE, and PUT Endpoints**

1. Update the **`registerBeverageRoutes`** function in **`routes.kt`** to implement the GET, POST, DELETE, and PUT endpoints: 

```kotlin
import io.ktor.application.*
import io.ktor.features.ContentNegotiation
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.serialization.json

fun Application.registerBeverageRoutes() {
    install(ContentNegotiation) {
        json()
    }

    routing {
        route("/beverages") {
            get {
                // GET all beverages
            }
            post {
                // POST a new beverage
            }
        }
        route("/beverages/{id}") {
            get {
                // GET a specific beverage by id
            }
            put {
                // PUT (update) a specific beverage by id
            }
            delete {
                // DELETE a specific beverage by id
            }
        }
    }
}
```

1. Implement the logic for each endpoint using the **`Cafe`** class. In your **`CafeController.kt`** file, create functions for handling each of the HTTP methods (GET, POST, DELETE, and PUT) for the cafes and transactions. Use the **`Cafe`** and **`Transaction`** classes as your data source, and make sure to handle different request scenarios, such as validation and errors.
For Example: 

```kotlin
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class CafeController {

    private val cafeData = CafeData()

    @GetMapping("/cafes")
    fun getAllCafes(): ResponseEntity<List<Cafe>> {
        val cafes = cafeData.getAllCafes()
        return ResponseEntity(cafes, HttpStatus.OK)
    }

    @PostMapping("/cafes")
    fun createCafe(@RequestBody cafe: Cafe): ResponseEntity<Cafe> {
        if (cafe.name.isBlank() || cafe.price < 0) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }

        val newCafe = cafeData.addCafe(cafe)
        return ResponseEntity(newCafe, HttpStatus.CREATED)
    }

    // Remaining functions for other methods and models go here
}
```

In this example, the **`getAllCafes()`** function handles GET requests for a list of cafes. The function retrieves all cafes from the **`CafeData`** class and returns the cafe list as an HTTP response with an OK status.

The **`createCafe()`** function handles POST requests to create a new cafe. It takes a **`Cafe`** object as a request body and validates its properties. If the validation fails, it returns a BAD_REQUEST status. Otherwise, it adds the new cafe using the **`CafeData`** class and returns the created cafe with a CREATED status.

Next, implement similar functions for DELETE and PUT methods for both cafes and transactions.

1. Update the **`CafeData`** class:

In your **`CafeData.kt`** file, update the class to handle the CRUD operations for both cafes and transactions. Make sure to handle edge cases such as updating or deleting non-existent items.

For example:

```kotlin
class CafeData {
    private val cafes = mutableListOf<Cafe>()
    private val transactions = mutableListOf<Transaction>()

    // Add the CRUD operations for cafes and transactions here
}
```

1. Test your API endpoints

Start your application if it's not already running:

```kotlin
./gradlew bootRun
```

Use a tool like **[Postman](https://www.postman.com/)** or **`curl`** to test your API endpoints. Make sure you can perform GET, POST, DELETE, and PUT requests for both cafes and transactions.

For example, using **`curl`**:

List all cafes (GET):

```kotlin
curl -X GET http://localhost:8080/api/cafes
```

Create a new cafe (POST):

```kotlin
curl -X POST -H "Content-Type: application/json" -d '{"name": "Sample Cafe", "price": 25.99}' http://localhost:8080/api/cafes
```

Update a cafe (PUT):

```kotlin
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Cafe", "price": 29.99}' http://localhost:8080/api/cafes/1
```

Delete a cafe (DELETE):

```kotlin
curl -X DELETE http://localhost:8080/api/cafes/1
```

Ensure that your API endpoints work as expected, and verify that the changes you make through the API are reflected in your data source.

# Part 8 - Docker

## **Overview**

In this assignment, you will learn how to create a Docker container for the Kotlin Cafe API you built in the previous assignments. Docker is a platform that allows you to easily create, deploy, and run applications in containers, which are portable and self-contained units that include all the dependencies required to run the application. By dockerizing your API, you'll be able to run it consistently across different environments, making it easier to share, deploy, and scale.

## **Objectives**

By the end of this assignment, you will be able to:

- Understand the basics of Docker and containerization
- Create a Dockerfile to define your API's container
- Build a Docker image for your API
- Run your API in a Docker container

## **Instructions**

1. Install Docker on your machine by following the official installation guide for your operating system: **[https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)**.
2. Familiarize yourself with Docker's basic concepts, including containers, images, and the Dockerfile. You can read the Docker's official documentation to get started: **[https://docs.docker.com/get-started/](https://docs.docker.com/get-started/)**.
3. Create a **`Dockerfile`** in the root directory of your Kotlin Cafe API project. This file will define the container's configuration, including the base image, dependencies, and the command to run your application.
4. In the **`Dockerfile`**, start with a base image that includes the JDK. You can use the official OpenJDK image from Docker Hub. For example, to use OpenJDK 11, add the following line to your **`Dockerfile`**:

```docker
FROM openjdk:11
```

1. Set the working directory for your application inside the container. This is where your application's files will be copied and where the commands will be executed. Add the following line to your **`Dockerfile`**:

```docker
WORKDIR /app
```

1. Copy your application's files, including the **`build.gradle`** and **`settings.gradle`**, into the container. Add these lines to your **`Dockerfile`**:

```docker
COPY build.gradle settings.gradle ./
```

1. Run the **`gradle wrapper`** command to generate the necessary wrapper files. This will ensure that the correct Gradle version is used inside the container:

```docker
./gradlew wrapper
```

1. Copy the **`gradle`** folder and the **`gradlew`** file into the container. Add these lines to your **`Dockerfile`**:

```docker
COPY gradle ./gradle
COPY gradlew ./
```

1. Install the dependencies and build your application using Gradle. Add the following line to your **`Dockerfile`**:

```docker
RUN ./gradlew build
```

1. Copy the rest of your application's files into the container. Add the following line to your **`Dockerfile`**:

```docker
COPY . .
```

1. Expose the port your API is running on so that it can be accessed from outside the container. If your API is running on port 8080, add this line to your **`Dockerfile`**:

```docker
EXPOSE 8080
```

1. Finally, add the command to run your API in the container using the Spring Boot Gradle plugin:

```docker
CMD ["./gradlew", "bootRun"]
```

1. Build the Docker image for your API by running the following command in the terminal, from the directory containing your **`Dockerfile`**:

```docker
docker build -t kotlin-cafe-api .
```

This command will create a Docker image named **`kotlin-cafe-api`** using the configuration defined in your **`Dockerfile`**.

1. Run your API in a Docker container by executing the following command:

```docker
docker run -p 8080:8080 --name kotlin-cafe-api-container kotlin-cafe-api
```

This command will start a new container named **`kotlin-cafe-api-container`** using the **`kotlin-cafe-api`** image you built earlier. It will also map port 8080 on your local machine to port 8080 inside the container, allowing you to access your API at **`http://localhost:8080`**.

1. Test your API by accessing the endpoints from your web browser or using tools like **`curl`** or Postman. Ensure that the API works as expected when running inside the Docker container.
2. (Optional) Learn how to use Docker Compose to manage multi-container applications. Docker Compose allows you to define and run multiple containers as part of a single application, which can be useful if you want to add a database or other services to your project. Read the official documentation to get started: **[https://docs.docker.com/compose/](https://docs.docker.com/compose/)**.
3. (Optional) Add a **`.dockerignore`** file to your project to exclude files and directories that are not needed in the container. This can help reduce the size of your Docker image and speed up the build process. Some common files and directories to exclude include:

```
.git/
.gitignore
.gradle/
build/
*.log
*.iml
*.class
*.jar
*.war
*.ear
.DS_Store
```

1. (Optional) Share your Dockerized API with others by pushing the image to a container registry like Docker Hub. To do this, first create an account on Docker Hub (**[https://hub.docker.com/](https://hub.docker.com/)**) and follow the official documentation for instructions on how to push your image: **[https://docs.docker.com/docker-hub/repos/](https://docs.docker.com/docker-hub/repos/)**.

Remember to test your API thoroughly to ensure that it works as expected when running inside a Docker container. By completing this assignment, you'll have a portable, self-contained API that can be easily shared, deployed, and scaled using Docker.

# Part 9 - Managed SQL

## **Overview**

In this assignment, you will refactor your Java Shoppe API to use a PostgreSQL database instead of an in-memory data store. You will also learn how to use Docker to run your PostgreSQL database, making it easy to deploy and manage your database alongside your Kotlin Ktor API.

## **Objectives**

By the end of this assignment, you will be able to:

- Set up a PostgreSQL database using Docker
- Connect your Kotlin Ktor API to the PostgreSQL database
- Perform CRUD operations on the PostgreSQL database

## **Instructions**

1. Pull the official PostgreSQL Docker image by running the following command in the terminal:

```docker
docker pull postgres
```

1. Start a new PostgreSQL container using the following command:

```docker
docker run --name java-shoppe-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

Replace **`mysecretpassword`** with a secure password for your PostgreSQL database.

1. Install a PostgreSQL client on your machine, such as **[pgAdmin](https://www.pgadmin.org/)** or **[DBeaver](https://dbeaver.io/)**, to manage your PostgreSQL database.
2. Connect to your PostgreSQL database using the PostgreSQL client. Use **`localhost`** as the hostname, **`5432`** as the port, **`postgres`** as the user, and the password you set in step 3.
3. Create a new database named **`java_shoppe`** 
4. Add the necessary dependencies to your Kotlin Ktor project to work with PostgreSQL. You'll need the **JDBC driver for PostgreSQL** and **Exposed**, a Kotlin SQL framework. Add the following dependencies to your **`build.gradle.kts`**:

```kotlin
implementation("org.postgresql:postgresql:42.3.3")
implementation("org.jetbrains.exposed:exposed-core:0.38.1")
implementation("org.jetbrains.exposed:exposed-dao:0.38.1")
implementation("org.jetbrains.exposed:exposed-jdbc:0.38.1")
```

Remember to sync your project to download and configure the new dependencies.

1. Create a **`DatabaseConfig.kt`** file in your project's source folder to configure your database connection. Use the following code snippet as a starting point:

```kotlin
package com.example.javashoppe

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

object DatabaseConfig {
    fun init() {
        val dbUrl = "jdbc:postgresql://localhost:5432/java_shoppe"
        val dbUser = "postgres"
        val dbPassword = "mysecretpassword"

        Database.connect(dbUrl, driver = "org.postgresql.Driver", user = dbUser, password = dbPassword)

        transaction {
            // Code to create tables or perform other database operations
        }
    }
}
```

Replace **`mysecretpassword`** with the password you set in step 3.

1. Update your **`Application.kt`** file to call **`DatabaseConfig.init()`** when your Ktor application starts:

```kotlin
package com.example.javashoppe

import io.ktor.application.*
import io.ktor.features.StatusPages
import io.ktor.http.HttpStatusCode
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun main() {
    embeddedServer(Netty, port = 8080, module = Application::module).start(wait = true)
}

fun Application.module() {
    DatabaseConfig.init()

    install(StatusPages) {
        exception<Throwable> { cause ->
            call.respond(HttpStatusCode.InternalServerError, cause.localizedMessage)
        }
    }

    install(Routing) {
        // Your existing routes
    }
}
```

1. Test your API to ensure it's working correctly with the PostgreSQL database. Use tools like Postman or curl to interact with your API and check if the data is being stored, retrieved, updated, and deleted as expected.
2. (Optional) Learn how to use Docker Compose to manage your Kotlin Ktor API and PostgreSQL database as a multi-container application. Docker Compose allows you to define and run multiple containers as part of a single application, which can be useful for managing dependencies and configurations. Read the official documentation to get started: **[https://docs.docker.com/compose/](https://docs.docker.com/compose/)**.

By completing this assignment, you will have refactored your Kotlin Ktor Java Shoppe API to use a PostgreSQL database and learned how to run the database using Docker, providing a more scalable and robust solution for your application.

# Part 10 - Docker Compose

## **Overview**

In this assignment, you will refactor your existing Kotlin Ktor Java Shoppe API to use Docker Compose. Docker Compose is a tool for defining and running multi-container Docker applications. By using Docker Compose, you can manage your API and PostgreSQL database as a single unit, making it easier to deploy, scale, and manage your application and its dependencies.

## **Objectives**

By the end of this assignment, you will be able to:

- Understand the basics of Docker Compose
- Create a **`docker-compose.yml`** file to define your multi-container application
- Run your Kotlin Ktor API and PostgreSQL database using Docker Compose

## **Instructions**

1. Install Docker Compose on your machine if you haven't already. You can follow the official installation guide for your operating system: **[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)**.
2. Shoppe API project. This file will define the configuration for your multi-container application, including the services, networks, and volumes.
3. In the **`docker-compose.yml`** file, define the two services for your application: the Kotlin Ktor API and the PostgreSQL database. You can use the following example as a starting point:

```yaml
version: '3.8'
services:
  javashoppe-api:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      POSTGRES_HOST: db
      POSTGRES_PORT: 5432
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: javashoppe

  db:
    image: "postgres:13"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: javashoppe
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

This configuration defines the **`javashoppe-api`** service, which builds the Docker image for your Kotlin Ktor API using the **`Dockerfile`** in the project's root directory. It also maps port 8080 on your local machine to port 8080 inside the container and depends on the **`db`** service.

The **`db`** service uses the official PostgreSQL 13 image from Docker Hub and sets up the environment variables for the database configuration. It also defines a named volume **`db-data`** to persist the PostgreSQL data.

1. Update your **`DatabaseConfig.kt`** file to read the PostgreSQL configuration from the environment variables:

```yaml
package com.example.javashoppe

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

object DatabaseConfig {
    fun init() {
        val host = System.getenv("POSTGRES_HOST") ?: "localhost"
        val port = System.getenv("POSTGRES_PORT")?.toInt() ?: 5432
        val user = System.getenv("POSTGRES_USER") ?: "postgres"
        val password = System.getenv("POSTGRES_PASSWORD") ?: "postgres"
        val dbName = System.getenv("POSTGRES_DB") ?: "javashoppe"

        Database.connect(
            url = "jdbc:postgresql://$host:$port/$dbName",
            driver = "org.postgresql.Driver",
            user = user,
            password = password
        )

        transaction {
            SchemaUtils.createMissingTablesAndColumns(Products)
        }
    }
}
```

This change allows your application to connect to the PostgreSQL database using the environment variables defined