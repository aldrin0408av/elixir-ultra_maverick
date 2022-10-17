import React from 'react';
import moment from 'moment';
import {
    Box,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text
} from '@chakra-ui/react';
import { BiUser } from 'react-icons/bi'
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import { useNavigate } from 'react-router-dom';
import { decodeUser } from '../services/token/decode-user';

export const Header = (props) => {
    const user = decodeUser()
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem('userData')
        navigate('/login')
        navigate('/login')
        window.location.reload(false);
    }

    const { sideBarHandler } = props

    return (
        <Flex bgColor='secondary' h='42px' justifyContent='space-between' pl={2} pr={2} alignItems='center' fontSize='sm'>
            <HStack>
                <Flex bgColor='none' justifyContent='center' alignItems='center' gap={2} onClick={sideBarHandler} cursor='pointer'>
                    <SiHomeassistantcommunitystore size='20px' color='#daf5ee' cursor='pointer' />
                    <Text color='white' fontWeight='normal' fontSize='xs'>Date: {moment().format('MMMM DD YYYY')}</Text>
                </Flex>
                {/* <FiMenu color='#daf5ee' size='24px' cursor='pointer'/> */}
            </HStack>
            <HStack>
                <Box p={2} borderRight='1px' borderColor='primary' cursor='pointer'>
                    <Menu>
                        <MenuButton>
                            <Flex _hover={{ color: 'accent' }} alignItems='center' flexDirection='row' gap={2} color='white'>
                                {user?.fullName}
                                <Text mr='1'>
                                    <BiUser color='#daf5ee' size='20px' cursor='pointer' />
                                </Text>
                            </Flex>
                        </MenuButton>
                        <MenuList>
                            <MenuItem color='black' cursor='default'>
                                {`Username: ${user && user?.userName}`}
                            </MenuItem>
                            <MenuItem _hover={{ color: 'accent' }} onClick={logout}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </HStack>
        </Flex>
    )
};