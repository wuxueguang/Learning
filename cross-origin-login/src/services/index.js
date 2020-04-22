
import { randomStr } from '../utils';
const login = ({name, password}) => new Promise(resolve => {
    // 非跨域请求，用异步代替实现
    setTimeout(() => resolve({
        token: randomStr(),
        userInfo: {
            name: 'John'
        }
    }), 500);
});

// 非跨域请求，用异步代替实现
const logout = () => new Promise(resolve => setTimeout(resolve, 5000));

export {
    login,
    logout
};