import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import issues from './issues/reducers';

const rootReducer = combineReducers({
  issues
});

export type AppState = ReturnType<typeof rootReducer>;

export default () => {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  return createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
};
