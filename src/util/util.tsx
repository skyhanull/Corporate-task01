import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export function filterItem() {
  const tripFilter = useSelector((state: RootState) => state.Triplist)
  return tripFilter.itemfilter
}
// export const tripFilter = useSelector((state: RootState) => state.Triplist)
