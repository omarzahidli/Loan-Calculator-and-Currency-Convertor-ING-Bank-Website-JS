let dp1 = document.getElementById('dp1');
let dp2 = document.getElementById('dp2');
let inDrop = document.querySelector('.inDrop');
let inDrop2 = document.querySelector('.inDrop2');
let arrow = document.getElementById('arrow1');
let arrow2 = document.getElementById('arrow2');
let btn = document.getElementById('btn')
dp1.onclick = function() {
    if (inDrop.style.display === "none") {
        inDrop.style.display = "block";
        arrow.classList.replace("fa-chevron-down", "fa-chevron-up");
    } else {
        inDrop.style.display = "none";
        arrow.classList.replace("fa-chevron-up", "fa-chevron-down"); 
    }
}
dp2.onclick = function() {
    if (inDrop2.style.display === "none") {
        inDrop2.style.display = "block";
        arrow2.classList.replace("fa-chevron-down", "fa-chevron-up");
    } else {
        inDrop2.style.display = "none";
        arrow2.classList.replace("fa-chevron-up", "fa-chevron-down"); 
    }
}

btn.onclick =  function() {
    if (btn.classList == "fa-solid fa-bars") btn.classList.replace("fa-bars", "fa-xmark")
    else btn.classList.replace("fa-xmark", "fa-bars")
}


let vahid = document.querySelectorAll('.vahid');
let scr = document.querySelectorAll('.scr');
let res = document.getElementById('res')
let endres = document.getElementById('endres')
let mebleg = document.getElementById('mebleg')
let muddet = document.getElementById('muddet')
let rate = document.getElementById('rate')
vahid.forEach((element, index) => {
    element.oninput = function() {
        scr[index].value = element.value;
        hesabla()
    };

});
scr.forEach((element, index) => {
    element.oninput = function() {
        vahid[index].value = element.value;
        hesabla()
    };
});
hesabla()
function hesabla() {
    let total = 0;
    let monthly = 0;
    let r = rate.value / 100 /12
    monthly = (mebleg.value * (r * Math.pow(1 + r, muddet.value)) / (Math.pow(1 + r, muddet.value) - 1)).toFixed(2)
    total = (monthly * muddet.value).toFixed(2)
    res.innerHTML = monthly + "₼"
    endres.innerHTML = total + "₼"
}

document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("fromv");
    const convertedInput = document.getElementById("to");
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");

    const exchangeRatesToAZN = {
        "USD": 1.7020,  
        "EUR": 1.7747,  
        "RUB": 0.0199,  
        "AZN": 1        
    };

    const exchangeRatesFromAZN = {
        "USD": 1.6970,  
        "EUR": 1.7306,  
        "RUB": 0.0147,  
        "AZN": 1        
    };

    let lastChangedInput = "amount";

    function convertCurrency(source) {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        let amount = parseFloat(source.value);

        if (isNaN(amount) || amount <= 0) {
            amountInput.value = "";
            convertedInput.value = "";
            return;
        }

        let amountInAZN, finalAmount;

        if (source === amountInput) {
            amountInAZN = amount * exchangeRatesToAZN[from];
            finalAmount = amountInAZN / exchangeRatesFromAZN[to];
            convertedInput.value = finalAmount.toFixed(2);
            lastChangedInput = "amount";
        } else {
            amountInAZN = amount * exchangeRatesToAZN[to];
            finalAmount = amountInAZN / exchangeRatesFromAZN[from];
            amountInput.value = finalAmount.toFixed(2);
            lastChangedInput = "convertedAmount";
        }
    }

    function handleCurrencySwitch() {
        if (lastChangedInput === "amount") {
            convertCurrency(amountInput);
        } else {
            convertCurrency(convertedInput);
        }
    }

    amountInput.addEventListener("input", () => convertCurrency(amountInput));
    convertedInput.addEventListener("input", () => convertCurrency(convertedInput));

    fromCurrency.addEventListener("change", () => {
        handleCurrencySwitch();
    });
    toCurrency.addEventListener("change", () => {
        handleCurrencySwitch();
    });

    convertCurrency(amountInput);
});