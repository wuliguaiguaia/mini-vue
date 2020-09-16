import { elSpecialAttr } from 'constants/index';

const genUtil = {
  element (el, state) {
    if (el.staticRoot && !el.staticProcessed) { // 静态根节点
      return this.static(el, state);
    } else if (el.for && !el.forProcessed) { // for 在 if前
      return this.for(el, state);
    } else if (el.if && !el.ifProcessed) { // if
      return this.if(el, state);
    } else {
      const data = this._data(el, state);
      const children = this.children(el, state);
      return `_c('${el.tag}', ${data}, ${children})`;
    }
  },
  static (el, state) {
    el.staticProcessed = true;
    state.staticRenderFns.push(`with(this){return ${this.element(el, state)}}`); // ?
    return `_m(${state.staticRenderFns.length - 1})`; // ?
  },

  for (el, state) {
    el.forProcessed = true;
    const { alias, iterator } = el;
    return `_l(${el.for}, function(${alias}, ${iterator}) {
            retrun ${this.element(el, state)};
        })`;
  },

  if (el, state) {
    el.ifProcessed = true;
    let code;
    const { exp, block } = el.ifCondition;
    if (exp) {
      code = `${exp} ? ${this.element(block, state)} : _e()`;
    } else {
      code = this.element(block, state);
    }
    return code;
  },

  children (el, state) {
    const { children } = el;
    if (children?.length) {
      return `[${children.map(c => this.vnode(c, state)).join(',')}]`;
    }
  },

  vnode (node, state) {
    if (node.type === 1) {
      return this.element(node, state);
    } else {
      return this.text(node);
    }
  },

  text (node) {
    const { type, text } = node;
    return `_v(${type === 2 ? node.expression : JSON.stringify(text)})`; // JSON.stringify 防止意外
  },

  _data (el, state) {
    const { attrs, directives, events, key, staticClass } = el;
    let code = '';
    if (Object.keys(attrs).length) {
      let attrCode = ''; let domProps = '';
      Object.keys(attrs).forEach(name => {
        const val = attrs[name];
        if (name.startsWith(':')) {
          if (!elSpecialAttr.includes(name.slice(1))) {
            domProps += `${name.slice(1)}:${val}`;
          }
        } else if (name === 'v-model') {
          domProps += `value:(${val})`;
        } else if (!/v-|@/.test(name) && !elSpecialAttr.includes(name)) {
          attrCode += `${name}:"${val}",`;
        }
      });
      if (attrCode) {
        code += `attrs: {${attrCode}},`;
      }
      if (domProps) {
        code += `domProps: {${domProps}},`;
      }
    }

    if (directives?.length) {
      code += `directives:${JSON.stringify(directives)},`;
    }

    if (events) {
      let eventCode = '';
      Object.keys(events).forEach(name => {
        const event = events[name];
        const { value } = event;
        // 暂不判断 modifiers
        if (/^[a-z_$][\w]+$/i.test(value)) { // in methods
          eventCode += `${name}:${value},`;
        } else {
          eventCode += `${name}:function($event){${value}},`;
        }
      });
      code += eventCode ? `on:{${eventCode}},` : '';
    }

    if (key) {
      code += `key:${key}`;
    }

    if (staticClass) {
      code += `staticClass:"${staticClass}"`;
    }

    return `{${code}}`;
  }
  // component() {},

  // once() {}
};

export class CodegenState {
  constructor () {
    this.staticRenderFns = [];
  }
}

export const generate = ast => {
  const state = new CodegenState();
  const code = ast ? genUtil.element(ast, state) : '_c("div")';
  return { // with 改变作用域
    render: function () {} || `with(this){ return ${code}}`
  };
};
