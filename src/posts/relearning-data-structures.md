---
title: "Relearning Data Structures "
date: 2023-03-24T04:18:40.544Z
summary: >
  It’s been a while since I took CS 445 - Data Structures, so figured I why not
  write a post to give myself a refresher and make a reference to look at later
  next time I get rusty. 
tags:
  - software-dev
---
It’s been a while since I took CS 445 - Data Structures, so figured I why not write a post to give myself a refresher and make a reference to look at later next time I get rusty. 

## Simple Structures

### Arrays

Arrays are a fundamental data structure in computer science, used to store multiple elements of the same data type in a contiguous block of memory. A contiguous block of memory that stores a fixed number of elements of the same data type. Elements can be accessed directly using their index, making array access and modification very fast (O(1) complexity). However, resizing an array can be costly.

1. Basic properties:
    - Fixed size: Arrays have a fixed size, determined during their declaration or initialization. This size cannot be changed during runtime, which can lead to memory waste if the array is too large or insufficient space if it's too small.
    - Homogeneous elements: All elements in an array must be of the same data type.
    - Contiguous memory: Array elements are stored in adjacent memory locations, which allows for efficient memory access.
2. Indexing:
    - Arrays use zero-based indexing, meaning the first element is accessed using index 0, the second with index 1, and so on.
    - Elements can be accessed directly using their index, making array access and modification very fast (O(1) complexity).
3. Memory allocation:
    - Static memory allocation: Memory for the array is allocated at compile time, and the size is fixed throughout the program's execution.
    - Dynamic memory allocation: Memory for the array is allocated at runtime, typically using pointers and memory allocation functions (e.g., `malloc` in C or `new` in C++).
4. Multidimensional arrays:
    - Arrays can have multiple dimensions, such as two-dimensional arrays (matrices) or three-dimensional arrays (cuboids).
    - Multidimensional arrays are stored in row-major or column-major order, depending on the programming language or specific implementation.
5. Common operations:
    - Accessing an element: O(1) complexity
    - Modifying an element: O(1) complexity
    - Searching for an element: O(n) complexity in an unsorted array, O(log n) complexity in a sorted array (using binary search)
    - Inserting an element: O(n) complexity, as elements may need to be shifted to make space
    - Deleting an element: O(n) complexity, as elements may need to be shifted to fill the gap
6. Limitations and alternatives:
    - Resizing an array can be costly, as it often requires creating a new, larger array and copying elements from the old array.
    - Dynamic arrays (e.g., `ArrayList` in Java or `vector` in C++) are a common alternative, which automatically resize themselves as elements are added or removed. They provide better flexibility but with some overhead in terms of memory management and performance.

Arrays are a fundamental building block in many algorithms and applications, and understanding their properties and limitations is crucial for efficient programming.

### Linked Lists

Linked lists are a linear data structure that consists of nodes, where each node contains an element and a reference (or pointer) to the next node. Linked lists provide a flexible way to store and manipulate data. A linear data structure consisting of nodes, each containing an element and a reference to the next node. Linked lists have a dynamic size, allowing for easy insertion and deletion of elements (O(1) complexity), but accessing an element can take longer (O(n) complexity).

1. Basic properties:
    - Dynamic size: Linked lists can grow or shrink in size as elements are added or removed, without the need for resizing as in arrays.
    - Non-contiguous memory: Nodes in a linked list are stored in non-contiguous memory locations, with each node pointing to the next one. This allows for efficient insertion and deletion, but may result in higher memory overhead and slower access times compared to arrays.
2. Types of linked lists:
    - Singly linked lists: Each node has a reference to the next node. This allows for easy traversal in one direction, but requires traversing the entire list to access elements near the end.
    - Doubly linked lists: Each node has references to both the next and previous nodes, enabling traversal in both directions. This allows for more efficient insertion and deletion operations but increases memory overhead.
    - Circular linked lists: The last node in the list points back to the first node, forming a loop. This can be useful for applications that require cycling through elements repeatedly.
3. Common operations:
    - Accessing an element: O(n) complexity, as elements must be accessed sequentially.
    - Searching for an element: O(n) complexity, as the list must be traversed to find a specific element.
    - Inserting an element:
        - At the beginning: O(1) complexity, as only the head of the list needs to be updated.
        - At the end: O(n) complexity for singly linked lists, O(1) complexity for doubly linked lists with a tail pointer.
        - In the middle: O(n) complexity, as the list must be traversed to find the insertion point.
    - Deleting an element:
        - At the beginning: O(1) complexity, as only the head of the list needs to be updated.
        - At the end: O(n) complexity for singly linked lists, O(1) complexity for doubly linked lists with a tail pointer.
        - In the middle: O(n) complexity, as the list must be traversed to find the deletion point.
4. Advantages of linked lists over arrays:
    - Dynamic size: Linked lists can grow and shrink without the need for resizing, making them more memory-efficient in some cases.
    - Efficient insertion and deletion: Linked lists allow for O(1) complexity insertion and deletion operations (at the beginning or end), compared to arrays, which can have O(n) complexity.
5. Disadvantages of linked lists compared to arrays:
    - Slower access times: Linked lists have O(n) complexity for accessing elements, while arrays provide O(1) complexity.
    - Higher memory overhead: Linked lists require extra memory to store references or pointers, which can increase memory usage.

Linked lists are a versatile data structure that provides dynamic sizing and efficient insertion and deletion operations. Understanding their properties, strengths, and weaknesses can help you choose the most appropriate data structure for your specific problem.

Sample Implementation

