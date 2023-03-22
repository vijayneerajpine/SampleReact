import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'
import Login from './components/auth/login'
import LandingPage from './components/LandingPage'
import Signup from './components/auth/Signup'
import ForgotPassword from './components/auth/ForgotPassword'
import Practics from './components/Practics'

const Routing = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="*" exact element={<PrivateRoute>
              <LandingPage />
            </PrivateRoute>} />
        <Route
          path='/'
          exact
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>

    </>
  )
}
export default Routing
