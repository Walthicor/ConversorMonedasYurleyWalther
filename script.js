const apiKey = 'a02844666334fd63f681087f'; // Tu clave de API
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

async function getExchangeRates() {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Error al obtener las tasas de cambio');
    }
    const data = await response.json();
    return data.conversion_rates;
}

document.getElementById('convert').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const currencyFrom = document.getElementById('currency-from').value;
    const currencyTo = document.getElementById('currency-to').value;

    if (isNaN(amount)) {
        document.getElementById('result').innerText = 'Por favor, introduce un monto válido.';
        return;
    }

    try {
        const rates = await getExchangeRates();
        const rateFrom = rates[currencyFrom];
        const rateTo = rates[currencyTo];

        if (!rateFrom || !rateTo) {
            document.getElementById('result').innerText = 'Error al obtener las tasas de cambio.';
            return;
        }

        // Convertir el monto a la moneda seleccionada
        const convertedAmount = (amount * rateTo / rateFrom).toFixed(2);
        document.getElementById('result').innerText = `${amount} ${currencyFrom} = ${convertedAmount} ${currencyTo}`;
    } catch (error) {
        document.getElementById('result').innerText = 'Error en la conversión. Inténtalo de nuevo.';
        console.error(error);
    }
});
