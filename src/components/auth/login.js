import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import GoogleIcon from '@mui/icons-material/Google'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Container from '@mui/material/Container'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAuthFlow } from '../../hooks/useAuthFlow'

export default function Login() {
  const [userDetails, setUserDetails] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const checkPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const navigate = useNavigate()
  const { logInWithEmailAndPassword, signInWithGoogle, isAutheticated } = useAuthFlow()

  useEffect(() => {
    if (isLoading) {
      // maybe trigger a loading screen
      return
    }
  }, [isLoading])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserDetails({ ...userDetails, [name]: value })
  }

  const handleLoginSubmit = async () => {
    setIsLoading(true)
    await logInWithEmailAndPassword(userDetails)
    if (isAutheticated()) {
      navigate('/')
    }
    setIsLoading(false)
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
          Sign in
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
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
            type={showPassword ? 'text' : 'password'}
            id='password'
            autoComplete='current-password'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  {showPassword ? (
                    <VisibilityIcon onClick={checkPassword} sx={{ cursor: 'pointer' }} />
                  ) : (
                    <VisibilityOffIcon onClick={checkPassword} sx={{ cursor: 'pointer' }} />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            loading={isLoading}
            loadingIndicator='Loading…'
            onClick={handleLoginSubmit}
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2, textTransform: 'none', fontWeight: 'bold', fontSize: 15 }}
          >
            Sign In
          </LoadingButton>
          {/* <Button
            onClick={() => signInWithGoogle()}
            fullWidth
            variant='contained'
            sx={{ mt: 1, mb: 2, p: 1, textTransform: 'none', fontWeight: 'bold', fontSize: 15 }}
          >
            <GoogleIcon fontSize='small' sx={{ mr: 1 }} />
            Signin with Google
          </Button> */}
          <Grid container>
            <Grid item xs>
              <Link to='/forgot-password'>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to='/signup'>{'Do not have an account? Sign Up'}</Link>
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
