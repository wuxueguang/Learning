exports.id = 2;
exports.modules = {

/***/ "./app/login/pages/index.js":
/*!**********************************!*\
  !*** ./app/login/pages/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"@babel/runtime/helpers/possibleConstructorReturn\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"@babel/runtime/helpers/getPrototypeOf\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"@babel/runtime/helpers/inherits\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! utils */ \"./app/common/utils/index.js\");\n/* harmony import */ var widgets_Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! widgets/Header */ \"./app/common/widgets/Header/index.js\");\n/* harmony import */ var widgets_Footer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! widgets/Footer */ \"./app/common/widgets/Footer/index.js\");\n/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./index.scss */ \"./app/login/pages/index.scss\");\n/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_10__);\n\n\n\n\n\n\n\n\n\n\n\n\nvar LoginPage =\n/*#__PURE__*/\nfunction (_Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(LoginPage, _Component);\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(LoginPage, null, [{\n    key: \"getPageTitle\",\n    value: function getPageTitle() {\n      return LoginPage.pageTitle;\n    }\n  }, {\n    key: \"getExtraMeta\",\n    value: function getExtraMeta() {\n      return LoginPage.extraMeta;\n    }\n  }, {\n    key: \"getSEO\",\n    value: function getSEO() {\n      return LoginPage.SEO;\n    }\n  }]);\n\n  function LoginPage(props) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LoginPage);\n\n    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(LoginPage).call(this, props));\n    _this.state = {};\n    var pageTitle = utils__WEBPACK_IMPORTED_MODULE_7__[\"I18n\"].t('login.pageTitle');\n    LoginPage.pageTitle = utils__WEBPACK_IMPORTED_MODULE_7__[\"UIUtil\"].setDocumentTitle(pageTitle);\n    return _this;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(LoginPage, [{\n    key: \"render\",\n    value: function render() {\n      // eslint-disable-next-line react/destructuring-assignment\n      var getFieldDecorator = this.props.form.getFieldDecorator;\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"www-index paid-index\"\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(widgets_Header__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        inner: true,\n        forceFixed: true\n      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"container main-container page-login\"\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h1\", null, \"Login \"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_6__[\"Form\"], {\n        onSubmit: this.handleSubmit,\n        className: \"login-form\"\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_6__[\"Form\"].Item, null, getFieldDecorator('username', {\n        rules: [{\n          required: true,\n          message: 'Please input your username!'\n        }]\n      })(react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_6__[\"Input\"], {\n        prefix: react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_6__[\"Icon\"], {\n          type: \"user\",\n          style: {\n            color: 'rgba(0,0,0,.25)'\n          }\n        }),\n        placeholder: \"Username\"\n      }))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_6__[\"Form\"].Item, null, getFieldDecorator('password', {\n        rules: [{\n          required: true,\n          message: 'Please input your Password!'\n        }]\n      })(react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_6__[\"Input\"], {\n        prefix: react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_6__[\"Icon\"], {\n          type: \"lock\",\n          style: {\n            color: 'rgba(0,0,0,.25)'\n          }\n        }),\n        type: \"password\",\n        placeholder: \"Password\"\n      }))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_6__[\"Form\"].Item, null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_6__[\"Button\"], {\n        type: \"primary\",\n        htmlType: \"submit\",\n        className: \"login-form-button\"\n      }, \"Log in\")))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(widgets_Footer__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null));\n    }\n  }]);\n\n  return LoginPage;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (antd__WEBPACK_IMPORTED_MODULE_6__[\"Form\"].create({\n  name: 'normal_login'\n})(LoginPage));\n\n//# sourceURL=webpack:///./app/login/pages/index.js?");

/***/ })

};