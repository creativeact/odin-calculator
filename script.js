// Declare operators
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

// Call update display function when number is clicked
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        updateDisplay(number.textContent);
    });
});

// Display input to user as it is updated
const inputDisplay = document.getElementById('display-input');

function updateDisplay(input) {
    inputDisplay.textContent = input;
}

// Execute operation based on inputs
function operate(num1, num2, operator) {
    return operator(num1, num2);
}