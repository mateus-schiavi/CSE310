const form = document.getElementById('converter-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value.toUpperCase();
    const toCurrency = document.getElementById('toCurrency').value.toUpperCase();

    if (isNaN(amount)) {
        resultDiv.textContent = 'Please enter a valid amount.';
        return;
    }

    console.log({ amount, fromCurrency, toCurrency }); // Depuração: Verifica se os valores estão corretos

    // Enviar a requisição POST para o servidor
    try {
        const response = await axios.post('/convert', {
            amount,
            fromCurrency,
            toCurrency
        });

        console.log(response.data); // Depuração: Verifica a resposta do servidor

        // Exibir o resultado na página
        const { convertedAmount, fromCurrency: returnedFromCurrency, toCurrency: returnedToCurrency } = response.data;
        resultDiv.textContent = `${amount} ${returnedFromCurrency} = ${convertedAmount} ${returnedToCurrency}`;
    } catch (error) {
        console.error(error); // Depuração: Verifica o erro
        resultDiv.textContent = 'Error fetching exchange rates or invalid currency codes.';
    }
});
