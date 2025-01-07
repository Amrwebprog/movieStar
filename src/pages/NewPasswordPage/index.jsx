import { Key } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Button,
  Container,
  IconButton,
  keyframes,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Footer from '../../components/footer'
import { GlobalContext } from '../../components/GlobalContext'
import Navbar1 from '../../components/Navbar1'

export default function NewPassword() {
  const navigate = useNavigate()
  const [data, setData] = useState({ password: '', password_confirmation: '' })
  const { mode } = useContext(GlobalContext)
  const location = useLocation()
  const array = location.search.split('=')
  const email = decodeURIComponent(array[2])
  console.log(email)
  const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
  const array1 = array[1].split('&')
  const token = array1[0]
  console.log(token)

  const HandleChange = (e) => {
    const { name, value } = e.target
    setData((newData) => ({
      ...newData,
      [name]: value,
    }))
  }

  const ResetPassword = () => {
    console.log(data)
    axios
      .post(
        `http://movie-star.test/api/Auth/reset_password?token=${token}&email=${email}`,
        data
      )
      .then((res) => {
        console.log(res)
        Swal.fire({
          title: 'Congratolation',
          text: res.data.message,
          icon: 'success',
        })
        navigate('/Login&Register')
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          title: 'Oopss!!!',
          text: err.data.message,
          icon: 'error',
        })
      })
  }
  return (
    <>
      <Box sx={{ backgroundColor: mode != 'dark' ? '#f7f9fc' : '#7b7e83' }}>
        <Navbar1 />
        <Container
          maxWidth="xl"
          sx={{
            minHeight: '82vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              padding: '40px',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              animation: `${fadeIn} 1s ease-in-out`,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              position: 'relative',
            }}
          >
            <IconButton
              aria-label="Go Back"
              sx={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                color: '#007bff',
                '&:hover': { color: '#0056b3' },
              }}
              onClick={() => {
                window.history.back()
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Reset Your Password
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginBottom: '20px', fontSize: '14px' }}
            >
              Please enter your email address to receive the reset link.
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <TextField
                name="password"
                onChange={HandleChange}
                fullWidth
                label="New Password"
                variant="outlined"
                type="Password"
                required
                InputProps={{
                  startAdornment: (
                    <Key sx={{ marginRight: '10px', color: '#757575' }} />
                  ),
                }}
              />
              <TextField
                name="password_confirmation"
                onChange={HandleChange}
                fullWidth
                label="Confirm Your New Password"
                variant="outlined"
                type="Password"
                required
                InputProps={{
                  startAdornment: (
                    <Key sx={{ marginRight: '10px', color: '#757575' }} />
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: '10px',
                  backgroundColor: '#007bff',
                  '&:hover': {
                    backgroundColor: '#0056b3',
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px rgba(0, 91, 187, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
                onClick={ResetPassword}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Container>
        <Footer />
      </Box>
    </>
  )
}
