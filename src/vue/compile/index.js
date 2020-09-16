import { parse } from './parse';
import { optimize } from './optimize';
import { generate } from './generate';

export const compile = (template) => {
  const ast = parse(template);
  const astHaveStaicTag = optimize(ast);
  const code = generate(astHaveStaicTag);
  return {
    render: code.render
  };
};
