import React from 'react'
import { VStack } from '@chakra-ui/react'
import UserRolesTable from './components/User-Roles-Table'

const UserRole = () => {
  return (
    <VStack w='full' p={3} fontSize='xs' minH='300px'>
      <UserRolesTable />
    </VStack>
  )
}

export default UserRole