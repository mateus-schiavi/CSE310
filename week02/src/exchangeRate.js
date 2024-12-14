const axios = require('axios');

// The API URL to fetch the exchange rates, using USD as the base currency
const API_URL = 'https://v6.exchangerate-api.com/v6/4b8e0ba6dda391fe0f864bf5/latest/USD';

// Variable to store the cached exchange rates
let cachedRates = null;

// Variable to store the last time the exchange rates were fetched (in milliseconds)
let lastFetched = 0;

// Function to get exchange rates with recursion for retrying failed requests
const getExchangeRates = async (retryCount = 3) => {
    const now = Date.now(); // Get the current time

    // Check if the rates are not cached or if they were fetched more than 10 minutes ago (600000 ms)
    if (!cachedRates || now - lastFetched > 600000) {
        try {
            // Make a GET request to fetch the latest exchange rates from the API
            const response = await axios.get(API_URL);

            // Store the conversion rates from the response
            cachedRates = response.data.conversion_rates;

            // Update the timestamp of the last fetch
            lastFetched = now;

            console.log('Exchange Rates Updated'); // Log to indicate that rates were updated
        } catch (error) {
            // Log an error if the fetch operation fails
            console.error('Fetching Error', error);

            // Retry logic: If retry count is greater than 0, call the function recursively
            if (retryCount > 0) {
                console.log(`Retrying... attempts left: ${retryCount}`);
                return getExchangeRates(retryCount - 1);  // Recursively retry the request
            } else {
                // Return null if maximum retries have been reached
                console.error('Max retries reached. Could not fetch exchange rates.');
                return null;
            }
        }
    }

    // Return the cached rates
    return cachedRates;
};

// Export the function so it can be used in other modules
module.exports = { getExchangeRates };
