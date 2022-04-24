"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Span = void 0;

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Span = props => {
  var {
    desc
  } = props;
  var [count, setCount] = (0, _react.useState)(0);
  return /*#__PURE__*/_react.default.createElement("span", null, desc, " ", count);
};

exports.Span = Span;

var Test = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "<script>alert(2)</script>"
  }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement(Span, {
    desc: "\u4ECA\u5929"
  }), /*#__PURE__*/_react.default.createElement("span", null, "test"), /*#__PURE__*/_react.default.createElement("span", null, "test"), /*#__PURE__*/_react.default.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: '<script>alert(2)</script>'
    }
  })));
};

var _default = Test;
exports.default = _default;