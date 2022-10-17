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

export const Routing = () => {

    let routing = useRoutes([
        { path: "*", element: <NotFoundPage /> },
        {
            path: "/",
            element: user ?
                <Layout />
                : <Navigate to='/login' />,
            children: [
                {
                    path: 'transformation',
                    element: user ? <TransformationPage /> : <Navigate to='/login' />,
                    children: [
                        {
                            path: 'transformation-planning',
                            element: user ? <TransformationPlanning /> : <Navigate to='/login' />
                        },
                        {
                            path: 'approval-request',
                            element: user ? <ApprovalRequest /> : <Navigate to='/login' />
                        },
                        {
                            path: 'preparation',
                            element: user ? <Preparation /> : <Navigate to='/login' />
                        },
                        {
                            path: 'mixing',
                            element: user ? <Mixing /> : <Navigate to='/login' />
                        }
                    ]
                },
                {
                    path: 'user-management',
                    element: user ? <UserManagement /> : < Navigate to='/login' />,
                    children: [
                        {
                            path: 'user-role',
                            element: user ? <UserRole /> : < Navigate to='/login' />
                        }
                    ]
                }
            ],
        },
        { path: "/login", element: <LoginPage /> }
    ])

    return routing

}
