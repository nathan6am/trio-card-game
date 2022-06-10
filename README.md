# Trio Card Game

This is the front-end repository for this project. The server repository is available [here](https://github.com.nathan6am/trio-server)

## About this project

This project is a real-time card came base on one of my favorite childhood games

A live deployment of the app is available [here](https://trio-card-game.vercel.app)

I have not yet implemented cookies.session so the multiplayer functionality can be tested in multiple tabs or browser windows, but all state and the socket connection is lost on refresh.

## State Management

The majority of the state management is done using redux, including the menu navigation, game state for both single player and multiplayer, lobby information, and app wide settings like volume and theme. The websocket connection is stored in a custom useContext hook. 



## Game Logic

Currently the Single player version of the game runs on a client side version of the game logic 

## Planned Improvements
