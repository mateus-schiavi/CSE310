const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const { getExchangeRates } = require('./exchangeRate');
const { validateRequest } = require('./validator');
const app = express();

// Configuração para processar requisições POST com JSON
app.use(express.json());
const PORT = 5000;
// Configurar o servidor para servir arquivos estáticos (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, '../public')));

app.post('/convert', async (req, res) => {
    let { amount, fromCurrency, toCurrency } = req.body;

    // Verifique se o valor foi passado como string com vírgula e converta para ponto
    if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(',', '.'));
    }

    // Validação de parâmetros (verificando se é um valor numérico e válido)
    const error = validateRequest(amount, fromCurrency, toCurrency);
    if (error) {
        return res.status(400).json({ error });
    }

    try {
        const rates = await getExchangeRates();

        if (!rates) {
            return res.status(500).json({ error: 'Erro ao buscar as taxas de câmbio' });
        }

        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];

        if (fromRate && toRate) {
            // Converte o valor de acordo com as taxas de câmbio
            const convertedAmount = (amount / fromRate) * toRate;
            return res.json({
                convertedAmount: convertedAmount.toFixed(2), // Formata com 2 casas decimais
                fromCurrency,
                toCurrency
            });
        } else {
            return res.status(400).json({ error: 'Código de moeda inválido' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
