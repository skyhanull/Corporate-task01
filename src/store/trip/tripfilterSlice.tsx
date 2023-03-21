import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import ITravelInfo from '../../types'
import { RootState } from '../store'
import tripApi from './tripThunk'
import { tripFilter } from '../../util/util'

// const tripFilter = useSelector((state: RootState) => state.Triplist)
// console.log(tripFilter)
const result: ITravelInfo[] = []
export const tripSlice = createSlice({
  name: 'tripSlice',
  initialState: { result },
  reducers: {
    setlist: (state, action) => {
      state.result = action.payload
      console.log(state.result)
    },
    resetlist: (state, action) => {
      state.result = action.payload
      console.log(state.result)
    },
    // filterspace: (state, action) => {
    //   // state.result = []
    //   // state.result = action.payload
    //   if (action.payload === undefined) {
    //     state.result
    //   } else {
    //     const A = state.result.filter((el)=> el.idx === action.payload)

    //   }
    // },
  },
  extraReducers: builder => {
    builder.addCase(tripApi.fulfilled, (state, action) => {
      console.log(action)
      state.result = action.payload
    })
  },
})

export const { setlist } = tripSlice.actions
// store에서 add, remove, complte 액션을 내보낸다.
export default tripSlice.reducer
