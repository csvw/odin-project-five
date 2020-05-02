import Numbers from './numbers.js';
import Operators from './operators.js';
import Misc from './misc.js';
import Display from './display.js';
import Expression from './expression.js';

class Calculator {
    constructor() {
        this.numbers = new Numbers();
        this.operators = new Operators();
        this.misc = new Misc();
        this.display = new Display();
        this.expression = new Expression();
        this.updateExpression = this.updateExpression.bind(this);
        this.registerEventListeners();
    }

    registerEventListeners() {
        this.numbers.registerEventListeners(this);
        this.operators.registerEventListeners(this);
        this.misc.registerEventListeners(this);
    }

    updateExpression(token) {
        this.expression.content += token;
        this.expression.pendingSymbol = token;
        this.display.setContent(this.expression.content);
    }

    clearExpression() {
        this.expression.content = "";
        this.expression.pendingSymbol = "";
        this.display.setContent(this.expression.content);
    }

    evaluate() {
        let result = this.expression.evaluate();
        this.clearExpression();
        this.updateExpression(result);
    }
}

export default Calculator;