// Declare number and operator variables
let num1 = null;
let num2 = null;
let operator = null;

// Declare operator functions
const add = function(x,y) {
    return x + y;
}
const subtract = function(x,y) {
    return x + y;
}
const multiply = function(x,y) {
    return x * y;
}
const divide = function(x,y) {
    return x / y;
}

const inputDisplay = document.querySelector('#display-input');

// Call updateDisplay to update input when number is clicked
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        updateDisplay(number.textContent);
        if (num1 === null) {
            num1 = `${number.textContent}`;
        }
        else if (num1 !== null && operator === null) {
            num1 += `${number.textContent}`;
        }
        else if (num1 !== null && operator !== null) {
            num2 = `${number.textContent}`;
        }
        else if (num1 !== null && operator !== null && num2 !== null) {
            num2 += `${number.textContent}`;
        }
    });
});

// Call updateDisplay to update input when operator is clicked
const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', () => {
        if (num1 !== null && operator === null) {
            updateDisplay(operatorBtn.textContent);
            // Set operator variable to the corresponding operatorBtn
            operator = `${operatorBtn.textContent}`;
        }
    });
});

function updateDisplay(input) {
    if (input === "+" || input === "-" || input === "x" || input === 
    "/") {
        inputDisplay.textContent +=` ${input} `;
    }
    else
    inputDisplay.textContent +=`${input}`;
}

// Execute operation based on inputs
function operate(num1, num2, operator) {
    return operator(num1, num2);
}