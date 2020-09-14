/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vue */ \"./src/vue/index.js\");\n\nlet vm = new _vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    el: '#app',\n    data: {\n        msg: 'hello xiaoqiao',\n        a: {b:{f:0}}\n    },\n    created () {},\n    mounted () {},\n    watch: {}\n})\n\nconsole.log(vm.msg);\nvm.msg = {d:4}\nconsole.log(vm.$data.msg);\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/vue/compile/generate.js":
/*!*************************************!*\
  !*** ./src/vue/compile/generate.js ***!
  \*************************************/
/*! exports provided: generate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generate\", function() { return generate; });\nconst generate  = () => {\n    let render = function () {}\n    return {\n        render\n    }\n}\n\n//# sourceURL=webpack:///./src/vue/compile/generate.js?");

/***/ }),

/***/ "./src/vue/compile/index.js":
/*!**********************************!*\
  !*** ./src/vue/compile/index.js ***!
  \**********************************/
/*! exports provided: compile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compile\", function() { return compile; });\n/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse */ \"./src/vue/compile/parse.js\");\n/* harmony import */ var _optimize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./optimize */ \"./src/vue/compile/optimize.js\");\n/* harmony import */ var _generate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generate */ \"./src/vue/compile/generate.js\");\n\n\n\n\nconst compile = (template) => {\n    let ast = Object(_parse__WEBPACK_IMPORTED_MODULE_0__[\"parse\"])(template);\n    let astHaveStaicTag = Object(_optimize__WEBPACK_IMPORTED_MODULE_1__[\"optimize\"])(ast);\n    let code = Object(_generate__WEBPACK_IMPORTED_MODULE_2__[\"generate\"])(astHaveStaicTag);\n    return { \n        render: code.render\n    }    \n}\n\n//# sourceURL=webpack:///./src/vue/compile/index.js?");

/***/ }),

/***/ "./src/vue/compile/optimize.js":
/*!*************************************!*\
  !*** ./src/vue/compile/optimize.js ***!
  \*************************************/
/*! exports provided: optimize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"optimize\", function() { return optimize; });\nconst optimize = () => {};\n\n\n//# sourceURL=webpack:///./src/vue/compile/optimize.js?");

/***/ }),

/***/ "./src/vue/compile/parse.js":
/*!**********************************!*\
  !*** ./src/vue/compile/parse.js ***!
  \**********************************/
/*! exports provided: parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parse\", function() { return parse; });\nconst parse = () => {\n    \n};\n\n\n//# sourceURL=webpack:///./src/vue/compile/parse.js?");

/***/ }),

/***/ "./src/vue/dep/index.js":
/*!******************************!*\
  !*** ./src/vue/dep/index.js ***!
  \******************************/
/*! exports provided: Dep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dep\", function() { return Dep; });\nlet uid = 0;\n\nclass Dep {\n    constructor (key) {\n        this.id = uid++;\n        // 用来存储 watcher 对象\n        this.subs = [];\n        this.key = key; // 以便知道是哪个数据订阅的，如果有同名属性不严格准确\n    } \n    \n    depend (watcher) {\n        if(Dep.target) {\n            Dep.target.addDep(this) // 为当前观察者增加订阅者,\n            // 在watcher.addDep内进行是否重复添加的判断后会调用addSub\n        }\n    }\n\n    addSub (watcher) {\n        this.subs.push(watcher);\n    }\n\n    notify () {\n        const subs = this.subs.slice() // 不深复制会怎样\n        subs.forEach(watcher => {\n            watcher.update();\n        })\n    }\n}\n\nDep.target = null; // 初始化Dep.target\n\n//# sourceURL=webpack:///./src/vue/dep/index.js?");

/***/ }),

/***/ "./src/vue/index.js":
/*!**************************!*\
  !*** ./src/vue/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _instance_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instance/index */ \"./src/vue/instance/index.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_instance_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/vue/index.js?");

/***/ }),

/***/ "./src/vue/instance/index.js":
/*!***********************************!*\
  !*** ./src/vue/instance/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../util/index */ \"./src/vue/util/index.js\");\n/* harmony import */ var _observer_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../observer/index */ \"./src/vue/observer/index.js\");\n/* harmony import */ var _watcher_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../watcher/index */ \"./src/vue/watcher/index.js\");\n/* harmony import */ var _compile_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../compile/index */ \"./src/vue/compile/index.js\");\n/* harmony import */ var _vdom_patch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../vdom/patch */ \"./src/vue/vdom/patch.js\");\n\n\n\n\n\n\n\n\n\nclass Vue {\n  constructor(options) {\n    if (!options) return;\n    this._init(options);\n  }\n\n  _init(options) {\n    const vm = this;\n    this.$options = options;\n    this.initState(vm);\n    vm._watchers = []; // 存储当前vm下的所有watcher\n    this.mount(vm, options); // 实例挂载\n  }\n\n  initState(vm) {\n    const { data, methods, watch, computed } = this.$options;\n    if (data) this.initData(vm, data);\n    if (methods) this.initMethods(vm, methods);\n    if (watch) this.initWatch(vm, watch);\n    if (computed) this.initComputed(vm, computed);\n  }\n\n  initData(vm, data) {\n    vm.$data = data;\n    Object(_util_index__WEBPACK_IMPORTED_MODULE_0__[\"proxy\"])(vm, '$data', data); // 将this.xxx 转发到this.$data.xxx 下\n    Object(_observer_index__WEBPACK_IMPORTED_MODULE_1__[\"observe\"])(data); // 进行响应式\n  }\n\n  initMethods(vm, methods) {}\n\n  initWatch(vm, watch) {}\n\n  initComputed(vm, computed) {}\n\n  mount(vm, options) {\n    let { el, template } = options;\n    if (el) {\n      template = el.outerHTML; // 如果el存在，取其outerHTML\n    }\n\n    let { render } = Object(_compile_index__WEBPACK_IMPORTED_MODULE_3__[\"compile\"])(template); // 获取 render 函数\n    vm._render = render;\n\n    vm.$el = el; // 初始化 $el\n\n    const updateComponent = () => {\n      const vnode = vm._render(); // 生成vnode\n      vm._update(vm, vnode); // 视图渲染\n    };\n\n    new _watcher_index__WEBPACK_IMPORTED_MODULE_2__[\"Watcher\"](vm, updateComponent, true /* render watcher*/);\n  }\n\n  _update(vm, vnode) { }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Vue);\n\n//# sourceURL=webpack:///./src/vue/instance/index.js?");

