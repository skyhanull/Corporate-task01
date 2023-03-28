import { Badge, Box, Button, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import Logo from '../components/ui/logo'
import { RootState } from '../store/store'

function NavigationPage() {
  const trip = useSelector((state: RootState) => state.reservationSlice)

  return (
    <div>
      <Box
        height='100px'
        width='100%'
        display='flex'
        justifyContent='space-between'
      >
        <Link
          to='/main'
          style={{ height: '100%', width: '200px', padding: '25px' }}
        >
          <Logo />
        </Link>
        <Link
          to='/reservations'
          style={{ height: '100%', width: '200px', padding: '25px' }}
        >
          <Stack>
            <Button colorScheme='teal' size='md' variant='outline'>
              장바구니
              <Badge
                ml='2'
                variant='solid'
                colorScheme='purple'
                fontSize='1rem'
              >
                {trip.result.length ? trip.result.length : 0}
              </Badge>
            </Button>
          </Stack>
        </Link>
      </Box>
      <Outlet />
    </div>
  )
}

export default NavigationPage
