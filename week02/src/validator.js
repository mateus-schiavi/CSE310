const validateRequest = (amount, fromCurrency, toCurrency) => {
    if (!amount || isNaN(amount) || amount <= 0) {
        return 'Invalid Value';
    }
    if (!fromCurrency || !toCurrency) {
        return 'Source and destination currency are mandatory';
    }
    return null;
};

module.exports = { validateRequest };