import { DarkMode, InboxOutlined, Mail, MenuOpen } from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import CountriesSetting from '../../components/CountriesSetting'
import DashBoard from '../../components/DashBoard'
import { GlobalContext } from '../../components/GlobalContext'
import MatchSettings from '../../components/MatchSettings'
import Messages from '../../components/Messages'
import MoviesSettings from '../../components/MoviesSettings'
import SeriesSettings from '../../components/SeriesSettings'
import Users from '../../components/Users'

export default function DashBoardPage() {
  const isMobile = useMediaQuery('(max-width:600px)')
  const { setMode, mode } = useContext(GlobalContext)
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeContent, setActiveContent] = useState(<DashBoard />)

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded)
  }

  const handleTapChange = (content) => {
    switch (content) {
      case 'Movies Settings':
        setActiveContent(<MoviesSettings />)
        break
      case 'Series settings':
        setActiveContent(<SeriesSettings />)
        break
      case 'Matches Settings':
        setActiveContent(<MatchSettings />)
        break
      case 'Countries':
        setActiveContent(<CountriesSetting />)
        break
      case 'DashBoard':
        setActiveContent(<DashBoard />)
        break
      case 'Messages':
        setActiveContent(<Messages />)
        break
      case 'Users':
        setActiveContent(<Users />)
        break
      default:
        setActiveContent(<DashBoard />)
    }
  }

  const menuItems = [
    { text: 'Movies Settings', icon: <InboxOutlined /> },
    { text: 'Series settings', icon: <Mail /> },
    { text: 'Matches Settings', icon: <InboxOutlined /> },
    { text: 'Countries', icon: <Mail /> },
    { text: 'Suppscription Settings', icon: <Mail /> },
  ]

  const otherItems = [
    { text: 'DashBoard', icon: <InboxOutlined /> },
    { text: 'Messages', icon: <Mail /> },
    { text: 'Users', icon: <InboxOutlined /> },
  ]
  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false)
    }
  }, [isMobile])
  return (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
      <Drawer
        anchor={isMobile ? 'top' : 'left'}
        variant="persistent"
        open
        sx={{
          flexWrap: 'wrap',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : isExpanded ? 250 : 70,
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',

            flexDirection: isMobile ? 'row' : 'column',
            alignItems: isExpanded ? 'flex-start' : 'center',
            padding: '10px 0',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'row',
              gap: '5px',
            }}
          >
            <IconButton
              onClick={toggleDrawer}
              sx={{ alignSelf: 'center', display: isMobile ? 'none' : 'block' }}
            >
              <MenuOpen />
            </IconButton>
            <IconButton
              onClick={() => {
                setMode(mode === 'dark' ? 'light' : 'dark')
              }}
            >
              <DarkMode />
            </IconButton>
          </Box>
          <Divider />
          <List
            sx={{
              display: isMobile ? 'flex' : 'block',
              justifyContent: isExpanded ? 'flex-start' : 'center',
              flexDirection: isMobile ? 'row' : 'column',
            }}
          >
            {otherItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  display: isMobile ? 'flex' : 'block',
                  justifyContent: isExpanded ? 'flex-start' : 'center',
                  flexDirection: isMobile ? 'row' : 'column',
                }}
                onClick={() => handleTapChange(item.text)}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: isExpanded ? null : '0' }}>
                    {item.icon}
                  </ListItemIcon>
                  {isExpanded && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List
            sx={{
              display: isMobile ? 'flex' : 'block',

              justifyContent: isExpanded ? 'flex-start' : 'center',
              flexDirection: isMobile ? 'row' : 'column',
            }}
          >
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ justifyContent: isExpanded ? 'flex-start' : 'center' }}
                onClick={() => handleTapChange(item.text)}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: isExpanded ? null : '0' }}>
                    {item.icon}
                  </ListItemIcon>
                  {isExpanded && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        sx={{
          marginTop: isMobile ? '80px' : null,
          marginLeft: isMobile ? '0' : isExpanded ? '250px' : '70px',
          flexGrow: 1,
          display: 'flex',
          flexWrap: 'wrap',
          padding: 2,
          transition: 'margin-left 0.8s',
        }}
      >
        {activeContent}
      </Box>
    </Box>
  )
}
