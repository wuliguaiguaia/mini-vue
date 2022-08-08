import Vue from './vue';
import { someplugin } from './../test/plugin';

// require('../test/index.js')
Vue.use(someplugin, { lazy: true });
Vue.use(someplugin, { lazy: true });

const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hello world!',
    count: 0
  },
  methods: {
    changeCount () {
      console.log(this, 'oooo')
      this.count++;
    }
  }
});

console.log('vm',vm);
