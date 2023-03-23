---
title: "Learning to Code: Rock, Paper, Scissors"
date: 2023-03-23T14:00:11.577Z
summary: practice problem to make a game of rock, paper, scissors in Python
tags:
  - learn-to-code
---
# Assignment: Rock, Paper, Scissors - Part 1

## Overview
In this assignment, you will build a simple command line version of the rock, paper, scissors game using Python. The game will allow the user to play against the computer and will keep track of the user's score. The game will follow the traditional rules, where rock beats scissors, scissors beat paper, and paper beats rock.

## Objectives
By the end of this assignment, you will be able to:

- Use conditional statements to control program flow
- Use loops to create repeating structures
- Use Python's built-in random module to generate random numbers
- Use Python's built-in input() function to accept user input

## Instructions
1. Rules of the game:
   - Rock beats scissors
   - Scissors beat paper
   - Paper beats rock
2. create a Python script that allows the user to play against the computer.
3. The script should start by printing out the current score (which should start at 0 for both the player and the computer).
4. The script should then prompt the user to enter their choice (rock, paper, or scissors) using the input() function.
5. After the user has entered their choice, the script should randomly generate the computer's choice.
6. The script should then compare the player's choice to the computer's choice and determine the winner based on the rules of the game.
7. If the player wins, the script should print a message saying that the player won and update the score accordingly.
8. If the computer wins, the script should print a message saying that the computer won and update the score accordingly.
9. If it's a tie, the script should print a message saying that it's a tie and not update the score.
10. The script should then repeat steps 3-9 until the player decides to quit the game.
11. If the player quits the game, the script should print out the final score and exit.

## Starter Code
```python
import random

score = {"player": 0, "computer": 0}

while True:
    print("Score: Player", score["player"], "Computer", score["computer"])
    player_choice = input("Enter your choice (rock/paper/scissors): ")
    
    if player_choice == "quit":
        break
    
    computer_choice = random.choice(["rock", "paper", "scissors"])
    
    print("Player:", player_choice)
    print("Computer:", computer_choice)
    
    if (player_choice == "rock" and computer_choice == "scissors") or (player_choice == "scissors" and computer_choice == "paper") or (player_choice == "paper" and computer_choice == "rock"):
        print("You win!")
        score["player"] += 1
    elif (computer_choice == "rock" and player_choice == "scissors") or (computer_choice == "scissors" and player_choice == "paper") or (computer_choice == "paper" and player_choice == "rock"):
        print("You lose!")
        score["computer"] += 1
    else:
        print("It's a tie!")
```
## Challenge
- Allow the player to choose how many rounds they want to play and keep track of the score across multiple rounds.
- Allow the player to choose whether they want to play against the computer

# Assignment: Rock, Paper, Scissors - Part 2

## Overview
In this assignment, you will build a simple command line version of the rock, paper, scissors game using Python. The game will allow the user to play against the computer and will keep track of the user's score.

## Objectives
By the end of this assignment, you will be able to:

- Use conditional statements to control program flow
- Use loops to create repeating structures
- Use Python's built-in random module to generate random numbers
- Use Python's built-in input() function to accept user input

## Starter Code
```python
import random

# Define the game rules
rules = {
    "rock": {"scissors": "wins", "paper": "loses", "rock": "ties"},
    "paper": {"rock": "wins", "scissors": "loses", "paper": "ties"},
    "scissors": {"paper": "wins", "rock": "loses", "scissors": "ties"}
}

# Set the initial score to zero
score = {"player": 0, "computer": 0}

# Loop until the player decides to quit
while True:
    # Print the current score
    print("Score: Player", score["player"], "Computer", score["computer"])
    
    # Get the player's choice
    player_choice = input("Enter your choice (rock/paper/scissors): ")
    
    # Check if the player wants to quit
    if player_choice == "quit":
        break
    
    # Check if the player's choice is valid
    if player_choice not in rules:
        print("Invalid choice!")
        continue
    
    # Generate the computer's choice
    computer_choice = random.choice(list(rules.keys()))
    
    # Print the choices
    print("Player:", player_choice)
    print("Computer:", computer_choice)
    
    # Determine the winner
    result = rules[player_choice][computer_choice]
    
    # Print the result and update the score
    if result == "wins":
        print("You win!")
        score["player"] += 1
    elif result == "loses":
        print("You lose!")
        score["computer"] += 1
    else:
        print("It's a tie!")
```
## Instructions
1. Run the starter code and test out the game to make sure they understand how it works.
2. Modify the code to add error handling for cases where the user inputs an invalid choice.
3. Modify the code to allow the player to quit the game by typing "quit".
4. Modify the code to allow the player to choose how many rounds they want to play and keep track of the score across multiple rounds.
5. Modify the code to allow the player to choose whether they want to play against the computer or against another player.
6. Modularize the code by creating separate functions for each major part of the game (e.g. getting user input, generating the computer's choice, determining the winner).