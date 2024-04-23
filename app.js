const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.4.22/v1/currencies';

const dropdowns = document.querySelectorAll(".select-container select");
const button = document.querySelector("button");
const amount = document.querySelector(".amount-container input");
const fromSelect = document.querySelector(".from .select-container select");
const toSelect = document.querySelector(".to .select-container select");
const msg = document.querySelector(".msg");
 

const updateExchangeRates = async () => {
    let amtVal = amount.value;
    if(amtVal === "" || isNaN(amtVal) || amtVal < 1){
        window.alert("Amount Value should be greater than 1");
        amtVal = 1;
        amount.value = "1";
    }
    let fromCountry = fromSelect.value.toLowerCase()
    let toCountry = toSelect.value.toLowerCase()
    const url = `${BASE_URL}/${fromCountry}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCountry][toCountry];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromSelect.value} = ${finalAmount} ${toSelect.value}`;
}


for(let select of dropdowns){
    for(let country in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = country;
        newOption.value = country;
        if(select.name === "from" && country === "USD"){
            newOption.selected = true;
        }else if(select.name === "to" && country === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) =>{
        updateFlags(evt.target);
    })
}


const updateFlags = (element) => {
    let country = element.value;
    let countryCode = countryList[country];
    const FLAG_URL = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = FLAG_URL;
}

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRates();
});

window.addEventListener("load", () => {
    updateExchangeRates();
})