```kotlin
class ListNode<T>(var value: T, var next: ListNode<T>? = null)

class LinkedList<T> {
    private var head: ListNode<T>? = null
    private var tail: ListNode<T>? = null
    var size = 0
        private set

    // Add a new node to the end of the list
    fun add(value: T) {
        val newNode = ListNode(value)
        if (size == 0) {
            head = newNode
            tail = newNode
        } else {
            tail?.next = newNode
            tail = newNode
        }
        size++
    }

    // Get the node at the given index
    private fun getNode(index: Int): ListNode<T> {
        var currentNode = head
        for (i in 0 until index) {
            currentNode = currentNode?.next
                ?: throw IllegalStateException("Node not found at index $index.")
        }
        return currentNode
    }

    // Get the value at the given index
    fun get(index: Int): T {
        require(index in 0 until size) { "Index out of range: $index" }
        return getNode(index).value
    }

    // Remove the node at the given index and return its value
    fun remove(index: Int): T {
        require(index in 0 until size) { "Index out of range: $index" }
        val removedNode = if (index == 0) {
            val node = head
            head = head?.next
            if (size == 1) tail = null
            node
        } else {
            val previousNode = getNode(index - 1)
            val node = previousNode.next
            previousNode.next = node?.next
            if (index == size - 1) tail = previousNode
            node
        }
        size--
        return removedNode?.value ?: throw IllegalStateException("Node not found.")
    }

    // Set the value at the given index
    fun set(index: Int, value: T) {
        require(index in 0 until size) { "Index out of range: $index" }
        getNode(index).value = value
    }
}

fun main() {
    val linkedList = LinkedList<Int>()

    linkedList.add(1)
    linkedList.add(2)
    linkedList.add(3)

    println("Element at index 1: ${linkedList.get(1)}") // 2

    linkedList.set(1, 5)
    println("Element at index 1 after setting value: ${linkedList.get(1)}") // 5

    linkedList.remove(1)
    println("Element at index 1 after removal: ${linkedList.get(1)}") // 3
}
```

### Stacks

Stacks are a linear data structure that follows the Last-In-First-Out (LIFO) principle, meaning the most recently added element is the first one to be removed. Stacks are used in a variety of applications, such as function call management, parsing expressions, and depth-first search algorithms. Operations like push (adding an element) and pop (removing an element) are usually performed in O(1) complexity.

1. Basic properties:
    - LIFO order: Stacks maintain the order of elements based on the time they were added, with the most recent element always on top.
    - Two primary operations: push (adding an element to the top of the stack) and pop (removing the top element from the stack).
2. Common operations:
    - Push: Adds an element to the top of the stack, usually in O(1) complexity.
    - Pop: Removes the top element from the stack, usually in O(1) complexity.
    - Peek (or Top): Returns the top element without removing it, usually in O(1) complexity.
    - IsEmpty: Checks if the stack is empty, usually in O(1) complexity.
    - Size: Returns the number of elements in the stack, usually in O(1) complexity.
3. Implementations:
    - Array-based: Stacks can be implemented using an array or dynamic array (e.g., `ArrayList` in Java or `vector` in C++). This provides fast access times but may require resizing if the array's capacity is exceeded.
    - Linked list-based: Stacks can also be implemented using a linked list, where the top of the stack corresponds to the head of the list. This allows for dynamic sizing and efficient push and pop operations but may have slightly higher memory overhead compared to array-based implementations.
4. Applications:
    - Function call management: Stacks are used to manage function calls in many programming languages, helping to keep track of return addresses, local variables, and other information.
    - Expression evaluation and parsing: Stacks can be used to evaluate arithmetic expressions (e.g., using the Shunting Yard algorithm) or parse programming languages (e.g., using recursive descent parsers).
    - Depth-first search (DFS): Stacks are used in iterative implementations of DFS algorithms for traversing graphs or trees.
    - Undo/redo functionality: Stacks can be used to implement undo and redo functionality in applications, such as text editors or image editing software, by storing previous states or actions.

Stacks are a fundamental data structure that provides LIFO access and fast push/pop operations. Understanding their properties, implementations, and applications can help you effectively use stacks in your programming projects.

Sample Implementation (array)

```kotlin
class Stack<T>(initialCapacity: Int = 10) {
    private var elements: Array<Any?> = arrayOfNulls(initialCapacity)
    private var currentIndex = -1

    // Resize the array when needed
    private fun resizeArray(newCapacity: Int) {
        elements = elements.copyOf(newCapacity)
    }

    fun push(value: T) {
        if (currentIndex + 1 >= elements.size) {
            resizeArray(elements.size * 2)
        }
        elements[++currentIndex] = value
    }

    @Suppress("UNCHECKED_CAST")
    fun pop(): T {
        if (isEmpty()) throw IllegalStateException("Stack is empty.")
        val removedElement = elements[currentIndex] as T
        elements[currentIndex--] = null
        if (currentIndex + 1 <= elements.size / 4) {
            resizeArray(elements.size / 2)
        }
        return removedElement
    }

    @Suppress("UNCHECKED_CAST")
    fun peek(): T {
        if (isEmpty()) throw IllegalStateException("Stack is empty.")
        return elements[currentIndex] as T
    }

    fun isEmpty(): Boolean = currentIndex == -1
}

fun main() {
    val stack = Stack<Int>()

    stack.push(1)
    stack.push(2)
    stack.push(3)

    println("Top element: ${stack.peek()}") // 3

    stack.pop()
    println("Top element after pop: ${stack.peek()}") // 2

    println("Stack is empty: ${stack.isEmpty()}") // false
}
```

Sample Implementation (Linked List)

