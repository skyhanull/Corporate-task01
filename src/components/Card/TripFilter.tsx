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
import { setlist, filterspace, filterprice } from '../../store/trip/tripSlice'

interface Iprice {
  pre: string
  next: string
}
function TripCard() {
  const { name, id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [spaceName, setSpaceName] = useState<string[]>([])
  const [price, setPrice] = useState<string[]>([])
  const dispatch = useDispatch()

  const tripFilter = useSelector((state: RootState) => state.Triplist)
  const AAA = tripFilter.result.map((el: any) => el.spaceCategory)

  const category = ['강원', '서울', '부산', '대구', '제주']

  const iniparams = searchParams.get('name')

  const spaceArray = (name: string) => {
    if (!spaceName.includes(name)) {
      spaceName.push(name)
      dispatch(filterspace(name))
    }

    const c = spaceName.join().trim()
    if (iniparams === null) {
      searchParams.set('name', name)
      setSearchParams(searchParams)
    } else {
      setSearchParams({ name: c })
    }
  }

  // const ASDF = (e: any) => {
  //   setPrice(e.map((item: any) => item.toString()))
  // }

  const filterPriceHandler = (e: any) => {
    const pricearray: Iprice = {
      pre: e[0],
      next: e[1],
    }
    dispatch(filterprice(pricearray))

    // const B =
    //   next !== undefined
    //     ? tripFilter?.result.filter(
    //         items => items.price >= +pre! && items.price <= +next!
    //       )
    //     : tripFilter?.result

    // return B
  }

  const submitHandler = () => {
    // const A = tripFilter.result.filter(x1 =>
    //   spaceName.length > 0
    //     ? spaceName.find(x2 => x1.spaceCategory === x2)
    //     : x1.spaceCategory
    // )
    // const Fspace = filterPriceHandler()
    // const arr2 = A.filter(x1 => Fspace.some(x2 => x1.idx === x2.idx))
    // dispatch(setlist(arr2))
    // console.log(arr2)
    // filterPriceHandler()
  }

  return (
    <div>
      <RangeSlider
        width='30rem'
        defaultValue={[0, 0]}
        min={0}
        max={30000}
        step={5000}
        onChange={e => filterPriceHandler(e)}
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
      {/* <Link
        to={`/main/?${spaceName ? spaceName : ''}/?min=${price[0]}?max=${
          price[1]
        }`}
      > */}
      <button type='button' onClick={submitHandler}>
        제출
      </button>
      {/* </Link> */}
    </div>
  )
}

export default TripCard
