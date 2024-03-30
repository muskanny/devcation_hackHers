const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'budget_app',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Budget App API!');
});

// User registration
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    connection.query(checkUserQuery, [username], async (error, results) => {
      if (error) {
        console.error('Error checking user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user into the database
      const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
      connection.query(insertUserQuery, [username, hashedPassword], (error, results) => {
        if (error) {
          console.error('Error registering user:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve user from the database
    const getUserQuery = 'SELECT * FROM users WHERE username = ?';
    connection.query(getUserQuery, [username], async (error, results) => {
      if (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const user = results[0];

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate JWT
      const token = jwt.sign({ username: user.username }, 'your_secret_key_here');

      res.status(200).json({ token });
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add budget data
app.post('/add-budget', (req, res) => {
  try {
    const { description, amount, inflow, outflow, balance } = req.body;
    const username = req.user.username; // Assuming you have middleware to extract user from JWT

    // Insert budget data into the database
    const addBudgetQuery = 'INSERT INTO budget (username, description, amount, inflow, outflow, balance) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(addBudgetQuery, [username, description, amount, inflow, outflow, balance], (error, results) => {
      if (error) {
        console.error('Error adding budget data:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json({ message: 'Budget data added successfully' });
    });
  } catch (error) {
    console.error('Error adding budget data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
