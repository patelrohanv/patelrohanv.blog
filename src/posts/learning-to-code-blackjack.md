---
title: "Learning to Code: Blackjack"
date: 2023-03-23T14:03:56.877Z
summary: practice problem to make a game of blackjack in Python
tags:
  - learn-to-code
---
# Assignment: Blackjack Game
## Description
In this assignment, you will create a simple command-line Blackjack game using Python. The game will be played between the player and the dealer, and the goal is to get as close to 21 points as possible without going over. The game will include the ability to hit or stand, and the dealer will follow a set of rules for their actions.

## Requirements
- The game should start by shuffling a deck of cards and dealing two cards to the player and two cards to the dealer.
- The player's cards should be displayed, and the value of the cards should be added up and displayed.
- The dealer's cards should be displayed, but only one card should be visible to the player.
- The player should have the option to hit or stand. If the player chooses to hit, they will be dealt another card, and the value of their cards should be re-calculated and displayed.
- If the player's total goes over 21 points, they lose the game.
If the player chooses to stand, the dealer will reveal their second card and continue to hit until their total is 17 or higher.
- If the dealer's total goes over 21 points, the player wins the game.
- If neither the player nor the dealer goes over 21 points, the winner is the one with the higher score.
- The game should include error handling for invalid input and should allow the player to play again or quit the game.
- 
## Starter Code
```python
import random

# Define the deck of cards
deck = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"] * 4

# Define the values of the cards
values = {"2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10, "A": 11}

# Define the player's and dealer's hands
player_hand = []
dealer_hand = []

# Define a function to deal a card
def deal_card(hand):
    card = random.choice(deck)
    hand.append(card)
    deck.remove(card)

# Define a function to calculate the total value of a hand
def calculate_total(hand):
    total = 0
    for card in hand:
        total += values[card]
    return total

# Shuffle the deck and deal the cards
random.shuffle(deck)
deal_card(player_hand)
deal_card(dealer_hand)
deal_card(player_hand)
deal_card(dealer_hand[:1])

# Show the initial hands
print("Player's hand:", player_hand)
print("Total:", calculate_total(player_hand))
print("Dealer's hand:", dealer_hand[:1])

# Get the player's choice
while True:
    choice = input("Do you want to hit or stand? ")
    if choice.lower() not in ["hit", "stand"]:
        print("Invalid choice! Please choose 'hit' or 'stand'.")
    else:
        break

# Hit or stand
while choice.lower() == "hit":
    deal_card(player_hand)
    print("Player's hand:", player_hand)
    total = calculate_total(player_hand)
    print("Total:", total)
    if total > 21:
        print("Bust! You lose.")
        break
   
```