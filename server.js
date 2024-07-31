const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const counterFile = path.join(__dirname, 'views.json');

// Initialize view count file if it doesn't exist
if (!fs.existsSync(counterFile)) {
    fs.writeFileSync(counterFile, JSON.stringify({ count: 0 }));
}

app.get('/increment', (req, res) => {
    let data = JSON.parse(fs.readFileSync(counterFile));
    data.count += 1;
    fs.writeFileSync(counterFile, JSON.stringify(data));
    res.send('View count incremented');
});

app.get('/count', (req, res) => {
    let data = JSON.parse(fs.readFileSync(counterFile));
    res.json({ count: data.count });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
