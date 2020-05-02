class Numbers {
    constructor() {
        this.container = document.getElementsByClassName('numbers')[0];
        this.numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
        this.numberButtons = [];
        this.allButtons = [];
        this.createButtons();
        this.appendButtons();
    }

    createButtons() {
        for(let i = 0; i < this.numbers.length; i++) {
            let button = document.createElement('button');
            button.textContent = this.numbers[i];
            this.numberButtons.push(button);
            this.allButtons.push(button);
        }
        this.equalsButton = document.createElement('button');
        this.dotButton = document.createElement('button');
        this.equalsButton.textContent = '=';
        this.dotButton.textContent = '.';
        this.allButtons.push(this.dotButton);
        this.allButtons.push(this.equalsButton);
    }

    appendButtons() {
        for(let button of this.allButtons) {
            this.container.appendChild(button);
        }
    }

    registerEventListeners(calculator) {
        let updateExpression = calculator.updateExpression;
        for(let button of this.numberButtons) {
            button.addEventListener('click', e => {
                updateExpression(button.textContent);
            })
        }
        this.dotButton.addEventListener('click', e => {
            updateExpression('.');
        })
        this.equalsButton.addEventListener('click', e => {
            calculator.evaluate();
        })
    }
}

export default Numbers;