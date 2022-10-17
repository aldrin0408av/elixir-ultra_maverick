import React from 'react'
import { VStack } from '@chakra-ui/react'
import ListofRequests from './List-of-Requests'
import ListofRequirements from './List-of-Requirements'

const AddRequestInformations = () => {
    return (
        <VStack w='full' fontSize='xs' spacing={1}>
            <ListofRequests />
            <ListofRequirements />
        </VStack>
    )
}

export default AddRequestInformations