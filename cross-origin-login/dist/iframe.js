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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/iframe.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/store2/dist/store2.js":
/*!********************************************!*\
  !*** ./node_modules/store2/dist/store2.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*! store2 - v2.10.0 - 2019-09-27\n* Copyright (c) 2019 Nathan Bubna; Licensed (MIT OR GPL-3.0) */\n;(function(window, define) {\n    var _ = {\n        version: \"2.10.0\",\n        areas: {},\n        apis: {},\n\n        // utilities\n        inherit: function(api, o) {\n            for (var p in api) {\n                if (!o.hasOwnProperty(p)) {\n                    Object.defineProperty(o, p, Object.getOwnPropertyDescriptor(api, p));\n                }\n            }\n            return o;\n        },\n        stringify: function(d) {\n            return d === undefined || typeof d === \"function\" ? d+'' : JSON.stringify(d);\n        },\n        parse: function(s) {\n            // if it doesn't parse, return as is\n            try{ return JSON.parse(s); }catch(e){ return s; }\n        },\n\n        // extension hooks\n        fn: function(name, fn) {\n            _.storeAPI[name] = fn;\n            for (var api in _.apis) {\n                _.apis[api][name] = fn;\n            }\n        },\n        get: function(area, key){ return area.getItem(key); },\n        set: function(area, key, string){ area.setItem(key, string); },\n        remove: function(area, key){ area.removeItem(key); },\n        key: function(area, i){ return area.key(i); },\n        length: function(area){ return area.length; },\n        clear: function(area){ area.clear(); },\n\n        // core functions\n        Store: function(id, area, namespace) {\n            var store = _.inherit(_.storeAPI, function(key, data, overwrite) {\n                if (arguments.length === 0){ return store.getAll(); }\n                if (typeof data === \"function\"){ return store.transact(key, data, overwrite); }// fn=data, alt=overwrite\n                if (data !== undefined){ return store.set(key, data, overwrite); }\n                if (typeof key === \"string\" || typeof key === \"number\"){ return store.get(key); }\n                if (typeof key === \"function\"){ return store.each(key); }\n                if (!key){ return store.clear(); }\n                return store.setAll(key, data);// overwrite=data, data=key\n            });\n            store._id = id;\n            try {\n                var testKey = '_-bad-_';\n                area.setItem(testKey, 'wolf');\n                store._area = area;\n                area.removeItem(testKey);\n            } catch (e) {}\n            if (!store._area) {\n                store._area = _.storage('fake');\n            }\n            store._ns = namespace || '';\n            if (!_.areas[id]) {\n                _.areas[id] = store._area;\n            }\n            if (!_.apis[store._ns+store._id]) {\n                _.apis[store._ns+store._id] = store;\n            }\n            return store;\n        },\n        storeAPI: {\n            // admin functions\n            area: function(id, area) {\n                var store = this[id];\n                if (!store || !store.area) {\n                    store = _.Store(id, area, this._ns);//new area-specific api in this namespace\n                    if (!this[id]){ this[id] = store; }\n                }\n                return store;\n            },\n            namespace: function(namespace, singleArea) {\n                if (!namespace){\n                    return this._ns ? this._ns.substring(0,this._ns.length-1) : '';\n                }\n                var ns = namespace, store = this[ns];\n                if (!store || !store.namespace) {\n                    store = _.Store(this._id, this._area, this._ns+ns+'.');//new namespaced api\n                    if (!this[ns]){ this[ns] = store; }\n                    if (!singleArea) {\n                        for (var name in _.areas) {\n                            store.area(name, _.areas[name]);\n                        }\n                    }\n                }\n                return store;\n            },\n            isFake: function(){ return this._area.name === 'fake'; },\n            toString: function() {\n                return 'store'+(this._ns?'.'+this.namespace():'')+'['+this._id+']';\n            },\n\n            // storage functions\n            has: function(key) {\n                if (this._area.has) {\n                    return this._area.has(this._in(key));//extension hook\n                }\n                return !!(this._in(key) in this._area);\n            },\n            size: function(){ return this.keys().length; },\n            each: function(fn, fill) {// fill is used by keys(fillList) and getAll(fillList))\n                for (var i=0, m=_.length(this._area); i<m; i++) {\n                    var key = this._out(_.key(this._area, i));\n                    if (key !== undefined) {\n                        if (fn.call(this, key, this.get(key), fill) === false) {\n                            break;\n                        }\n                    }\n                    if (m > _.length(this._area)) { m--; i--; }// in case of removeItem\n                }\n                return fill || this;\n            },\n            keys: function(fillList) {\n                return this.each(function(k, v, list){ list.push(k); }, fillList || []);\n            },\n            get: function(key, alt) {\n                var s = _.get(this._area, this._in(key));\n                return s !== null ? _.parse(s) : alt || s;// support alt for easy default mgmt\n            },\n            getAll: function(fillObj) {\n                return this.each(function(k, v, all){ all[k] = v; }, fillObj || {});\n            },\n            transact: function(key, fn, alt) {\n                var val = this.get(key, alt),\n                    ret = fn(val);\n                this.set(key, ret === undefined ? val : ret);\n                return this;\n            },\n            set: function(key, data, overwrite) {\n                var d = this.get(key);\n                if (d != null && overwrite === false) {\n                    return data;\n                }\n                return _.set(this._area, this._in(key), _.stringify(data), overwrite) || d;\n            },\n            setAll: function(data, overwrite) {\n                var changed, val;\n                for (var key in data) {\n                    val = data[key];\n                    if (this.set(key, val, overwrite) !== val) {\n                        changed = true;\n                    }\n                }\n                return changed;\n            },\n            add: function(key, data) {\n                var d = this.get(key);\n                if (d instanceof Array) {\n                    data = d.concat(data);\n                } else if (d !== null) {\n                    var type = typeof d;\n                    if (type === typeof data && type === 'object') {\n                        for (var k in data) {\n                            d[k] = data[k];\n                        }\n                        data = d;\n                    } else {\n                        data = d + data;\n                    }\n                }\n                _.set(this._area, this._in(key), _.stringify(data));\n                return data;\n            },\n            remove: function(key, alt) {\n                var d = this.get(key, alt);\n                _.remove(this._area, this._in(key));\n                return d;\n            },\n            clear: function() {\n                if (!this._ns) {\n                    _.clear(this._area);\n                } else {\n                    this.each(function(k){ _.remove(this._area, this._in(k)); }, 1);\n                }\n                return this;\n            },\n            clearAll: function() {\n                var area = this._area;\n                for (var id in _.areas) {\n                    if (_.areas.hasOwnProperty(id)) {\n                        this._area = _.areas[id];\n                        this.clear();\n                    }\n                }\n                this._area = area;\n                return this;\n            },\n\n            // internal use functions\n            _in: function(k) {\n                if (typeof k !== \"string\"){ k = _.stringify(k); }\n                return this._ns ? this._ns + k : k;\n            },\n            _out: function(k) {\n                return this._ns ?\n                    k && k.indexOf(this._ns) === 0 ?\n                        k.substring(this._ns.length) :\n                        undefined : // so each() knows to skip it\n                    k;\n            }\n        },// end _.storeAPI\n        storage: function(name) {\n            return _.inherit(_.storageAPI, { items: {}, name: name });\n        },\n        storageAPI: {\n            length: 0,\n            has: function(k){ return this.items.hasOwnProperty(k); },\n            key: function(i) {\n                var c = 0;\n                for (var k in this.items){\n                    if (this.has(k) && i === c++) {\n                        return k;\n                    }\n                }\n            },\n            setItem: function(k, v) {\n                if (!this.has(k)) {\n                    this.length++;\n                }\n                this.items[k] = v;\n            },\n            removeItem: function(k) {\n                if (this.has(k)) {\n                    delete this.items[k];\n                    this.length--;\n                }\n            },\n            getItem: function(k){ return this.has(k) ? this.items[k] : null; },\n            clear: function(){ for (var k in this.items){ this.removeItem(k); } }\n        }// end _.storageAPI\n    };\n\n    var store =\n        // safely set this up (throws error in IE10/32bit mode for local files)\n        _.Store(\"local\", (function(){try{ return localStorage; }catch(e){}})());\n    store.local = store;// for completeness\n    store._ = _;// for extenders and debuggers...\n    // safely setup store.session (throws exception in FF for file:/// urls)\n    store.area(\"session\", (function(){try{ return sessionStorage; }catch(e){}})());\n    store.area(\"page\", _.storage(\"page\"));\n\n    if (typeof define === 'function' && define.amd !== undefined) {\n        define('store2', [], function () {\n            return store;\n        });\n    } else if ( true && module.exports) {\n        module.exports = store;\n    } else {\n        // expose the primary store fn to the global object and save conflicts\n        if (window.store){ _.conflict = window.store; }\n        window.store = store;\n    }\n\n})(this, this && this.define);\n\n\n//# sourceURL=webpack:///./node_modules/store2/dist/store2.js?");

/***/ }),

