import { applyMiddleware, createStore, compose } from 'redux';
import instance from './';
import router from './router';
import reducers from '../modules';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    router
  );
  const finalCreateStore = createStoreWithMiddleware(createStore);
  const store = finalCreateStore(reducers, initialState);

  instance.set(store);

  return store;
};
