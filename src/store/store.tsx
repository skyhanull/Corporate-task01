import { configureStore } from '@reduxjs/toolkit'
import Triplist from './trip/tripSlice'
import reservationSlice from './resetvation/reservationSlice'

export const store = configureStore({
  reducer: { Triplist, reservationSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
