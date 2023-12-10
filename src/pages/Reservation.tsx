import {
  Text,
  Box,
  Container,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  ButtonGroup,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import onClickPayment from '../components/Pay/pay'
import ReservationList from '../components/reservation/reservationList'
import { RootState } from '../store/store'

function Reservation() {
  const trip = useSelector((state: RootState) => state.reservationSlice)

  const Allsum = trip.result.reduce((acc, cur) => {
    return acc + cur.amount * cur.price
  }, 0)

  return (
    <Box alignItems='center'>
      <Text fontSize='5xl' as='u'>
        장바구니
      </Text>
      <Container
        width='1000px'
        alignItems='center'
        height='750px'
        overflow='scroll'
        border='1px'
        borderColor='lightgray'
      >
        {trip.result.length === 0 ? (
          <Text>장바구니에 담은 것이 없습니다</Text>
        ) : (
          trip.result.map((item: any) => (
            <Box m='5'>
              <ReservationList key={item.idx} item={item} />
            </Box>
          ))
        )}
      </Container>
      <Box
        display='flex'
        justifyContent='center'
        flexDirection='column'
        mt='20px'
      >
        <Container
          display='flex'
          flexDirection='row'
          width='600px'
          border='4px'
          borderColor='gray'
        >
          <Stat>
            <StatLabel>총 합산 금액</StatLabel>
            <StatNumber>{Allsum}원</StatNumber>
          </Stat>
          <Box mt='10px'>=</Box>
          <Stat>
            <StatLabel>총 합산 금액</StatLabel>
            <StatNumber>{Allsum}원</StatNumber>
          </Stat>
        </Container>
        <ButtonGroup display='flex' justifyContent='center' m='8' size='lg'>
          <Link to='/main'>
            <Button colorScheme='blue' variant='outline'>
              쇼핑 계속하기
            </Button>
          </Link>
          <Button
            colorScheme='blue'
            variant='solid'
            onClick={() => onClickPayment(Allsum)}
          >
            결제하기
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export default Reservation
