import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import { decodeUser } from '../../services/token/decode-user'

import { Layout } from '../Layout'
import LoginPage from '../../pages/login/Login-Page'
import NotFoundPage from '../../pages/not-found'

import TransformationPage from '../../pages/transformation'
import TransformationPlanning from '../../pages/transformation/transformation-planning'
import ApprovalRequest from '../../pages/transformation/approval-request'
import Mixing from '../../pages/transformation/mixing'
import Preparation from '../../pages/transformation/preparation'

import UserManagement from '../../pages/user-management'
import UserRole from '../../pages/user-management/user-role'

const user = decodeUser()

const AuthenticatedRoutes = () => {
    return (
        user ? <Layout /> : <Navigate to='/login' />
    )
}

export const Routing = () => {

    let routing = useRoutes([
        { path: "*", element: <NotFoundPage /> },
        {
            path: "/",
            element: <AuthenticatedRoutes />,
            children: [
                {
                    path: 'transformation',
                    element: <TransformationPage />,
                    children: [
                        {
                            path: 'transformation-planning',
                            element: <TransformationPlanning />
                        },
                        {
                            path: 'approval-request',
                            element: <ApprovalRequest />
                        },
                        {
                            path: 'preparation',
                            element: <Preparation />
                        },
                        {
                            path: 'mixing',
                            element: <Mixing />
                        }
                    ]
                },
                {
                    path: 'user-management',
                    element: <UserManagement />,
                    children: [
                        {
                            path: 'user-role',
                            element: <UserRole />
                        }
                    ]
                }
            ],
        },
        { path: "/login", element: <LoginPage /> }
    ])

    return routing

}
