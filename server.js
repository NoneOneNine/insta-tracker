const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Secret verify token (replace with your actual token)
const VERIFY_TOKEN = "my_secret_verify_token_123";  

// Webhook verification (GET request)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === VERIFY_TOKEN) {
        console.log("Webhook verified successfully!");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Webhook event listener (POST request)
app.post('/webhook', (req, res) => {
    console.log('Webhook event received:', req.body);
    res.sendStatus(200); // Respond OK
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
