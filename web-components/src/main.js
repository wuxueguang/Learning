
import { getContainer } from './utils';

const jsUrls = ['http://localhost:8889/dist/main.js'/*, 'http://localhost:8889/dist/main.js'*/];
// 定义新元素
customElements.define('my-test', getContainer(jsUrls));
