import configureStore from '../app/common/utils/configure-store';
import { fromJS } from 'immutable';

import rootReducer from '../app/entry/www-app/reducer'
import profile from '../app/entry/www-app/profile'
import appPathes from '../app/entry/www-app/routes'

// const { pathes } = appPathes;

const makeStore = () => {
  const initialState = fromJS({
    lang: global.lang,
    clientConfig: global.clientConfig,
    // pathes,
    profile,
    serverRender: true,
  });

  const store = configureStore(rootReducer, initialState);

  return store;
};

export default makeStore;
