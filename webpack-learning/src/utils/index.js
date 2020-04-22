import colorLog from './color-log.js';

const emptyFunc = () => {};
const randomStr = () => Math.random().toString(16).substring(2);

export {
    colorLog as log,
    emptyFunc,
    randomStr
};