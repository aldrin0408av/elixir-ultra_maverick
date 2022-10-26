import React from 'react'
import UserRoleDrawer from './User-Roles-Drawer'
import { FaSearch } from 'react-icons/fa'
import { ScrollFunction } from '../../../../utils/Scroll'
import { useChangeRoleStatusApi, useFetchUserRolesApi } from '../api/User-Roles.services'
import { usePageUtilities } from '../../../../utils/Page-Utilities'
import { Pagination, PaginationContainer, PaginationNext, PaginationPage, PaginationPageGroup, PaginationPrevious } from '@ajna/pagination'
import { Box, Button, ButtonGroup, Flex, HStack, Input, InputGroup, InputLeftElement, Select, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { BasicToast, ModalToast } from '../../../../utils/Toast'

const UserRolesTable = () => {

  const { currentPage, setCurrentPage, pagesCount, pages, setPageSize, pageSize, setPageTotal, search, setSearch, status, setStatus } = usePageUtilities()
  const { data: userRolesData, isLoading, refetch } = useFetchUserRolesApi(status, currentPage, pageSize, search, setPageTotal)
  const { isOpen: isDrawer, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure()

  const searchHandler = (inputValue) => {
    setSearch(inputValue)
  }

  const statusHandler = (data) => {
    setStatus(data)
  }

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage)
  }

  const handlePageSizeChange = (e) => {
    const pageSize = Number(e.target.value)
    setPageSize(pageSize)
  }

  const { mutate: changeStatus } = useChangeRoleStatusApi()

  const changeStatusHandler = (id, roleStatus) => {
    ModalToast(
      'Change Role Status',
      `Are you sure you want to ${roleStatus ? 'deactivate' : 'activate'} this role?`,
      'question',
      `Yes, ${roleStatus ? 'deactivate' : 'activate'} this role`
    ).then((result) => {
      if (result.isConfirmed) {
        changeStatus({ id, roleStatus }, {
          onSuccess: () => {
            BasicToast('top-end', 'success', `Role has been ${roleStatus ? 'deactivated' : 'activated'}`, 1200)
            refetch()
          },
          onError: (err) => {
            BasicToast('top-end', 'error', err.response.data.message, 1200)
          }
        })
      }
    })
  }

  return (
    <Flex w='full' flexDirection='column' gap={5}>

      <Flex justifyContent='space-between'>
        <InputGroup w='auto'>
          <InputLeftElement
            pointerEvents='none'
            children={<FaSearch className='icon-style' />}
          />
          <Input
            onChange={(e) => searchHandler(e.target.value)}
            type='text' placeholder='Search: User Role'
            focusBorderColor='secondary'
          />
        </InputGroup>
        <HStack w='auto'>
          <Text fontSize='sm'>Status: </Text>
          <Select onChange={(e) => statusHandler(e.target.value)}>
            <option value={Boolean(1)}>Active</option>
            <option value={Boolean(0)}>Inactive</option>
          </Select>
        </HStack>
      </Flex>

      <Flex w='full' justifyContent='center'>
        <ScrollFunction minHeight='200px' maxHeight='75vh' width='full'>
          {isLoading ? 'Hi'
            :
            <Table size='sm'>
              <Thead position='sticky' zIndex='docked' top={0} bgColor='primary'>
                <Tr>
                  <Th color='myWhite'>ID</Th>
                  <Th color='myWhite'>User Role</Th>
                  <Th color='myWhite'>Added By</Th>
                  <Th color='myWhite'>Date Added</Th>
                  <Th color='myWhite'>Modified By</Th>
                  <Th color='myWhite'>Date Modified</Th>
                  <Th color='myWhite'>Access</Th>
                  <Th color='myWhite'>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userRolesData?.role.map(role =>
                  <Tr key={role.id}>
                    <Td>{role.id}</Td>
                    <Td>{role.roleName}</Td>
                    <Td>{role.addedBy}</Td>
                    <Td>{role.dateAdded}</Td>
                    <Td>{role.modifiedBy}</Td>
                    <Td>{role.dateModified}</Td>
                    <Td><Button size='xs' colorScheme='whatsapp'>Access</Button></Td>
                    <Td>
                      <ButtonGroup size='xs'>
                        <Button colorScheme='blue'>Edit</Button>
                        <Button colorScheme={status ? 'red' : 'green'} onClick={() => changeStatusHandler(role.id, role.isActive)}>{role.isActive ? 'Deactivate' : 'Activate'}</Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          }
        </ScrollFunction>
      </Flex>

      <Flex w='full' justifyContent='space-between'>
        <Box>
          <Button size='sm' onClick={() => openDrawer()} colorScheme='facebook' _hover={{}}>Add New Role</Button>
        </Box>
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        >
          <PaginationContainer gap={1}>
            <PaginationPrevious bgColor='primary' color='myWhite' size='sm' _hover={{ bgColor: 'myWhite', color: 'primary' }}>{`<<`}</PaginationPrevious>
            <PaginationPageGroup>
              {pages.map((page) => (
                <PaginationPage
                  size='sm' bgColor='primary' color='myWhite' _hover={{ bgColor: 'myWhite', color: 'primary' }} px={2}
                  key={`pagination_page_${page}`}
                  page={page}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext bgColor='primary' color='myWhite' size='sm' _hover={{ bgColor: 'myWhite', color: 'primary' }}>{`>>`}</PaginationNext>
            <Select
              onChange={handlePageSizeChange}
              w='40%' size='sm'
            >
              <option value={Number(5)}>5</option>
              <option value={Number(10)}>10</option>
              <option value={Number(25)}>25</option>
              <option value={Number(50)}>50</option>
            </Select>
          </PaginationContainer>
        </Pagination>
      </Flex>

      {
        isDrawer && (
          <UserRoleDrawer
            isOpen={isDrawer}
            onClose={closeDrawer}
          />
        )
      }

    </Flex >
  )
}

export default UserRolesTable
