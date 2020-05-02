import { AST, Node } from './ast.js';

class Parser {
    constructor(ast) {
        this.ast = ast;
    }

    setAst(ast) {
        this.ast = ast;
    }
    
    parse(ast) {
        return ast.root.resolve();
    }
}

export default Parser;