```kotlin
class StackNode<T>(val value: T, val next: StackNode<T>?)

class Stack<T> {
    private var top: StackNode<T>? = null
    var size = 0
        private set

    // Add a new node to the top of the stack
    fun push(value: T) {
        val newNode = StackNode(value, top)
        top = newNode
        size++
    }

    // Remove the top node from the stack and return its value
    fun pop(): T {
        if (isEmpty()) throw IllegalStateException("Stack is empty.")
        val removedNode = top
        top = top?.next
        size--
        return removedNode?.value ?: throw IllegalStateException("Node not found.")
    }

    // Return the value of the top node in the stack without removing it
    fun peek(): T {
        if (isEmpty()) throw IllegalStateException("Stack is empty.")
        return top?.value ?: throw IllegalStateException("Node not found.")
    }

    // Check if the stack is empty
    fun isEmpty(): Boolean = size == 0
}

fun main() {
    val stack = Stack<Int>()

    stack.push(1)
    stack.push(2)
    stack.push(3)

    println("Top element: ${stack.peek()}") // 3

    stack.pop()
    println("Top element after pop: ${stack.peek()}") // 2

    println("Stack is empty: ${stack.isEmpty()}") // false
}
```

### Queues

Queues are a linear data structure that follows the First-In-First-Out (FIFO) principle, meaning the oldest added element is the first one to be removed. Queues are used in a variety of applications, such as task scheduling, buffering, and breadth-first search algorithms. Operations like enqueue (adding an element) and dequeue (removing an element) are typically performed in O(1) complexity.

1. Basic properties:
    - FIFO order: Queues maintain the order of elements based on the time they were added, with the oldest element always at the front.
    - Two primary operations: enqueue (adding an element to the rear of the queue) and dequeue (removing the front element from the queue).
2. Common operations:
    - Enqueue: Adds an element to the rear of the queue, usually in O(1) complexity.
    - Dequeue: Removes the front element from the queue, usually in O(1) complexity.
    - Peek (or Front): Returns the front element without removing it, usually in O(1) complexity.
    - IsEmpty: Checks if the queue is empty, usually in O(1) complexity.
    - Size: Returns the number of elements in the queue, usually in O(1) complexity.
3. Implementations:
    - Array-based: Queues can be implemented using an array or dynamic array with a circular buffer to avoid shifting elements. This provides fast access times but may require resizing if the array's capacity is exceeded.
    - Linked list-based: Queues can also be implemented using a linked list, with separate references for the front and rear of the list. This allows for dynamic sizing and efficient enqueue and dequeue operations but may have slightly higher memory overhead compared to array-based implementations.
4. Variations:
    - Double-ended queue (Deque): A more general data structure that allows adding and removing elements from both the front and rear, effectively combining the functionality of both stacks and queues.
    - Priority queue: A queue where each element has an associated priority, and elements are dequeued based on their priority rather than the order they were added. Priority queues can be implemented using various data structures, such as heaps, balanced search trees, or skip lists.
5. Applications:
    - Task scheduling: Queues are used in operating systems and other systems to manage tasks or processes, with tasks being added to the queue and executed in the order they were received.
    - Buffering: Queues can be used as buffers in communication systems, such as networks or printers, to temporarily store data before it is processed or transmitted.
    - Breadth-first search (BFS): Queues are used in BFS algorithms for traversing graphs or trees, allowing for level-by-level exploration of nodes.
    - Simulations: Queues are often used in discrete event simulations to model real-world processes, such as customers waiting in line at a service station or packets being transmitted over a network.

Queues are a fundamental data structure that provides FIFO access and fast enqueue/dequeue operations. Understanding their properties, implementations, variations, and applications can help you effectively use queues in your programming projects.

Sample Implementation Linked List)

```kotlin
class QueueNode<T>(val value: T, var next: QueueNode<T>? = null)

class Queue<T> {
    private var head: QueueNode<T>? = null
    private var tail: QueueNode<T>? = null
    var size = 0
        private set

    // Add a new node to the end of the queue
    fun enqueue(value: T) {
        val newNode = QueueNode(value)
        if (size == 0) {
            head = newNode
            tail = newNode
        } else {
            tail?.next = newNode
            tail = newNode
        }
        size++
    }

    // Remove the node from the front of the queue and return its value
    fun dequeue(): T {
        if (isEmpty()) throw IllegalStateException("Queue is empty.")
        val removedNode = head
        head = head?.next
        if (size == 1) tail = null
        size--
        return removedNode?.value ?: throw IllegalStateException("Node not found.")
    }

    // Return the value of the node at the front of the queue without removing it
    fun peek(): T {
        if (isEmpty()) throw IllegalStateException("Queue is empty.")
        return head?.value ?: throw IllegalStateException("Node not found.")
    }

    // Check if the queue is empty
    fun isEmpty(): Boolean = size == 0
}

fun main() {
    val queue = Queue<Int>()

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)

    println("Front element: ${queue.peek()}") // 1

    queue.dequeue()
    println("Front element after dequeue: ${queue.peek()}") // 2

    println("Queue is empty: ${queue.isEmpty()}") // false
}
```

### Trees

Trees are a hierarchical data structure that represents relationships between elements in a parent-child fashion. They are used in a variety of applications, such as organizing data, managing hierarchical structures, and optimizing search algorithms. Binary trees, binary search trees, and AVL trees are common types of trees.

1. Basic properties:
    - Nodes: Trees consist of nodes, each containing an element and references to its children.
    - Root: The top node in the tree, which has no parent.
    - Edges: Connections between parent and child nodes.
    - Levels: The height of a node, measured as the number of edges between the node and the root.
    - Height: The maximum level of any node in the tree.
2. Types of trees:
    - Binary trees: Each node has at most two children, typically referred to as the left and right child.
    - Binary search trees (BST): A binary tree with the additional property that the value of each node is greater than or equal to the values of all nodes in its left subtree and less than or equal to the values of all nodes in its right subtree. BSTs allow for efficient searching, insertion, and deletion operations.
    - Balanced binary search trees: Variations of BSTs, such as AVL trees and Red-Black trees, that maintain a balanced height to ensure optimal search performance.
    - Heap: A binary tree with a specific structure, where each parent node's value is either less than or equal to (min-heap) or greater than or equal to (max-heap) its children's values. Heaps are commonly used to implement priority queues.
    - N-ary trees: Each node can have any number of children, up to a predefined maximum (N).
    - Trie (Prefix Tree): A tree-like data structure used to store a dynamic set or associative array, where the keys are usually strings. Tries can be used for efficient searching, insertion, and deletion of strings, as well as for autocomplete features and spell-checking.
