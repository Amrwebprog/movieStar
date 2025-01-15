// File: UserSettings.jsx
import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function UserSettings({ profileData }) {
  const [formData, setFormData] = useState({ ...profileData, password: '' }) // Added password field

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log('Updated User Data:', formData)
    // Add API call here
  }

  return (
    <Box mt={5}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Box>
  )
}
