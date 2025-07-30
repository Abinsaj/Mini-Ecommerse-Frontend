import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './Slices/userSlice';
import cartReducer from './Slices/cartSlice';

import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], 
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