/***/ "./src/consts/index.js":
/*!*****************************!*\
  !*** ./src/consts/index.js ***!
  \*****************************/
/*! exports provided: TO_LOGIN, TO_LOGOUT, LOGOUT, LOGINED, TO_FETCH_USER_INFO, USER_INFO_REACHED, NO_LOGIN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TO_LOGIN\", function() { return TO_LOGIN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TO_LOGOUT\", function() { return TO_LOGOUT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOGOUT\", function() { return LOGOUT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOGINED\", function() { return LOGINED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TO_FETCH_USER_INFO\", function() { return TO_FETCH_USER_INFO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"USER_INFO_REACHED\", function() { return USER_INFO_REACHED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NO_LOGIN\", function() { return NO_LOGIN; });\nconst TO_LOGIN = 'TO LOGIN';\nconst TO_LOGOUT = 'TO LOGOUT';\nconst LOGOUT = 'LOGOUT';\nconst LOGINED = 'LOGINED';\nconst TO_FETCH_USER_INFO = 'TO FETCH USER INFO';\nconst USER_INFO_REACHED = 'USER INFO REACHED';\nconst NO_LOGIN = 'NO LOGIN';\n\n\n//# sourceURL=webpack:///./src/consts/index.js?");

/***/ }),

/***/ "./src/iframe.js":
/*!***********************!*\
  !*** ./src/iframe.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var store2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! store2 */ \"./node_modules/store2/dist/store2.js\");\n/* harmony import */ var store2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(store2__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ \"./src/consts/index.js\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ \"./src/services/index.js\");\n\n\n\nconst targetDomain = 'http://localhost:3000'; // store('logined', false);\n\nwindow.addEventListener('message', async ({\n  data = {}\n}) => {\n  switch (data.type) {\n    case _consts__WEBPACK_IMPORTED_MODULE_1__[\"TO_LOGIN\"]:\n      const {\n        userInfo,\n        token\n      } = await Object(_services__WEBPACK_IMPORTED_MODULE_2__[\"login\"])(data.userInfo);\n      store2__WEBPACK_IMPORTED_MODULE_0___default()('logined', true);\n      store2__WEBPACK_IMPORTED_MODULE_0___default()('token', token);\n      store2__WEBPACK_IMPORTED_MODULE_0___default()('userInfo', userInfo);\n      top.postMessage({\n        type: _consts__WEBPACK_IMPORTED_MODULE_1__[\"USER_INFO_REACHED\"],\n        token: store2__WEBPACK_IMPORTED_MODULE_0___default()('token'),\n        userInfo: store2__WEBPACK_IMPORTED_MODULE_0___default()('userInfo')\n      }, targetDomain);\n      break;\n\n    case _consts__WEBPACK_IMPORTED_MODULE_1__[\"TO_FETCH_USER_INFO\"]:\n      store2__WEBPACK_IMPORTED_MODULE_0___default()('logined') ? top.postMessage({\n        type: _consts__WEBPACK_IMPORTED_MODULE_1__[\"USER_INFO_REACHED\"],\n        token: store2__WEBPACK_IMPORTED_MODULE_0___default()('token'),\n        userInfo: store2__WEBPACK_IMPORTED_MODULE_0___default()('userInfo')\n      }, targetDomain) : top.postMessage({\n        type: _consts__WEBPACK_IMPORTED_MODULE_1__[\"NO_LOGIN\"]\n      }, targetDomain);\n      break;\n\n    case _consts__WEBPACK_IMPORTED_MODULE_1__[\"TO_LOGOUT\"]:\n      store2__WEBPACK_IMPORTED_MODULE_0___default.a.clear();\n      Object(_services__WEBPACK_IMPORTED_MODULE_2__[\"logout\"])();\n      break;\n  }\n});\n\n//# sourceURL=webpack:///./src/iframe.js?");

