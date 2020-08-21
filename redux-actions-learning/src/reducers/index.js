import { combineReducers } from 'redux';
import counter from './counter';
import name from './name';

export default combineReducers({counter, name});