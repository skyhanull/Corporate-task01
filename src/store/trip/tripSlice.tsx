import { createSlice, current } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import ITravelInfo from '../../types'
import { RootState } from '../store'
import tripApi from './tripThunk'
import { tripFilter } from '../../util/util'
import { it } from 'node:test'

// const tripFilter = useSelector((state: RootState) => state.Triplist)
// console.log(tripFilter)

export interface ITripState {
  readonly result: ITravelInfo[]
  readonly itemfilter: ITravelInfo[]
  readonly priceRange: ITravelInfo[]
  // readonly selectedtripList: ITripInfo | null
}

interface Iactionprice {
  pre: string
  next: string
}
// interface ISliceType:ITravelInfo[] {
//   result: [],

// }
const result: ITravelInfo[] = []
const itemfilter: ITravelInfo[] = []
export const tripSlice = createSlice({
  name: 'tripSlice',
  initialState: { result, itemfilter },
  reducers: {
    setlist: (state, action) => {
      state.result = action.payload
      console.log(state.result)
    },
    resetlist: (state, action) => {
      state.result = action.payload
      console.log(state.result)
    },
    filterspace: (state, action) => {
      console.log(action.payload)
      const A = state.result.filter(el => el.spaceCategory === action.payload)
      state.itemfilter = [...A, ...state.itemfilter]
    },
    filterprice: (state, action) => {
      console.log(action.payload)
      const A = state.result.filter(el => el.price === action.payload)
      // state.itemfilter = [...A, ...state.itemfilter]
    },
  },
  extraReducers: builder => {
    builder.addCase(tripApi.fulfilled, (state, action) => {
      console.log(action)
      state.result = action.payload
    })
  },
})

export const { setlist, filterspace, filterprice } = tripSlice.actions
// store에서 add, remove, complte 액션을 내보낸다.
export default tripSlice.reducer
