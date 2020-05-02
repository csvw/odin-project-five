import Lexer from './lexer.js';
import { AST, Node } from './ast.js';

class Expression {
    constructor() {
        this.content = "";
        this.pendingSymbol = "";
        this.lexer = new Lexer();
    }

    evaluate() {
        this.lexer.buildTokens(this.content);
        let ast = new AST(this.lexer.tokens);
        let result = ast.root.resolve();
        this.lexer.clear();
        return result;
    }
}

export default Expression;