3. Common tree traversal algorithms:
    - Depth-first search (DFS): Traversal algorithm that explores as far as possible along each branch before backtracking. DFS can be implemented using recursion or an explicit stack.
        - Preorder traversal: Process the current node before its children (root, left, right).
        - Inorder traversal (for binary trees): Process the left child, the current node, then the right child (left, root, right). In a BST, this results in ascending order traversal.
        - Postorder traversal: Process the children before the current node (left, right, root).
    - Breadth-first search (BFS): Traversal algorithm that explores all the nodes at the current level before moving on to the next level. BFS can be implemented using a queue.
4. Applications:
    - Organizing data: Trees can be used to store and organize hierarchical data, such as file systems, organizational structures, or XML documents.
    - Searching and sorting: BSTs and other tree structures, such as B-trees and Tries, provide efficient search, insertion, and deletion operations, making them suitable for use in databases and search engines.
    - Optimizing algorithms: Trees can be used to optimize algorithms, such as Huffman coding for data compression or decision trees for machine learning.
    - Syntax parsing: Trees are used to represent the syntax of programming languages in the form of abstract syntax trees (ASTs), which are then used for further processing, such as compilation or interpretation.

Trees are a versatile data structure that provides hierarchical organization and efficient search capabilities. Understanding their properties, types, traversal algorithms, and applications can help you effectively use trees in your programming projects.

Sample Implementation (Binary Tree)

```kotlin
class TreeNode<T : Comparable<T>>(val value: T) {
    var left: TreeNode<T>? = null
    var right: TreeNode<T>? = null
}

class BinaryTree<T : Comparable<T>> {
    private var root: TreeNode<T>? = null

    // Insert a new node to the binary tree
    fun insert(value: T) {
        root = insertRecursive(root, value)
    }

    private fun insertRecursive(node: TreeNode<T>?, value: T): TreeNode<T> {
        if (node == null) {
            return TreeNode(value)
        }

        if (value < node.value) {
            node.left = insertRecursive(node.left, value)
        } else if (value > node.value) {
            node.right = insertRecursive(node.right, value)
        }

        return node
    }

    // Search for a value in the binary tree
    fun contains(value: T): Boolean {
        return containsRecursive(root, value)
    }

    private fun containsRecursive(node: TreeNode<T>?, value: T): Boolean {
        if (node == null) {
            return false
        }

        return when {
            value < node.value -> containsRecursive(node.left, value)
            value > node.value -> containsRecursive(node.right, value)
            else -> true
        }
    }

    // Traverse the binary tree in-order (Left-Root-Right)
    fun inOrderTraversal(visit: (T) -> Unit) {
        inOrderTraversalRecursive(root, visit)
    }

    private fun inOrderTraversalRecursive(node: TreeNode<T>?, visit: (T) -> Unit) {
        if (node != null) {
            inOrderTraversalRecursive(node.left, visit)
            visit(node.value)
            inOrderTraversalRecursive(node.right, visit)
        }
    }
}

fun main() {
    val tree = BinaryTree<Int>()

    tree.insert(4)
    tree.insert(2)
    tree.insert(1)
    tree.insert(3)
    tree.insert(6)
    tree.insert(5)
    tree.insert(7)

    println("Tree contains 3: ${tree.contains(3)}") // true
    println("Tree contains 8: ${tree.contains(8)}") // false

    print("In-order traversal: ")
    tree.inOrderTraversal { print("$it ") } // 1 2 3 4 5 6 7
}
```

### Graphs

Graphs are a versatile data structure used to represent relationships between objects. They consist of nodes (also called vertices) and edges connecting those nodes and can be either directed or undirected, and weighted or unweighted. Graphs can model a wide range of real-world problems and are widely used in computer science, mathematics, and other disciplines. They are used in a variety of applications, such as modeling networks, transportation systems, and social connections.

1. Basic properties:
    - Nodes (or vertices): Elements in the graph.
    - Edges: Connections between nodes, representing relationships or associations between them.
    - Degree: The number of edges connected to a node. In directed graphs, the degree is separated into in-degree (number of incoming edges) and out-degree (number of outgoing edges).
2. Types of graphs:
    - Undirected graphs: Edges have no direction, meaning the relationship between nodes is bidirectional. An edge between node A and node B is considered the same as an edge between node B and node A.
    - Directed graphs (digraphs): Edges have a direction, indicating an ordered relationship between nodes. An edge from node A to node B is not the same as an edge from node B to node A.
    - Weighted graphs: Edges have associated weights or costs, representing the strength or distance of the connection between nodes. Weighted graphs can be directed or undirected.
    - Cyclic graphs: Graphs that contain at least one cycle, a sequence of edges that starts and ends at the same node.
    - Acyclic graphs: Graphs without any cycles. Directed acyclic graphs (DAGs) have many applications, such as scheduling tasks with dependencies or representing hierarchical structures.
3. Graph representations:
    - Adjacency matrix: A two-dimensional matrix where the element at position (i, j) represents the presence (and possibly the weight) of an edge between nodes i and j. Adjacency matrices are space-inefficient for sparse graphs but allow for fast edge lookups and matrix-based graph operations.
    - Adjacency list: An array of lists or sets, where the element at position i contains a list of nodes connected to node i. Adjacency lists are space-efficient for sparse graphs and allow for fast iteration over neighbors but slower edge lookups compared to adjacency matrices.
