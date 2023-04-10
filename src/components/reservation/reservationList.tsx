import { Card, CardBody, Image, Button, Text, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, persistor } from '../../store/store'
import {
  removeItem,
  patchItem,
  removeList,
} from '../../store/resetvation/reservationSlice'

function ReservationList({ item }: any) {
  const { name, mainImage, price, amount } = item

  const dispatch = useDispatch<AppDispatch>()

  const quantityHandler = () => {
    persistor.purge()
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
      <Button size='xs' colorScheme='red' onClick={quantityHandler}>
        x
      </Button>
    </Card>
  )
}

export default ReservationList
