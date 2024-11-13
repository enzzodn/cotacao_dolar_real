document.getElementById('convertBtn').addEventListener('click', convertCurrency);

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;
    
    if (!amount || amount <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    try {
        // Consumindo a API de cotação do dólar e real
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
        const data = await response.json();

        const usdToBrlRate = parseFloat(data.USDBRL.ask); // Cotação USD -> BRL
        const brlToUsdRate = 1 / usdToBrlRate; // Cotação BRL -> USD (inverso)

        let convertedValue = 0;
        let exchangeRate = 0;

        if (currency === 'BRL') {
            // Convertendo de Real para Dólar
            convertedValue = (amount / usdToBrlRate).toFixed(2);
            exchangeRate = usdToBrlRate.toFixed(2);
        } else if (currency === 'USD') {
            // Convertendo de Dólar para Real
            convertedValue = (amount * usdToBrlRate).toFixed(2);
            exchangeRate = brlToUsdRate.toFixed(2);
        }

        // Exibindo o valor convertido e a taxa de câmbio
        document.getElementById('convertedValue').innerText = convertedValue;
        document.getElementById('exchangeRate').innerText = exchangeRate;
    } catch (error) {
        console.error('Erro ao buscar a cotação:', error);
        alert("Erro ao obter a cotação. Tente novamente mais tarde.");
    }
}
