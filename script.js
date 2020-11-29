var numberBtns = document.querySelectorAll('.number');
var operationBtns = document.querySelectorAll('.operator');
var clearBtns = document.querySelectorAll('.clear-btn');
var decimalButton = document.getElementById('decimal');
var display = document.getElementById('display');
var squareBtn = document.getElementById('square');
var MemoryCurrentNumber = 0;
var IsInitialSymbol = true;
var MemoryPendingOperation = '';
var IsSquarePressed = false;

for (var i = 0; i < numberBtns.length; i++) {
    var numberBtn = numberBtns[i];
    numberBtn.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
}

for (var i = 0; i < operationBtns.length; i++) {
    var operationBtn = operationBtns[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
}

for (var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.target.textContent);
    });
}

decimalButton.addEventListener('click', decimal);

function numberPress(num) {
    if (IsInitialSymbol && display.value !== '0') {
        display.value += num;
    } else {
        display.value = num;
        IsInitialSymbol = true;
    }
}

function operation(symbol) {
    var localOperationMemory = parseFloat(display.value);

    if (symbol !== "=") {
        MemoryPendingOperation = symbol;
        MemoryCurrentNumber = parseFloat(display.value);
        if (symbol === "√") {
            square();
        }
        IsInitialSymbol = false;
        return;
    }

    if (MemoryPendingOperation === '+') {
        MemoryCurrentNumber += localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
        MemoryCurrentNumber -= localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
        MemoryCurrentNumber /= localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
        MemoryCurrentNumber *= localOperationMemory;
    } else if (MemoryPendingOperation === '√') {
        square();
    } else if (MemoryPendingOperation === '**') {
        MemoryCurrentNumber = MemoryCurrentNumber**localOperationMemory;
    }

    display.value = MemoryCurrentNumber;
}

function square() {
    if (display.value !== '0') {
        MemoryCurrentNumber = Math.sqrt(parseFloat(display.value));
        display.value = MemoryCurrentNumber;
    } else {
        IsSquarePressed = true;
    }
}

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        IsInitialSymbol = true;
        IsSquarePressed = false;
    } else if (id === 'c') {
        display.value = '0';
        IsInitialSymbol = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
}

function decimal(num) {
    var localDecimalMemory = display.value;

    if (!IsInitialSymbol) {
        localDecimalMemory = '0.';
        IsInitialSymbol = true;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }

    display.value = localDecimalMemory;
}