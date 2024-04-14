// Declare number and operator variables
let num1 = null;
let num2 = null;
let operator = null;

// Declare display elements to be updated
const inputDisplay = document.querySelector('#input-display');
const outputDisplay = document.querySelector('#output-display');

// Call updateInpuDisplay when number is clicked
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        updateInputDisplay(number.textContent);
        if (num1 === null) {
            num1 = `${number.textContent}`;
        }
        else if (num1 !== null && operator === null) {
            num1 += `${number.textContent}`;
        }
        else if (num1 !== null && operator !== null && num2 !== null) {
            num2 += `${number.textContent}`;
        }
        else if (num1 !== null && operator !== null) {
            num2 = `${number.textContent}`;
        }
    });
});

// Call updateInputDisplay when operator is clicked
const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', () => {
        if (num1 !== null && operator === null) {
            updateInputDisplay(operatorBtn.textContent);
            // Set operator variable to the corresponding operatorBtn
            operator = `${operatorBtn.textContent}`;
        }
    });
});

function updateInputDisplay(input) {
    if (input === "+" || input === "-" || input === "x" || input === 
    "/") {
        inputDisplay.textContent +=` ${input} `;
    }
    else
    inputDisplay.textContent +=`${input}`;
}

// Call operate function when equal is clicked
const equal = document.querySelector('#equal');
equal.addEventListener('click', () => {
    if (num1 !== null && operator !== null && num2 !== null) {
        operate(num1, num2, operator);
    }
});

// On A/C click, clear display and reset variables to null
const allClear = document.querySelector('#all-clear');
allClear.addEventListener('click', () => {
    num1 = null;
    operator = null;
    num2 = null;
    inputDisplay.textContent = '';
    outputDisplay.textContent = '';
});

// Execute operation based on inputs
function operate(num1, num2, operator) {
    let x = parseInt(num1);
    let y = parseInt(num2);
    let result = null;
    if (operator === '+') {
        result = x + y;
    }
    else if (operator === '-') {
        result = x - y;
    }
    else if (operator === 'x') {
        result = x * y;
    }
    else if (operator === '/') {
        result = x / y;
    }
    updateOutputDisplay(result);
}

function updateOutputDisplay(result) {
    outputDisplay.textContent = `${result}`;
}