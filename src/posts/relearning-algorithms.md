---
title: Relearning Algorithms
date: 2023-03-25T04:21:43.982Z
summary: It’s been a while since I took CS 1501 - Algorithms, and wrote a
  refresher post on Data Structures, so figured I why not write another post.
tags:
  - software-dev
  - learn-to-code
---
It’s been a while since I took CS 1501 - Algorithms, and wrote a refresher post on Data Structures, so figured I why not write another post.

### Complexity Notations

There are three main notations: Big O (O), Big Theta (Θ), and Big Omega (Ω).

1. Big O (O) notation
Big O notation represents the upper bound of an algorithm's time or space complexity. It provides an approximation of the worst-case performance of an algorithm as the input size (n) increases. When we say that an algorithm has a complexity of O(f(n)), we mean that the algorithm's complexity does not grow faster than the function f(n) for sufficiently large input sizes.
2. Big Omega (Ω) notation
Big Omega notation represents the lower bound of an algorithm's time or space complexity. It provides an approximation of the best-case performance of an algorithm as the input size (n) increases. When we say that an algorithm has a complexity of Ω(f(n)), we mean that the algorithm's complexity does not grow slower than the function f(n) for sufficiently large input sizes.
3. Big Theta (Θ) notation
Big Theta notation represents the tight bound of an algorithm's time or space complexity. It provides an approximation of the average-case performance of an algorithm as the input size (n) increases. When we say that an algorithm has a complexity of Θ(f(n)), we mean that the algorithm's complexity grows at the same rate as the function f(n) for sufficiently large input sizes. In other words, Big Theta notation means that the algorithm's complexity is both Big O and Big Omega of the function f(n).

These notations help describe the behavior of an algorithm in different scenarios:

- Big O notation is used to describe the worst-case complexity, which helps us understand how the algorithm behaves when it encounters the most challenging inputs.
- Big Omega notation is used to describe the best-case complexity, which helps us understand how the algorithm behaves when it encounters the easiest inputs.
- Big Theta notation is used to describe the average-case complexity, which helps us understand how the algorithm behaves on average, given a random input.

Understanding these notations allows you to analyze and compare the performance of different algorithms, considering the best-case, worst-case, and average-case scenarios, and choose the most suitable algorithm for a specific problem.

### Time Complexity

Runtime analysis, also known as time complexity analysis, is the process of estimating the efficiency of an algorithm by examining how the number of operations grows with respect to the input size. In computer science, Big O notation (O(n)) is commonly used to express the upper bound of an algorithm's time complexity.

Big O notation describes the worst-case growth rate of an algorithm's time complexity, providing an approximation of its performance as the input size increases. In Big O notation, 'n' typically represents the size of the input.

Here are some common time complexities with brief explanations:

1. O(1) - Constant time complexity
The algorithm takes a constant amount of time, regardless of the input size. The performance of the algorithm does not depend on the input size. Examples include array element access and basic arithmetic operations.
2. O(log n) - Logarithmic time complexity
The algorithm's runtime increases logarithmically with the input size. Logarithmic algorithms are highly efficient, especially when handling large input sizes. Examples include binary search on a sorted array and balanced search tree operations. A good way to remember this is thinking of the total work being reduced by half at each input. 
3. O(n) - Linear time complexity
The algorithm's runtime increases linearly with the input size. The number of operations grows at the same rate as the input size. Examples include iterating through an array or a list, and simple search algorithms like linear search.
4. O(n log n) - Linearithmic time complexity
The algorithm's runtime increases linearly with the input size, but with a logarithmic factor. These algorithms are often seen in efficient sorting algorithms like merge sort and quicksort.
5. O(n^2) - Quadratic time complexity
The algorithm's runtime increases quadratically with the input size. Quadratic algorithms become inefficient as the input size grows. Examples include nested loops and simple sorting algorithms like bubble sort and insertion sort.
6. O(n^3) - Cubic time complexity
The algorithm's runtime increases cubically with the input size. Cubic algorithms are even less efficient than quadratic ones and are often seen in complex problem-solving or mathematical computation. Examples include certain matrix multiplication algorithms and some graph algorithms.
7. O(2^n) - Exponential time complexity
The algorithm's runtime doubles with each additional input element. Exponential algorithms become impractical for even moderately-sized input sizes. Examples include recursive solutions to problems like the traveling salesman problem and exhaustive search algorithms.
8. O(n!) - Factorial time complexity
The algorithm's runtime grows factorially with the input size. Factorial algorithms are extremely inefficient and are usually found in problems that require exploring all possible permutations, like the brute-force solution to the traveling salesman problem.

When analyzing an algorithm's time complexity, it's essential to focus on the most significant terms (the ones that grow the fastest) and ignore constant factors or lower-order terms, as they become less relevant when the input size increases. Understanding and estimating the time complexity of algorithms is a crucial skill in computer science, as it allows for the comparison and selection of the most efficient solutions for a given problem.

### Space Complexity

Space complexity is the analysis of the amount of memory used by an algorithm. It measures the relationship between the input size and the memory consumption of an algorithm, providing insights into its efficiency regarding memory usage. Like time complexity, space complexity is often expressed using Big O notation.

An algorithm's space complexity takes into account both the memory used by the input data structure and the additional memory required by the algorithm for its operation (such as auxiliary data structures, temporary variables, and recursion call stacks).

Here are some common space complexities with brief explanations:

