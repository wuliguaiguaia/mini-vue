import { Dep } from "../dep";
import { queueWatcher } from './syncUpdate';

let uid = 0;

export class Watcher {
  constructor(vm, cb, isRenderWatcher) {
    this.id = uid++;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm.watchers.push(this);
    this.cb = cb;
    this.deps = [];
    this.depsId = [];

    Dep.target = this;
    this.cb(); // 这里首次触发模板编译 并 收集依赖
    Dep.target = null; // 该watcher收集依赖使命结束
  }

  addDep(dep) {
    if (!this.depsId.includes(dep.id)) {
      // 防止重复
      this.depsId.push(dep.id);
      this.deps.push(dep);
      dep.addSub(this); // 为当前watcher增加订阅者
    }
  }

  update() {
    queueWatcher(this);
  }

  run() {
    this.cb();
  }
}
