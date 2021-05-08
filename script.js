/*

    x and y: used for first and second values respectively
    temp: used to hold temporary values
    o: used for the operator
    c: a boolean flag

*/

class Calculator {
    constructor() {
        this.screen = document.getElementById('screen');
        this.operatorList = ['-', '+', '/', '*'];
        this.x = '';
        this.y = '';
        this.o = '';
        this.c = false;
        this.temp = '';
    }

    storeValue = (operator) => {
        if (this.x === '' && this.y === '' && operator === '=') {

            this.screen.textContent = '';

        } else if (this.x === '' && this.y === '') {

            if (this.screen.textContent === '') {
                this.screen.textContent = '0';
            }
            this.x = this.screen.textContent;
            this.temp = operator;
            this.c = true;

        } else if (this.x !== '' && this.y === '' && operator !== '=') {

            if (this.c === true && operator !== '=') { 
                this.temp = operator;      
            } else { 
                this.y = this.screen.textContent;
                this.o = this.temp;
                this.temp = operator;
                this.x = this.operate(this.x, this.o, this.y);
                this.y = '';
                this.checkLength();
                this.c = true;
                this.screen.textContent = this.x;
            }

        } else if (this.x !== '' && this.y === '' && operator === '=') {

            this.y = this.screen.textContent;
            this.o = this.temp;
            this.temp = operator;
            this.x = this.operate(this.x, this.o, this.y);
            this.c = true;
            this.checkLength();
            this.screen.textContent = this.x;

        } else if (this.x !== '' && this.y !== '' && operator !== '=') {

            this.y = '';
            this.x = this.screen.textContent;
            this.o = this.temp;
            this.temp = operator;
            this.c = true;

        } else if (this.x !== '' && this.y !== '' && operator === '=') {

            this.x = this.operate(this.x, this.o, this.y);
            this.checkLength();
            this.screen.textContent = this.x;

        }
    }

    checkLength = () => {
        if (this.x.toString().length > 11) {
            this.x = this.x.toString().substring(0,11);
        }
    }

    displayValues = (temporaryValue) => {
        if (this.c === true) {
            this.screen.textContent = '';
            this.c = false;
        }
        if (this.screen.textContent.length < 10 || 
            (this.screen.textContent.length < 11 && this.screen.textContent.includes('.') === true)) {
            this.screen.textContent = this.screen.textContent + temporaryValue;
        }
    }

    checkDecimal = (temporaryValue) => {
        if (this.screen.textContent.includes('.') === false) {
            this.displayValues(temporaryValue);
        }
        if (this.c === true && screen.textContent.includes('.') === true) {
            this.displayValues(temporaryValue);
        }
    }

    operate = (value1, operator, value2) => {
        if (operator === '-') {
            if ((Number(value1) - Number(value2)) < 9999999999.0) {
                return ((Number(value1) * 10) - (Number(value2) * 10)) / 10;
            } else {
                return 'OVERLOAD';
            }
        }

        if (operator === '+') {
            if ((Number(value1) + Number(value2)) < 9999999999.0) {
                return ((Number(value1) * 10) + (Number(value2) * 10)) / 10;
            } else {
                return 'OVERLOAD';
            }
        }

        if (operator === '*') {
            if ((Number(value1) * Number(value2)) < 9999999999.0) {
                return (Number(value1) * 10) * (Number(value2) * 10) / 100;
            } else {
                return 'OVERLOAD';
            }
        }

        if (operator === '/' && Number(value2) !== 0) {
            if ((Number(value1) / Number(value2)) < 9999999999.0) {
                return Number(value1) / Number(value2);
            } else {
                return 'OVERLOAD';
            }
        }
    }

    percentage = () => {
        let percent = Number(this.screen.textContent) / 100;
        if (percent.toString().length > 11) {
            percent = percent.toString().substring(0, 11);
        }
        this.screen.textContent = percent;
        this.x = '';
        this.y = '';
        this.o = '';
        this.c = true;
    }

    deleteLeft = () => {
        this.screen.textContent = this.screen.textContent.substring(0, this.screen.textContent.length - 1);
    }

    clearAll = () => {
        this.screen.textContent = '';
        this.x = '';
        this.y = '';
        this.o = '';
        this.c = false;
        this.temp = '';
    }

}

// DOM

function buildMachine() {
    const machine = document.getElementById('machine');
    machine.innerHTML = `
    <div id="screen">
    </div>
    <div id="calculator">
    <div class="column">
        <button onclick="calculator.deleteLeft()">&#x232b;</button>
        <button onclick="calculator.displayValues('7')">7</button>
        <button onclick="calculator.displayValues('4')">4</button>
        <button onclick="calculator.displayValues('1')">1</button>
        <button onclick="calculator.displayValues('0')">0</button>
    </div>
    <div class="column">
        <button onclick="calculator.clearAll()">C</button>
        <button onclick="calculator.displayValues('8')">8</button>
        <button onclick="calculator.displayValues('5')">5</button>
        <button onclick="calculator.displayValues('2')">2</button>
        <button onclick="calculator.checkDecimal('.')">.</button>
    </div>
    <div class="column">
        <button onclick="calculator.percentage()">%</button>
        <button onclick="calculator.displayValues('9')">9</button>
        <button onclick="calculator.displayValues('6')">6</button>
        <button onclick="calculator.displayValues('3')">3</button>
        <button onclick="calculator.storeValue('=')">=</button>
    </div>
    <div class="column">
        <button onclick="calculator.storeValue('/')">&divide</button>
        <button onclick="calculator.storeValue('*')">&times</button>
        <button onclick="calculator.storeValue('-')">-</button>
        <button onclick="calculator.storeValue('+')" style="height: 100px;">+</button>
        </div>
    </div>`
}

buildMachine();
const calculator = new Calculator();