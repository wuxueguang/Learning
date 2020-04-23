import {
    createStore,
    applyMiddleware
} from 'redux';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';

import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

store.subscribe(() =>
    console.log(store.getState())
);

sagaMiddleware.run(rootSaga)

store.dispatch({type: 'INCREMENT_ASYNC'})
store.dispatch({type: 'INCREMENT_ASYNC'})
store.dispatch({type: 'INCREMENT_ASYNC'})
