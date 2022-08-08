import { addVnodes, createElm, nodeOps, removeVnodes } from "./nodeOps";

export function patch(oldVnode, vnode, parentElm, vm ) {
  if (!oldVnode) {
    addVnodes(parentElm, null, [vnode], 0, 0, vm)
  } else if (!vnode) {
    removeVnodes(parentElm, [oldVnode], 0, 0);
  } else {
    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, vm);
    } else {
      removeVnodes(parentElm, [oldVnode], 0, 0);
      addVnodes(parentElm, null, [vnode], 0, 0, vm);
    }
  }
  return vnode.elm
}

function sameVnode(a,b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    (!!a.data) === (!!b.data) &&
    sameInputType(a, b)
  )
}

function sameInputType(a, b) {
  if (a.tag !== 'input') return true
  let i
  const typeA = (i = a.data) && (i = i.attrs) && i.type
  const typeB = (i = b.data) && (i = i.attrs) && i.type
  return typeA === typeB
}


export function patchVnode(oldVnode, vnode, vm) {
  if (oldVnode === vnode) {
    return;
  }

  // 如果是静态节点且key相等，更新 新的 vnode 的elm即可
  if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
    vnode.elm = oldVnode.elm;
    vnode.componentInstance = oldVnode.componentInstance;
    return;
  }

  // 既然是同一节点，旧节点的 elm 复制给新的
  const elm = vnode.elm = oldVnode.elm;
  const oldCh = oldVnode.children;
  const ch = vnode.children;

  // 文本节点直接修改
  if (vnode.text) {
    nodeOps.setTextContent(elm, vnode.text);
  } else {
    if (oldCh && ch && (oldCh !== ch)) {  // 如果都有子节点，更新children
      updateChildren(elm, oldCh, ch, vm);
    } else if (ch) {  // 如果新vnode有子节点
      if (oldVnode.text) nodeOps.setTextContent(elm, ''); // 先删除旧文本节点
      addVnodes(elm, null, ch, 0, ch.length - 1, vm); // 再重新添加所有新的子节点
    } else if (oldCh) { // 如果旧vnode有子节点直接删除
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    } else if (oldVnode.text) { // 如果旧节点是文本节点就删除了
      nodeOps.setTextContent(elm, '')
    } else if (oldVnode.tag === 'input') {  // 其他情况比如如果是 input 修改 value，这里简化先这样写了
      nodeOps.setValue(elm, vnode.data.domProps.value)
    }
  }
}

function updateChildren(parentElm, oldCh, newCh, vm) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx, idxInOld, elmToMove, refElm;

  // 新旧节点都从 startIdx、 endIndex 向中间靠拢
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx];
      // 以下是 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 两两比对
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 头部是同一节点直接比对
      patchVnode(oldStartVnode, newStartVnode, vm);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 尾部是同一节点直接比对
      patchVnode(oldEndVnode, newEndVnode, vm);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // 旧头 和 新尾是同一节点，顺序调换了，那元素就要向后插入
      patchVnode(oldStartVnode, newEndVnode, vm);
      nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // 新头 和 旧尾是同一节点，那元素就要向前插入
      patchVnode(oldEndVnode, newStartVnode, vm);
      nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 以上都不符合，就要开始搜索
      // 拿到 key 与 index 的映射
      if (!oldKeyToIdx) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null;
      // 新节点没有key，就直接创建
      if (!idxInOld) {
        createElm(newStartVnode, parentElm, null, vm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        let elmToMove = oldCh[idxInOld];
        if (sameVnode(elmToMove, newStartVnode)) {
          // 直接拿出来比较，把原先的置空，将元素向前插入
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          // 没有key相同的节点，直接创建
          createElm(newStartVnode, parentElm, null, vm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
  }

  if (oldStartIdx > oldEndIdx) { // 老节点比对完了，新节点往中间插入
    refElm = (newCh[newEndIdx + 1]) ? newCh[newEndIdx + 1].elm : null;
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, vm);
  } else if (newStartIdx > newEndIdx) { // 新节点比对完了，删除老节点
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
