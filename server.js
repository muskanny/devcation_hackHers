const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Import the User model
const analysis = require('./analysis'); // Import the analysis router

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/devcation', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

    
app.post('/login', async (req, res) => {
  // Extract username/email and password from request body
  const { usernameOrEmail, password } = req.body;

  try {
      // Find user by username or email
      const user = await User.findOne({ $or: [ { email: usernameOrEmail }] });

      // If user not found, return error
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If password doesn't match, return error
      if (!passwordMatch) {
          return res.status(400).json({ message: 'Incorrect password' });
      }

      // Login successful, return success message or user data
      res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Registration route
app.post('/register', async (req, res) => {
  // Extract data from request body
  const {  email, password } = req.body;

  try {
      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ password }, { email }] });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      // Inside the registration route handler in app.js
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      console.log('New user created:', newUser); // Log the newly created user
      res.status(201).json({ message: 'Registration successful' });


      // Registration successful, return success message
      res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.use('/analysis', analysis);
// Start the server
//PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