4. Common graph algorithms: 
    1. Graph traversal algorithms:
        - Depth-First Search (DFS): A graph traversal algorithm that explores as far as possible along each branch before backtracking. DFS can be implemented using recursion or an explicit stack.
        - Breadth-First Search (BFS): A graph traversal algorithm that explores all vertices at the current level before moving on to the next level. BFS can be implemented using a queue.
    2. Shortest path algorithms:
        - Dijkstra's Algorithm: A greedy algorithm used to find the shortest path between a source vertex and all other vertices in a weighted graph with non-negative edge weights.
        - Bellman-Ford Algorithm: An algorithm used to find the shortest path between a source vertex and all other vertices in a weighted graph, even with negative edge weights. It can also detect negative weight cycles.
        - Floyd-Warshall Algorithm: A dynamic programming algorithm used to find the shortest paths between all pairs of vertices in a weighted graph.
    3. Minimum spanning tree algorithms:
        - Kruskal's Algorithm: A greedy algorithm that finds the minimum spanning tree of an undirected, weighted graph by iteratively adding edges in increasing weight order, as long as they don't create cycles.
        - Prim's Algorithm: Another greedy algorithm that finds the minimum spanning tree of an undirected, weighted graph by iteratively adding the least-weighted edge that connects the current tree to an unvisited vertex.
    4. Maximum flow algorithms:
        - Ford-Fulkerson Algorithm: An algorithm used to find the maximum flow in a flow network, which iteratively finds augmenting paths and updates the flow until no more augmenting paths can be found.
        - Edmonds-Karp Algorithm: A specific implementation of the Ford-Fulkerson Algorithm that uses BFS to find augmenting paths, resulting in better worst-case complexity.
    5. Topological sorting:
        - Topological sorting is an algorithm used to linearly order the vertices of a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering. It is commonly used in scheduling and determining the order of compilation for a set of dependent tasks.
    6. Connectivity algorithms:
        - Tarjan's Algorithm: An algorithm used to find strongly connected components in a directed graph.
        - Union-Find: A data structure and algorithm used to determine the connected components in an undirected graph, also known as disjoint-set data structure.
    7. Traveling Salesman Problem (TSP):
        - The TSP is an NP-hard optimization problem that involves finding the shortest possible route for a salesman who must visit a set of cities exactly once and return to the starting city. Various heuristics and approximation algorithms, such as the nearest neighbor algorithm, minimum spanning tree-based algorithms, and genetic algorithms, can be used to find near-optimal solutions.

Sample Implementation

```kotlin
class Graph(private val vertices: Int) {
    private val adjacencyList = mutableListOf<MutableList<Int>>()

    init {
        for (i in 0 until vertices) {
            adjacencyList.add(mutableListOf())
        }
    }

    // Add an edge between two vertices
    fun addEdge(vertex1: Int, vertex2: Int) {
        require(vertex1 in 0 until vertices && vertex2 in 0 until vertices) {
            "Invalid vertex index: vertex1 = $vertex1, vertex2 = $vertex2"
        }
        adjacencyList[vertex1].add(vertex2)
        adjacencyList[vertex2].add(vertex1)
    }

    // Get neighbors of a vertex
    fun getNeighbors(vertex: Int): List<Int> {
        require(vertex in 0 until vertices) { "Invalid vertex index: $vertex" }
        return adjacencyList[vertex]
    }
}

fun main() {
    val graph = Graph(5)

    graph.addEdge(0, 1)
    graph.addEdge(0, 2)
    graph.addEdge(1, 2)
    graph.addEdge(1, 3)
    graph.addEdge(2, 4)

    println("Neighbors of vertex 1: ${graph.getNeighbors(1)}") // [0, 2, 3]
    println("Neighbors of vertex 3: ${graph.getNeighbors(3)}") // [1]
}
```

### Hash Tables

Hash tables, also known as hash maps, are a widely-used data structure that provide fast access, insertion, and deletion of elements based on key-value pairs. Hash tables typically have an average-case time complexity of O(1) for operations, but this depends on the quality of the hash function and handling of collisions.

1. Basic properties:
    - Key-value pairs: Hash tables store data in the form of key-value pairs, where each key is associated with a specific value.
    - Hash function: A hash function is used to map keys to indices in an underlying array, called the hash table. The hash function should distribute keys uniformly across the array to minimize collisions.
    - Collisions: When two or more keys have the same hash value, a collision occurs. Efficient handling of collisions is crucial for maintaining the performance of hash tables.
2. Collision resolution strategies:
    - Chaining: In this method, each slot in the hash table holds a linked list (or another data structure) of key-value pairs. When a collision occurs, the new key-value pair is added to the list at the corresponding index.
    - Open addressing: In this method, all key-value pairs are stored directly in the hash table array. When a collision occurs, a sequence of alternative indices (called the probe sequence) is generated using a probing function, and the new key-value pair is placed in the first available slot in the sequence.
3. Common operations:
    - Insert: Adds a new key-value pair to the hash table, usually in O(1) average-case complexity.
    - Delete: Removes a key-value pair from the hash table, usually in O(1) average-case complexity.
    - Search: Retrieves the value associated with a given key, usually in O(1) average-case complexity.
4. Performance factors:
    - Load factor: The load factor is the ratio of the number of occupied slots to the total number of slots in the hash table. A higher load factor leads to a higher probability of collisions and increased average-case complexity for operations.
    - Resizing: To maintain performance, it's common to resize the hash table when the load factor crosses a certain threshold. This involves creating a new, larger hash table and rehashing all existing key-value pairs.
5. Variations:
    - Cuckoo hashing: A variation of open addressing that uses multiple hash functions to resolve collisions, providing constant-time worst-case complexity for search and delete operations.
    - Bloom filter: A probabilistic data structure used to test whether an element is a member of a set. It can provide space-efficient storage and fast membership queries but may return false positives.
