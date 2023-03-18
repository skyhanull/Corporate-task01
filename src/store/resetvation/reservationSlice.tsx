import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import ITravelInfo from '../../types'
import { RootState } from '../store'

const result: ITravelInfo[] = []
// const tripFilter = useSelector((state: RootState) => state.Triplist)
export const tripSlice = createSlice({
  name: 'tripSlice',
  initialState: { result },
  reducers: {
    addcartlist: (state, action) => {
      console.log(action.payload)
      if (state.result.find(item => item.idx === action.payload.idx)) {
        return
      } else {
        state.result.push(action.payload)
      }
    },
    resetlist: (state, action) => {
      console.log(action.payload)
      if (state.result.find(item => item.idx !== action.payload.idx)) {
        state.result = action.payload
      }
      // state.result = action.payload
      console.log(state.result)
    },
    patch: (state, action) => {
      state.result = []
      state.result = action.payload
    },
  },
})

export const { addcartlist, patch } = tripSlice.actions
// store에서 add, remove, complte 액션을 내보낸다.
export default tripSlice.reducer
