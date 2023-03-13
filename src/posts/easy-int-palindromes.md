---
slug: practice-problem-palindromes
title: "easy: int palindromes "
date: 2022-07-09T16:29:32.741Z
author: rohan
summary: checking if an integer's a palindrome (python)
tags: [software-dev, practice-problems]
---
#### Problem:

Given an integer `x`, return `true` if `x` is palindrome integer.

An integer is a **palindrome** when it reads the same backward as forward.

##### using strings

```python
num = str(x)
head = 0
tail = len(num) - 1

while head < tail:
    # return false if the values at head and tail don't match
    if num[head] != num[tail]:
        return False

    # increment head, decrement tail
    head += 1
    tail -= 1

return True
```

##### without using strings

```python
# return false if negative
if x < 0:
    return False

# return True if zero
if x == 0:
    return True

# return false if multiple of 10, ends in 0
if x % 10 == 0:
    return False

# store the original and initialize the inverse
original = x
inverse = 0

while x > 0:
    inverse = (inverse * 10) + (x % 10)
    x //= 10

return original == inverse

```