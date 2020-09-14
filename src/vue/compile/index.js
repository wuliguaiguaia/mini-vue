import { parse } from './parse';
import { optimize } from './optimize';
import { generate } from './generate';

export const compile = (template) => {
    let ast = parse(template);
    let astHaveStaicTag = optimize(ast);
    let code = generate(astHaveStaicTag);
    return { 
        render: code.render
    }    
}