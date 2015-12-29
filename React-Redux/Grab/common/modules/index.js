import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import counter from './counter';
import products from './products';

export default combineReducers({
  counter,
  products,
  router
});
