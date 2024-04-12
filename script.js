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
const numberBtn = document.querySelector('.number');
numberBtn.addEventListener('click', () => {
    const numValue = numberBtn.value;
    updateDisplay(numValue);
});

// Display input to user as it is updated
const inputDisplay = document.getElementById('display-input');

function updateDisplay(num) {
    
}

// Execute operation based on inputs
function operate(num1, num2, operator) {
    return operator(num1, num2);
}