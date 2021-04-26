import '@babel/polyfill';
import './reset.css';
import './utils.css';

// import initBridge from 'xsl-bridge';

// function call(funcName, ...params) {
//   if (window.$bridge.$call) {
//     return window.$bridge.$call(funcName, ...params)
//   }
//   console.warn(`调用 ${funcName} 失败，当前 webview 不支持 call 方法`)
// }

// let rightButtons = []
// function setRightButtons() {
//   call('XSLNavigationPlugin:setRightButtons', {
//     buttons: rightButtons,
//   })
// }

// const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

// try{
//   window.$bridge = initBridge();
//   window.$bridge.resetRightButton = () => {
//     rightButtons = []
//     setRightButtons()
//     if (isAndroid()) {
//       // 安卓有Bug，传空数组只隐藏三个点，需要设置rightTheme为none
//       call('XSLNavigationPlugin:setRightButtons', {
//         rightTheme: 'none',
//         buttons: [],
//       })
//     }
//   }
// }catch(err){
//   console.error('sxl-bridge error', err);
// }