1. O(1) - Constant space complexity
The algorithm uses a constant amount of memory that does not depend on the input size. Examples include basic arithmetic operations, swapping two elements in an array, and iterating through an array using a single loop variable.
2. O(log n) - Logarithmic space complexity
The algorithm's memory usage grows logarithmically with the input size. Logarithmic space complexity is often seen in algorithms that use recursion or divide-and-conquer techniques, such as binary search and some tree-based algorithms.
3. O(n) - Linear space complexity
The algorithm's memory usage grows linearly with the input size. Examples include creating a copy of an array or a list, performing a linear search with a separate result list, and using a stack or queue for breadth-first or depth-first graph traversal.
4. O(n^2) - Quadratic space complexity
The algorithm's memory usage grows quadratically with the input size. Quadratic space complexity is often seen in algorithms that create two-dimensional data structures, like matrices, or use nested data structures like adjacency matrices for graph representation.
5. O(n^3) - Cubic space complexity
The algorithm's memory usage grows cubically with the input size. Cubic space complexity is less common but can be found in some algorithms that deal with three-dimensional data structures or involve complex mathematical computations.

When optimizing an algorithm, it's essential to consider both time and space complexity. Sometimes, there's a trade-off between the two: using more memory can speed up the algorithm or vice versa. The choice of an appropriate algorithm depends on the specific problem and the constraints of the system (e.g., available memory, execution speed requirements).

Understanding and estimating the space complexity of algorithms is crucial in computer science, as it helps you make informed decisions about which algorithms to use based on memory constraints and the efficiency of memory usage.

## Sorting

### Bubble Sort

Bubble Sort is a simple comparison-based sorting algorithm. It works by repeatedly swapping adjacent elements if they are in the wrong order, effectively "bubbling" the largest element to the end of the array with each pass. This process is repeated until the entire array is sorted.

Steps:

- Iterate through the array from the beginning to the second-to-last element.
- Compare each pair of adjacent elements. If the elements are in the wrong order, swap them.
- Repeat this process for the entire array until no more swaps are needed.

Time complexity

- O(n^2) for average and worst cases, O(n) for the best case (when the array is already sorted).

Space complexity

- O(1) since it's an in-place sorting algorithm.

Stability

- Bubble Sort is a stable sorting algorithm, as it preserves the relative order of equal elements.

Sample Implementation

```kotlin
fun bubbleSort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n - 1) {
        for (j in 0 until n - i - 1) {
            if (arr[j] > arr[j + 1]) {
                arr[j] = arr[j + 1].also { arr[j + 1] = arr[j] }
            }
        }
    }
}

fun main() {
    val arr = intArrayOf(64, 34, 25, 12, 22, 11, 90)
    println("Original array: ${arr.contentToString()}")

    bubbleSort(arr)
    println("Sorted array: ${arr.contentToString()}")
}
```

### Selection Sort

Selection Sort is another simple comparison-based sorting algorithm. It works by dividing the input array into two parts: the sorted part and the unsorted part. The algorithm repeatedly selects the smallest (or largest) element from the unsorted part and moves it to the end of the sorted part. This process is repeated until the entire array is sorted.

Steps:

1. Iterate through the array from the beginning to the second-to-last element.
2. Find the minimum (or maximum) element in the unsorted part of the array.
3. Swap the minimum (or maximum) element with the first element in the unsorted part.

Time complexity

- O(n^2) for average, worst, and best cases.

Space complexity

- O(1) since it's an in-place sorting algorithm.

Stability

- Selection Sort is not a stable sorting algorithm, as it does not preserve the relative order of equal elements.

Sample implementation

```kotlin
fun insertionSort(arr: IntArray) {
    val n = arr.size
    for (i in 1 until n) {
        val key = arr[i]
        var j = i - 1

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = key
    }
}

fun main() {
    val arr = intArrayOf(12, 11, 13, 5, 6)
    println("Original array: ${arr.contentToString()}")

    insertionSort(arr)
    println("Sorted array: ${arr.contentToString()}")
}
```

### Insertion Sort

Insertion Sort is a simple comparison-based sorting algorithm that works by building the sorted array one element at a time. It is efficient for small data sets and partially sorted arrays.

Steps:

- Iterate through the array from the second element to the last element.
- At each iteration, consider the current element as the "key" element.
- Compare the key element with the elements in the sorted part of the array, moving them one position to the right if they are greater than the key.
- Insert the key element in its correct position within the sorted part of the array.

Time complexity

- O(n^2) for average and worst cases, O(n) for the best case (when the array is already sorted).

Space complexity

- O(1) since it's an in-place sorting algorithm.

Stability

- Insertion Sort is a stable sorting algorithm, as it preserves the relative order of equal elements.

Sample Implementation

```kotlin
fun selectionSort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n - 1) {
        var minIndex = i
        for (j in i + 1 until n) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }

        if (minIndex != i) {
            arr[minIndex] = arr[i].also { arr[i] = arr[minIndex] }
        }
    }
}

fun main() {
    val arr = intArrayOf(64, 25, 12, 22, 11)
    println("Original array: ${arr.contentToString()}")

    selectionSort(arr)
    println("Sorted array: ${arr.contentToString()}")
}
```

### Merge Sort

Merge Sort is a divide-and-conquer sorting algorithm that works by recursively dividing the input array into two halves, sorting each half, and then merging the sorted halves back together to produce the final sorted output. Merge Sort is a comparison-based algorithm with a time complexity of O(n log n) for both the average and worst-case scenarios, making it more efficient than simple sorting algorithms like Bubble Sort, Selection Sort, and Insertion Sort.

How it works:

Here’s the Merge Sort process, broken down into steps:

