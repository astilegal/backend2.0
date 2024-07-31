const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection string from environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for the view count
const viewSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});
const View = mongoose.model('View', viewSchema);

// Enable CORS
app.use(cors());

// Endpoint to increment the view count
app.get('/increment', async (req, res) => {
    try {
        let view = await View.findOne();
        if (!view) {
            view = new View();
        }
        view.count += 1;
        await view.save();
        res.send('View count incremented');
    } catch (err) {
        console.error('Error incrementing view count:', err);
        res.status(500).send('Error incrementing view count');
    }
});

// Endpoint to get the current view count
app.get('/count', async (req, res) => {
    try {
        const view = await View.findOne();
        res.json({ count: view ? view.count : 0 });
    } catch (err) {
        console.error('Error getting view count:', err);
        res.status(500).send('Error getting view count');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
