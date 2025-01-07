import { DarkMode } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ToggleButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import iconImg from '../assets/file.png'
import useLogout from '../hooks/logout'
import { GlobalContext } from './GlobalContext'

export default function NavBar2() {
  const [cookies, setCookie] = useCookies(['authToken', 'username'])
  const navigate = useNavigate()
  const { handleLogout } = useLogout()
  const { mode, setMode } = useContext(GlobalContext)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [selected, setSelected] = React.useState(false)
  const theme = useTheme()
  const handleToggleTheme = () => {
    setSelected((prevSelected) => !prevSelected)
    mode === 'dark' ? setMode('light') : setMode('dark')
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const settings = [
    'Account Settings',
    'Edit My Credit',
    'Back To Home',
    'Logout',
  ]
  const NavigateAccountSettings = () => {
    navigate('/accountSettings')
  }
  const NavigateAccountCredit = () => {
    navigate('/accountCredit')
  }
  const NavigateToHome = () => {
    navigate('/')
  }
  const settingsFunction = [
    NavigateAccountSettings,
    NavigateAccountCredit,
    NavigateToHome,
    handleLogout,
  ]
  const username = cookies.username
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const myToggle = (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={handleToggleTheme}
    >
      <DarkMode />
    </ToggleButton>
  )
  const CheckCokies = async () => {
    const token = cookies.authToken
    const isVerfy = await verfy(token)
    console.log(isVerfy)
    console.log(cookies)
    if (!cookies.authToken && !cookies.username) {
      navigate('/Login&Register')
    }
    if (!isVerfy) {
      navigate('/Login&Register')
    }
  }
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
    CheckCokies()
  }, [cookies.authToken])

  return (
    <Box>
      <Container maxWidth="xl">
        <Box
          sx={{
            height: '10vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <img style={{ height: '50px' }} src={iconImg} alt="" />
            <Typography sx={{ color: '#f44336' }}>MovieStar</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', padding: '20px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem sx={{ m: '10px' }}>Welcome back {username}</MenuItem>
              <Divider />
              {settings.map((setting, index) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    settingsFunction[index]()
                    handleCloseUserMenu()
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            {myToggle}
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          width: '100%',
          height: '0.5px',
          background: theme.palette.text.primary,
        }}
      ></Box>
    </Box>
  )
}
