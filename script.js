// Declare number and operator variables to be used in operate function
let num1 = null;
let num2 = null;
let operator = null;

// Declare result variable to support multiple calculations
let result = null;

// Declare display elements to be updated
const inputDisplay = document.querySelector('#input-display');
const outputDisplay = document.querySelector('#output-display');

// Helper function to check length of numbers
function checkNumLength(num) {    
    if (num === null || num === "") {
        return;
    }
    else if (num.length >= 9) {
        return true;
    }
    else return false;
};

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

        // Prevent updating nums if too long
        else if (checkNumLength(num1) === true && operator === null) {
            return;
        }
        else if (checkNumLength(num2) === true && result === null) {
            return;
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

// Add decimal point to num1 or num2 based on conditions
const decimalBtn = document.querySelector('#decimal-place');
decimalBtn.addEventListener('click', () => {
    if (num1 === null) {
        num1 = "0.";
        updateInputDisplay(num1);
    }
    else if (num1.toString().includes(".") === false && num2 === null) {
        num1 += ".";
        updateInputDisplay(".");
    }
    else if (num1 !== null && operator !== null && num2 === null) {
        num2 = "0.";
        updateInputDisplay(num2);
    }
    else if (num2.toString().includes(".") === false) {
        num2 += ".";
        updateInputDisplay(".");
    }
});

// Pass negative flag to updateInputDisplay and reassign num variable
const negativeBtn = document.querySelector('#negative-flag');
negativeBtn.addEventListener('click', () => {
    if (num1 !== null && operator !== null && num2 === null) {
        return;
    }

    // Error handling for garbage values after clearing
    else if (operator !== null && num2 === "") {
        return;
    }
    else if (operator !== null && isNaN(parseFloat(num2)) === true) {
        return;
    }

    // Calculate newNum then convert to string
    else if (num1 !== null && num2 === null) {
        let newNum = parseFloat(num1) * -1;
        num1 = newNum.toString();
        updateInputDisplay("negative-flag");
    }
    else if(num1 !== null && num2 !== null && result === null) {
        let newNum = parseFloat(num2) * -1;
        num2 = newNum.toString();
        updateInputDisplay("negative-flag");
    }
});

// Assign operator variable and call updateInputDisplay when operator is clicked
const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', () => {
        input = operatorBtn.textContent;

        // Prevent user from starting with operator
        if (parseFloat(num1) === NaN || num1 === undefined || num1 ==="") {
            return;
        }
        else if (num1 !== null && operator === null) {
            updateInputDisplay(input);
            operator = `${input}`;
        }
        
        // Re-assign num1 and operator for any follow-on equations
        else if (result !== null) {
            num1 = parseFloat(result);
            updateInputDisplay(num1);
            updateInputDisplay(input);
            outputDisplay.textContent = "";
            operator = `${input}`;
        }
    });
});

// Update display with input
function updateInputDisplay(input) {
    if (input === "+" || input === "-" || input === "x" || input === 
    "/") {
        inputDisplay.textContent +=` ${input} `;
    }

    // Update display when + / - button is clicked
    else if (input === "negative-flag" && num2 === null) {
        inputDisplay.textContent = `${num1}`;
    }
    else if (input === "negative-flag" && num2 !== null) {
        inputDisplay.textContent = `${num1} ${operator} ${num2}`;
    }

    // Clear input based on conditions
    else if (input === "clear" && operator === null && isNaN(parseFloat(num2)) === true) {
        let newNum = num1.slice(0, -1);
        num1 = newNum;
        inputDisplay.textContent = `${num1}`;
    }
    else if (input === "clear" && operator !== null && isNaN(parseFloat(num2)) === true) {
        operator = null;
        num2 = null;
        inputDisplay.textContent = `${num1}`;
    }
    else if (input === "clear" && operator !== null && num2 != null & result === null) {
        let newNum = num2.slice(0, -1);
        num2 = newNum;
        inputDisplay.textContent = `${num1} ${operator} ${num2}`;
    }
    
    // If there was a previous calculation, reset variables to prepare for new operate call
    else if (result !== null) {
        inputDisplay.textContent = `${input}`;
        result = null;
        num2 = null;
    }

    else
    inputDisplay.textContent +=`${input}`;
}

// Call operate function when equal is clicked
const equal = document.querySelector('.equal');
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
    result = null;
    inputDisplay.textContent = '';
    outputDisplay.textContent = '';
});

// Call updateInputDisplay with clear as input
const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    if (num1 === null) {
       return;
    }

    // Reset result if clear clicked after calculation
    else if (result !== null) {
        outputDisplay.textContent = '';
        result = null;
    }

    // Handle edge case for clicking number then clear after a calculation
    else if (num1 !== null && outputDisplay.textContent !== "") {
        num1 = null;
        inputDisplay.textContent = "";
        outputDisplay.textContent = "";
    }
    else {
        updateInputDisplay("clear");
    }
});

// Execute operation based on inputs
function operate(num1, num2, operator) {

    // Convert nums to float and round to two decimal places to avoid long numbers
    let x = Math.round(parseFloat(num1) * 100) / 100;
    let y = Math.round(parseFloat(num2) * 100) / 100;
    let solution = null;

    // Prevent calculations with garbage values after clearing
    if (isNaN(x) === true || isNaN(y) === true) {
        return;
    }

    // Carry out operation based on operator
    else if (operator === '+') {
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
};

function updateOutputDisplay(solution) {
    outputDisplay.textContent = `${solution}`;
    result = solution;
};

// Keep copyright year current
document.addEventListener('DOMContentLoaded', function () {
    const year = document.querySelector('#year');
    
    function getYear() {
        year.innerHTML = new Date().getFullYear();
    }
    getYear();
});

