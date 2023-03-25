import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useLocation, useSearchParams } from 'react-router-dom'
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
} from '@chakra-ui/react'
import { RootState } from '../../store/store'
import {
  setlist,
  filterspace,
  filterprice,
  filterpriced,
} from '../../store/trip/tripSlice'

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

  const namehandler = (names: string) => {
    if (!spaceName.includes(names)) {
      spaceName.push(names)
    }
    const c = spaceName.join().trim()
    if (iniparams === null) {
      searchParams.set('name', names)
      setSearchParams(searchParams)
    } else {
      setSearchParams({ name: c })
    }
  }

  const spaceArray = (named: string) => {
    namehandler(named)
    // dispatch(filterspace(spaceName))
  }
  // todolist?.result.filter(item =>
  //   clickedBtn.find(sub => item.spaceCategory === sub)
  // )

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

  console.log(spaceName.join().trim())
  console.log(searchParams.getAll('name')?.toString())

  console.log(searchParams.get('name')?.toString() === spaceName.join().trim())

  const submitHandler = useCallback(() => {
    // if (searchParams.get('name')?.toString() === spaceName.join().trim()) {
    dispatch(filterspace(spaceName))
    // }
    const A = tripFilter.pricefilter
    const B = tripFilter.spacefilter
    const arr2 = A.filter(x1 => B.some(x2 => x1.idx === x2.idx))
    const KK = [...new Set(arr2)]
    dispatch(filterpriced(KK))
  }, [dispatch, spaceName, tripFilter.pricefilter, tripFilter.spacefilter])

  // useEffect(() => {
  //   submitHandler()
  // }, [])

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
          <button type='button' key={el} onClick={() => spaceArray(el)}>
            {el}
          </button>
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
