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
  filterspace,
  filterprice,
  filterpricedd,
} from '../../store/trip/tripSlice'
import useUrlHandler from '../../util/util'

interface Iprice {
  pre: string
  next: string
}
function TripCard() {
  const { urlSearchHandler } = useUrlHandler()
  const { name, id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [spaceName, setSpaceName] = useState<string[]>([])
  // const spaceName = []
  const [nameSpaceparam, setNameSpaceParam] = useState('')
  const [price, setPrice] = useState<string[]>(['0', '0'])
  const dispatch = useDispatch()

  const tripFilter = useSelector((state: RootState) => state.Triplist)

  const category = ['강원', '서울', '부산', '대구', '제주']

  // const AAAAA = () => {
  //   const iniparams = searchParams.get('name')
  //   const c = spaceName.join().trim()
  //   // console.log(c)
  //   if (iniparams === null) {
  //     searchParams.set('name', nameSpaceparam)
  //     setSearchParams(searchParams)
  //   } else {
  //     searchParams.set('name', c)
  //     setSearchParams(searchParams)
  //   }
  // }
  // const spaceArray = useCallback(
  //   (namek: string) => {
  //     // if (!spaceName.includes(namek)) {
  //     //   setNameSpaceParam(namek)
  //     //   // spaceName.push(namek)
  //     // }

  //     setSpaceName(prev => [...prev, namek])
  //     // spaceName.push(nameSpaceparam)
  //     // // const c = spaceName.join().trim()
  //     // const A = [...spaceName, namek]
  //     AAAAA(namek)
  //   },
  //   [AAAAA]
  // )
  // const spaceArray = nameanme => {
  //   // if (!spaceName.includes(namek)) {
  //   //   setNameSpaceParam(namek)
  //   //   // spaceName.push(namek)
  //   // }
  //   SpaceHander(nameanme)
  //   urlSearchHandler(spaceName)

  //   // spaceName.push(nameSpaceparam)
  //   // // const c = spaceName.join().trim()
  //   // const A = [...spaceName, namek]
  //   // AAAAA(namek)
  // }

  const SpaceHander = (names: string) => {
    if (!spaceName.includes(names)) {
      setNameSpaceParam(names)
      // spaceName.push(namek)
      setSpaceName(prev => [...prev, names])
    }
    // console.log(spaceName)
    // urlSearchHandler(spaceName)
  }

  // if (spaceName.length < 5) {
  //   urlSearchHandler(spaceName)
  // }

  // const spaceArray = useCallback(() => {
  //   // if (!spaceName.includes(namek)) {
  //   //   setNameSpaceParam(namek)
  //   //   // spaceName.push(namek)
  //   // }

  //   urlSearchHandler(spaceArray)

  // }, [urlSearchHandler])

  useEffect(() => {
    const AAAAA = () => {
      // const iniparams = searchParams.get('name')
      if (spaceName.length > 0) {
        const c = spaceName.join().trim()
        searchParams.set('name', c)
        setSearchParams(searchParams)
      }
    }
    AAAAA()
  }, [nameSpaceparam, searchParams, setSearchParams, spaceName])
  const filterPriceHandler = (e: any) => {
    const pricearray: Iprice = {
      pre: e[0],
      next: e[1],
    }
    // dispatch(filterprice(pricearray))

    // const B =
    //   next !== undefined
    //     ? tripFilter?.result.filter(
    //         items => items.price >= +pre! && items.price <= +next!
    //       )
    //     : tripFilter?.result

    // return B
  }

  useEffect(() => {
    const next = price[1]
    const pre = price[0]

    if (+price[1] !== 0) {
      searchParams.set('min', pre)
      searchParams.set('max', next)
      setSearchParams(searchParams)
    }
  }, [price, searchParams, setSearchParams])

  const submitHandler = useCallback(() => {
    const KK =
      spaceName.length !== 0
        ? tripFilter.result.filter(x1 =>
            spaceName.find(x2 => x1.spaceCategory === x2)
          )
        : tripFilter.result

    const LLLL =
      +price[1] !== 0
        ? tripFilter.result.filter(
            el => el.price >= +price[0] && el.price <= +price[1]
          )
        : tripFilter.result

    const arrr = KK.filter(x1 => LLLL.some(x2 => x1.idx === x2.idx))
    console.log(LLLL)
    dispatch(filterprice(arrr))
  }, [dispatch, price, spaceName, tripFilter.result])

  useEffect(() => {
    submitHandler()
  }, [submitHandler])

  const orParams = searchParams.get('name') || searchParams.get('max')
  const andParams = searchParams.get('name') && searchParams.get('max')
  useEffect(() => {
    if (searchParams.get('name') && searchParams.get('max')) {
      /* 조건을 어떻게 하지 */
      const urlNameparams = searchParams.get('name')?.split(',')
      const urlPriceMinParams = searchParams.get('min')
      const uurlPriceManParams = searchParams.get('max')

      // const KK = tripFilter.result.filter(x1 =>
      //   searchParams
      //     .get('name')
      //     ?.split(',')
      //     .find(x2 => x1.spaceCategory === x2)
      // )
      console.log(
        tripFilter.result.filter(x1 =>
          urlNameparams?.find(x2 => x1.spaceCategory === x2)
        )
      )
      const KK = urlNameparams
        ? tripFilter.result.filter(x1 =>
            urlNameparams?.find(x2 => x1.spaceCategory === x2)
          )
        : tripFilter.result
      console.log(KK)
      const LLLL =
        +uurlPriceManParams! !== 0
          ? tripFilter.result.filter(
              el =>
                el.price >= +urlPriceMinParams! &&
                el.price <= +uurlPriceManParams!
            )
          : tripFilter.result

      const arr2 = KK.filter(x1 => LLLL.some(x2 => x1.idx === x2.idx))
      console.log(arr2)
      dispatch(filterprice(arr2))
      // dispatch(filterpricedd(KK))
      // dispatch(filterpricedd(urlNameparams))
    }
  }, [
    andParams,
    dispatch,
    orParams,
    price,
    searchParams,
    spaceName.length,
    tripFilter.itemfilter.length,
    tripFilter.result,
  ])

  return (
    <div>
      <RangeSlider
        width='30rem'
        defaultValue={[0, 0]}
        min={0}
        max={30000}
        step={5000}
        onChange={e => setPrice(e.map((item: any) => item.toString()))}
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
          <button type='button' key={el} onClick={() => SpaceHander(el)}>
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
