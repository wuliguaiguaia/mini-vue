const compiler = require('vue-template-compiler')
const template = `<div id="app">
    <h1 class="title">{{msg}}</h1>
    <input type="text" v-model.lazy="count">
    <button @click="changeCount">click me!</button>
  </div>`
const data = compiler.compile(template)

console.log(data);


/* with (this) {
  return _c('div',
    { attrs: { "id": "app" } },
    [
      _c('h1',
        { staticClass: "title" },
        [
          _v(_s(msg))]),
      _v(" "),
      _c('input',
        {
          directives: [
            {
              name: "model",
              rawName: "v-model.lazy",
              value: (count),
              expression: "count",
              modifiers: { "lazy": true }
            }
          ],
          attrs: { "type": "text" },
          domProps: { "value": (count) },
          on: { "change": function ($event) { count = $event.target.value } }
        }),
      _v(" "),
      _c('button',
        { on: { "click": changeCount } },
        [_v("click me!")]
      )
    ]
  )
} */
