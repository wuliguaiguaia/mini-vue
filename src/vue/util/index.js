export const proxy = (vm, source, data) => {
    Object.keys(data).forEach(key => {
        let item = data[key];
        Object.defineProperty(vm, key, {
          get() {
            return item;
          },
          set(newVal) {
            vm[source][key] = newVal; 
          },
        });
    })
}

export const getType = data => {
    return /\[object (.+)\]/.exec(Object.prototype.toString.call(data))[1].toLowerCase();
}

export {nextTick} from './nextTick'


