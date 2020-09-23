
API 按需引入：tree-shaking 生效

# composition api vs options api
   options 会把代码切碎

# proxy
//proxy做代理
//reflect做反射，和proxy对应
//替代Object上的工具函数
//Object.getOwnPropertyNames(obj) == Reflect.ownKeys(obj)// 获取数组/对象的key,返回数组

weakmap 是弱引用，weakmap 可以保存 原对象和Proxy代理对象之间的关系
键值必须是对象，同时这个对象不计入垃圾回收机制 避免内存溢出


vue2 Object.defineProperty  无法拦截未知属性
vue3 proxy 快，可以拦截所有属性，兼容性差（只能走上面一个）

调用get，收集依赖：放在大的targetMap里面
set触发更新

targetmap 一个大的缓存


template: 解析成抽象语法树
   根据ast，用transform模板转化
   codeGen生成代码字符串string
    