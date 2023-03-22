import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthFlow } from '../../hooks/useAuthFlow'

const PrivateRoute = ({ children }) => {
  const { isAutheticated } = useAuthFlow()

  return isAutheticated() ? children : <Navigate to='/login' />
}

export default PrivateRoute
