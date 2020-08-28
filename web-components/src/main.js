
import { getContainer } from './utils';

const jsUrls = ['http://localhost:8887/dist/main.js'];
// 定义新元素
customElements.define('my-test', getContainer(jsUrls));
