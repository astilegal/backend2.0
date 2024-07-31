const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import CORS

const app = express();
const port = process.env.PORT || 3000;
const counterFile = path.join(__dirname, 'views.json');

// Initialize view count file if it doesn't exist
if (!fs.existsSync(counterFile)) {
    fs.writeFileSync(counterFile, JSON.stringify({ count: 0 }));
}

// Enable CORS
app.use(cors());

// Endpoint to increment the view count
app.get('/increment', (req, res) => {
    let data = JSON.parse(fs.readFileSync(counterFile));
    data.count += 1;
    fs.writeFileSync(counterFile, JSON.stringify(data));
    res.send('View count incremented');
});

// Endpoint to get the current view count
app.get('/count', (req, res) => {
    let data = JSON.parse(fs.readFileSync(counterFile));
    res.json({ count: data.count });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
