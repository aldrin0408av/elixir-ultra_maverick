import React from 'react'
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/react'

const UserRoleDrawer = ({ isOpen, onClose }) => {
    return (
        <Drawer isOpen={isOpen} onClose={() => { }}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader></DrawerHeader>
                <DrawerCloseButton onClick={onClose} />
                <DrawerBody></DrawerBody>
                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default UserRoleDrawer
