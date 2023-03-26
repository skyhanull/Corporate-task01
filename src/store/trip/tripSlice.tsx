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
      // state.itemfilter = state.result.filter(
      //   el => el.spaceCategory === action.payload
      // )

      // const A = state.result.filter(item =>
      //   action.payload.find(sub => item.spaceCategory === sub)
      // )
      console.log(action.payload)
      const KK =
        action.payload.urlNameparams.length !== 0
          ? state.result.filter(x1 =>
              action.payload.urlNameparams.find(x2 => x1.spaceCategory === x2)
            )
          : state.result.map(el => el)

      const LLLL =
        +action.payload.uurlPriceManParams !== 0
          ? KK.filter(
              el =>
                +el.price >= +action.payload.pre &&
                +el.price <= +action.payload.next
            )
          : KK

      state.result = KK
    },
    filterprice: (state, action) => {
      // const J = state.result.filter(
      //   el => el.price >= action.payload.pre && el.price <= action.payload.next
      // )
      // if (state.itemfilter.length !== 0) {
      //   const NK = [...new Set(state.itemfilter)]
      //   state.itemfilter = NK
      // }
      // state.itemfilter.push(...J)
      state.itemfilter = action.payload
    },
    filterpricedd: (state, action) => {
      // const KK =
      //   action.payload.urlNameparams.length !== 0
      //     ? state.result.filter(x1 =>
      //         action.payload.urlNameparams.find(x2 => x1.spaceCategory === x2)
      //       )
      //     : state.result
      // const LLLL =
      //   action.payload.uurlPriceManParams !== 0
      //     ? KK.filter(
      //         el =>
      //           el.price >= action.payload.pre &&
      //           el.price <= action.payload.next
      //       )
      //     : KK
      // console.log(LLLL)
      // state.itemfilter = LLLL
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