1. Base case: If the input array has only one element or is empty, it is already sorted. So, return the array as is.
2. Divide: Split the input array into two equal (or nearly equal) halves. This can be achieved by finding the middle index and creating two new arrays: the left array containing elements from the start to the middle index, and the right array containing elements from the middle index to the end of the original array.
3. Recursion: Recursively apply the Merge Sort process to both the left and right halves. The recursion will continue until the base case is reached, where each subarray has only one element or is empty.
4. Merge: Combine the sorted left and right halves by iterating through them and comparing their elements. This process involves the following steps:
    
    a. Create a new array to store the merged result.
    
    b. Initialize two pointers, one for each half (left and right). Both pointers start at the beginning of their respective halves.
    
    c. Compare the elements at the current positions of the left and right pointers. Choose the smaller element and place it in the merged array. Increment the pointer in the half from which the smaller element was chosen.
    
    d. Repeat step (c) until one of the halves has been fully processed (the pointer reaches the end of that half).
    
    e. If there are remaining elements in the other half, copy them directly to the merged array. These elements are already sorted, so no further comparison is needed.
    
    f. Return the merged array.
    
5. The merged arrays from each recursion level are combined up the call stack, ultimately producing the final sorted array.

Let's walk through an example to better understand the Merge Sort process. Suppose we have the following input array:

```
[4, 3, 2, 1]
```

Divide the array into two halves:

```
Left: [4, 3]
Right: [2, 1]

```

Recursively apply Merge Sort to both halves:

```
Left: [4] [3] (base case reached, both subarrays have only one element)
Right: [2] [1] (base case reached, both subarrays have only one element)
```

Merge the left subarrays:

```
Merged left: [3, 4] (compare 4 and 3, choose 3, then append 4)
```

Merge the right subarrays:

```
Merged right: [1, 2] (compare 2 and 1, choose 1, then append 2)
```

Merge the final sorted left and right arrays:

```
Merged result: [1, 2, 3, 4] (compare and choose elements in order: 1, 2, 3, 4)
```

So, the final sorted array is `[1, 2, 3, 4]`. This example demonstrates how Merge Sort recursively splits the input array, sorts the subarrays, and merges them back together to produce the final sorted output.

Time Complexity

- Merge Sort has a worst-case and average time complexity of O(n log n), where n is the number of elements in the input array. This time complexity is derived from the fact that the input array is repeatedly divided into halves (log n levels) and each level requires O(n) time to merge the two halves.

Space Complexity

- Merge Sort has a space complexity of O(n) because it requires additional memory for the merging step. This additional memory is needed to store the temporary arrays that hold the sorted halves during the merging process.

Stability

- Merge Sort is a stable sorting algorithm, which means that it maintains the relative order of equal elements in the sorted output. This property is important in some applications where the input data has

Sample Implementation:

```kotlin
fun mergeSort(arr: IntArray, low: Int, high: Int) {
    if (low < high) {
        val mid = low + (high - low) / 2
        mergeSort(arr, low, mid)
        mergeSort(arr, mid + 1, high)
        merge(arr, low, mid, high)
    }
}

fun merge(arr: IntArray, low: Int, mid: Int, high: Int) {
    val leftSize = mid - low + 1
    val rightSize = high - mid

    val leftArray = IntArray(leftSize)
    val rightArray = IntArray(rightSize)

    for (i in 0 until leftSize) {
        leftArray[i] = arr[low + i]
    }

    for (i in 0 until rightSize) {
        rightArray[i] = arr[mid + 1 + i]
    }

    var i = 0
    var j = 0
    var k = low

    while (i < leftSize && j < rightSize) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i]
            i++
        } else {
            arr[k] = rightArray[j]
            j++
        }
        k++
    }

    while (i < leftSize) {
        arr[k] = leftArray[i]
        i++
        k++
    }

    while (j < rightSize) {
        arr[k] = rightArray[j]
        j++
        k++
    }
}

fun main() {
    val arr = intArrayOf(4, 3, 2, 1)
    println("Original array: ${arr.contentToString()}")

    mergeSort(arr, 0, arr.size - 1)
    println("Sorted array: ${arr.contentToString()}")
}
```

### Quick Sort

Quick Sort is another divide-and-conquer algorithm that works by selecting a 'pivot' element from the input and partitioning the other elements into two groups, those less than the pivot and those greater than the pivot. It then recursively sorts the two groups. Quick Sort has an average time complexity of O(n log n), but its worst-case time complexity is O(n^2). However, the worst-case can usually be avoided by using randomized or median-of-three pivot selection strategies. Quick Sort is not stable, but it has the advantage of being an in-place sort (does not require additional memory). 

Here's a more detailed step-by-step overview of the Quick Sort algorithm:

1. Base case: If the input array has only one element or is empty, it is already sorted. So, return the array as is.
2. Pivot selection: Choose a pivot element from the input array. There are various strategies for selecting the pivot, such as choosing the first element, the last element, the middle element, or using a randomized approach. The choice of pivot selection can affect the algorithm's performance.
3. Partition: Rearrange the input array elements based on the pivot. Elements less than or equal to the pivot go to its left, while elements greater than the pivot go to its right. The pivot will be in its final sorted position after this step. The partitioning process can be implemented using the following algorithm:
    
    a. Initialize two pointers: one at the beginning of the array (left) and one at the end of the array (right).
    
    b. Move the left pointer towards the right, skipping elements that are less than or equal to the pivot.
    
    c. Move the right pointer towards the left, skipping elements that are greater than the pivot.
    
    d. If the left pointer is less than or equal to the right pointer, swap the elements at the left and right pointers. This step ensures that elements less than or equal to the pivot are on its left and elements greater than the pivot are on its right.
    
    e. Repeat steps (b) to (d) until the left pointer is greater than the right pointer.
    
    f. After the partitioning process, the pivot will be in its correct sorted position.
    
4. Recursion: Recursively apply the Quick Sort process to the subarray of elements less than or equal to the pivot and to the subarray of elements greater than the pivot. Since the pivot is already in its correct position, it doesn't need to be included in the recursive calls.
5. Combine: The recursively sorted left and right subarrays will produce the final sorted array when combined, as the pivot is already in its correct position.

