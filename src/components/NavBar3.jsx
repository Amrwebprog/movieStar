import { DarkMode, LightMode } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Paper,
  ToggleButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/logout'
import { GlobalContext } from './GlobalContext'

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
}

const Navbar3 = () => {
  const theme = useTheme()
  const { mode, setMode } = useContext(GlobalContext)
  const [cookies] = useCookies(['authToken', 'username'])
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [selected, setSelected] = React.useState(false)
  const navigate = useNavigate()
  const navItems = [
    { name: 'Main', path: '/category' },
    { name: 'Movies', path: '/Movies' },
    { name: 'Series', path: '/Seriess' },
    { name: 'Matches', path: '/Matches' },
  ]
  const username = cookies.username
  const { handleLogout } = useLogout()

  const CheckCokies = async () => {
    const token = cookies.authToken
    const isVerfy = await verfy(token)

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

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
  const handleCloseUserMenu = () => setAnchorElUser(null)
  const [showDrawer, setShowDrawer] = useState(false)

  const settings = [
    'Account Settings',
    'Edit My Credit',
    'Back To Home',
    'Logout',
  ]
  const NavigateAccountSettings = () => navigate('/accountSettings')
  const NavigateAccountCredit = () => navigate('/accountCredit')
  const NavigateToHome = () => navigate('/')

  const settingsFunction = [
    NavigateAccountSettings,
    NavigateAccountCredit,
    NavigateToHome,
    handleLogout,
  ]

  const handleToggleTheme = () => {
    setSelected((prevSelected) => !prevSelected)
    mode === 'dark' ? setMode('light') : setMode('dark')
  }

  const myToggle = (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={handleToggleTheme}
    >
      {mode === 'dark' ? <LightMode /> : <DarkMode />}
    </ToggleButton>
  )

  const handleOpenMenu = () => {
    setShowDrawer(!showDrawer)
  }

  const drawer = () => (
    <Drawer anchor="right" open={showDrawer} onClose={handleOpenMenu}>
      <List
        sx={{
          width: '250px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {navItems.map((el, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <ListItem>
              <ListItemButton
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Link
                  to={el.path}
                  style={{
                    textDecoration: 'none',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <ListItemText primary={el.name} />
                </Link>
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Drawer>
  )

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2222224f' }}>
      <Toolbar>
        <Box
          sx={{
            width: '100%',
            alignItems: 'center',
            display: 'flex',
            justifyContent: {
              xs: 'space-between',
              sm: 'space-between',
              md: 'space-between',
            },
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h5"
              sx={{
                display: 'flex',
                flexGrow: { xs: '1', sm: '1', md: '1' },
                fontWeight: 'bold',
                color: '#E53935',
                marginRight: '2rem  !important',
              }}
            >
              Movie Star
            </Typography>
          </motion.div>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'none', md: 'flex' },
              gap: '1rem',
            }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link to={item.path} style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'white', fontWeight: 'bold' }}>
                    {item.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>

            <IconButton color="inherit" onClick={handleOpenUserMenu}>
              <Avatar />
            </IconButton>

            <IconButton
              color="inherit"
              sx={{
                display: { sx: 'block', sm: 'block', md: 'none' },
              }}
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              sx={{ mt: '45px' }}
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
              PaperProps={{
                sx: {
                  backgroundColor: '#1e1e1e',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '10px',
                },
              }}
            >
              <Paper elevation={4} sx={{ backgroundColor: '#1e1e1e' }}>
                <List>
                  <ListItem sx={{ justifyContent: 'center' }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 'bold', color: '#E53935' }}
                    >
                      Welcome back, {username}
                    </Typography>
                  </ListItem>
                  <Divider sx={{ backgroundColor: '#444' }} />
                  {settings.map((setting, index) => (
                    <motion.div
                      key={setting}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <ListItem disablePadding key={setting}>
                        <ListItemButton
                          onClick={() => {
                            settingsFunction[index]()
                            handleCloseUserMenu()
                          }}
                          sx={{
                            '&:hover': { backgroundColor: '#444' },
                          }}
                        >
                          <ListItemText
                            primary={setting}
                            sx={{ color: 'white', textAlign: 'center' }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </Paper>
            </Menu>

            {myToggle}
            {showDrawer && drawer()}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar3
