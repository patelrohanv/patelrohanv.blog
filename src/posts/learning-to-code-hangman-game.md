---
title: "Learning to Code: Hangman Game"
date: 2023-03-23T14:01:35.458Z
summary: practice problem to make a game of hangman in Python
tags:
  - learn-to-code
---
# Assignment: Hangman Game
## Overview
In this assignment, you will build a simple command line version of the Hangman game using Python. The game will randomly select a word from a list and the user will have to guess the letters in the word before running out of guesses.

## Objectives
By the end of this assignment, you will be able to:

- Use Python's built-in data structures to store and manipulate data
- Create loops and conditional statements to control program flow
- Use functions to modularize their code and make it more reusable

## Starter Code
```python
import random

# List of words to choose from
words = ["python", "programming", "code", "computer", "hangman", "player", "apple"]

# Select a random word from the list
word = random.choice(words)

# Create an empty list to store the user's guesses
guesses = []

# Set the number of allowed guesses
max_guesses = 6

# Loop until the user runs out of guesses or guesses the word
while max_guesses > 0:
    # Print the current state of the word
    for letter in word:
        if letter in guesses:
            print(letter, end=" ")
        else:
            print("_", end=" ")
    print("\n")
    
    # Get the user's guess
    guess = input("Guess a letter: ")
    
    # Check if the guess is correct
    if guess in word:
        print("Correct!")
        guesses.append(guess)
    else:
        print("Incorrect!")
        max_guesses -= 1
    
    # Check if the user has guessed the whole word
    if set(word) == set(guesses):
        print("You win!")
        break
    
    # Check if the user has run out of guesses
    if max_guesses == 0:
        print("You lose! The word was", word)

```

## Instructions
1. Run the starter code and test out the game to make sure they understand how it works.
2. Modify the code to display a different message when the user wins or loses the game.
3. Modify the code to allow the user to guess the whole word instead of just individual letters.
4. Add error handling to the game to prevent the user from guessing the same letter twice.
5. Add error handling to the game to prevent the user from inputting a non-letter character.
6. Modularize the code by creating functions for each of the major parts of the game (e.g. selecting a random word, getting user input, checking if a guess is correct).
7. Modify the code to allow the user to play multiple games in a row.
8. Modify the code to allow users to input their own dictionary of words to play with.
9. Add comments to your code to explain what each part does.
10. Test your game thoroughly and make sure it works as expected.
