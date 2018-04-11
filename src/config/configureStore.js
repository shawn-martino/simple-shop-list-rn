// import storage from 'redux-persist/es/storage';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

export default () => {
  const store = createStore(
    persistedReducer,
    undefined,
    applyMiddleware(logger),
  );
  const persistor = persistStore(store);
  // // persistor.purge();
  return { store, persistor };
};
