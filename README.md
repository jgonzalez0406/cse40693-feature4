# Personal Finance Tracker

This application allows users to keep track of their spending habits. Users can input their expenses for a given day, how much was spent on that expense, and what category it is. The app will then create a graph and summary based on the spending over the course of the app and also for the given month.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation
In order to run our application, you will need the following packages installed.
- npm
- react
- parse
- react-dom
- react-router-dom
- react-chartjs-2
- chart.js
- jspdf
- bootstrap
- react-bootstrap

You can then run the application with the command
npm run dev

## Usage
To be able to use our application's features, you will need to register or login to an account. Without doing so, you will not be able to access the Add Expense or Dashboard page. When logged in, you can add an expense by entering the date you made the purchase, how much it was, what category it falls under, and the name of the expense. This expense will be added to a database and will show up in the Expense List at the bottom of the page. You can filter expenses by name, cost, date, and category. On the Dashboard page, a graph and summary will be created based on the current information in the database. 

## Features
- Register / Login / Logout
- Light / Dark Mode
- Add Expense to Database
- Filter Expenses
- Generated Summary and Graph based on Expenses
- Ability to Export Summary



