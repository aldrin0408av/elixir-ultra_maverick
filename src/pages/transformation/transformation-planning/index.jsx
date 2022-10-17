import { Button, ButtonGroup, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import AddRequest from './add-request'

const TransformationPlanning = () => {

  return (
    <>
      <Flex w='full' p={2} h='94.5vh'>
        <VStack w='full'>

          <Flex justifyContent='start' w='full'>
            <ButtonGroup size='xs' spacing={1} color='myWhite'>
              <Button bgColor='secondary' _hover={{ bgColor: 'accent', color: 'white' }} _active={{ bgColor: 'accent', color: 'white' }}>Add Request</Button>
              <Button bgColor='secondary' _hover={{ bgColor: 'accent', color: 'white' }} _active={{ bgColor: 'accent', color: 'white' }}>Status of Request</Button>
              <Button bgColor='secondary' _hover={{ bgColor: 'accent', color: 'white' }} _active={{ bgColor: 'accent', color: 'white' }}>Request Request</Button>
            </ButtonGroup>
          </Flex>

          <Flex w='full' p={2} bgColor='myWhite' h='100vh' boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
            <AddRequest />
          </Flex>

        </VStack>
      </Flex>
    </>
  )
}

export default TransformationPlanning
