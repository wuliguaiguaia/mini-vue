import { parse } from './parse';
import { optimize } from './optimize';
import { generate } from './generate';

export const compile = (template) => {
  const ast = parse(template);
  console.log(ast,'888');
  const astHaveStaicTag = optimize(ast);
  console.log(astHaveStaicTag,'ppp');
  const code = generate(astHaveStaicTag);
  console.log(code);
  return {
    render: code.render
  };
};
