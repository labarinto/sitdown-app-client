import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import projectReducer from './reducers/project';
import statusReducer from './reducers/status';
import uiReducer from './reducers/ui';
import modalReducer from './reducers/modal';
import userReducer from './reducers/user';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    status: statusReducer,
    ui: uiReducer,
    modal: modalReducer,
    user: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;