import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const tripFilter = useSelector((state: RootState) => state.Triplist)
