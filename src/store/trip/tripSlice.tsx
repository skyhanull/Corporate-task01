import { createSlice, current } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import ITravelInfo from '../../types'

import tripApi from './tripThunk'

export interface ITripState {
  readonly result: ITravelInfo[]
  readonly itemfilter: ITravelInfo[]
  readonly priceRange: ITravelInfo[]
}

interface Iactionprice {
  pre: string
  next: string
}

const result: ITravelInfo[] = []
const itemfilter: ITravelInfo[] = []
const pricefilter: ITravelInfo[] = []
const spacefilter: ITravelInfo[] = []

export const tripSlice = createSlice({
  name: 'tripSlice',
  initialState: { result, itemfilter, spacefilter, pricefilter },
  reducers: {
    setlist: (state, action) => {
      state.result = action.payload
    },
    resetlist: (state, action) => {
      state.result = action.payload
    },
    filterspace: (state, action) => {
      console.log(action.payload)
      const A = state.result.filter(item =>
        action.payload.find((sub: any) => item.spaceCategory === sub)
      )

      state.spacefilter = [...A, ...state.spacefilter]
    },
    filterprice: (state, action) => {
      const J = state.result.filter(
        el => el.price >= action.payload.pre && el.price <= action.payload.next
      )
      state.pricefilter = J
    },
    filterpriced: (state, action) => {
      state.itemfilter = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(tripApi.fulfilled, (state, action) => {
      state.result = action.payload
    })
  },
})

export const { setlist, filterspace, filterprice, filterpriced } =
  tripSlice.actions
// store에서 add, remove, complte 액션을 내보낸다.
export default tripSlice.reducer
