import { createSlice } from '@reduxjs/toolkit'
import { access } from 'fs'
import { useSelector } from 'react-redux'

interface IReservation {
  idx: number
  name: string
  amount: number
  mainImage: string
  description: string
  spaceCategory: string
  price: number
  maximumPurchases: number
  registrationDate: string
}

const result: IReservation[] = []
// const tripFilter = useSelector((state: RootState) => state.Triplist)
export const tripSlice = createSlice({
  name: 'tripSlice',
  initialState: { result },
  reducers: {
    addcartlist: (state, action) => {
      state.result.push({ ...action.payload, amount: 1 })
    },
    patchItem: (state, action) => {
      const patchAmount =
        action.payload.amount < action.payload.maximumPurchases
          ? { ...action.payload, amount: action.payload.amount + 1 }
          : action.payload

      const filterpatchdata = state.result.filter(
        el => el.idx !== action.payload.idx
      )

      const A = [...filterpatchdata, patchAmount].sort((a, b) => a.idx - b.idx)
      state.result = A
    },
    removeItem: (state, action) => {
      const removeAmount =
        action.payload.amount >= 1
          ? { ...action.payload, amount: action.payload.amount - 1 }
          : state.result

      const filterremovedata = state.result.filter(
        el => el.idx !== action.payload.idx
      )

      const removeData =
        action.payload.amount === 1
          ? filterremovedata
          : [...filterremovedata, removeAmount]
      state.result = removeData
    },
    removeList: (state, action) => {
      const filterremoveList = state.result.filter(
        el => el.idx !== action.payload.idx
      )
      state.result = filterremoveList
    },
  },
})

export const { addcartlist, patchItem, removeItem, removeList } =
  tripSlice.actions
// store에서 add, remove, complte 액션을 내보낸다.
export default tripSlice.reducer
