const isStatic = (node) => {
    if(node.type === 2){ 
        return false;
    }
    if(node.type === 3) {
        return true;
    }  
    return !node.if 
        && !node.for
        && !node.hasBindings ;
           
}

const makeStatic = node => {
    node.static = isStatic(node);
    if(node.type === 1) {
       node.children.forEach(child => {
           makeStatic(child);
           if(!child.static) {
               node.static = false;
           }
       }) 
    }
}

const makeRootStatic = node => {
    if(node.type === 1){
        if (node.static && node.children.length && !( // 静态的，有子节点，子节点不能只有一个而且还是文本节点？？
            node.children.length === 1 &&
            node.children[0].type === 3
        )){
            node.staticRoot = true; // 具体有什么优化有待考量
            return
        } else {
            node.staticRoot = false;
        }
        node.children.forEach(child => {
            makeRootStatic(child);
        }) 
    }
}

export const optimize = root => {
    if(!root) return;
    makeStatic(root);
    makeRootStatic(root);
    return root;
};
