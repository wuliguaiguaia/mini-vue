import { nextTick } from './../util/index';
let has = {};
const queue = [];
let isWaiting = false;

function flushSchedulerQueue () {
  queue.forEach(watcher => {
    has[watcher.id] = null;
    watcher.run();
  });

  has = {};
  queue.length = 0;
  isWaiting = false;
}

export const queueWatcher = (watcher) => {
  if (!has(watcher.id)) {
    has[watcher.id] = true;
    queue.push(watcher);
  }

  if (!isWaiting) {
    isWaiting = true;
    nextTick(flushSchedulerQueue);
  }
};
