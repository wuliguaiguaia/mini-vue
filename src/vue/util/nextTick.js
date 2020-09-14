let cbs = [];
let pending = false;

export const nextTick = (cb) => {
  cbs.push(cb);
  if (!pending) {
    pending = true;
    Promise.resolve().then(() => {
      // 优先使用Promise.resolve，MutationObserver次之，setImmediate再次之，setTimeout最次之
      // 这里就直接使用 promise了
      pending = false;
      const curCbs = cbs.slice();
      cbs.length = 0; // 清空
      cbs.forEach((fn) => {
        fn();
      });
    });
  }
};
