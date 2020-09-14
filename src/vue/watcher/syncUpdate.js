import { nextTick } from './../util/index'
let has = {};
let queue = [];
let isWaiting = false;

function flushSchedulerQueue() {
  queue.forEach(watcher => {
    has[watcher.id] = null;
    watcher.run();
  })

  has = {};
  queue.length = 0;
  waiting = false;
}

export const queueWatcher = (watcher) => {
  if (!has(watcher.id)) {
    has[id] = true;
    queue.push(watcher);
  }

  if (!waiting) {
    isWaiting = true;
    nextTick(flushSchedulerQueue);
  }
};

