import { Text, Box, Container } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import ReservationList from '../components/reservation/reservationList'
import { RootState } from '../store/store'

function Reservation() {
  const trip = useSelector((state: RootState) => state.reservationSlice)

  const Allsum = trip.result.reduce((acc, cur) => {
    return acc + cur.amount * cur.price
  }, 0)
  return (
    <Box alignItems='center'>
      <Container width='1000px' alignItems='center' height='700px'>
        <Text fontSize='4xl' as='u'>
          장바구니
        </Text>
        {trip.result.map((item: any) => (
          <ReservationList key={item.idx} item={item} />
        ))}
      </Container>
      <Box borderTop='1px' borderColor='gray'>
        총 결제 금액 : $ {Allsum}
      </Box>
    </Box>
  )
}

export default Reservation
