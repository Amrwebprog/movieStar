import { useTheme } from '@emotion/react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useLoader from './CustomHook.jsx'
import { GlobalContext } from './GlobalContext'

export default function LoginForm() {
  const { setLoading, Loader, loading } = useLoader()
  const { showRegister, setShowRegister } = useContext(GlobalContext)
  const [cookies, setCookie] = useCookies(['authToken', 'username'])
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const verfy = async (token) => {
    try {
      const response = await axios.get('http://Movie-Star.test/api/Users/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log('Token is valid')
      return true
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.error('Token is invalid')
      } else {
        console.error('Error during verification', err)
      }
      return false
    }
  }
  useEffect(() => {
    const checkToken = async () => {
      const token = cookies.authToken
      const isVerfy = await verfy(token)
      if (cookies.authToken && isVerfy) {
        navigate('/LoginSucces')
      } else {
        console.log('Token not verified or authToken is missing')
      }
    }

    checkToken()
  }, [cookies.authToken, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((newData) => ({
      ...newData,
      [name]: value,
    }))
  }

  const ChangeInputType = () => {
    setShowRegister(!showRegister)
  }

  const CheckLogin = () => {
    setLoading(true)

    axios
      .post('http://Movie-Star.test/api/Auth/Login', formData)
      .then((res) => {
        console.log(res)

        if (res.status === 200) {
          const { token, username } = res.data.data

          setCookie('authToken', token, { path: '/', maxAge: 7 * 24 * 60 * 60 })
          setCookie('username', username, {
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
          })

          console.log('Cookies set successfully!')
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error 404',
          text: err.response.data.message,
          showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
          },
          hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
          },
        })

        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const theme = useTheme()
  return (
    <>
      {Loader}
      <Container
        maxWidth="xs"
        sx={{
          mt: 10,
          position: 'relative',
          filter: loading ? 'blur(3px)' : null,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.custom.boxOverlay1,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{ zIndex: '1' }}
            gutterBottom
          >
            Login
          </Typography>
          <TextField
            label="email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={CheckLogin}
          >
            Sign In
          </Button>
          <FormControlLabel
            value="end"
            control={<Checkbox />}
            label="Remember Me"
            color="success"
            labelPlacement="end"
          />
          <Typography variant="h6" sx={{ zIndex: '1' }}>
            <Link to={'/ResetPassword'}> Forget Your Password ?</Link>
          </Typography>
          <Typography variant="body1" sx={{ zIndex: '1' }}>
            You do not have Account ?{' '}
            <span
              id="Signup"
              style={{ cursor: 'pointer' }}
              onClick={ChangeInputType}
            >
              Sign Up Now
            </span>
          </Typography>
        </Box>
      </Container>
    </>
  )
}
