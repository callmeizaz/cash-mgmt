import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import history from '../history';
import authenticationSlice from './authenticationSlice';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['router'],
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: [],
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: persistReducer(authPersistConfig, authenticationSlice.reducer),
});

const persistedRootReducer = persistReducer<any, any>(rootPersistConfig, rootReducer);

export default persistedRootReducer;
