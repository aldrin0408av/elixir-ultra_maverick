import React, { useState } from 'react';
import { Flex, Box, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, VStack, HStack, Avatar, Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi'
import { useFetchTaggedApi } from '../global/api/common.api.services'
import { decodeUser } from '../services/token/decode-user';

const user = decodeUser()

const DrawerHeader = () => {
    return (
        <Flex bgColor='secondary' h='100px' justifyContent='center' alignItems='center'>
            <Avatar size='xl' name='UM-Elixir' src='/images/umelixirlogo.png' />
        </Flex>
    )
}

const DrawerFooter = () => {
    return (
        <Flex bgColor='secondary' justifyContent='center' alignItems='center' flexDirection='column' pb='3'>
            <Text color='white' fontSize='10px' textAlign='center'>© 2022, UM-Elixir Powered by Process Automation (MIS)</Text>
        </Flex>
    )
}

const DrawerBody = ({ setModuleName, isSidebarVisible, sideBarHandler }) => {
    const { data: navigationData } = useFetchTaggedApi(user.role)

    const { pathname } = useLocation()
    const [selectedMenu, setSelectedMenu] = useState([])
    const [isSelected, setIsSelected] = useState(false)

    const buttonHandler = (modName) => {
        setIsSelected(!isSelected)
        setSelectedMenu(modName)
    }

    const subMenuHandler = (title) => {
        setModuleName(title)
        sideBarHandler()
    }
    return (
        <Accordion height='100vh' allowToggle w='full' bgColor='secondary' borderColor='primary'>

            {navigationData?.map((modName) => (
                <AccordionItem key={modName.mainMenuId}
                    border='none'
                >
                    <Link>
                        <AccordionButton onClick={() => buttonHandler(modName)}
                            bgColor={pathname.includes(modName.path) ? 'accent' : 'secondary'}
                            bgGradient={pathname.includes(modName.path) ? "linear(to-l, #003366, accent)" : 'secondary'}
                            _hover={{ bgGradient: "linear(to-l, #003366, accent)" }}
                            fontSize='sm'
                        >
                            <HStack justifyContent='space-between' w='full'>
                                <Text color='white'>{modName.mainMenu}</Text>
                            </HStack>
                        </AccordionButton>
                    </Link>

                    <AccordionPanel border='none' fontSize='13px'>
                        <VStack alignItems='start'>
                            {selectedMenu?.subMenu?.map((sub) => (
                                <Box w='full' key={sub.title}
                                    cursor='pointer'
                                    boxShadow={pathname.includes(sub.path) ? '2px 2px 6px 2px teal' : ''}
                                    _hover={{ bgGradient: "linear(to-l, #003366, accent)" }}
                                >
                                    <Link to={sub.path} onClick={() => subMenuHandler(sub.title)}>
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
    )
}

const Sidebar = ({ setModuleName, isSidebarVisible, sideBarHandler }) => {
    return (
        <Drawer isOpen={isSidebarVisible} onClose={sideBarHandler} placement='left'>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader />
                <DrawerBody setModuleName={setModuleName} isSidebarVisible={isSidebarVisible} sideBarHandler={sideBarHandler} />
                <DrawerFooter />
            </DrawerContent >
        </Drawer >
    )
}

export default Sidebar
