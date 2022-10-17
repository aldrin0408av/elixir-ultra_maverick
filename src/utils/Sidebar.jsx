import React, { useState } from 'react';
import { Flex, Box, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, VStack, HStack, Avatar } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi'
import { useFetchTaggedApi } from '../global/api/common-fetch'
import { decodeUser } from '../services/token/decode-user';

const user = decodeUser()

const SidebarHeader = () => {
    return (
        <Flex bgColor='secondary' h='100px' justifyContent='center' alignItems='center'>
            <Avatar size='xl' name='UM-Elixir' src='/images/umelixirlogo.png' />
        </Flex>
    )
}

const SidebarFooter = () => {
    return (
        <Flex justifyContent='center' alignItems='center' flexDirection='column' pb='3'>
            <Text color='white' fontSize='10px' textAlign='center'>© 2022, UM-Elixir Powered by Process Automation (MIS)</Text>
        </Flex>
    )
}

const Sidebar = () => {

    const { data: navigationData } = useFetchTaggedApi(user.role)

    const { pathname } = useLocation()
    const [selectedMenu, setSelectedMenu] = useState([])
    const [isSelected, setIsSelected] = useState(false)

    const buttonHandler = (modName) => {
        setIsSelected(!isSelected)
        setSelectedMenu(modName)
    }

    return (
        <Flex
            h='100vh'
            flexDirection='column' justifyContent='space-between' bgColor='secondary' width='15rem' borderColor='primary'
        >
            <Flex flexDirection="column" w='full'>
                <SidebarHeader />

                <Accordion allowToggle border='none'>
                    {navigationData?.map((modName) => (
                        <AccordionItem key={modName.mainMenuId}
                            border='none'
                        >
                            <Link to={modName.path}>
                                <AccordionButton onClick={() => buttonHandler(modName)}
                                    bgColor={pathname.includes(modName.path) ? 'accent' : 'secondary'}
                                    bgGradient={pathname.includes(modName.path) ? "linear(to-l, #003366, accent)" : 'secondary'}
                                    _hover={{ bgGradient: "linear(to-l, #003366, accent)" }}
                                    fontSize='sm'
                                >
                                    <HStack justifyContent='space-between' w='full'>
                                        <Text color='white'>{modName.mainMenu}</Text>
                                        {/* {modName.mainMenu === selectedModule ? <AiFillCaretUp color='white' fontSize='20px' /> : <AiFillCaretDown color='white' fontSize='20px' />} */}
                                    </HStack>
                                </AccordionButton>
                            </Link>
                            <AccordionPanel border='none' fontSize='13px'>
                                <VStack alignItems='start'>
                                    {selectedMenu?.subMenu?.map((sub) => (
                                        <Box w='full' key={sub.title}
                                            cursor='pointer'
                                            // bgColor={pathname.includes(sub.path) ? 'accent' : 'secondary'}
                                            // bgGradient={pathname.includes(sub.path) ? "linear(to-l, #003366, accent)" : 'secondary'}
                                            boxShadow={pathname.includes(sub.path) ? '2px 2px 6px 2px teal' : ''}
                                            _hover={{ bgGradient: "linear(to-l, #003366, accent)" }}
                                        >
                                            <Link to={sub.path}>
                                                <HStack justifyContent='space-between' px={1}>
                                                    <Text color='white'>{sub.title}</Text>
                                                    {pathname.includes(sub.path) ? <BiRadioCircleMarked color='white' fontSize='20px' /> : <BiRadioCircle color='white' fontSize='20px' />}
                                                </HStack>
                                            </Link>
                                        </Box>
                                    ))}
                                </VStack>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>

            </Flex>
            <SidebarFooter />
        </Flex>
    )
}

export default Sidebar
