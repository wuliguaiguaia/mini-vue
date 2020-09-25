export const proxy = (vm, source, data) => {
  Object.keys(data).forEach(key => {
    const item = data[key];
    Object.defineProperty(vm, key, {
      get () {
        return item;
      },
      set (newVal) {
        vm[source][key] = newVal;
      }
    });
  });
};

export const getType = data => {
  return /\[object (.+)\]/.exec(Object.prototype.toString.call(data))[1].toLowerCase();
};

export { nextTick } from './nextTick';

export const initUse = Vue => {
  Vue.use = function (plugin, ...args) {
    const installedPlugins = Vue.prototype.installedPlugins || (Vue.prototype.installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return plugin;
    }
    installedPlugins.push(plugin);

    args.unshift(Vue);
    plugin.install.apply(plugin, args);
  };
};
