class Node {
    constructor(token) {
        this.token = token;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    resolve() {
        if(this.token.tokenType === 'numeric') {
            return this.token.value;
        } else {
            return this.operate(
                this.selectOperator(this.token.symbol),
                this.left.resolve(),
                this.right.resolve()
            );
        }
    }

    selectOperator(symbol) {
        switch(symbol) {
            case '+':
                return this.add;
            case '-':
                return this.subtract;
            case '/':
                return this.divide;
            case '%':
                return this.modulus;
            default:
                return this.multiply;
        }
    }

    operate(operator, a, b) {
        return operator(a, b);
    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    divide (a, b) {
        return b !== 0 ? a / b : undefined;
    }

    multiply(a, b) {
        return a * b;
    }

    modulus(a, b) {
        let forcePositiveMod = (a, b) => (a % b + b) % b;
        return b !== 0 ? forcePositiveMod(a, b) : undefined;
    }
}

class AST {
    constructor(tokens) {
        this.tokens = tokens;
        this.root = null;
        this.current = null;
        this.setPriorityLevels();
        this.buildTree();
    }

    setPriorityLevels() {
        let priorityLevel = 0;
        for(let token of this.tokens) {
            if(token.tokenType === 'parenLeft') {
                token.priority = 999999;
                priorityLevel += 100;
            }
            if(token.tokenType === 'parenRight') {
                token.priority = 999999;
                priorityLevel -= 100;
            }
            if(token.tokenType === 'operator') {
                let p = 0;
                switch(token.symbol) {
                    case '*':
                        p = 3;
                        break;
                    case '/':
                        p = 4;
                        break;
                    case '%':
                        p = 4;
                        break;
                    case '+':
                        p = 1;
                        break;
                    case '-':
                        p = 2;
                        break;
                }
                token.priority = priorityLevel + p;
            }
            if(token.tokenType === 'numeric') {
                token.priority = priorityLevel;
            }
        }
    }

    buildTree() {
        for(let token of this.tokens) {
            if(token.tokenType === 'parenLeft' || token.tokenType === 'parenRight') {
                continue;
            }
            if(token.tokenType === 'numeric') {
                if(this.root === null) {
                    this.root = new Node(token);
                    this.current = this.root;
                } else {
                    if(this.root.right === null) {
                        this.addOperandRightLeaf(token);
                    } else if(this.current.right === null) {
                        this.addOperandCurrent(token);
                    }
                }
            } else if(token.tokenType === 'operator') {
                if(this.current.token.tokenType === 'numeric') {
                    if(this.current.parent === null) {
                        this.addParentOfLeftLeaf(token);
                    } else {
                        if(token.priority > this.current.parent.token.priority) {
                            this.insertOperatorBetween(token);
                        } else {
                            this.addOperatorAbove(token);
                        }
                    }
                }
            }
        }
        console.log(this.root);
    }

    addOperatorAbove(token) {
        let newRoot = new Node(token);
        newRoot.left = this.root;
        this.root.parent = newRoot;
        this.root = newRoot;
    }

    insertOperatorBetween(token) {
        let insertion = new Node(token); // minus
        insertion.parent = this.current.parent; // plus
        insertion.left = this.current; // seven
        this.current.parent.right = insertion;
        this.current.parent = insertion;
        this.current = insertion;
    }

    addOperandRightLeaf(token) {
        this.root.right = new Node(token);
        this.root.right.parent = this.root;
        this.current = this.root.right;
    }

    addParentOfLeftLeaf(token) {
        let parentOperator = new Node(token);
        parentOperator.left = this.current;
        this.current.parent = parentOperator;
        this.current = parentOperator;
        this.root = this.current;
    }

    addOperandCurrent(token) {
        this.current.right = new Node(token);
        this.current.right.parent = this.current;
        this.current = this.current.right;
    }
}

export { AST, Node };