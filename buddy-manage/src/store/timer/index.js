

import { observable } from 'mobx';
import { combine } from '../../utils/store';
import actions from './actions';

const timer = observable(100);

export default combine(timer, actions);