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
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target); // Calling loadFlag with passing target element as an argument
    });
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){ // If currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // Selecting img tag of particular drop list
            // Passing country code of a selected currency code in a img url
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value; // Temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value; // Passing TO currency code to FROM currency code
    toCurrency.value = tempCode; // Passing temporary currency code TO currency code
    loadFlag(fromCurrency); // Calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency); //Calling loadFlag with passing select element (TOCurrency) of TO
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    // If user doesnt enter any value or enter 0 then we will put 1 by default in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }

    exchangeRateTxt.innerText = "Getting exchange rate...";

    let url = `https://v6.exchangerate-api.com/v6/84e6d5bb46bcbbdb3ac109c8/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js object and then method receiving that object
    fetch(url).then(response => response.json()).then(result => {
        console.log(result);
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    });
}