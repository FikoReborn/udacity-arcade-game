# Frogger Arcade Game Clone

## Table of Contents

* [About this Project](#about-this-project)
* [How to Run this Game](#how-to-run-this-game)
* [Instructions](#instructions)
* [Dependencies](#dependencies)
* [Contributing](#contributing)

## About this Project
Remember the retro game Frogger? This is inspired by that game, with different sprites.  This project is part of the Udacity Front-End Development Nanodegree. Sprites are provided by Udacity, sounds are royalty free from freesound.org.

The base code provided a function to control the player via use of the directional keys on your keyboard, but in an attempt to make it mobile-friendly, I have implemented a mouse click listener, so you can either use the mouse or the touch screen on a mobile device. 

Overall, I had a ton of fun working on this!

## How to Run this Game
Just click [here](http://fikoreborn.github.io/udacity-arcade-game) and the game will load up. Choose your character, and use the directional keys on the keyboard to move the player, or use your mouse or touchscreen.  If you run out of lives, clicking "Play Again" will bring you back to the character select screen and all information will reset.

## Instructions

  The game is pretty simple. After you choose your character, your objective is to just get to the water on the other end of the map.  You can collect items that randomly appear on the board after your first turn. You start with 3 lives (hearts on top right of the screen), and you can obtain a maximum of 5 hearts. If you are hit by an enemy, you will be brought back to your starting position and your lives will decrease by 1. When you have no hearts left, you are on your last turn and it is game over if you are hit after that point. 

  If you reach the water, you will also reset to your starting position, but your lives will remain unchanged and you will gain 500 points. Points are displayed on the top left of the screen. Enemy speed will increase marginally each turn until they reach a predetermined cap (for balancing purposes). 

  Below are bonuses for items obtained:

  - **Orange Gem**: 1000 points
  - **Blue Gem**: 2000 points
  - **Green Gem**: 3000 points
  - **Star**: Resets all items on screen (you probably want to get this one last)
  - **Rock**: LOSE 3000 points (you probably want to avoid this)
  - **Heart**: Replenish 1 life

## Dependencies

- **css/**
    - **style.css** - Styles for game page.
- **img/** - Folder holding the images used for game.
- **js/**
    - **app.js** - Javascript file for app - this is where most of my code resides.
    - **engine.js** - Game engine - Mostly untouched but I added a few small things.
    - **resources.js** - Image loading file, I haven't touched this at all.
- **sounds** - Folder holding the sounds used for the game.
- **index.html** - HTML file used to run the game

## Contributing

This is just a project right now, so until it is reviewed, I will not be accepting any pull requests. 