import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import Triplist from './trip/tripSlice'
import reservationSlice from './resetvation/reservationSlice'

const reducers = combineReducers({
  reservationSlice,
  Triplist,
})

const persistConfig = {
  timeout: 500,
  key: 'book',
  storage,
  whitelist: ['reservationSlice'],
  blacklist: ['Triplist'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // }).concat(logger),
    }),
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
