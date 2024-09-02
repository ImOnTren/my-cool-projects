const display = document.getElementById("display");
let resetDisplay = false;
const maxDisplayLength = 12;

function showDisplay(input) {
    if (resetDisplay && !isOperator(input)) {
        display.value = "";
    }

    if (display.value.length < maxDisplayLength) {
        display.value += input;
    }

    resetDisplay = false;
}

function calculate() {
    try {
        let result = eval(display.value);
        display.value = Math.round((result + Number.EPSILON) * 100) / 100;
        resetDisplay = true;
    } catch (error) {
        display.value = "Syntax Error";
        resetDisplay = true;
    }
}

function clearDisplay() {
    display.value = "";
    resetDisplay = false;
}

function toggleSign() {
    if (resetDisplay) {
        resetDisplay = false;
    }
    if (display.value) {
        if (display.value.startsWith('-')) {
            display.value = display.value.slice(1);
        } else {
            display.value = '-' + display.value;
        }
    }
}

function isOperator(input) {
    return ['+', '-', '*', '/'].includes(input);
}
