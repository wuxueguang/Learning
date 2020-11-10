import React from 'react';
import logger from './logger';
export default (() => {
  logger('test', 'test');
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => alert(e),
    style: {
      color: 'red'
    },
    className: "tt"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "test1"), /*#__PURE__*/React.createElement("li", null, "test2")), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null));
});
