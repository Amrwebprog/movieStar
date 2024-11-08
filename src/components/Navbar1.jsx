import { useTheme } from '@emotion/react'
import { DarkMode } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Container, Link, ToggleButton } from '@mui/material'
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
import React, { useContext } from 'react'
import fileImg from '../assets/file.png'
import { GlobalContext } from './GlobalContext'

export default function Navbar1(props) {
  const [selected, setSelected] = React.useState(false)
  const { mode, setMode } = useContext(GlobalContext)
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
  const navItems = ['Home', 'About', 'Contact', 'Login']
  const theme = useTheme()

  // هنا تستخرج window من props
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Movie Star
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  // تحديد container بناءً على وجود window
  const container =
    window !== undefined ? () => window.document.body : undefined

  return (
    <>
      <Box>
        <AppBar sx={{ opacity: '0.7' }} component="nav">
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
                src={fileImg}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                }}
              />
              <Typography
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
                {navItems.map((item) => (
                  <>
                    <Button
                      variant="outlined"
                      key={item}
                      sx={{
                        color: '#000000',
                        '&:hover': {
                          color: 'red',
                          fontWeight: '1000',
                          background: theme.palette.custom.contentBG,
                        },
                      }}
                    >
                      <Link
                        underline="none"
                        sx={{
                          fontWeight: '800',
                          color: theme.palette.text.primary,
                        }}
                      >
                        {item}
                      </Link>
                    </Button>
                  </>
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
