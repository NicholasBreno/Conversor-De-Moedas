const API_URL = "https://api.exchangerate-api.com/v4/latest/BRL";
const foreignCurrencyInput = document.getElementById("foreignCurrency");
const currencySelect = document.getElementById("currencySelect");
const resultDiv = document.getElementById("result");
const convertButton = document.getElementById("convertButton");


async function loadCurrencies() {
try {
    const response = await fetch(API_URL);
    const data = await response.json();


    Object.keys(data.rates).forEach((currency) => {
    const option = document.createElement("option");
    option.value = 1 / data.rates[currency];
    option.textContent = currency;
    currencySelect.appendChild(option);
    });
} catch (error) {
    console.error("Erro ao carregar moedas:", error);
    resultDiv.textContent = "Erro ao carregar dados. Tente novamente mais tarde.";
}
}


function convertCurrency() {
const foreignCurrencyValue = parseFloat(foreignCurrencyInput.value);
const exchangeRate = parseFloat(currencySelect.value);

if (isNaN(foreignCurrencyValue)) {
    resultDiv.textContent = "Por favor, insira um valor válido.";
    return;
}

  const localCurrencyValue = foreignCurrencyValue * exchangeRate;
resultDiv.textContent = `Valor convertido: R$ ${localCurrencyValue.toFixed(2)}.`;
}

convertButton.addEventListener("click", convertCurrency);
window.addEventListener("load", loadCurrencies);
