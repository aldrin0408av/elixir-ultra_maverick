import React, { useEffect, useState } from 'react'
import {
    Flex,
    useMediaQuery
} from '@chakra-ui/react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ScrollFunction } from './Scroll'
import Sidebar from './Sidebar'
import { Header } from './Header'
import { IntroductionPage } from '../pages/introduction'

export const Layout = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(false)
    const [isMobile] = useMediaQuery('(max-width: 1230px)')

    useEffect(() => {
        setIsSidebarVisible(isMobile)
    }, [isMobile])

    const SideBarHandler = () => {
        setIsSidebarVisible(prev => !prev)
    }

    const path = useNavigate()

    return (
        <Flex bgColor='white' h='100vh' w='full'>
            {!isSidebarVisible &&
                <Sidebar />
            }
            <Flex w='full' bgColor='gray.300' flexDirection='column' zIndex={1}>
                <Header sideBarHandler={SideBarHandler} isSidebarVisible={isSidebarVisible} />
                {path?.pathname === '/' ?
                    <IntroductionPage />
                    :
                    <Flex>
                        <ScrollFunction minHeight='200px' maxHeight='auto' width='99%'>
                            <Outlet />
                        </ScrollFunction>
                    </Flex>
                }
            </Flex>
        </Flex >
    )
}

