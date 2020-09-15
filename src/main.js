import Vue from './vue';
const vm = new Vue({
    el: '#app',
    data: {
        msg: 'hello world!',
        count: 0
    },
    methods: {
        changeMsg() {
            this.msg = this.msg + this.count++;
        }
    }
})

console.log(vm.msg);
vm.msg = {d:4}
console.log(vm.$data.msg);