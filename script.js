let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');

let num1 = '';
let num2 = '';
let operator = '';
let result = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.id) {
            case 'clear':
                num1 = '';
                num2 = '';
                operator = '';
                result = '';
                display.value = '';
                break;
            case 'equals':
                if (num1 !== '' && operator !== '') {
                    num2 = display.value.split(operator)[1]; // Get the second number after the operator
                    calculateResult();
                }
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                if (num1 === '') {
                    // Store first number and operator
                    num1 = display.value;
                    operator = button.textContent;  // Store the operator (e.g., '+', '-', etc.)
                    display.value = num1 + ' ' + operator + ' ';  // Show num1 and operator on the screen
                } else if (operator !== '' && display.value !== '') {
                    // Calculate the result before applying new operator
                    num2 = display.value.split(operator)[1];  // Get the second number after operator
                    calculateResult();
                    operator = button.textContent;  // Update operator to the new one
                    display.value = num1 + ' ' + operator + ' ';  // Show result and new operator
                }
                break;
            default:
                display.value += button.textContent;  // Continue appending number or decimal
        }
    });
});

function calculateResult() {
    switch (operator.trim()) {
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            if (parseFloat(num2) === 0) {
                result = 'Error'; // Handle division by zero
            } else {
                result = parseFloat(num1) / parseFloat(num2);
            }
            break;
    }
    display.value = result;  // Show result
    num1 = result;  // Store the result for the next operation
    num2 = '';
    operator = '';
}
