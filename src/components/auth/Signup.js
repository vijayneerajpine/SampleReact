import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ToastContainer, Slide } from 'react-toastify'
import { useAuthFlow } from '../../hooks/useAuthFlow'

export default function Signup() {
  const [userDetails, setUserDetails] = useState({ email: '', password: '', name: '' })

  const { auth, registerWithEmailAndPassword } = useAuthFlow()
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    // if (user) navigate('/login')
  }, [user, loading])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserDetails({ ...userDetails, [name]: value })
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={handleChange}
            margin='normal'
            value={userDetails.name}
            required
            fullWidth
            id='name'
            label='Username'
            name='name'
            autoComplete='name'
            autoFocus
          />
          <TextField
            onChange={handleChange}
            margin='normal'
            value={userDetails.email}
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            onChange={handleChange}
            margin='normal'
            value={userDetails.password}
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            onClick={() => registerWithEmailAndPassword(userDetails)}
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, textTransform: 'none', fontWeight: 'bold', fontSize: 15 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to='/login'>{'Already have an account? Login'}</Link>
            </Grid>
          </Grid>
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
