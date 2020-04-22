(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/consts/index.js":
/*!*****************************!*\
  !*** ./src/consts/index.js ***!
  \*****************************/
/*! exports provided: TO_LOGIN, TO_LOGOUT, LOGOUT, LOGINED, TO_FETCH_USER_INFO, USER_INFO_REACHED, NO_LOGIN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TO_LOGIN\", function() { return TO_LOGIN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TO_LOGOUT\", function() { return TO_LOGOUT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOGOUT\", function() { return LOGOUT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOGINED\", function() { return LOGINED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TO_FETCH_USER_INFO\", function() { return TO_FETCH_USER_INFO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"USER_INFO_REACHED\", function() { return USER_INFO_REACHED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NO_LOGIN\", function() { return NO_LOGIN; });\nconst TO_LOGIN = 'TO LOGIN';\nconst TO_LOGOUT = 'TO LOGOUT';\nconst LOGOUT = 'LOGOUT';\nconst LOGINED = 'LOGINED';\nconst TO_FETCH_USER_INFO = 'TO FETCH USER INFO';\nconst USER_INFO_REACHED = 'USER INFO REACHED';\nconst NO_LOGIN = 'NO LOGIN';\n\n\n//# sourceURL=webpack:///./src/consts/index.js?");

/***/ }),

/***/ "./src/lib/login.js":
/*!**************************!*\
  !*** ./src/lib/login.js ***!
  \**************************/
/*! exports provided: init, login, logout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return login; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logout\", function() { return logout; });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts */ \"./src/consts/index.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.js\");\n\n\n\nconst _winDOMContentLoaded = new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve));\n\nconst _targetDomain = 'http://localhost:8000';\n\nconst _iframe = document.createElement('iframe');\n\n_iframe.src = `${_targetDomain}/iframe.html`;\n_iframe.style.display = 'none';\n\nlet _iframeWin;\n\n(async () => {\n  await _winDOMContentLoaded;\n  document.body.appendChild(_iframe);\n  _iframeWin = window.frames[window.frames.length - 1];\n})();\n\nconst _iframeLoad = new Promise(async resolve => {\n  await _winDOMContentLoaded;\n\n  _iframe.addEventListener('load', resolve);\n});\n\nconst _handleMessageEvent = async (userInfoReachedHandler = _utils__WEBPACK_IMPORTED_MODULE_1__[\"emptyFunc\"], noLoginHandler = _utils__WEBPACK_IMPORTED_MODULE_1__[\"emptyFunc\"]) => {\n  window.addEventListener('message', function handler({\n    data: {\n      type,\n      token,\n      userInfo\n    }\n  }) {\n    const types = [_consts__WEBPACK_IMPORTED_MODULE_0__[\"USER_INFO_REACHED\"], _consts__WEBPACK_IMPORTED_MODULE_0__[\"NO_LOGIN\"]];\n    type === types[0] && userInfoReachedHandler({\n      token,\n      userInfo\n    });\n    type === types[1] && noLoginHandler();\n    types.includes(type) && window.removeEventListener('message', handler);\n  });\n};\n\nconst init = async (cb1, cb2) => {\n  _handleMessageEvent(cb1, cb2);\n\n  await _iframeLoad;\n\n  _iframeWin.postMessage({\n    type: _consts__WEBPACK_IMPORTED_MODULE_0__[\"TO_FETCH_USER_INFO\"]\n  }, _targetDomain);\n};\n\nconst login = async (name, password, cb1, cb2) => {\n  _handleMessageEvent(cb1, cb2);\n\n  await _iframeLoad;\n\n  _iframeWin.postMessage({\n    userInfo: {\n      name,\n      password\n    },\n    type: _consts__WEBPACK_IMPORTED_MODULE_0__[\"TO_LOGIN\"]\n  }, _targetDomain);\n};\n\nconst logout = async cb => {\n  window.addEventListener('message', function handler(e) {\n    if (e.data.type === _consts__WEBPACK_IMPORTED_MODULE_0__[\"LOGOUT\"]) {\n      cb();\n      window.removeEventListener('message', handler);\n    }\n  });\n  await _iframeLoad;\n\n  _iframeWin.postMessage({\n    type: _consts__WEBPACK_IMPORTED_MODULE_0__[\"TO_LOGOUT\"]\n  }, _targetDomain);\n};\n\n\n\n//# sourceURL=webpack:///./src/lib/login.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/login */ \"./src/lib/login.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\n\n\nObject(_lib_login__WEBPACK_IMPORTED_MODULE_0__[\"init\"])(({\n  userInfo\n}) => {\n  Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"log\"])('init', JSON.stringify(userInfo));\n  Object(_lib_login__WEBPACK_IMPORTED_MODULE_0__[\"logout\"])();\n}, () => {\n  Object(_lib_login__WEBPACK_IMPORTED_MODULE_0__[\"login\"])('wxg315699', '123123', ({\n    token,\n    userInfo\n  }) => {\n    Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"log\"])('login', token, userInfo); // alert(JSON.stringify(userInfo))\n  });\n});\n\n//# sourceURL=webpack:///./src/main.js?");

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

},[["./src/main.js","runtime"]]]);