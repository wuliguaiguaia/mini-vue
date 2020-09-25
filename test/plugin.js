export const someplugin = {
  init () {
    console.log('plugin init');
  },
  install (Vue, options) {
    this.init(options);
  }
};
