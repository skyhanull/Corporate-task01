import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
} from '@chakra-ui/react'
import { AppDispatch, RootState } from '../../store/store'
import { filterprice } from '../../store/trip/tripSlice'
import tripApi from '../../store/trip/tripThunk'

function TripCard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [spaceName, setSpaceName] = useState<string[]>([])
  const [nameSpaceparam, setNameSpaceParam] = useState('')
  const [price, setPrice] = useState<string[]>(['0', '0'])
  const dispatch = useDispatch<AppDispatch>()
  const tripFilter = useSelector((state: RootState) => state.Triplist)

  const category = ['강원', '서울', '부산', '대구', '제주']

  const SpaceHander = (names: string) => {
    if (!spaceName.includes(names)) {
      setNameSpaceParam(names)
      setSpaceName(prev => [...prev, names])
    }
  }

  const resetHandler = () => {
    searchParams.delete('name')
    searchParams.delete('min')
    searchParams.delete('max')
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const urlNameparams = () => {
      if (spaceName.length > 0) {
        const c = spaceName.join().trim()
        searchParams.set('name', c)
        setSearchParams(searchParams)
      }
    }
    urlNameparams()
  }, [nameSpaceparam, searchParams, setSearchParams, spaceName])

  useEffect(() => {
    const next = price[1]
    const pre = price[0]

    if (+price[1] !== 0) {
      searchParams.set('min', pre)
      searchParams.set('max', next)
      setSearchParams(searchParams)
    }
  }, [price, searchParams, setSearchParams])

  const submitHandler = useCallback(
    (space: string[], priced: string[]) => {
      const filteredSpace =
        space.length !== 0
          ? tripFilter.result.filter(x1 =>
              space.find(x2 => x1.spaceCategory === x2)
            )
          : tripFilter.result

      const filteredPrice =
        +priced[1] !== 0
          ? tripFilter.result.filter(
              el => el.price >= +priced[0] && el.price <= +priced[1]
            )
          : tripFilter.result

      const filteredAll = filteredSpace.filter(x1 =>
        filteredPrice.some(x2 => x1.idx === x2.idx)
      )

      dispatch(filterprice(filteredAll))
    },
    [dispatch, tripFilter.result]
  )

  useEffect(() => {
    submitHandler(spaceName, price)
  }, [price, spaceName, submitHandler])

  useEffect(() => {
    if (searchParams.get('name') && searchParams.get('max')) {
      /* 조건을 어떻게 하지 */
      const urlNameparams = searchParams.get('name')?.split(',') as string[]
      const urlPriceMinParams = searchParams.get('min') as string
      const uurlPriceManParams = searchParams.get('max') as string
      const priceUrl = [urlPriceMinParams, uurlPriceManParams]

      submitHandler(urlNameparams, priceUrl)
    }
  }, [searchParams, submitHandler])

  return (
    <div>
      <RangeSlider
        width='30rem'
        defaultValue={[0, 0]}
        min={0}
        max={30000}
        step={5000}
        onChange={e => setPrice(e.map((item: number) => item.toString()))}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>

        <RangeSliderThumb index={0} />
        <RangeSliderThumb boxSize={6} index={1} />
      </RangeSlider>

      <div>
        min : {price[0]} max : {price[1]}
      </div>
      <div>
        {category.map(el => (
          <Button
            type='button'
            key={el}
            onClick={() => SpaceHander(el)}
            colorScheme={spaceName.includes(el) ? 'cyan' : 'gray'}
          >
            {el}
          </Button>
        ))}
      </div>
      <button type='button' onClick={resetHandler}>
        리셋
      </button>
    </div>
  )
}

export default TripCard
