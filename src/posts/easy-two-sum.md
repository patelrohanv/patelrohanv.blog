---
slug: practice-problem-two-sum
title: "easy: two sum"
date: 2022-07-09T17:17:30.383Z
author: rohan
summary: "two sum - finding integer pairs that when added equal a target "
tags: [software-dev, practice-problems]
---
#### Problem:

Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.

Each input has ***exactly* one solution**, and you may not use the *same* element twice.



##### brute force - O(n<sup>2</sup>) time

```python
for i in range(len(nums)):
    # loop through i+1 -> end of the array
    for j in range(i+1, len(nums)):
        if nums[i] == (target - nums[j]):
            return [i,j]

# fail case   
return [-1, -1]
```

##### O(n) space, O(n) time - 2 passes

```python
numsMap = {}

# loop through list and add value:index to map  
for i in range(len(nums)):
    numsMap[nums[i]] = i

# loop through list again to find pair
for i in range(len(nums)):
    difference = target - nums[i]

    # check if the difference is in the map
    if difference in numsMap and (numsMap[difference] != i):
        return [numsMap[difference], i]
      
# fail case    
return [-1, -1]
```

##### O(n) space and time - 1 pass

```python
numsMap = {}

#enumerate through indexes and values in nums
for i, v in enumerate(nums):
    difference = target - v

    # check if the difference is in the map
    if difference in numsMap:
        return [numsMap[difference], i]

    # add value:index to map 
    numsMap[v] = i

# fail case    
return [-1, -1]
```