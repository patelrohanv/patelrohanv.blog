---
slug: practice-problem-balanced-brackets
title: "easy: balanced brackets"
date: 2022-07-10T15:50:06.306Z
author: rohan
summary: checking if a list of parenthesis, brackets, and braces is balanced
tags: [software-dev, practice-problems]
---
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

##### using only a stack

```python
stack = []

for _, v in enumerate(s):
    # return False if the char is a closing bracket and the list is empty
    if (v == ')' or v == ']' or v == '}') and not stack:
        return False
    # if open bracket, add to stack
    elif v == '(' or v == '[' or v == '{':
        stack.append(v)
    # if ) and the top of the stack is (, pop
    elif v == ')' and stack[-1] == '(':
        stack.pop()
    # if ] and the top of the stack is [, pop
    elif v == ']' and stack[-1] == '[':
        stack.pop()
    # if } and the top of the stack is {, pop
    elif v == '}' and stack[-1] == '{':
        stack.pop()
    # otherwise return false
    else:
        return False

# safeguard against s being all open brackets
return not stack
```

##### using a stack and map

```python
stack = []
bracketMap = {')': '(', ']': '[', '}': '{'}

for _, v in enumerate(s):
    # return False if the char is a closing bracket and the list is empty
    if v in bracketMap and not stack:
        return False
    # if open bracket, add to stack
    elif v not in bracketMap:
        stack.append(v)
    # if ) and the top of the stack is (, pop
    elif stack[-1] == bracketMap[v]:
        stack.pop()
    # otherwise return false
    else:
        return False

# safeguard against s being all open brackets
return not stack
```