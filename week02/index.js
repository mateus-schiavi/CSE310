const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Configuração para processar requisições POST com JSON
app.use(express.json());
const PORT = 5000;
// Configurar o servidor para servir arquivos estáticos (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Definir uma rota para obter as taxas de câmbio
const API_URL = 'https://v6.exchangerate-api.com/v6/4b8e0ba6dda391fe0f864bf5/latest/USD';

// Função para buscar as taxas de câmbio
const getExchangeRates = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('Taxas de câmbio recebidas:', response.data); // Depuração
        return response.data.conversion_rates; // Retorna as taxas de câmbio
    } catch (error) {
        console.error('Erro ao buscar as taxas de câmbio:', error);
        return null;
    }
};

// Rota para realizar a conversão monetária
app.post('/convert', async (req, res) => {
    const { amount, fromCurrency, toCurrency } = req.body;
    const rates = await getExchangeRates();
    
    if (!rates) {
        return res.status(500).json({ error: 'Erro ao buscar as taxas de câmbio' });
    }

    console.log(`Taxas de câmbio: ${JSON.stringify(rates)}`); // Depuração

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (fromRate && toRate) {
        const convertedAmount = (amount / fromRate) * toRate;
        return res.json({
            convertedAmount: convertedAmount.toFixed(2),
            fromCurrency,
            toCurrency
        });
    } else {
        return res.status(400).json({ error: 'Código de moeda inválido' });
    }
});

// Rota para a página inicial (servidor vai servir o index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