/***/ }),

/***/ "./src/vue/observer/index.js":
/*!***********************************!*\
  !*** ./src/vue/observer/index.js ***!
  \***********************************/
/*! exports provided: observe, defineReactive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"observe\", function() { return observe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defineReactive\", function() { return defineReactive; });\n/* harmony import */ var _dep_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../dep/index */ \"./src/vue/dep/index.js\");\n/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../util/index */ \"./src/vue/util/index.js\");\n\n\n\nconst observe = (data) => {\n  if (!data) return;\n  let ob;\n  console.log(data);\n  // 这里就只对object进行响应式\n  if (Object(_util_index__WEBPACK_IMPORTED_MODULE_1__[\"getType\"])(data) === \"object\") {\n    // 通过是否有 __ob__ 属性判断是否已经响应式过\n    if (data.hasOwnProperty(\"__ob__\") && data.__ob__ instanceof Observer) {\n      ob = data.__ob__; // 已经响应式过了，返回__ob__\n    } else {\n      ob = new Observer(data);\n    }\n  }\n  return ob;\n};\n\nclass Observer {\n    constructor(data) {\n        data.__ob__ = this; // 将当前observer属性方法挂载在this.value.__ob__, 一方面是为了表示已经响应式过了\n        this.walk(data); // 开始监听\n    }\n\n    walk(data) {\n        Object.keys(data).forEach(key => {\n            !(data[key] instanceof Observer) &&  defineReactive(data, key);\n        })\n    }\n}\n\nconst defineReactive = (obj, key) => {\n    const dep = new _dep_index__WEBPACK_IMPORTED_MODULE_0__[\"Dep\"](key); // 每个响应式数据都有一个dep实例，用来收集watcher\n    let value = obj[key];\n    observe(value); // 递归观察\n    Object.defineProperty(obj, key, {\n        enumerable: true, // 可枚举\n        configurable: true, // 可修改和删除\n        get() {\n            if(_dep_index__WEBPACK_IMPORTED_MODULE_0__[\"Dep\"].target) { // 当前 watcher 实例，全局只有一个\n                dep.depend(_dep_index__WEBPACK_IMPORTED_MODULE_0__[\"Dep\"].target); // 数据获取时增加观察者\n            }\n            return value\n        },\n        set(newValue) { // 嵌套函数 this 会丢失\n            if (newValue === value) {\n                return;\n            }\n            observe(newValue); // 如果新值仍是对象\n            value = newValue;\n            /* 在set的时候触发notify来通知所有的Watcher对象更新视图 */\n            dep.notify();\n        }\n    })\n}\n\n\n//# sourceURL=webpack:///./src/vue/observer/index.js?");

/***/ }),

/***/ "./src/vue/util/index.js":
/*!*******************************!*\
  !*** ./src/vue/util/index.js ***!
  \*******************************/
/*! exports provided: proxy, getType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"proxy\", function() { return proxy; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getType\", function() { return getType; });\nconst proxy = (vm, source, data) => {\n    Object.keys(data).forEach(key => {\n        let item = data[key];\n        Object.defineProperty(vm, key, {\n          get() {\n            return item;\n          },\n          set(newVal) {\n              console.log(vm);\n            vm[source][key] = newVal; \n          },\n        });\n    })\n}\n\nconst getType = data => {\n    return /\\[object (.+)\\]/.exec(Object.prototype.toString.call(data))[1].toLowerCase();\n}\n\n//# sourceURL=webpack:///./src/vue/util/index.js?");

/***/ }),

/***/ "./src/vue/vdom/patch.js":
/*!*******************************!*\
  !*** ./src/vue/vdom/patch.js ***!
  \*******************************/
/*! exports provided: patch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"patch\", function() { return patch; });\nconst patch = () => {}\n\n//# sourceURL=webpack:///./src/vue/vdom/patch.js?");

/***/ }),

/***/ "./src/vue/watcher/index.js":
/*!**********************************!*\
  !*** ./src/vue/watcher/index.js ***!
  \**********************************/
/*! exports provided: Watcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Watcher\", function() { return Watcher; });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dep */ \"./src/vue/dep/index.js\");\n\n\nlet uid = 0;\n\nclass Watcher {\n    constructor(vm, cb, isRenderWatcher) {\n        this.id = uid++;\n        if (isRenderWatcher) { \n            vm._watcher = this;\n        }\n        vm.watchers.push(this);\n        this.cb = cb;\n\n        _dep__WEBPACK_IMPORTED_MODULE_0__[\"Dep\"].target = this;\n        \n    }\n}\n\n//# sourceURL=webpack:///./src/vue/watcher/index.js?");

/***/ })

/******/ });