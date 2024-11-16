const axios = require('axios');

const API_URL = 'https://v6.exchangerate-api.com/v6/4b8e0ba6dda391fe0f864bf5/latest/USD';

let cachedRates = null;
let lastFetched = 0;

const getExchangeRates = async () => {
    const now = Date.now();
    if (!cachedRates || now - lastFetched > 600000) {
        try {
            const response = await axios.get(API_URL);
            cachedRates = response.data.conversion_rates;
            lastFetched = now;
            console.log('Exchange Rates Updated');
        } catch (error) {
            console.error('Fetching Error', error);
            return null;
        }
    }
    return cachedRates;
};

module.exports = { getExchangeRates };
