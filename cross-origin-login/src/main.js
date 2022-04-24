// import { init, login, logout } from './lib/login';
import { init, login } from './lib/zz';


init('http://localhost:8000/iframe.html');


login().then(data => console.log(data, 'sdfsdfsdf'));
