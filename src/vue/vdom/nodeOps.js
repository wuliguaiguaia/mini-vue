export const WebNodeOps = {
  createElement(tagName) {
    return document.createElement(tagName)
  },
  insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode)
  },
  appendChild(parentNode, newNode) {
    parentNode.appendChild(newNode)
  },
  removeChild(node, child) {
    node.removeChild(child)
  },
  parentNode(node) {
    return node.parentNode
  },
  nextSibling(node) {
    return node.nextSibling
  },
  tagName(node) {
    return node.tagName
  },
  setTextContent(node, text) {
    node.textContent = text
  },
  createTextNode(text) {
    return document.createTextNode(text)
  },
  setValue(elm, value) {
    elm.value = value
  }
}


const WeexNodeOps = {
  createElement(tagName) {
  },
  insertBefore(parentNode, newNode, referenceNode) { }
  // ...
}

export function createNodeOps(platform) {
  switch (platform) {
    case 'web':
      return WebNodeOps;
    case 'weex':
      return WeexNodeOps
  }
}


export const nodeOps = createNodeOps('web')


export function insert(parent, el, vnode, ref, vm) {
  console.log('---');
   if (parent) {
    if (ref) {
      if (ref.parentNode === parent) {
        nodeOps.insertBefore(parent, el, ref);
      }
    } else {
       nodeOps.appendChild(parent, el)
    }
  }

  if (vnode.tag && vnode.data) {
    const {
      data: {
        directives,
        on,
        domProps
      },
    } = vnode

    if (on) {
      Object.keys(on).forEach(key => {
        el.addEventListener(key, on[key].bind(vm))
      })
    }
    if (directives) {
      directives.forEach(({ name, value, modifiers }) => {
        el.value = domProps.value
      })
    }

    if (vnode.data.attrs) {
      const {
        staticClass, id, type
      } = vnode.data.attrs
      if (staticClass) el.class = staticClass
      if (id) el.id = id
      if (type) el.type = type
    }
  }
  return el
}

export function createElm(vnode, parentElm, refElm, vm) {
  if (vnode.tag) {
    return insert(parentElm, nodeOps.createElement(vnode.tag), vnode, refElm, vm);
  } else {
    return insert(parentElm, nodeOps.createTextNode(vnode.text), vnode, refElm, vm);
  }
}

export function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, vm) {
  for (; startIdx <= endIdx; ++startIdx) {
    const vnode = vnodes[startIdx]
    const elm = createElm(vnode, parentElm, refElm, vm);
    vnode.elm = elm
    if (vnode.children?.length) {
      addVnodes(elm, null, vnode.children, 0, vnode.children.length - 1, vm)
    }
  }
}

export function removeNode(el) {
  const parent = nodeOps.parentNode(el);
  if (parent) {
    nodeOps.removeChild(parent, el);
  }
}

export function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]
    if (ch) {
      removeNode(ch.elm);
    }
  }
}