6. Applications:
    - Associative arrays: Hash tables can be used to implement associative arrays or dictionaries, allowing for fast look-up, insertion, and deletion of elements based on their keys.
    - Cache: Hash tables can be used to implement caches, where recently-used data is stored for fast access and old data is evicted when the cache becomes full.
    - Symbol tables: In compilers and interpreters, hash tables are often used to store and look up variable names and their associated values or memory addresses.
    - String matching: Hash tables can be used in various string matching algorithms, such as the Rabin-Karp algorithm for pattern matching.

Hash tables are a powerful and versatile data structure that provides fast access, insertion, and deletion of key-value pairs. Understanding their properties, collision resolution strategies, performance factors, variations, and applications can help you effectively use hash tables in your programming projects.

### Heaps

Heaps are a specialized tree-based data structure that satisfy the heap property, making them particularly useful for managing priority queues, as well as sorting and searching tasks. A binary tree-based data structure that follows a specific property, such as the min-heap or max-heap property. Min-heaps maintain the smallest element as the root, while max-heaps maintain the largest element as the root. Heaps are commonly used for priority queues and efficient sorting algorithms like heapsort.

1. Basic properties:
    - Binary tree: Heaps are usually implemented as binary trees, where each node has at most two children.
    - Complete tree: Heaps are typically complete binary trees, meaning every level of the tree is fully filled except for the last level, which is filled from left to right.
    - Heap property: The key of each node in the tree is either greater than or equal to (max-heap) or less than or equal to (min-heap) the keys of its children.
2. Types of heaps:
    - Max-heap: In a max-heap, the parent nodes have larger keys than their children. The root node contains the largest key, making it suitable for applications that require access to the maximum element.
    - Min-heap: In a min-heap, the parent nodes have smaller keys than their children. The root node contains the smallest key, making it suitable for applications that require access to the minimum element.
3. Common operations:
    - Insert: Adds a new element to the heap, usually in O(log n) complexity.
    - Extract (max or min): Removes and returns the maximum (max-heap) or minimum (min-heap) element from the heap, usually in O(log n) complexity.
    - Peek (max or min): Returns the maximum (max-heap) or minimum (min-heap) element without removing it, usually in O(1) complexity.
    - Heapify: Transforms an array into a heap in-place, usually in O(n) complexity.
    - Increase/Decrease key: Changes the value of a specific node and restores the heap property, usually in O(log n) complexity.
    - Delete: Removes a specific node from the heap, usually in O(log n) complexity.
4. Implementations:
    - Array-based: Heaps are commonly implemented using an array or dynamic array, where each element represents a node in the tree, and parent-child relationships can be determined using simple arithmetic operations on the array indices.
    - Pointer-based: Heaps can also be implemented using a pointer-based tree structure, but this approach is less common due to increased memory overhead and complexity.
5. Variations:
    - D-ary heap: A variation of the binary heap, where each node can have up to D children. This reduces the height of the tree and can lead to faster operations in some cases.
    - Fibonacci heap: A more advanced heap structure with better amortized time complexity for certain operations, such as insert and decrease key, making it useful in graph algorithms like Dijkstra's and Prim's.
6. Applications:
    - Priority queues: Heaps are the primary data structure used to implement priority queues, which are used in a variety of applications, such as task scheduling, event-driven simulations, and graph algorithms.
    - Heap sort: A comparison-based sorting algorithm that uses a heap to sort elements in O(n log n) time complexity.
    - K-th smallest/largest element: Heaps can be used to efficiently find the k-th smallest or largest element in a dataset.
    - Median and other statistics: Heaps can be used to maintain running statistics, such as the median or percentiles, in an efficient manner.

Heaps are an important data structure for managing priority queues and performing various sorting and searching tasks. Understanding their properties, types, operations, and applications can help you effectively use heaps in your programming projects.

Sample Implementation (Min Heap, Array Based)

```kotlin
class MinHeap {
    private val heap = mutableListOf<Int>()

    // Get the parent index
    private fun parent(index: Int) = (index - 1) / 2

    // Get the left child index
    private fun leftChild(index: Int) = 2 * index + 1

    // Get the right child index
    private fun rightChild(index: Int) = 2 * index + 2

    // Swap two elements in the heap
    private fun swap(index1: Int, index2: Int) {
        val temp = heap[index1]
        heap[index1] = heap[index2]
        heap[index2] = temp
    }

    // Restore heap property by moving the element at the given index up
    private fun siftUp(index: Int) {
        var i = index
        while (i > 0 && heap[parent(i)] > heap[i]) {
            swap(i, parent(i))
            i = parent(i)
        }
    }

    // Restore heap property by moving the element at the given index down
    private fun siftDown(index: Int) {
        var minIndex = index
        val left = leftChild(index)
        val right = rightChild(index)

        if (left < size() && heap[left] < heap[minIndex]) {
            minIndex = left
        }
        if (right < size() && heap[right] < heap[minIndex]) {
            minIndex = right
        }

        if (index != minIndex) {
            swap(index, minIndex)
            siftDown(minIndex)
        }
    }

    // Insert a value into the heap
    fun insert(value: Int) {
        heap.add(value)
        siftUp(size() - 1)
    }

    // Get the minimum value (top of the heap)
    fun min(): Int {
        if (heap.isEmpty()) throw IllegalStateException("Heap is empty.")
        return heap[0]
    }

    // Remove and return the minimum value (top of the heap)
    fun extractMin(): Int {
        if (heap.isEmpty()) throw IllegalStateException("Heap is empty.")
        val minValue = heap[0]
        heap[0] = heap[size() - 1]
        heap.removeAt(size() - 1)
        siftDown(0)
        return minValue
    }

    // Get the number of elements in the heap
    fun size() = heap.size
}

fun main() {
    val minHeap = MinHeap()

    minHeap.insert(5)
    minHeap.insert(3)
    minHeap.insert(7)
    minHeap.insert(1)

    println("Min value: ${minHeap.min()}") // 1

    minHeap.extractMin()
    println("Min value after extraction: ${minHeap.min()}") // 3
}
```

