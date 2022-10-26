import React, { useEffect, useState } from 'react'
import {
    Flex,
    Text,
    useMediaQuery
} from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollFunction } from './Scroll'
import Sidebar from './Sidebar'
import Header from './Header'
import IntroductionPage from '../pages/introduction'


export const Layout = () => {

    const [moduleName, setModuleName] = useState('')

    const [isSidebarVisible, setIsSidebarVisible] = useState(false)
    const [isMobile] = useMediaQuery('(max-width: 1230px)')

    useEffect(() => {
        setIsSidebarVisible(isMobile)
    }, [isMobile])

    const SideBarHandler = () => {
        setIsSidebarVisible(prev => !prev)
    }

    const pathname = useLocation()

    return (
        <Flex bgColor='myWhite' h='100vh' w='full'>
            {!isSidebarVisible &&
                <Sidebar setModuleName={setModuleName} />
            }
            <Flex w='full' bgColor='gray.300' flexDirection='column' gap={5}>
                <Header sideBarHandler={SideBarHandler} isSidebarVisible={isSidebarVisible} />
                {pathname?.pathname === '/' ?
                    <IntroductionPage />
                    :
                    <>
                        <Text ml={3} mb={-4} w='17%' fontSize='sm' textAlign='center' bgColor='secondary' color='myWhite' fontWeight='semibold'>{moduleName && moduleName}</Text>
                        <Flex bgColor='myWhite' boxShadow={pathname?.pathname === '/' ? '' : '0 3px 10px rgb(0 0 0 / 0.2)'} mx={pathname?.pathname === '/' ? '' : 3}>
                            <ScrollFunction minHeight='200px' maxHeight='auto' width='99%'>
                                <Outlet />
                            </ScrollFunction>
                        </Flex>
                    </>
                }
            </Flex>
        </Flex >
    )
}