Let's walk through an example to better understand the Quick Sort process. Suppose we have the following input array:

```
[3, 1, 4, 1, 5, 9, 2, 6, 5]
```

1. Choose a pivot (let's use the last element, 5, in this example):

```
[3, 1, 4, 1, 5, 9, 2, 6, 5] (pivot = 5)
```

1. Partition the array based on the pivot:

```
[3, 1, 4, 1, 5, 2, 5, 6, 9] (5 is now in its correct position)
```

Recursively apply Quick Sort to the left subarray `[3, 1, 4, 1, 5, 2]`:

```
[1, 1, 2, 3, 4, 5]
```

Recursively apply Quick Sort to the right subarray `[6, 9]`:

```
[6, 9]
```

Combine the sorted left subarray, the pivot, and the sorted right subarray:

```
[1, 1, 2, 3, 4, 5, 6, 9]
```

So, the final sorted array is `[1, 1, 2, 3, 4, 5, 6, 9]`. This example demonstrates how Quick Sort recursively partitions the input array, sorts

Time Complexity

- Quick Sort's average-case time complexity is O(n log n), making it an efficient sorting algorithm for large datasets. However, its worst-case time complexity is O(n^2), which can occur when the input array is already sorted or nearly sorted, and a poor pivot selection strategy is used. Implementing a good pivot selection strategy, such as randomization or the median of medians, can help avoid this issue.

Space Complexity

- Quick Sort has a space complexity of O(log n) for the recursive call stack in the best case (balanced partitioning) and O(n) in the worst case (unbalanced partitioning).

Stability

- Quick Sort is not a stable sorting algorithm, as the relative order of equal elements may not be preserved during the partitioning step.

Adaptivity

- Quick Sort is an adaptive algorithm in the sense that its performance can be affected by the input data's properties. For instance, Quick Sort performs well when the input data is randomly ordered but may perform poorly when the data is already sorted or nearly sorted.

Sample Implementation:

```kotlin
fun quickSort(arr: IntArray, low: Int, high: Int) {
    if (low < high) {
        val pivotIndex = partition(arr, low, high)
        quickSort(arr, low, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, high)
    }
}

fun partition(arr: IntArray, low: Int, high: Int): Int {
    val pivot = arr[high]
    var i = low - 1

    for (j in low until high) {
        if (arr[j] <= pivot) {
            i++
            arr[i] = arr[j].also { arr[j] = arr[i] }
        }
    }

    arr[i + 1] = arr[high].also { arr[high] = arr[i + 1] }
    return i + 1
}

fun main() {
    val arr = intArrayOf(3, 1, 4, 1, 5, 9, 2, 6, 5)
    println("Original array: ${arr.contentToString()}")

    quickSort(arr, 0, arr.size - 1)
    println("Sorted array: ${arr.contentToString()}")
}
```

### Heap Sort

Heap Sort is an efficient comparison-based sorting algorithm that uses a binary heap data structure to sort elements. It works by dividing the input array into a sorted part and an unsorted part, similar to Selection Sort. However, Heap Sort uses a max-heap or min-heap to efficiently find the largest or smallest element in the unsorted part of the array.

Here's an overview of the Heap Sort algorithm:

1. Build a max-heap from the input array. A max-heap is a binary tree in which each parent node is greater than or equal to its children. This step takes O(n) time.
2. Swap the root node (the largest element in the max-heap) with the last element in the unsorted part of the array. The largest element is now in its correct position in the sorted part of the array.
3. Reduce the size of the unsorted part of the array by one. This excludes the largest element from the max-heap, as it's now part of the sorted array.
4. Restore the max-heap property by "heapifying" the root node. This step takes O(log n) time.
5. Repeat steps 2 to 4 until the entire array is sorted.

Time complexity

- Average and worst-case: O(n log n)
- Best-case: O(n log n) (although O(n) is possible with a specialized implementation)

Space complexity

- O(1) since it's an in-place sorting algorithm.

Stability

- Heap Sort is not a stable sorting algorithm, as it does not preserve the relative order of equal elements

Sample Implementation

```kotlin
fun heapSort(arr: IntArray) {
    val n = arr.size

    // Build a max-heap
    for (i in n / 2 - 1 downTo 0) {
        heapify(arr, n, i)
    }

    // Extract elements from the max-heap one by one
    for (i in n - 1 downTo 1) {
        arr[0] = arr[i].also { arr[i] = arr[0] } // Swap the root and the last element
        heapify(arr, i, 0) // Heapify the reduced heap
    }
}

fun heapify(arr: IntArray, heapSize: Int, rootIndex: Int) {
    var largest = rootIndex
    val left = 2 * rootIndex + 1
    val right = 2 * rootIndex + 2

    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left
    }

    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right
    }

    if (largest != rootIndex) {
        arr[rootIndex] = arr[largest].also { arr[largest] = arr[rootIndex] }
        heapify(arr, heapSize, largest)
    }
}

fun main() {
    val arr = intArrayOf(12, 11, 13, 5, 6, 7)
    println("Original array: ${arr.contentToString()}")

    heapSort(arr)
    println("Sorted array: ${arr.contentToString()}")
}
```

### Radix Sort

Radix Sort is a non-comparative integer sorting algorithm that sorts numbers digit by digit. It works by distributing elements into "buckets" based on each digit's value, starting from the least significant digit (LSD) to the most significant digit (MSD), or vice versa. It uses counting sort or bucket sort as a subroutine to distribute elements into buckets.

There are two variants of Radix Sort:

1. LSD Radix Sort: Starts sorting from the least significant digit to the most significant digit.
2. MSD Radix Sort: Starts sorting from the most significant digit to the least significant digit.

Here's an overview of the LSD Radix Sort algorithm:

1. Determine the maximum number of digits in the input array.
2. Starting from the least significant digit (LSD), use counting sort or bucket sort to distribute elements into buckets based on the current digit's value.
3. Collect the elements from the buckets in order and replace the original array with the sorted elements.
4. Move to the next digit and repeat steps 2-3 until all digits have been processed.

Time complexity

- O(nk), where n is the number of elements in the input array, and k is the number of digits in the maximum element.

Space complexity

- O(n + k), as it requires additional storage for the buckets.

Stability

- Radix Sort is a stable sorting algorithm, as it preserves the relative order of equal elements.

## Graphs

### Graph traversal algorithms

Graph traversal algorithms are used to explore and visit all the vertices and edges of a graph in a systematic manner. These algorithms are essential for solving various graph-related problems, such as finding the shortest path, detecting cycles, and determining connectivity. There are two common graph traversal algorithms: Depth-First Search (DFS) and Breadth-First Search (BFS).

Depth-First Search (DFS)

DFS is a graph traversal algorithm that visits all the vertices of a graph by exploring as far as possible along each branch before backtracking. The basic idea is to start at a source vertex and visit its adjacent vertices, then recursively apply the same process to each adjacent vertex that hasn't been visited yet. DFS can be implemented using recursion or with an explicit stack data structure.

DFS has a time complexity of O(V + E), where V is the number of vertices and E is the number of edges in the graph.

It uses O(V) space complexity due to the additional stack storage required.

```kotlin
class Graph(private val numVertices: Int) {
    private val adjacencyList: MutableList<MutableList<Int>> = mutableListOf()

    init {
        for (i in 0 until numVertices) {
            adjacencyList.add(mutableListOf())
        }
    }

    fun addEdge(v: Int, w: Int) {
        adjacencyList[v].add(w)
    }

    private fun dfsUtil(v: Int, visited: BooleanArray) {
        visited[v] = true
        print("$v ")

        for (i in adjacencyList[v]) {
            if (!visited[i]) {
                dfsUtil(i, visited)
            }
        }
    }

    fun dfs(startVertex: Int) {
        val visited = BooleanArray(numVertices)
        dfsUtil(startVertex, visited)
    }
}

fun main() {
    val graph = Graph(4)
    graph.addEdge(0, 1)
    graph.addEdge(0, 2)
    graph.addEdge(1, 2)
    graph.addEdge(2, 0)
    graph.addEdge(2, 3)
    graph.addEdge(3, 3)

    println("Depth First Traversal (starting from vertex 2):")
    graph.dfs(2)
}
```

Breadth-First Search (BFS)

BFS is another graph traversal algorithm that visits all the vertices of a graph in breadthward motion, i.e., it visits all the vertices at the same level before moving on to the next level. BFS starts at a source vertex and visits all its adjacent vertices, then proceeds to visit the adjacent vertices of each visited vertex in the same order. BFS can be implemented using a queue data structure.

BFS has a time complexity of O(V + E), where V is the number of vertices and E is the number of edges in the graph.

It uses O(V) space complexity due to the additional queue storage required.

```kotlin
import java.util.LinkedList
import java.util.Queue

class Graph(private val numVertices: Int) {
    private val adjacencyList: MutableList<MutableList<Int>> = mutableListOf()

    init {
        for (i in 0 until numVertices) {
            adjacencyList.add(mutableListOf())
        }
    }

    fun addEdge(v: Int, w: Int) {
        adjacencyList[v].add(w)
    }

    fun bfs(startVertex: Int) {
        val visited = BooleanArray(numVertices)
        val queue: Queue<Int> = LinkedList()

        visited[startVertex] = true
        queue.add(startVertex)

        while (queue.isNotEmpty()) {
            val vertex = queue.poll()
            print("$vertex ")

            for (i in adjacencyList[vertex]) {
                if (!visited[i]) {
                    visited[i] = true
                    queue.add(i)
                }
            }
        }
    }
}

fun main() {
    val graph = Graph(4)
    graph.addEdge(0, 1)
    graph.addEdge(0, 2)
```

### Shortest path algorithms

Shortest path algorithms are a class of algorithms designed to find the shortest path between two vertices in a graph. These algorithms are essential for various applications, such as routing, network analysis, and resource allocation. There are several shortest path algorithms, each with its own strengths and weaknesses. Here are three popular shortest path algorithms:

- Dijkstra's Algorithm
    
    Dijkstra's Algorithm is a greedy algorithm that finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights. The algorithm maintains a set of unvisited vertices and a tentative distance value for each vertex. It repeatedly selects the vertex with the smallest tentative distance, updates the distances of its neighbors, and marks the vertex as visited. The algorithm terminates when all vertices have been visited or the target vertex is visited.
    
    Time complexity: O(V^2) for the naive implementation, or O((V + E) * log V) when implemented with a priority queue, where V is the number of vertices and E is the number of edges in the graph.
    
    Sample Implementation
    
    ```kotlin
    import java.util.PriorityQueue
    
    data class Edge(val destination: Int, val weight: Int)
    
    data class Vertex(val id: Int, val distance: Int) : Comparable<Vertex> {
        override fun compareTo(other: Vertex): Int = distance.compareTo(other.distance)
    }
    
    fun dijkstra(graph: List<List<Edge>>, source: Int): IntArray {
        val distances = IntArray(graph.size) { Int.MAX_VALUE }
        val visited = BooleanArray(graph.size)
        val pq = PriorityQueue<Vertex>()
    
        distances[source] = 0
        pq.offer(Vertex(source, 0))
    
        while (pq.isNotEmpty()) {
            val currentVertex = pq.poll()
            val currentId = currentVertex.id
    
            if (visited[currentId]) continue
            visited[currentId] = true
    
            for (edge in graph[currentId]) {
                val destination = edge.destination
                val weight = edge.weight
                val newDistance = distances[currentId] + weight
    
                if (newDistance < distances[destination]) {
                    distances[destination] = newDistance
                    pq.offer(Vertex(destination, newDistance))
                }
            }
        }
    
        return distances
    }
    
    fun main() {
        val graph = listOf(
            listOf(Edge(1, 10), Edge(2, 20)), // 0
            listOf(Edge(3, 5)),              // 1
            listOf(Edge(3, 20), Edge(4, 10)),// 2
            listOf(Edge(4, 5)),              // 3
            listOf()                         // 4
        )
    
        val source = 0
        val distances = dijkstra(graph, source)
    
        println("Shortest path distances from vertex $source:")
        for (i in distances.indices) {
            println("Vertex $i: ${distances[i]}")
        }
    }
    ```
    
    In this implementation:
    
    1. We use a data class `Edge` to represent an edge in the graph, with `destination` and `weight` properties.
    2. We use a data class `Vertex` to represent a vertex in the priority queue, with `id` and `distance` properties. The `Vertex` class implements `Comparable<Vertex>` to allow ordering by distance.
    3. The `dijkstra` function takes the adjacency list representation of a graph and a source vertex as input and returns an array of shortest path distances from the source to all other vertices. The function uses a priority queue (pq) to maintain the vertices in ascending order of their shortest path distances.
    4. The main function defines a sample weighted graph and calculates the shortest path distances using the `dijkstra` function.
- Bellman-Ford Algorithm
    
    The Bellman-Ford Algorithm is a dynamic programming-based algorithm that finds the shortest path from a source vertex to all other vertices in a weighted graph, even if the graph contains negative edge weights. However, it does not work if the graph contains negative cycles. The algorithm iteratively relaxes all edges V-1 times, where V is the number of vertices in the graph. After the V-1 iterations, if there are still edges that can be relaxed, then the graph contains a negative cycle.
    
    Time complexity: O(V * E), where V is the number of vertices and E is the number of edges in the graph.
    
- Floyd-Warshall Algorithm
    
    The Floyd-Warshall Algorithm is a dynamic programming-based algorithm that finds the shortest paths between all pairs of vertices in a weighted graph, even if the graph contains negative edge weights. However, it does not work if the graph contains negative cycles. The algorithm works by iteratively updating the shortest path distance matrix using the principle of optimality, which states that the shortest path between two vertices must contain only vertices with indices less than those vertices.
    
    Time complexity: O(V^3), where V is the number of vertices in the graph.
    

### Minimum spanning tree algorithms

Minimum spanning tree (MST) algorithms are a class of algorithms designed to find the minimum spanning tree of an undirected, connected, and weighted graph. A minimum spanning tree is a tree that connects all the vertices in the graph such that the sum of edge weights is minimized, and there are no cycles. There are two popular MST algorithms: Kruskal's Algorithm and Prim's Algorithm.

- Kruskal's Algorithm
    
    Kruskal's Algorithm is a greedy algorithm that works by repeatedly selecting the smallest edge that connects two disjoint sets of vertices. The algorithm starts with an empty set of edges, sorts all the edges by weight, and then iteratively adds the edges with the smallest weights to the MST as long as they don't create a cycle. To check for cycles efficiently, a disjoint-set data structure, also known as a union-find data structure, is used.
    
    Time complexity: O(E * log E) or O(E * log V), where E is the number of edges and V is the number of vertices in the graph. The main contributing factor to the time complexity is the edge sorting step.
    
- Prim's Algorithm
    
    Prim's Algorithm is another greedy algorithm that works by iteratively adding the smallest edge that connects a vertex in the MST to a vertex not yet in the MST. The algorithm starts with an arbitrary vertex, initializes a set of visited vertices, and then repeatedly selects the smallest edge that connects a visited vertex to an unvisited vertex. A priority queue can be used to efficiently select the smallest edge in each iteration.
    
    Time complexity: O(V^2) for the naive implementation, or O((V + E) * log V) when implemented with a priority queue, where V is the number of vertices and E is the number of edges in the graph.
    

### Maximum flow algorithms

Maximum flow algorithms are a class of algorithms designed to find the maximum flow in a flow network. A flow network is a directed graph where each edge has a non-negative capacity, and there are two distinguished vertices: the source (s) and the sink (t). The goal is to push the maximum amount of flow from the source to the sink while respecting the capacity constraints of the edges. There are several maximum flow algorithms, but two of the most popular ones are the Ford-Fulkerson Algorithm and the Edmonds-Karp Algorithm.

- Ford-Fulkerson Algorithm
    
    The Ford-Fulkerson Algorithm is an iterative method that works by finding augmenting paths in the residual graph and augmenting the flow along these paths. The residual graph is a derived graph that represents the remaining capacity of the edges after accounting for the current flow. The algorithm terminates when there are no more augmenting paths in the residual graph. The maximum flow is the sum of the flows in the augmenting paths.
    
    Time complexity
    
    - O(max_flow * E), where max_flow is the value of the maximum flow and E is the number of edges in the graph. In the worst case, the algorithm may take an exponential number of iterations to converge.
- Edmonds-Karp Algorithm
    
    The Edmonds-Karp Algorithm is an implementation of the Ford-Fulkerson Algorithm with a specific rule for selecting the augmenting paths. Instead of choosing arbitrary augmenting paths, the Edmonds-Karp Algorithm selects the shortest augmenting path in terms of the number of edges, which can be found using a Breadth-First Search (BFS) in the residual graph. This rule guarantees that the algorithm converges in a polynomial number of iterations.
    
    Time complexity
    
    - O(V * E^2), where V is the number of vertices and E is the number of edges in the graph. The main contributing factor to the time complexity is the repeated BFS to find the shortest augmenting paths.

### Topological sorting

Topological sorting is an algorithm for linearly ordering the vertices of a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering. Topological sorting has applications in scheduling tasks with dependencies, determining the order of compilation for a set of files, and finding a valid sequence of courses in a curriculum with prerequisites.

There are two common algorithms for topological sorting: the Kahn's Algorithm and the Depth-First Search (DFS) based algorithm.

- Kahn's Algorithm
    
    Kahn's Algorithm works by iteratively removing vertices with no incoming edges (in-degree of zero) and their corresponding outgoing edges from the graph. The algorithm maintains a set or a queue of vertices with no incoming edges, and as vertices are removed, their neighbors may become eligible for removal if their in-degree drops to zero. The algorithm terminates when all vertices have been removed, or a cycle is detected if there are still vertices left with non-zero in-degree.
    
    Time complexity
    
    - O(V + E), where V is the number of vertices and E is the number of edges in the graph.
- Depth-First Search (DFS) based algorithm
    
    The DFS based topological sorting algorithm is a modification of the standard DFS traversal algorithm. It works by performing a DFS traversal on the graph and adding vertices to the topological order as the recursion unwinds. Specifically, a vertex is added to the topological order after all its descendants have been visited. A stack data structure can be used to maintain the topological order during the DFS traversal.
    
    Time complexity
    
    - O(V + E), where V is the number of vertices and E is the number of edges in the graph.

### Traveling Salesman Problem (TSP)

The Traveling Salesman Problem (TSP) is a classic combinatorial optimization problem that asks for the shortest possible route a salesman can take to visit a set of cities exactly once and return to the starting city. The problem can be represented as a complete weighted graph, where cities are vertices, and the edges represent the distances between the cities.

TSP is an NP-hard problem, meaning that there is no known polynomial-time algorithm to solve it optimally for all instances. As the number of cities increases, the number of possible routes grows factorially, making the problem computationally intractable for large instances. Despite its difficulty, TSP has practical applications in logistics, routing, and scheduling, as well as theoretical significance in computer science.

Here are some approaches to solving the Traveling Salesman Problem:

1. Brute Force:
A brute force algorithm would generate and evaluate all possible permutations of the cities, and select the one with the shortest total distance. This approach has a time complexity of O(n!), where n is the number of cities, making it impractical for anything but very small instances.
2. Dynamic Programming:
The Held-Karp Algorithm is a dynamic programming approach to TSP that explores the solution space more efficiently than brute force. It uses memoization to store the shortest path information for subsets of cities, reducing the problem to overlapping subproblems. The time complexity of the Held-Karp Algorithm is O(n^2 * 2^n), which is an improvement over brute force but still exponential.
3. Approximation Algorithms:
Since TSP is NP-hard, approximation algorithms can be used to find near-optimal solutions in polynomial time. The Christofides Algorithm is one such algorithm, which guarantees a solution within 3/2 times the optimal solution. The algorithm builds a minimum spanning tree, finds a minimum-weight perfect matching for the odd-degree vertices, and combines these structures to form a near-optimal Hamiltonian cycle.
4. Heuristics:
Heuristics are problem-specific methods that often provide good solutions in practice but do not guarantee optimality. Examples of TSP heuristics include the Nearest Neighbor, Greedy, and 2-opt algorithms. These heuristics can be further combined with metaheuristic techniques like Simulated Annealing, Tabu Search, and Genetic Algorithms to explore the solution space more effectively.

The choice of the algorithm for solving the Traveling Salesman Problem depends on the problem size and the desired trade-off between solution quality and computation time. For very small instances, brute force or dynamic programming may be feasible, while for larger instances, approximation algorithms and heuristics are more appropriate.

### Dynamic Programming

Dynamic programming (DP) is a powerful problem-solving technique used in algorithm design, which combines recursion and memoization to solve complex problems efficiently. It is particularly useful for solving problems with overlapping subproblems and optimal substructure properties. The main idea of dynamic programming is to break a problem into smaller, overlapping subproblems, solve them, and use their solutions to construct the solution for the original problem.

- Overlapping Subproblems
    
    Overlapping subproblems occur when a problem can be broken down into smaller subproblems, and some of these subproblems are solved multiple times. In such cases, solving the original problem involves repeatedly solving the same smaller instances. Dynamic programming takes advantage of this property by memoizing (caching) the results of subproblems to avoid redundant computations.
    
    Naive recursive implementation without memoization
    
    ```kotlin
    fun fibonacci(n: Int): Int {
        if (n <= 1) {
            return n
        }
        return fibonacci(n - 1) + fibonacci(n - 2)
    }
    
    fun main() {
        val n = 10
        println("Fibonacci number at position $n is: ${fibonacci(n)}")
    }
    ```
    
    In the naive implementation, there are many overlapping subproblems, as the same Fibonacci numbers are computed multiple times. For example, to compute fibonacci(5), fibonacci(3) and fibonacci(4) are calculated, both of which require the calculation of fibonacci(2).
    
    Now let's optimize the Fibonacci calculation using dynamic programming and memoization to handle overlapping subproblems:
    
    Top-down approach (Memoization):
    
    ```kotlin
    val memo = mutableMapOf<Int, Int>()
    
    fun fibonacciMemo(n: Int): Int {
        if (n <= 1) {
            return n
        }
        // Return memoized result if available
        memo[n]?.let { return it }
    
        // Otherwise, compute and memoize the result
        val result = fibonacciMemo(n - 1) + fibonacciMemo(n - 2)
        memo[n] = result
        return result
    }
    
    fun main() {
        val n = 10
        println("Fibonacci number at position $n is: ${fibonacciMemo(n)}")
    }
    ```
    
     
    
    In the memoized implementation, we store the results of subproblems in a map (memo). When a subproblem is encountered again, its memoized result is used instead of recomputing it. This approach significantly reduces the time complexity of the algorithm.
    
    The above example demonstrates how dynamic programming can be applied to a problem with overlapping subproblems. By memoizing the results of subproblems, the algorithm avoids redundant computations and improves its efficiency.
    
- Optimal Substructure
    
    Optimal substructure is a property of a problem that states that an optimal solution to the problem can be constructed from optimal solutions of its subproblems. In other words, if a problem has an optimal substructure, solving it optimally involves combining optimal solutions to smaller instances of the same problem.
    
    Here's a Kotlin example illustrating optimal substructure using the problem of finding the longest increasing subsequence (LIS) in an array of integers:
    
    The problem: Given an unsorted array of integers, find the length of the longest strictly increasing subsequence.
    
    This problem exhibits optimal substructure because the longest increasing subsequence ending at position i can be determined by considering the optimal solutions of the subproblems ending at positions 0, 1, ..., i-1.
    
    Let's implement the dynamic programming solution for this problem using the bottom-up approach (Tabulation):
    
    ```kotlin
    fun longestIncreasingSubsequence(arr: IntArray): Int {
        val n = arr.size
        val lis = IntArray(n) { 1 } // Initialize LIS values for all indices
    
        // Compute LIS values in bottom-up manner
        for (i in 1 until n) {
            for (j in 0 until i) {
                if (arr[i] > arr[j] && lis[i] < lis[j] + 1) {
                    lis[i] = lis[j] + 1
                }
            }
        }
    
        // Find and return the maximum LIS value
        return lis.maxOrNull() ?: 0
    }
    
    fun main() {
        val arr = intArrayOf(10, 22, 9, 33, 21, 50, 41, 60, 80)
        println("Length of longest increasing subsequence is: ${longestIncreasingSubsequence(arr)}")
    }
    ```
    
    In the above implementation, we create an array (lis) to store the longest increasing subsequence values for each index. We then use a nested loop to compute the LIS values in a bottom-up manner by considering the optimal solutions of the subproblems (previous indices). Finally, we find and return the maximum LIS value.
    
    The solution leverages the optimal substructure property, as the longest increasing subsequence for each index is built using the optimal solutions of smaller subproblems. The time complexity of this algorithm is O(n^2), where n is the number of elements in the input array.
    
- Bottom-up Approach (Tabulation)
    
    The bottom-up approach is a dynamic programming technique that solves a problem iteratively, starting with the smallest subproblems and working towards the original problem. The solutions to subproblems are stored in a table (hence the name "tabulation"), and these results are used to solve larger subproblems. This approach is typically more efficient in terms of time complexity, as it solves subproblems in a natural order without the overhead of recursion.
    
    Here's a Kotlin example illustrating the bottom-up approach using the problem of calculating the n-th Fibonacci number:
    
    ```kotlin
    fun fibonacciBottomUp(n: Int): Int {
        if (n <= 1) {
            return n
        }
    
        val fib = IntArray(n + 1)
        fib[0] = 0
        fib[1] = 1
    
        // Compute Fibonacci numbers in bottom-up manner
        for (i in 2..n) {
            fib[i] = fib[i - 1] + fib[i - 2]
        }
    
        return fib[n]
    }
    
    fun main() {
        val n = 10
        println("Fibonacci number at position $n is: ${fibonacciBottomUp(n)}")
    }
    ```
    
    In the above implementation, we create an array (fib) to store the Fibonacci numbers for each index. We initialize the first two Fibonacci numbers (0 and 1) and then use a loop to compute the Fibonacci numbers in a bottom-up manner by iterating from index 2 to n. This approach is more efficient than the recursive implementation, as it eliminates the overhead of recursion and solves subproblems in a natural order.
    
    The bottom-up approach is well-suited for problems with overlapping subproblems and optimal substructure properties. By solving subproblems iteratively and storing their solutions, the bottom-up approach can efficiently solve complex problems that would otherwise be computationally intractable using naive recursive methods.
    
- Top-down Approach (Memoization)
    
    The top-down approach, also known as memoization, is a dynamic programming technique that solves a problem using recursion, starting with the original problem and breaking it down into smaller subproblems. The solutions to subproblems are memoized (cached) in a data structure, such as a dictionary or an array, to avoid redundant computations. When a subproblem is encountered again, its memoized solution is used instead of recomputing it. This approach is more intuitive and easier to implement but can have higher space complexity due to the overhead of recursion.
    
    Here's a Kotlin example illustrating the top-down approach using the problem of calculating the n-th Fibonacci number:
    
    ```kotlin
    val memo = mutableMapOf<Int, Int>()
    
    fun fibonacciTopDown(n: Int): Int {
        if (n <= 1) {
            return n
        }
    
        // Return memoized result if available
        memo[n]?.let { return it }
    
        // Otherwise, compute and memoize the result
        val result = fibonacciTopDown(n - 1) + fibonacciTopDown(n - 2)
        memo[n] = result
        return result
    }
    
    fun main() {
        val n = 10
        println("Fibonacci number at position $n is: ${fibonacciTopDown(n)}")
    }
    ```
    
    In the top-down implementation, we use a map (memo) to store the results of subproblems. We then use a recursive function (fibonacciTopDown) to calculate the Fibonacci numbers. If the result of a subproblem is available in the memo, we use it instead of recomputing it. This approach reduces the time complexity of the algorithm by avoiding redundant computations.
    
    The top-down approach is suitable for problems with overlapping subproblems and optimal substructure properties. By memoizing the results of subproblems and using recursion, the top-down approach can efficiently solve complex problems that would otherwise be computationally intractable using naive methods. However, the overhead of recursion can lead to higher space complexity compared to the bottom-up approach.