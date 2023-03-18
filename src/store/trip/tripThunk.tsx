import { createAsyncThunk } from '@reduxjs/toolkit'
import getTripInfo from '../../apis/tripApi'
import axios from 'axios'

const tripApi = createAsyncThunk('api', async () => {
  try {
    const response = await getTripInfo()

    return response
  } catch {
    throw new Error()
  }
})

export default tripApi
