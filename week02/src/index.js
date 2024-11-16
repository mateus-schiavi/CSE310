const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const { getExchangeRates } = require('./exchangeRate');
const { validateRequest } = require('./validator');
const app = express();

// Middleware to process POST requests with JSON
app.use(express.json());
const PORT = 5000;
// Configure the server to serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, '../public')));

app.post('/convert', async (req, res) => {
    let { amount, fromCurrency, toCurrency } = req.body;

    // Check if the value is passed as a string with a comma and convert it to a dot
    if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(',', '.'));
    }

    // Validate parameters (checking if it's a numeric and valid value)
    const error = validateRequest(amount, fromCurrency, toCurrency);
    if (error) {
        return res.status(400).json({ error });
    }

    try {
        const rates = await getExchangeRates();

        if (!rates) {
            return res.status(500).json({ error: 'Error fetching exchange rates' });
        }

        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];

        if (fromRate && toRate) {
            // Convert the amount according to the exchange rates
            const convertedAmount = (amount / fromRate) * toRate;
            return res.json({
                convertedAmount: convertedAmount.toFixed(2), // Format to 2 decimal places
                fromCurrency,
                toCurrency
            });
        } else {
            return res.status(400).json({ error: 'Invalid currency code' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
