import { proxy } from './../util/index';
import { observe } from './../observer/index';
import { Watcher } from './../watcher/index';
import { compile } from './../compile/index';
import { patch, patchVnode } from '../vdom/patch';
import { createEmptyVNode, createTextVNode, createVNode, toString } from '../vdom/VNode';

class Vue {
  constructor(options) {
    if (!options) return;
    this._init(options);
  }

  _init(options) {
    const vm = this;
    this.$options = options;
    this.initState(vm);
    vm._watchers = []; // 存储当前vm下的所有watcher
    this.mount(vm, options); // 实例挂载
  }

  initState(vm) {
    const { data, methods, watch, computed } = this.$options;
    if (data) this.initData(vm, data);
    if (methods) this.initMethods(vm, methods);
    if (watch) this.initWatch(vm, watch);
    if (computed) this.initComputed(vm, computed);
  }

  initData(vm, data) {
    vm.$data = data;
    proxy(vm, '$data', data); // 将this.xxx 转发到this.$data.xxx 下
    observe(data); // 进行响应式
  }

  initMethods(vm, methods) {
    Object.keys(methods).forEach(key => {
      Object.defineProperty(vm, key, {
        get() {
          return methods[key];
        }
      });
    });
  }

  initWatch(vm, watch) { }

  initComputed(vm, computed) { }

  mount(vm, options) {
    let { el, template } = options;
    if (el) {
      template = document.querySelector(el).outerHTML; // 如果el存在，取其outerHTML
    }
    const { render } = compile(template); // 获取 render 函数
    vm._render = render;

    vm.$el = document.querySelector(el); // 初始化 $el
    vm.$el.innerHTML = ''

    const updateComponent = () => {
      const vnode = vm._render(); // 生成vnode
      vm._update(vm, vnode); // 视图渲染
    };

    vm._watcher = new Watcher(vm, updateComponent, true /* render watcher */);
  }

  _update(vm, vnode) {
    const preVnode = vm._vnode
    vm._vnode = vnode
    vnode.elm = this.$el
    if (!preVnode) { // 初次渲染
      vm.$el = vm.__patch__(null, vnode)
    } else { // 更新后的渲染
      vm.$el = vm.__patch__(preVnode,vnode)
    }
  }

  __patch__(oldVnode, vnode) {
    console.log('oldVnode', oldVnode);
    console.log('vnode', vnode);
    return patch(oldVnode, vnode, this.$el, this)
  }
}


Vue.prototype._c = createVNode
Vue.prototype._v = createTextVNode
Vue.prototype._s = toString

export default Vue;


/* _c('div',
  { attrs: { id: "app", }, },
  [
    _v("\n    "),
    _c('h1',
      { staticClass: "title" },
      [_v("" + _s(msg) + "")]),
    _v("\n    "),
    _c('input',
      {
        attrs: { type: "text", },
        directives: [{ "name": "model", "value": "count", "modifiers": { "lazy": true } }],
        on: { change: function ($event) { count = $event.target.value }, },
      }, undefined),
    _v("\n    "),
    _c('button',
      { on: { click: changeCount, }, },
      [_v("click me!")]), _v("\n  ")
  ]
) */
