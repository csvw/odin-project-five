class Operators {
    constructor() {
        this.container = document.getElementsByClassName('operators')[0];
        this.createButtons();
        this.setButtonText();
        this.appendButtons();
    }

    createButtons() {
        this.plus = document.createElement('button');
        this.minus = document.createElement('button');
        this.multiply = document.createElement('button');
        this.divide = document.createElement('button');
    }

    setButtonText() {
        this.plus.innerHTML = '+';
        this.minus.innerHTML = '-';
        this.multiply.innerHTML = '&times;';
        this.divide.innerHTML = '/';
    }

    appendButtons() {
        this.container.appendChild(this.plus);
        this.container.appendChild(this.minus);
        this.container.appendChild(this.multiply);
        this.container.appendChild(this.divide);
    }

    registerEventListeners(calculator) {
        let updateExpression = calculator.updateExpression;
        this.plus.addEventListener('click', e => {
            updateExpression('+');
        });
        this.minus.addEventListener('click', e => {
            updateExpression('-');
        });
        this.multiply.addEventListener('click', e => {
            updateExpression('*');
        });
        this.divide.addEventListener('click', e =>  {
            updateExpression('/');
        });
    }
}

export default Operators;