### Trie (Prefix Tree)

Tries, also known as prefix trees or digital trees, are a tree-like data structure used for storing a dynamic set or associative array, where the keys are usually strings. Tries provide efficient searching, insertion, and deletion of strings and are commonly used in tasks like autocomplete features and spell checking. A tree-like data structure that is used to store a dynamic set or associative array where the keys are usually strings. Each node in the trie represents a character, and the path from the root to any node represents a prefix of stored strings. Tries are useful for string manipulation tasks like searching, sorting, and autocompletion.

1. Basic properties:
    - Nodes: Each node in a trie represents a character of a string and has a collection of child nodes, one for each possible character.
    - Edges: Edges connect parent nodes with their child nodes and represent the relationship between characters in a string.
    - Root: The root node is the starting point of the trie and usually represents an empty string or a sentinel value.
    - End-of-string marker: Each node in a trie can have a marker to indicate the end of a valid string, such as a boolean flag or a value associated with the string.
2. Common operations:
    - Insert: Adds a new string to the trie by traversing the existing nodes or creating new nodes as needed, usually in O(m) time complexity, where m is the length of the string.
    - Search: Searches for a string in the trie by traversing the nodes based on the characters in the string, usually in O(m) time complexity, where m is the length of the string.
    - Delete: Removes a string from the trie by traversing the nodes and removing the end-of-string marker, and possibly deleting nodes if they become unnecessary, usually in O(m) time complexity, where m is the length of the string.
    - Prefix search: Retrieves all strings with a given prefix by traversing the trie based on the prefix and then performing a depth-first search from the last node of the prefix, usually in O(p + n) time complexity, where p is the length of the prefix and n is the number of resulting strings.
3. Variations:
    - Compressed trie (Radix tree or Patricia trie): A more space-efficient version of the trie, where chains of nodes with only one child are compressed into a single node, reducing the total number of nodes and edges.
    - Suffix tree: A specialized trie-like data structure that stores all the suffixes of a given string, enabling efficient substring search and other string manipulation tasks.
    - Suffix array: A space-efficient alternative to suffix trees, which stores a sorted array of the suffixes of a string and allows for binary search-based substring queries.
4. Applications:
    - Autocomplete: Tries can be used to efficiently implement autocomplete features in search engines, text editors, or command-line interfaces by quickly finding all strings that share a common prefix.
    - Spell checking: Tries can be used to store dictionaries of valid words and efficiently perform spell checking by searching for words or suggesting alternatives based on prefixes.
    - IP routing: Patricia tries are used in IP routing to store routing tables and efficiently perform longest-prefix matching for IP addresses.
    - Text processing: Suffix trees and suffix arrays can be used for various text processing tasks, such as pattern matching, string comparison, and finding the longest common substring.

Tries are an efficient data structure for storing and manipulating strings based on their prefixes. Understanding their properties, operations, variations, and applications can help you effectively use tries in your programming projects involving string processing and search tasks.

Sample Implementation

```kotlin
class Trie {
    private val root = TrieNode()

    class TrieNode {
        val children = mutableMapOf<Char, TrieNode>()
        var isWordEnd = false
    }

    // Insert a word into the trie
    fun insert(word: String) {
        var currentNode = root
        for (char in word) {
            currentNode = currentNode.children.getOrPut(char) { TrieNode() }
        }
        currentNode.isWordEnd = true
    }

    // Search for a word in the trie
    fun search(word: String): Boolean {
        var currentNode = root
        for (char in word) {
            currentNode = currentNode.children[char] ?: return false
        }
        return currentNode.isWordEnd
    }

    // Check if any word in the trie starts with the given prefix
    fun startsWith(prefix: String): Boolean {
        var currentNode = root
        for (char in prefix) {
            currentNode = currentNode.children[char] ?: return false
        }
        return true
    }
}

fun main() {
    val trie = Trie()

    trie.insert("apple")
    trie.insert("banana")

    println("Search 'apple': ${trie.search("apple")}") // true
    println("Search 'appl': ${trie.search("appl")}") // false
    println("Starts with 'app': ${trie.startsWith("app")}") // true
    println("Starts with 'ban': ${trie.startsWith("ban")}") // true
    println("Starts with 'bat': ${trie.startsWith("bat")}") // false
}
```

## Less Simple Structures

### Doubly Linked Lists

Similar to a singly linked list, a doubly linked list consists of nodes containing an element, a reference to the next node, and a reference to the previous node. This allows for easy traversal in both directions, but at the cost of increased memory overhead.

A Doubly Linked List is a linked list in which each node contains a data element and two pointers, one pointing to the previous node and the other pointing to the next node in the sequence. This bidirectional linking allows for easier traversal in both directions and simplifies certain operations.

Advantages:

- Easier reverse traversal: Unlike singly linked lists, you can traverse a doubly linked list in both directions, making certain operations more efficient.
- Simplified insertion and deletion: Inserting or deleting nodes at a specific position or near the tail of the list becomes easier, as you don't need to traverse the list to find the previous node.

Disadvantages:

- Increased memory overhead: Each node in a doubly linked list requires an extra pointer, resulting in higher memory usage.
- Slower manipulation: Insertion and deletion operations may be slower in a doubly linked list due to the need to maintain two pointers for each node.

Sample Implementation

