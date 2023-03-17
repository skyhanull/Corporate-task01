import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { addcartlist } from '../../store/resetvation/reservationSlice'
import ITriplInfo from '../../types'
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Button,
  Text,
  Badge,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react'
function TripCards({
  idx,
  name,
  mainImage,
  maximumPurchases,
  spaceCategory,
  price,
  registrationDate,
  description,
}: ITriplInfo) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const tripFilter = useSelector((state: RootState) => state.Triplist)
  const trip = useSelector((state: RootState) => state.reservationSlice)
  const dispatch = useDispatch()
  const addListData = {
    idx,
    name,
    mainImage,
    maximumPurchases,
    spaceCategory,
    price,
    registrationDate,
    description,
  }
  // console.log(addListData)
  const addToCartHandler = (idx: number) => {
    tripFilter.result.find(item => item.idx === idx)
      ? dispatch(addcartlist(addListData))
      : null
    // isOpen()
  }

  console.log(trip.result)

  return (
    <div>
      <Card
        direction={{ base: 'row' }}
        overflow='hidden'
        variant='outline'
        width='480px'
        height='140px'
        justify='space-between'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '100px' }}
          src={mainImage}
          alt={name}
        />

        <CardBody>
          <Text size='sm' fontSize='14px' fontWeight='bold'>
            <Badge colorScheme='green' mr='2'>
              {idx}
            </Badge>
            {name}
          </Text>
          <Stack direction='row' justify='center' align='center'>
            <Text py='2'>위치 : {spaceCategory}</Text>
            <Text color='blue.600' fontSize='md'>
              ${price}
            </Text>
          </Stack>
          <ButtonGroup spacing='2' size='xs'>
            <Button
              variant='solid'
              colorScheme='blue'
              onClick={() => addToCartHandler(idx)}
            >
              예약하기
            </Button>
            <Button
              variant='solid'
              colorScheme='teal'
              // onClick={openModalHandler}
            >
              상세정보
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </div>
  )
}

export default TripCards
