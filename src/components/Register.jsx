import { useTheme } from '@emotion/react'
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs' // مكتبة dayjs لحساب الفرق بين التواريخ
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { GlobalContext } from './GlobalContext'

export default function RegisterForm() {
  const { showRegister, setShowRegister } = useContext(GlobalContext)
  const [Country, SetCountry] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone: '',
    age: '', // سيتم تخزين العمر هنا
    country: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prevData) => {
      if (name === 'age') {
        const birthDate = dayjs(value)
        if (birthDate.isValid()) {
          const today = dayjs()
          const age = today.diff(birthDate, 'year')
          return {
            ...prevData,
            age: value,
          }
        }
      }
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const handleSelectChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      country: e.target.value,
    }))
  }

  const SendData = () => {
    setLoading(true)
    console.log('Form Data:', formData)

    const birthDate = dayjs(formData.age)
    const today = dayjs()
    const age = today.diff(birthDate, 'year')

    formData.age = age

    const IsValid = Validation(formData)

    if (IsValid === true) {
      axios
        .post('http://Movie-Star.test/api/Auth/Register', formData)
        .then((res) => {
          console.log(res)
          Swal.fire({
            icon: 'success',
            title: 'Well Donee !',
            text: 'Your Account Has been created you can loging now ',
          })
          setShowRegister(!showRegister)
        })
        .catch((err) => {
          console.log(err.response.data.message)

          Swal.fire({
            icon: 'error',
            title: 'Obs ...!',
            text: err.response.data.message,
          })
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: IsValid,
      })
    }
  }

  const Validation = (Data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\+?\d{10,15}$/

    if (
      !Data.username.trim() ||
      !Data.age ||
      !Data.phone.trim() ||
      !Data.email.trim() ||
      !Data.password.trim() ||
      !Data.password_confirmation.trim() ||
      !Data.country.trim()
    ) {
      return 'All fields must be filled.'
    }

    if (!emailRegex.test(Data.email)) {
      return 'Invalid email format.'
    }

    if (!phoneRegex.test(Data.phone)) {
      return 'Invalid phone number format. It should contain 10 to 15 digits.'
    }

    if (Data.password !== Data.password_confirmation) {
      return 'Password and confirmation do not match.'
    }

    if (Data.password.length < 8) {
      return 'Password must be at least 8 characters long.'
    }

    return true
  }

  const GetCountries = () => {
    axios
      .get('http://Movie-Star.test/api/Countries', {
        headers: { Accept: 'application/json' },
      })
      .then((res) => {
        SetCountry(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const ChangeInputType = () => {
    setShowRegister(!showRegister)
  }

  useEffect(() => {
    GetCountries()
  }, [])

  const theme = useTheme()

  return (
    <>
      {loading ? (
        <Box
          sx={{
            position: 'fixed',
            bgcolor: theme.palette.custom.boxOverlay,
            width: '100%',
            height: '100%',
            zIndex: '100000',
          }}
        >
          <LinearProgress
            style={{ top: '50%', width: '30%', margin: 'auto' }}
          ></LinearProgress>
        </Box>
      ) : null}
      <Container
        maxWidth={false}
        sx={{
          mt: '',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            filter: loading ? 'blur(2px)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.custom.boxOverlay,
            width: {
              xs: '250px',
              md: '400px',
              lg: '800px',
            },
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{ zIndex: '10000' }}
            gutterBottom
          >
            Register
          </Typography>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="username"
            label="Your Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            name="phone"
            label="Phone Number"
            type="tel"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            name="age"
            label="Date of Birth"
            variant="outlined"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.age ? dayjs(formData.age).format('YYYY-MM-DD') : ''} // تحويل التاريخ إلى تنسيق مناسب
            onChange={handleChange}
          />
          <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id="demo-simple-select-helper-label">
              Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={formData.country}
              onChange={handleSelectChange}
            >
              {Country.map((country, index) => (
                <MenuItem value={country.country} key={index}>
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            name="password_confirmation"
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={formData.password_confirmation}
            onChange={handleChange}
          />
          <Button
            onClick={SendData}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Signup
          </Button>
          <Typography variant="body1" sx={{ zIndex: '10000' }}>
            You have Account ?{' '}
            <span
              id="Signup"
              style={{ cursor: 'pointer' }}
              onClick={ChangeInputType}
            >
              Sign in Now
            </span>
          </Typography>
        </Box>
      </Container>
    </>
  )
}