```kotlin
class DoublyLinkedList<T> {
    private var head: Node<T>? = null
    private var tail: Node<T>? = null
    var size = 0
        private set

    private class Node<T>(val data: T) {
        var prev: Node<T>? = null
        var next: Node<T>? = null
    }

    // Add an element to the front of the list
    fun addFirst(data: T) {
        val newNode = Node(data)
        if (size == 0) {
            head = newNode
            tail = newNode
        } else {
            newNode.next = head
            head?.prev = newNode
            head = newNode
        }
        size++
    }

    // Add an element to the end of the list
    fun addLast(data: T) {
        val newNode = Node(data)
        if (size == 0) {
            head = newNode
            tail = newNode
        } else {
            newNode.prev = tail
            tail?.next = newNode
            tail = newNode
        }
        size++
    }

    // Remove the element from the front of the list
    fun removeFirst(): T? {
        if (size == 0) return null

        val data = head?.data
        head = head?.next
        head?.prev = null

        if (--size == 0) tail = null

        return data
    }

    // Remove the element from the end of the list
    fun removeLast(): T? {
        if (size == 0) return null

        val data = tail?.data
        tail = tail?.prev
        tail?.next = null

        if (--size == 0) head = null

        return data
    }
}

fun main() {
    val dll = DoublyLinkedList<Int>()

    dll.addFirst(1)
    dll.addFirst(2)
    dll.addLast(3)

    println("Size: ${dll.size}") // 3
    println("Removed first element: ${dll.removeFirst()}") // 2
    println("Removed last element: ${dll.removeLast()}") // 3
    println("Size after removal: ${dll.size}") // 1
}
```

### Circular Linked Lists

A variation of the linked list where the last node points back to the first node, forming a loop. This can be useful in situations where you need to cycle through elements repeatedly.

A Circular Linked List is a linked list in which the tail node points back to the head node instead of having a null reference. This creates a loop within the list, allowing for continuous traversal and simplified operations in certain cases. Circular linked lists can be implemented as singly or doubly linked lists.

Advantages:

- Continuous traversal: You can traverse a circular linked list indefinitely, as the tail node connects back to the head node. This feature can be useful in certain applications, such as round-robin scheduling or implementing circular buffers.
- Simplified tail operations: Inserting or deleting elements at the tail becomes more efficient, as the tail node is directly connected to the head node.
- Rotating elements: Shifting elements within the list or rotating the list is simplified, as there is no need to update any null references.

Disadvantages:

- Increased complexity: Implementing a circular linked list can be more complex than a basic linked list, as you need to properly maintain the circular structure during insertion and deletion operations.
- Risk of infinite loops: If not handled correctly, traversing a circular linked list can lead to infinite loops, as there is no null reference to indicate the end of the list.

Sample Implementation

```kotlin
class CircularLinkedList<T> {
    private var head: Node<T>? = null
    var size = 0
        private set

    private class Node<T>(val data: T) {
        var next: Node<T>? = null
    }

    // Add an element to the front of the list
    fun addFirst(data: T) {
        val newNode = Node(data)

        if (size == 0) {
            newNode.next = newNode
            head = newNode
        } else {
            newNode.next = head
            getNodeAt(size - 1)?.next = newNode
            head = newNode
        }
        size++
    }

    // Add an element to the end of the list
    fun addLast(data: T) {
        if (size == 0) {
            addFirst(data)
            return
        }

        val newNode = Node(data)
        val lastNode = getNodeAt(size - 1)

        newNode.next = head
        lastNode?.next = newNode
        size++
    }

    // Remove the element from the front of the list
    fun removeFirst(): T? {
        if (size == 0) return null

        val data = head?.data

        if (size == 1) {
            head = null
        } else {
            getNodeAt(size - 1)?.next = head?.next
            head = head?.next
        }
        size--

        return data
    }

    // Helper function to get a node at a specific index
    private fun getNodeAt(index: Int): Node<T>? {
        if (index >= size) return null

        var currentNode = head
        for (i in 0 until index) {
            currentNode = currentNode?.next
        }
        return currentNode
    }
}

fun main() {
    val cll = CircularLinkedList<Int>()

    cll.addFirst(1)
    cll.addFirst(2)
    cll.addLast(3)

    println("Size: ${cll.size}") // 3
    println("Removed first element: ${cll.removeFirst()}") // 2
    println("Size after removal: ${cll.size}") // 2
}
```

### Skip Lists

A probabilistic data structure that allows for fast search, insertion, and deletion operations on a sorted sequence of elements. Skip lists use multiple layers of linked lists, with each layer skipping over a portion of the elements in the layer below. This results in an average-case time complexity of O(log n) for search, insertion, and deletion.

### Sets

An unordered collection of unique elements with no duplicates. Sets support operations like union, intersection, and difference, and can be implemented using a variety of data structures, such as hash tables, trees, or arrays.

### Maps (Dictionaries)

A collection of key-value pairs, where each key is associated with a value. Maps allow for efficient retrieval, insertion, and deletion of values based on their keys. They can be implemented using various data structures, such as hash tables, binary search trees, or skip lists.

### Bloom Filters

A probabilistic data structure used to test whether an element is a member of a set. Bloom filters can return false positives (indicating an element is in the set when it is not), but never false negatives (indicating an element is not in the set when it is). This makes them well-suited for applications where space efficiency and approximate membership queries are more important than perfect accuracy.

### Disjoint Set (Union-Find)

A data structure that keeps track of a collection of disjoint sets and supports union (joining two sets) and find (determining which set an element belongs to) operations. This data structure is particularly useful in graph algorithms, such as Kruskal's algorithm for finding the minimum spanning tree.

### Fenwick Tree (Binary Indexed Tree)

A compact data structure that allows for efficient computation and manipulation of prefix sums (cumulative sums) in an array. Fenwick trees support querying the sum of a range of elements and updating individual elements in O(log n) time.

### Segment Tree

A tree-like data structure used for performing range queries and updates on an array. Segment trees can efficiently compute aggregate functions (e.g., minimum, maximum, sum) over a specified range and update elements in the array. They have a time complexity of O(log n) for both query and update operations.