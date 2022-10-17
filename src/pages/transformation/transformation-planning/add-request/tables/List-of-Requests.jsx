import React from 'react'
import { Text, VStack } from '@chakra-ui/react'

const ListofRequests = () => {
    return (
        <VStack w='full' fontSize='xs'>
            <Text textAlign='center' fontSize='sm' bgColor='secondary' color='myWhite' w='full'>List of Pending Requests</Text>
        </VStack>
    )
}

export default ListofRequests