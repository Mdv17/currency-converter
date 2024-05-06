const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector('form button');

for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code) {
        // Selecting USD by default as FROM currency and NPR as TO currency
        let selected;
        if(i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if(i == 1) {
            selected = currency_code == "ZAR" ? "selected" : "";
        }
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // Inserting option tag inside select 
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
}

getButton.addEventListener("click", e => {
    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    // If user doesnt enter any value or enter 0 then we will put 1 by default in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value ="1";
        amountVal = 1;
    }

    let url = `https://v6.exchangerate-api.com/v6/MY-API-KEY/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js object and then method receiving that object
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        const exchangeRateTxt = document.querySelector(".exchange-rate")
    });
}