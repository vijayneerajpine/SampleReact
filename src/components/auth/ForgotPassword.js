import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import { useAuthFlow } from '../../hooks/useAuthFlow'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isEmailLinkSent, setIsEmailLinkSent] = useState(false)

  const navigate = useNavigate()
  const { sendPasswordReset } = useAuthFlow()

  const handleResetLinkAction = () => {
    if (!isEmailLinkSent) {
      sendPasswordReset(email)
      setIsEmailLinkSent(true)
    } else {
      setIsEmailLinkSent(false)
      navigate('/login')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {isEmailLinkSent ? (
            <CheckCircleOutlineIcon style={{ fill: 'green', color: 'green' }} />
          ) : (
            <LockOutlinedIcon />
          )}
        </Avatar>
        <Typography component='h1' variant='h5'>
          Forgot Password
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          {!isEmailLinkSent && (
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              margin='normal'
              value={email}
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
          )}
          <Button
            onClick={handleResetLinkAction}
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, textTransform: 'none', fontWeight: 'bold', fontSize: 15 }}
          >
            {isEmailLinkSent ? 'Try login again' : 'Send reset link'}
          </Button>
        </Box>
      </Box>
      <ToastContainer
        transition={Slide}
        delay={1000}
        autoClose={3000}
        hideProgressBar={true}
        pauseOnHover={false}
        draggable={true}
      />
    </Container>
  )
}
