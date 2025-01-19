import { useTheme } from '@emotion/react'
import { DarkMode } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Container, ToggleButton } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Aos from 'aos'
import React, { useContext, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import fileImg from '../assets/file.png'
import { GlobalContext } from './GlobalContext'

export default function Navbar1(props) {
  const [selected, setSelected] = React.useState(false)
  const { mode, setMode, showRegister, setShowRegister } =
    useContext(GlobalContext)
  const drawerWidth = 240
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
      <DarkMode />
    </ToggleButton>
  )
  const toggleform = () => {
    setShowRegister(!showRegister)
  }
  const navItems = ['Home', 'About', 'Contact', 'Login / Register']
  const navLinks = ['/', '/about', '/contactus', '/Login&Register']
  const theme = useTheme()

  // هنا تستخرج window من props
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ my: 2 }}
        className="animate__animated animate__fadeInDown"
      >
        Movie Star
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <RouterLink
            to={navLinks[index] || '#'}
            style={{ textDecoration: 'none' }}
            key={item}
            onClick={() => {
              handleDrawerToggle()
              if (navLinks[index] === '') {
                toggleform()
              }
            }}
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          </RouterLink>
        ))}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window.document.body : undefined
  useEffect(() => {
    Aos.init({})
  }, [])

  return (
    <>
      <Box>
        <AppBar
          sx={{ opacity: '0.7', background: theme.palette.primary.navBar }}
          component="nav"
        >
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: { sm: 'none' },
                }}
              >
                <MenuIcon />
              </IconButton>
              {myToggle}
              <Avatar
                className="animate__animated animate__fadeInDown"
                src={fileImg}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                }}
              />
              <Typography
                className="animate__animated animate__fadeInDown"
                variant="h6"
                component="div"
                color="error"
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: '800',
                }}
              >
                Movie Star
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '10px' }}>
                {navItems.map((item, index) => (
                  <Button
                    className="animate__animated animate__fadeIn"
                    variant="outlined"
                    key={item}
                    sx={{
                      color: theme.palette.text.main,
                      '&:hover': {
                        color: 'red',
                        fontWeight: '1000',
                        background: theme.palette.custom.contentBG,
                      },
                    }}
                    style={{
                      animationDelay: `${1 + index * 0.2}s`,
                    }}
                    onClick={navLinks[index] === '' ? toggleform : undefined}
                  >
                    {navLinks[index] === '' ? (
                      <span>{item}</span>
                    ) : (
                      <RouterLink
                        to={navLinks[index]}
                        style={{ textDecoration: 'none' }}
                      >
                        <span
                          style={{
                            fontWeight: '800',
                            color: theme.palette.text.primary,
                          }}
                        >
                          {item}
                        </span>
                      </RouterLink>
                    )}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <nav>
          <Drawer
            anchor="right"
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </>
  )
}
