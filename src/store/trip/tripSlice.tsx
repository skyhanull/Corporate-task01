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
    resetlist: (state, action) => {
      state.result = action.payload
    },
    filterspace: (state, action) => {
      state.itemfilter = state.result.filter(
        el => el.spaceCategory === action.payload
      )
    },
    filterprice: (state, action) => {
      const J = state.result.filter(
        el => el.price >= action.payload.pre && el.price <= action.payload.next
      )
      if (state.itemfilter.length !== 0) {
        const NK = [...new Set(state.itemfilter)]
        state.itemfilter = NK
      }
      state.itemfilter.push(...J)
    },
    filterpricedd: (state, action) => {
      state.itemfilter = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(tripApi.fulfilled, (state, action) => {
      state.result = action.payload
    })
  },
})

export const { setlist, filterspace, filterprice, filterpricedd } =
  tripSlice.actions
// store에서 add, remove, complte 액션을 내보낸다.
export default tripSlice.reducer
