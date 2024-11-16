const form = document.getElementById('converter-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Get the values entered by the user and replace the comma with a dot
    const amountInput = document.getElementById('amount').value;
    const amount = parseFloat(amountInput.replace(',', '.')); // Replaces comma with dot before converting

    const fromCurrency = document.getElementById('fromCurrency').value.toUpperCase();
    const toCurrency = document.getElementById('toCurrency').value.toUpperCase();

    // Validation to ensure the entered value is a valid number
    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount.';
        return;
    }

    console.log({ amount, fromCurrency, toCurrency }); // Debugging: Checks if the values are correct

    // Send a POST request to the server
    try {
        const response = await axios.post('/convert', {
            amount,
            fromCurrency,
            toCurrency
        });

        console.log(response.data); // Debugging: Checks the server response

        // Display the result on the page
        const { convertedAmount, fromCurrency: returnedFromCurrency, toCurrency: returnedToCurrency } = response.data;

        // Format the converted value to always show 2 decimal places
        const formattedConvertedAmount = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: returnedToCurrency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(convertedAmount);

        // Display the converted amount in a readable format
        resultDiv.textContent = `${amount} ${returnedFromCurrency} = ${formattedConvertedAmount} ${returnedToCurrency}`;
    } catch (error) {
        console.error(error); // Debugging: Checks the error
        resultDiv.textContent = 'Error retrieving exchange rates or invalid currency codes.';
    }
});
