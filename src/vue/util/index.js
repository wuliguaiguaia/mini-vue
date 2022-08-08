export const proxy = (vm, source, data) => {
  Object.keys(data).forEach(key => {
    Object.defineProperty(vm, key, {
      get () {
        return vm[source][key];
      },
      set(newVal) {
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
