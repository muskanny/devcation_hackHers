const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB (analysis database)
mongoose.connect('mongodb://localhost:27017/analysis', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected for analysis'))
    .catch(err => console.error(err));

// Define Mongoose Schema for Analysis Data
const analysisSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    address: String,
    income: Number,
    expenses: Number,
    householdChores: [String], // Array of household chores
    goals: [String] // Array of goals
});

// Create Mongoose Model
const AnalysisData = mongoose.model('AnalysisData', analysisSchema);

// Handle Form Data Submission
router.post('/submitAnalysisData', async (req, res) => {
    const formData = req.body;

    try {
        // Create new document using the AnalysisData model
        const newAnalysisData = new AnalysisData(formData);

        // Save the data to the database
        await newAnalysisData.save();

        res.status(201).json({ message: 'Form data submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;
