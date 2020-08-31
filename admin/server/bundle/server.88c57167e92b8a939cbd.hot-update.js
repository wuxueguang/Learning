exports.id = "server";
exports.modules = {

/***/ "./app/entry/www-app/reducer.js":
/*!**************************************!*\
  !*** ./app/entry/www-app/reducer.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_utils_combine_reducers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/utils/combine-reducers */ \"./app/common/utils/combine-reducers.js\");\n/* harmony import */ var _common_reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/reducers */ \"./app/common/reducers/index.js\");\n/* harmony import */ var _home_reducers_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../home/reducers/home */ \"./app/home/reducers/home.js\");\n/* harmony import */ var _video_reducers_mobileDetail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../video/reducers/mobileDetail */ \"./app/video/reducers/mobileDetail.js\");\n\n\n\n\nvar appReducer = Object(_common_utils_combine_reducers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n  homeDetail: _home_reducers_home__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  videoMobileDetail: _video_reducers_mobileDetail__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_common_reducers__WEBPACK_IMPORTED_MODULE_1__[\"rootReducer\"])(appReducer));\n\n//# sourceURL=webpack:///./app/entry/www-app/reducer.js?");

/***/ })

};