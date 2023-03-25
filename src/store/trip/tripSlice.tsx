import { createSlice, current } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import ITravelInfo from '../../types'
import { RootState } from '../store'
import tripApi from './tripThunk'
import { filterItem } from '../../util/util'
import { it } from 'node:test'
import { Accordion } from '@chakra-ui/react'

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
      const A = state.result.filter(el => el.spaceCategory === action.payload)
      if (state.itemfilter.length !== 0) {
        const NK = [...new Set(state.itemfilter)]
        state.itemfilter = NK
      }
      console.log(A)
      state.itemfilter.push(...A)
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
  },
  extraReducers: builder => {
    builder.addCase(tripApi.fulfilled, (state, action) => {
      state.result = action.payload
    })
  },
})

export const { setlist, filterspace, filterprice } = tripSlice.actions
// store에서 add, remove, complte 액션을 내보낸다.
export default tripSlice.reducer
