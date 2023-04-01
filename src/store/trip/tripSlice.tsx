import { createSlice } from '@reduxjs/toolkit'
import ITravelInfo from '../../types'
import tripApi from './tripThunk'

export interface ITripState {
  readonly result: ITravelInfo[]
  readonly itemfilter: ITravelInfo[]
  readonly priceRange: ITravelInfo[]
}

const result: ITravelInfo[] = []
const itemfilter: ITravelInfo[] = []

export const tripSlice = createSlice({
  name: 'tripSlice',
  initialState: { result, itemfilter },
  reducers: {
    setlist: (state, action) => {
      state.result = action.payload
    },

    filterprice: (state, action) => {
      state.itemfilter = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(tripApi.fulfilled, (state, action) => {
      state.result = action.payload
    })
  },
})

export const { setlist, filterprice } = tripSlice.actions
// store에서 add, remove, complte 액션을 내보낸다.
export default tripSlice.reducer
