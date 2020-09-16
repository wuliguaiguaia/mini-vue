import { Dep } from './../dep/index'
import { getType } from "./../util/index";

export const observe = (data) => {
  if (!data) return;
  let ob;
  // 这里就只对object进行响应式
  if (getType(data) === "object") {
    // 通过是否有 __ob__ 属性判断是否已经响应式过
    if (data.hasOwnProperty("__ob__") && data.__ob__ instanceof Observer) {
      ob = data.__ob__; // 已经响应式过了，返回__ob__
    } else {
      ob = new Observer(data);
    }
  }
  return ob;     
};

class Observer {
    constructor(data) {
        data.__ob__ = this; // 将当前observer属性方法挂载在this.value.__ob__, 一方面是为了表示已经响应式过了
        this.walk(data); // 开始监听
    }

    walk(data) {
        Object.keys(data).forEach(key => {
            !(data[key] instanceof Observer) &&  defineReactive(data, key);
        })
    }
}

export const defineReactive = (obj, key) => {
    const dep = new Dep(key); // 每个响应式数据都有一个dep实例，用来收集watcher
    let value = obj[key];
    observe(value); // 递归观察
    Object.defineProperty(obj, key, {
        enumerable: true, // 可枚举
        configurable: true, // 可修改和删除
        get() {
            if(Dep.target) { // 当前 watcher 实例，全局只有一个
                dep.depend(Dep.target); // 数据获取时增加观察者
            }
            return value
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
    })
}
