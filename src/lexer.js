class Token {
    constructor(symbol) {
        this.symbol = symbol;
        this.tokenType = this.getType(symbol);
        this.value = this.getValue(symbol);
    }

    getValue(symbol) {
        if(this.tokenType === 'numeric') {
            if(this.symbol === '.') {
                return 0;
            } else {
                return parseFloat(symbol);
            }
        } else {
            return null;
        }
    }

    getType(symbol) {
        if(!isNaN(symbol)) {
            return 'numeric';
        } else if(symbol === '*' || symbol === '%'
            || symbol === '/' || symbol === '+' || symbol === '-') {
            return 'operator';
        } else if(symbol === '(') {
            return 'parenLeft';
        } else {
            return 'parenRight';
        }
    }
}

class Lexer {
    constructor() {
        this.tokens = [];
    }

    clear() {
        this.tokens = [];
    }

    buildTokens(input) {
        let str = input.split('');
        let expr = '';
        for(let char of str) {
            if(isNaN(char) && char !== '.') {
                console.log(expr)
                if(expr) {
                    this.tokens.push(new Token(expr));
                    expr = '';
                }
                this.tokens.push(new Token(char));
            } else {
                expr += char;
            }
        }
        if(expr) this.tokens.push(new Token(expr));
        console.log(this.tokens)
    }
}

export default Lexer;