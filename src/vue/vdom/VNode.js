export class VNode {
  constructor(tag, data, children, text, isStatic = false, elm) {
    this.tag = tag;
    /* 当前节点的一些数据信息，比如props、attrs等数据 */
    this.data = data;
    this.children = children;
    this.text = text;
    /* 当前虚拟节点对应的真实dom节点 */
    this.elm = elm;
    this.isStatic = isStatic
  }
}

export function createVNode(tag, data, children, isStatic, elm) {
  return new VNode(tag, data, children, '', isStatic, elm)
}

export function createEmptyVNode() {
  const node = new VNode();
  node.text = '';
  return node;
}


export function createTextVNode(val, isStatic) {
  return new VNode(undefined, undefined, undefined, String(val), isStatic);
}

function cloneVNode(node) {
  const cloneVnode = new VNode(
    node.tag,
    node.data,
    node.children,
    node.text,
    node.elm
  );
  return cloneVnode;
}


export function toString(val){
    return val == null
      ? ''
      : Array.isArray(val) || Object.prototype.toString.call(val) === '[object Object]'
        ? JSON.stringify(val, null, 2)
        : String(val)
}
// function installRenderHelpers(target) {
//   target._o = markOnce;
//   target._n = toNumber;
//   target._s = toString;
//   target._l = renderList;
//   target._t = renderSlot;
//   target._q = looseEqual;
//   target._i = looseIndexOf;
//   target._m = renderStatic;
//   target._f = resolveFilter;
//   target._k = checkKeyCodes;
//   target._b = bindObjectProps;
//   target._v = createTextVNode;
//   target._e = createEmptyVNode;
//   target._u = resolveScopedSlots;
//   target._g = bindObjectListeners;
//   target._d = bindDynamicKeys;
//   target._p = prependModifier;
// }
