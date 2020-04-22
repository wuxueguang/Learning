
import { randomStr } from '../utils';
const login = ({name, password}) => new Promise(resolve => {
    setTimeout(() => resolve({
        token: randomStr(),
        userInfo: {
            name: 'John'
        }
    }), 500);
});

const logout = () => new Promise(resolve => setTimeout(resolve, 5000));

export {
    login,
    logout
};