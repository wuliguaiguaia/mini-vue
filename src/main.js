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
a = {
    attrs: {
        id: 'app'
    },
    children: [
        {
            attrs: {
                class: 'title',
                children: [
                    {
                        text: "{{msg}}",
                        type: 2
                    }
                ]
            },
            parent: '...',
            tag: 'h1',
            type: 1
        },
        {
            text: " ",
            type: 3
        },
        {
            attrs: {
                type: 'text',
                v-model: "msg",
            },
            children: [],
            directives: [
                {
                    name: 'model',
                    value: 'msg'
                }
            ],
            events: {
                input: {
                    value: "if($event.target.composing)return;msg=$event.target.value"
                }
            },
            parent: '...',
            props: {
                value: '(msg)',
            },
            tag: 'input',
            type: 1
        },
        {
            text: " ",
            type: 3
        },
        {
            attrs: {
                "@click": 'changeMsg'
            },
            children: [
                {
                    text: "click me!"
                    type: 3
                }
            ],
            events: {
                click: 'changeMsg'
            },
            parent: '...',
            tag: 'button',
            type: 1
        }
    ],
    parent: undefined,
    tag: 'div',
    type: 1
}