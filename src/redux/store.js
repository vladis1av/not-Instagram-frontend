import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { userReducer, dialogsReducer, modalReducer } from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const rootReducer = combineReducers({
  user: userReducer,
  dialogs: dialogsReducer,
  modal: modalReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
