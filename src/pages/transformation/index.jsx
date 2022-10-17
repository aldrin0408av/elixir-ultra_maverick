import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const TransformationPage = () => {
    const path = useLocation()
    const navigate = useNavigate()

    return (
        <>
            {
                path.pathname === '/transformation' ?
                    <button onClick={() => navigate('/transformation/transformation-planning')}>
                        Go to Transformation Planning
                    </button>
                    :
                    <Outlet />
            }
        </>
    )
}

export default TransformationPage