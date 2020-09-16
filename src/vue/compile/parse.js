import { noDireKeys, isUnaryTag, elSpecialAttr} from "constants/index";

const isFirstElement = /^\s*</;
const tagStart = /^<([a-z\-0-9]+)\s+([^>]+)\/?>/i;
const tagEnd = /^<\/([a-z\-0-9]+)>/i;
const text = /[^<>]+/;
const expr = /\{\{([\w\.]+)\}\}/g;
const forExpr = /(.*)\s+(?:in|of)\s+(.*)/;
const attrRE = /([^'"=\(\)]+)\s*(\=\s*["']?([^"']+)["']?)?\/?/g;

let stack = [];
let root;
let currentParent;

const parseDirectivesUtils = {
    model(element, val, expr) {
        element.events.change = {
            value: `${expr}=$event.target.value`
        }
    },

    on(element, val, expr, modifiers) {
        let name = `${val}`;
        element.events[name] = {
            value: expr,
            modifiers
        }
    },

    bind(element, val, expr, modifiers) {
        if (elSpecialAttr.includes(val)) {
            element[val] = expr;
        }
        if (modifiers?.sync) {
            let name = `update:${val}`
            element.events[name] = {
                value: `${expr}=$event`,
            }
        }
    },

    if(element, _, expr) {
        element.if = expr;
        // if (!element.ifConditions) { // 一个元素节点会有多个if吗？
        //     element.ifConditions = [];
        // }
        element.ifCondition = { 
            exp: expr,
            block: element
        }
    },
    
    for(element, _, expr) {
        if (forExpr.exec(expr)) {
            element.forCondition = RegExp.$1;
            element.for = RegExp.$2;
            let [alias, iterator] = RegExp.$1.split(",");
            element.alias = alias.trim().replace('(', '');
            element.iterator = iterator?.trim().replace(')', '');
        }
    },

    // once
};

const parseDirectives = (element, keyStr, argStr, expr) => {
    let [dire, ...dirModifiers] = keyStr.split(".");
    let [arg, ...argMofifiers] = argStr?.split('.') ?? [];
    let modifiers = [...dirModifiers, ...argMofifiers].reduce((res, item) => { // 会同时出现吗？
        res[item] = true;
        return res;
    }, {});

    if(!element.directives) { 
        element.directives = []; 
    }
    if (!element.events) {
        element.events = {};
    }

    let direItem = {
        name: dire,
        value: expr,
        modifiers
    }

    if(Object.keys(parseDirectivesUtils).includes(dire)){
        parseDirectivesUtils[dire](element, arg, expr, modifiers)
    }

    if (!noDireKeys.includes(dire)) {
        element.directives.push(direItem);
    }

    element.hasBindings = true; // 动态绑定
}

const parseAttrs = (element, str) => {
    str.replace(attrRE, (match, $1, _, $3) => {
        match = match.trim().replace('/','');
        if(match.includes('=')) {
            let [key, val] = [$1.trim(), $3.trim()];
            element.attrs[key] = val;
            if (key.startsWith("v-")) {
                key = key.slice(2).split(":"); //
                parseDirectives(element, key[0], key[1], val); // model.lazy, undefined, 
            } else if (key.startsWith("@")) {
                parseDirectives(element, 'on', key.slice(1), val); // on, click.passive, change
            } else if (key.startsWith(":")) {
                parseDirectives(element, 'bind', key.slice(1), val); // bind, data.sync, 
            } else if (elSpecialAttr.includes(key)) {
                if(key === 'class') {
                    element.staticClass = val
                } else {
                    element[key] = val;
                }
            }
        } else {
            element.attrs[match] = true;
        }
    })
}

const parseStartTag = (matches) => {
    const element = {
        type: 1,
        tag: matches[1],
        attrs: {},
        children: []
    }
    if(currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
    } else {
        root = element;
    }

    if (!isUnaryTag.includes(element.tag)) { //自闭合标签不入栈
        currentParent = element;
        stack.push(element);
    }

    const attrStr = matches[2];
    if (attrStr) parseAttrs(element, attrStr.trim());
}

const parseEndTag = (matches) => {
  let endTag = matches[1];
  
  for(let len = stack.length, i = len - 1; i < len; i--){
    let element = stack[i];
    if (element.tag.toLowerCase() !== endTag.toLowerCase()) {
      element.parent.children.push
      stack.pop();
    } else {
      currentParent = stack.pop().parent;
      return;
    }
  }
};

const parseText = (matches) => {
    const textNode = {
        text: matches[0],
        type: 3,
        expression: ''
    }
    if(currentParent) {
        currentParent.children.push(textNode);
    }
    if(expr.test(matches[0])) {
        textNode.type = 2;
        textNode.expression = '"' + matches[0].replace(expr, (_, $1) => {
            return `"+_s(${$1})+"`
        }) + '"' ;
    }
};


export const parse = template => {
    let matches = [];
    let html = template.trim();
    if(isFirstElement.test(html)) { // 必须以元素开头
        while(html) {
            if(matches = html.match(tagStart)) {
                html = html.slice(matches[0].length);                
                parseStartTag(matches);
            } else if (matches = html.match(tagEnd)){
                html = html.slice(matches[0].length);                
                parseEndTag(matches)
            } else if(matches = html.match(text)) {
                html = html.slice(matches[0].length);                
                parseText(matches);
            }
        }
    }
    return root;
};

// TODO: 
// 1. 注释节点
