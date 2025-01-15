// File: SettingsPage.jsx
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Navbar3 from '../../components/NavBar3'
import SubscriptionSettings from '../../components/SubscriptionSettings'
import UserSettings from '../../components/UserSettings'

export default function SettingsPage() {
  const [cookies] = useCookies(['authToken', 'username', 'UserId'])
  const [profileData, setProfileData] = useState(null)
  const [subscriptionData, setSubscriptionData] = useState([])
  const [activeComponent, setActiveComponent] = useState('userSettings') // 'userSettings' or 'subscriptionSettings'

  const fetchData = async () => {
    if (cookies) {
      try {
        const res = await axios.get(
          `http://Movie-Star.test/api/Users/${cookies.UserId}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.authToken}`,
            },
          }
        )
        setProfileData(res.data.data)
        setSubscriptionData(res.data.data.subscription_details || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box display="flex">
      {/* Side Menu */}
      <Drawer
        variant="permanent"
        sx={{ width: 240, '& .MuiDrawer-paper': { width: 240 } }}
      >
        <List>
          <ListItem button onClick={() => setActiveComponent('userSettings')}>
            <ListItemText primary="User Settings" />
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveComponent('subscriptionSettings')}
          >
            <ListItemText primary="Subscription Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box flex={1} p={2}>
        <Navbar3 />
        <AnimatePresence>
          {activeComponent === 'userSettings' && (
            <motion.div
              key="userSettings"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" mb={2}>
                User Settings
              </Typography>
              {profileData && <UserSettings profileData={profileData} />}
            </motion.div>
          )}
          {activeComponent === 'subscriptionSettings' && (
            <motion.div
              key="subscriptionSettings"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" mb={2}>
                Subscription Settings
              </Typography>
              <SubscriptionSettings subscriptionData={subscriptionData} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  )
}
