import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { useAuthFlow } from '../hooks/useAuthFlow'
import PrimaryAppBar from './AppBar'
import DragAndDrop from './DragAndDrop/DragAndDrop'

export default function LandingPage() {
  const { auth, isAutheticated } = useAuthFlow()
  const [loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (!isAutheticated()) navigate('/login')
  }, [loading])

  return (
    <>
      <PrimaryAppBar />
      <DragAndDrop />
    </>
  )
}
