import React, { useState } from 'react'
import { Box, Button, VStack } from '@chakra-ui/react'
import RequestForm from './forms/Request-Form'
import AddRequestInformations from './tables'

const AddRequest = () => {

  const [changeView, setChangeView] = useState(false)

  return (
    <VStack w='full' justifyContent='space-between'>
      {
        changeView ?
          <RequestForm />
          :
          <AddRequestInformations />
      }
      <Box w='full' justifyContent='start'>
        <Button _hover={{ bgColor: 'accent', color: 'white' }} bgColor='accent' color='myWhite' size='xs' onClick={() => setChangeView(!changeView)}>
          {
            changeView ? 'View Pending Requests' : 'Request Transformation'
          }
        </Button>
      </Box>
    </VStack>
  )

}

export default AddRequest
