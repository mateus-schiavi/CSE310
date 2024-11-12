const form = document.getElementById('converter-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    // Obtém os valores inseridos pelo usuário e substitui a vírgula por ponto
    const amountInput = document.getElementById('amount').value;
    const amount = parseFloat(amountInput.replace(',', '.')); // Substitui vírgula por ponto antes de converter

    const fromCurrency = document.getElementById('fromCurrency').value.toUpperCase();
    const toCurrency = document.getElementById('toCurrency').value.toUpperCase();

    // Validação para garantir que o valor inserido seja um número válido
    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Por favor, insira um valor válido.';
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

        // Formatar o valor convertido para sempre exibir 2 casas decimais
        const formattedConvertedAmount = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: returnedToCurrency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(convertedAmount);

        // Exibir o valor convertido de forma legível
        resultDiv.textContent = `${amount} ${returnedFromCurrency} = ${formattedConvertedAmount} ${returnedToCurrency}`;
    } catch (error) {
        console.error(error); // Depuração: Verifica o erro
        resultDiv.textContent = 'Erro ao buscar as taxas de câmbio ou códigos de moeda inválidos.';
    }
});
