import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Image,
  useToast,
  Heading,
  Button,
  Text,
  Badge,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react'
import { RootState } from '../../store/store'
import { addcartlist } from '../../store/resetvation/reservationSlice'
import ITriplInfo from '../../types'
import ModalCard from '../modal/modalCard'

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
  const toast = useToast()

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

  // const openModalHandler = () => {
  //   dispatch(setSelectedtripList(idx))
  //   onOpen()
  // }

  const addToCartHandler = () => {
    if (trip.result.find(item => item.idx === idx)) {
      toast({
        title: '오류',
        description: '이미 장바구니에 존재합니다.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } else {
      toast({
        title: '예약 완료',
        description: '장바구니에 추가했습니다.',
        status: 'info',
        duration: 500,
        isClosable: true,
        position: 'top',
      })
      dispatch(addcartlist(addListData))
    }
  }

  return (
    <div>
      <ModalCard isOpen={isOpen} onClose={onClose} addListData={addListData} />
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
              onClick={addToCartHandler}
            >
              예약하기
            </Button>
            <Button
              variant='solid'
              colorScheme='teal'
              // onClick={openModalHandler}
              onClick={onOpen}
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
