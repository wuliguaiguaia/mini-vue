import { Dep } from './../dep/index';
// import { getType } from './../util/index';
import { arrayMethods } from './array';

export const observe = (data) => {
  if (!data || typeof data !== 'object') return;
  let ob;
  // 通过是否有 __ob__ 属性判断是否已经响应式过
  if (data.hasOwnProperty('__ob__') && data.__ob__ instanceof Observer) {
    ob = data.__ob__; // 已经响应式过了，返回__ob__
  } else {
    ob = new Observer(data);
  }

  return ob;
};

class Observer {
  constructor (data) {
    this.dep = new Dep(data); // 数组会用

    // ob 不可枚举
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false,
      configurable: true,
      writable: true
    });

    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods;
      this.observeArray(data);
    } else {
      this.walk(data); // 开始监听
    }
  }

  walk (data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key]);
    });
  }

  observeArray (data) {
    Object.keys(data).forEach(key => {
      observe(data[key]);
    });
  }
}

export const defineReactive = (obj, key, value) => {
  const dep = new Dep(key); // 每个响应式数据都有一个dep实例，用来收集watcher

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && !property.configurable) return;

  value = value ?? obj[key];

  const childOb = observe(value); // 递归观察
  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可修改和删除
    get () {
      if (Dep.target) { // 当前 watcher 实例，全局只有一个
        dep.depend(); // 数据获取时增加观察者
        if (childOb) {
          // 预留
        }
      }
      return value;
    },
    set (newValue) { // 嵌套函数 this 会丢失
      if (newValue === value) {
        return;
      }
      observe(newValue); // 如果新值仍是对象
      value = newValue;
      /* 在set的时候触发notify来通知所有的Watcher对象更新视图 */
      dep.notify();
    }
  });
};
