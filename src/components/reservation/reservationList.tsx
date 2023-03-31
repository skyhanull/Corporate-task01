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
  Box,
  Container,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import {
  removeItem,
  patchItem,
  removeList,
} from '../../store/resetvation/reservationSlice'

function ReservationList({ item }: any) {
  const { idx, name, mainImage, price, maximumPurchases, amount } = item
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch<AppDispatch>()
  console.log(amount)

  const quantityHandler = () => {
    dispatch(removeItem(item))
  }
  return (
    <Card
      direction={{ base: 'row', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '100px' }}
        borderRadius='lg'
        align='center'
        src={mainImage}
        alt={name}
      />
      <CardBody>
        <Box alignItems='center' flexDirection='row'>
          <Text fontWeight='bold' align='center'>
            {name}
          </Text>

          <Box
            flexDirection='row'
            display='flex'
            justifyContent='space-between'
          >
            <Box flexDirection='row' display='flex'>
              <Button onClick={() => dispatch(removeItem(item))}>-</Button>
              <Text width='50px' mt='7px'>
                {amount}
              </Text>
              <Button onClick={() => dispatch(patchItem(item))}>+</Button>
            </Box>
            <Text>{amount * price}</Text>
          </Box>
        </Box>
      </CardBody>
      <Button
        size='xs'
        colorScheme='red'
        onClick={() => dispatch(removeList(item))}
      >
        x
      </Button>
    </Card>
  )
}

export default ReservationList
