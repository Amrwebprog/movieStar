import { keyframes } from '@emotion/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Footer from '../../components/footer'
import { GlobalContext } from '../../components/GlobalContext'
import Navbar1 from '../../components/Navbar1'

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

export default function ResetPasswordPage() {
  const { mode } = useContext(GlobalContext)
  const navigate = useNavigate()
  const [Email, setEmail] = useState({ email: '' })
  const HandleChange = (e) => {
    const { name, value } = e.target
    setEmail((newData) => ({
      ...newData,
      [name]: value,
    }))
  }
  const sendMail = () => {
    console.log(Email)
    axios
      .post('http://Movie-Star.test/api/Auth/forgot_password', Email)
      .then((response) => {
        Swal.fire({
          title: 'All Done',
          text: 'You Will Recive Email Message asap!',
          icon: 'success',
        })
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
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
                onChange={HandleChange}
                name="email"
                value={Email.email}
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                required
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ marginRight: '10px', color: '#757575' }} />
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
                onClick={sendMail}
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
