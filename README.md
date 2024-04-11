# devcation_hackHers
# Devcation - Financial Planning and Investment Analysis Tool

## Overview

Your Financial Advisor financial Planner - planning and investment analysis tool designed to help users make informed decisions about their finances. Whether you're saving for retirement, planning for major expenses, or looking to grow your wealth through investments, Devcation provides valuable insights and recommendations tailored to your financial goals and circumstances.

## Features

- **User Registration**: Users can create an account to access personalized financial analysis and recommendations.
- **Landing Page**: Where informative videos can be found for educational purposes.
- **Data Input Form**: An interactive form allows users to input their financial information, including income, expenses, savings goals, and investment preferences.
- **Investment Analysis**: Devcation analyzes user input to generate investment recommendations and suggests suitable financial schemes and policies.
- **Suggested Investment Schemes**: Based on the user's financial goals and risk profile, Devcation presents suggested investment schemes with estimated returns and monthly investment amounts.
- **Budget Tracker**: Registered users have access to a this tool, which takes in their expenses and cash inflow, and keeps a track of total inflow, outflow, balance and recent expenditures

## Installation

To run Devcation locally, follow these steps:

1. Clone this repository to your local machine.
2. Install Node.js and npm if you haven't already.
3. Navigate to the project directory in your terminal.
4. Run `npm install` to install dependencies.
5. Start the server by running `node server.js`.
6. Access the application in your web browser at `http://localhost:3000`.

## Usage

1. Register or log in to your Advisor account.
2. Fill out the financial data input form with accurate information.
3. Submit the form to receive personalized investment recommendations.
4. Explore the suggested investment schemes and policies.
5. Track your progress and manage your financial goals through the budget tracker.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **HTML/CSS/JavaScript**: Frontend development technologies.
- **bcrypt**: Library for password hashing and encryption.
- **fetch API**: JavaScript interface for making HTTP requests.

## File Structure

```
my_project/
│
├── public/                  # Static files accessible to clients
│   ├── plans.html           # HTML file for displaying investment plans
│   ├── form.html            # HTML file for user data input form
│   ├── suggestedScheme.js   # JavaScript file for investment analysis
│   ├── styles.css           # CSS file for styling
│   └── ...                   # Other assets and resources
│
├── analysis.js              # Router for handling financial analysis requests
├── models/                  # MongoDB data models
│   └── user.js              # User model for storing user data
│
├── node_modules/            # Dependencies installed via npm
│
├── server.js                # Main entry point for the Node.js server
├── package.json             # Project configuration and dependencies
└── README.md                # Project documentation and instructions
```

