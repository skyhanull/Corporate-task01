import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Badge,
  Image,
  Stack,
  Container,
} from '@chakra-ui/react'
import ITriplInfo from '../../types'

interface IModal {
  isOpen: boolean
  onClose: () => void
  addListData: ITriplInfo
}

function ModalCard({ isOpen, onClose, addListData }: IModal) {
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal
        blockScrollOnMount={false}
        size='xl'
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Badge
              colorScheme='green'
              mr='2'
              fontSize='20px'
              width='25px'
              textAlign='center'
              borderRadius='5px'
            >
              {addListData.idx}
            </Badge>
            {addListData.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack
              flexDirection='row'
              // justify='space-between'
              alignItems='center'
            >
              <Image
                objectFit='cover'
                maxW={{ base: '40%' }}
                align='center'
                src={addListData.mainImage}
                alt={addListData.name}
                borderRadius='lg'
              />
              <Container flexDirection='column' alignItems='left' m={2}>
                <Text fontWeight='bold' m='1rem'>
                  예약 일시 :{addListData.registrationDate}
                </Text>
                <Text mb='1rem'>지역 :{addListData.spaceCategory}</Text>
                <Text mb='1rem'>설명 :{addListData.description}</Text>
                <Text mb='1rem'>
                  최대구매수량 :{addListData.maximumPurchases}
                </Text>
              </Container>
            </Stack>
            {/* <Lorem count={2} /> */}
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost'> 가격 :${addListData.price}</Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalCard
