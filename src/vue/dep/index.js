let uid = 0;

export class Dep {
  constructor (key) {
    this.id = uid++;
    // 用来存储 watcher 对象
    this.subs = [];
    this.key = key; // 以便知道是哪个数据订阅的，如果有同名属性不严格准确
  }

  depend (watcher) {
    if (Dep.target) {
      Dep.target.addDep(this); // 为当前观察者增加订阅者,
      // 在watcher.addDep内进行是否重复添加的判断后会调用addSub
    }
  }

  addSub (watcher) {
    this.subs.push(watcher);
  }

  notify () {
    const subs = this.subs.slice(); // 不深复制会怎样
    subs.forEach(watcher => {
      watcher.update();
    });
  }
}

Dep.target = null; // 初始化Dep.target
