// Declare number and operator variables
let num1 = null;
let num2 = null;
let operator = null;

// Declare result variable to support multiple calculations
let result = null;

// Declare display elements to be updated
const inputDisplay = document.querySelector('#input-display');
const outputDisplay = document.querySelector('#output-display');

// Assign number variables and call updateInpuDisplay when number is clicked
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    let input = "";
    number.addEventListener('click', () => {
        input = number.textContent;

        // Prevent user from using leading zeros
        if (num1 === null && input === "0") {
            return;
        }
        else if (num1 !== null && operator !== null && result === null && num2 === "0") {
            return;
        }
        else if (num1 === "0" && input === "0") {
            return;
        }

        // Handle edge case for clicking number directly after operate function
        else if (result !== null) {
            num1 =`${input}`;
            operator = null;
        }

        // Update num1 or num2 based on conditions
        else if (num1 === null) {
            num1 = `${input}`;
        }
        else if (num1 !== null && operator === null) {
            num1 += `${input}`;
        }
        else if (num1 !== null && operator !== null && num2 !== null) {
            num2 += `${input}`;
        }
        else if (num1 !== null && operator !== null) {
            num2 = `${input}`;
        }
        updateInputDisplay(input);
    });
});

const decimalBtn = document.querySelector('#decimal-place');
decimalBtn.addEventListener('click', () => {
    if (num1 === null) {
        updateInputDisplay("0.")
    }
})

// Pass negative flag to updateInputDisplay and reassign num variable
const negativeBtn = document.querySelector('#negative-flag');
negativeBtn.addEventListener('click', () => {
    if (num1 !== null && num2 === null) {
        num1 = parseInt(num1) * -1;
        updateInputDisplay("negative-flag");
    }
    else if(num1 !=null && num2 !== null && result === null) {
        num2 = parseInt(num2) * -1;
        updateInputDisplay("negative-flag");
    }
});

// Assign operator variable and call updateInputDisplay when operator is clicked
const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', () => {
        input = operatorBtn.textContent;

        // Prevent user from starting with operator
        if (num1 !== null && operator === null) {
            updateInputDisplay(input);
            operator = `${input}`;
        }

        // Re-assign num1 and operator for any follow-on equations
        else if (result !== null) {
            num1 = parseInt(result);
            updateInputDisplay(num1);
            updateInputDisplay(input);
            outputDisplay.textContent = "";
            operator = `${input}`;
        }
    });
});

// Update display with input and add a space around operators
function updateInputDisplay(input) {
    if (input === "+" || input === "-" || input === "x" || input === 
    "/") {
        inputDisplay.textContent +=` ${input} `;
    }
    else if (input === "negative-flag" && num2 === null) {
        inputDisplay.textContent = `${num1}`;
    }
    else if (input === "negative-flag" && num2 !== null) {
        inputDisplay.textContent = `${num1} ${operator} ${num2}`;
    }
    else if (result !== null) {
        inputDisplay.textContent = `${input}`;
        result = null;
        num2 = null;
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
    let solution = null;
    if (operator === '+') {
        solution = x + y;
    }
    else if (operator === '-') {
        solution = x - y;
    }
    else if (operator === 'x') {
        solution = x * y;
    }
    else if (operator === '/') {
        solution = x / y;
    }

    // Prevent division by 0
    if (solution === Infinity) {
        alert("You can't divide by 0! Clear and retry");
    }
    else
    updateOutputDisplay(solution);
}

function updateOutputDisplay(solution) {
    outputDisplay.textContent = `${solution}`;
    result = solution;
}

// Keep copyright year current
document.addEventListener('DOMContentLoaded', function () {
    const year = document.querySelector('#year');
    
    function getYear() {
        year.innerHTML = new Date().getFullYear();
    }
    getYear();
});

