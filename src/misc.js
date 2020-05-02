class Misc {
    constructor() {
        this.container = document.getElementsByClassName('misc')[0];
        this.createElements();
        this.setButtonText();
        this.appendButtons();
    }

    createElements() {
        this.parenLeft = document.createElement('button');
        this.parenRight = document.createElement('button');
        this.modulus = document.createElement('button');
        this.ac = document.createElement('button');
    }

    setButtonText() {
        this.parenLeft.textContent = ')';
        this.parenRight.textContent = '(';
        this.modulus.textContent = '%';
        this.ac.textContent = 'AC';
    }

    appendButtons() {
        this.container.appendChild(this.parenRight);
        this.container.appendChild(this.parenLeft);
        this.container.appendChild(this.modulus);
        this.container.appendChild(this.ac);
    }

    registerEventListeners(calculator) {
        this.parenRight.addEventListener('click', e => {
            calculator.updateExpression(this.parenRight.textContent);
        });
        this.parenLeft.addEventListener('click', e => {
            calculator.updateExpression(this.parenLeft.textContent);
        });
        this.modulus.addEventListener('click', e => {
            calculator.updateExpression(this.modulus.textContent);
        });
        this.ac.addEventListener('click', e => {
            calculator.clearExpression();
        });
    }
}

export default Misc;