/***/ }),

/***/ "./src/services/index.js":
/*!*******************************!*\
  !*** ./src/services/index.js ***!
  \*******************************/
/*! exports provided: login, logout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return login; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logout\", function() { return logout; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.js\");\n\n\nconst login = ({\n  name,\n  password\n}) => new Promise(resolve => {\n  setTimeout(() => resolve({\n    token: Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"randomStr\"])(),\n    userInfo: {\n      name: 'John'\n    }\n  }), 500);\n});\n\nconst logout = () => new Promise(resolve => setTimeout(resolve, 5000));\n\n\n\n//# sourceURL=webpack:///./src/services/index.js?");

/***/ }),

/***/ "./src/utils/color-log.js":
/*!********************************!*\
  !*** ./src/utils/color-log.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst styleStr = styleObj => Object.keys(styleObj).reduce((styleStr, name) => styleStr + `${name.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)}:${styleObj[name]};`, '');\n\nfunction log() {\n  let args = [...arguments];\n\n  if (typeof args[0] === 'string') {\n    console.log(...[`%c${args[0]}`, this.style, ...args.slice(1)]);\n  } else {\n    if (args[0] instanceof Object && args[0].isLogStyle) {\n      Object.assign(this.styleObj, args[0]);\n      this.style = styleStr(this.styleObj);\n      args.length > 1 && this.apply(this, args.slice(1));\n    } else {\n      console.log(...args);\n    }\n  }\n}\n\nlog.styleObj = {\n  color: '#0f0',\n  background: '#000',\n  fontWeight: 'bold',\n  fontSize: '12px'\n};\nlog.style = styleStr(log.styleObj);\n/* harmony default export */ __webpack_exports__[\"default\"] = (log.bind(log));\n\n//# sourceURL=webpack:///./src/utils/color-log.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: log, emptyFunc, randomStr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"emptyFunc\", function() { return emptyFunc; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomStr\", function() { return randomStr; });\n/* harmony import */ var _color_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color-log.js */ \"./src/utils/color-log.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return _color_log_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\nconst emptyFunc = () => {};\n\nconst randomStr = () => Math.random().toString(16).substring(2);\n\n\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ })

/******/ });