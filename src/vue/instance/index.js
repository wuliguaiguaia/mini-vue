
import { proxy } from './../util/index';
import { observe } from './../observer/index';
import { Watcher } from './../watcher/index';
import { compile } from './../compile/index';
// import { patch } from './../vdom/patch';

class Vue {
  constructor (options) {
    if (!options) return;
    this._init(options);
  }

  _init (options) {
    const vm = this;
    this.$options = options;
    this.initState(vm);
    vm._watchers = []; // 存储当前vm下的所有watcher
    this.mount(vm, options); // 实例挂载
  }

  initState (vm) {
    const { data, methods, watch, computed } = this.$options;
    if (data) this.initData(vm, data);
    if (methods) this.initMethods(vm, methods);
    if (watch) this.initWatch(vm, watch);
    if (computed) this.initComputed(vm, computed);
  }

  initData (vm, data) {
    vm.$data = data;
    proxy(vm, '$data', data); // 将this.xxx 转发到this.$data.xxx 下
    observe(data); // 进行响应式
  }

  initMethods (vm, methods) {}

  initWatch (vm, watch) {}

  initComputed (vm, computed) {}

  mount (vm, options) {
    let { el, template } = options;
    if (el) {
      template = document.querySelector(el).outerHTML; // 如果el存在，取其outerHTML
    }
    console.log(template);
    const { render } = compile(template); // 获取 render 函数
    vm._render = render;

    vm.$el = el; // 初始化 $el

    const updateComponent = () => {
      const vnode = vm._render(); // 生成vnode
      vm._update(vm, vnode); // 视图渲染
    };

    vm._watcher = new Watcher(vm, updateComponent, true /* render watcher */);
  }

  _update (vm, vnode) { }
}

export default Vue;
