import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom'
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
} from '@chakra-ui/react'
import { setlist } from '../../store/trip/tripSlice'
// import { Dispatch } from '@reduxjs/toolkit'
import tripApi from '../../store/trip/tripThunk'

function TripCard() {
  const { name, id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [spaceName, setSpaceName] = useState<string[]>([])
  const [price, setPrice] = useState<string[]>([])
  const dispatch = useDispatch()
  console.log(name)
  // searchParams.set('sort', 'clear')
  // setSearchParams(searchParams)
  // console.log(name)
  // console.log(id)
  const tripFilter = useSelector((state: RootState) => state.Triplist)

  console.log(tripFilter)
  const AAA = tripFilter.result.map((el: any) => el.spaceCategory)

  // const category = [...new Set(AAA)]
  const category = ['강원', '서울', '부산', '대구', '제주']

  const spaceArray = (name: string) => {
    setSpaceName([...spaceName, name])
    searchParams.set('name', name)
    if (searchParams === undefined) {
      setSearchParams(searchParams)
    }
    searchParams.append('name', name)
  }
  // console.log(searchParams.get('name'))
  // const filtername = searchParams.get('name')
  // console.log(spaceName)

  const filterPriceHandler = () => {
    const pre = price?.[0]
    const next = price?.[1]

    const B =
      next !== undefined
        ? tripFilter?.result.filter(
            items => items.price >= +pre! && items.price <= +next!
          )
        : tripFilter?.result

    return B
  }

  const submitHandler = () => {
    const A = tripFilter.result.filter(x1 =>
      spaceName.length > 0
        ? spaceName.find(x2 => x1.spaceCategory === x2)
        : x1.spaceCategory
    )
    const Fspace = filterPriceHandler()
    const arr2 = A.filter(x1 => Fspace.some(x2 => x1.idx === x2.idx))
    dispatch(setlist(arr2))
    // tripFilter = { result: arr2 }
    console.log(arr2)
  }

  return (
    <div>
      <RangeSlider
        width='30rem'
        defaultValue={[0, 0]}
        min={0}
        max={30000}
        step={5000}
        onChange={e => setPrice(e.map(item => item.toString()))}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>

        <RangeSliderThumb index={0} />
        <RangeSliderThumb boxSize={6} index={1} />
      </RangeSlider>
      <div>
        {tripFilter && tripFilter?.result.map(el => el.idx)}
        {category.map(el => (
          <button onClick={() => spaceArray(el)}>{el}</button>
        ))}
      </div>
      <Link
        to={`/main/?${spaceName ? spaceName : ''}/?min=${price[0]}?max=${
          price[1]
        }`}
      >
        <button type='button' onClick={submitHandler}>
          제출
        </button>
      </Link>
    </div>
  )
}

export default TripCard
