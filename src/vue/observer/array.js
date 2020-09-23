const proto = Array.prototype;
const patchMethods = [
  'pop',
  'push',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse'
];

export const arrayMethods = Object.create(proto);

patchMethods.forEach(method => {
  const original = proto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function (...args) {
      const result = original.apply(this, args);
      const ob = this.__ob__;
      let inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2);
          break;
      }
      if (inserted) {
        ob.observeArray(inserted);
      }
      ob.dep.notify(); // 通知
      return result;
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
});
