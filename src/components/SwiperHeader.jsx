import { Videocam } from '@mui/icons-material'
import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

export default function SwiperHeader({ Type, Needs }) {
  // تحديد النص الذي سيظهر في العنوان بناءً على الشروط
  const getTitle = () => {
    if (Needs?.genre && Type === 'Movies') {
      return `Movies: ${Needs.genre}`
    }
    if (Needs?.genre && Type === 'Series') {
      return `Series: ${Needs.genre}`
    }
    switch (Type) {
      case 'New':
        return 'اجدد الافلام'
      case 'Movies':
        return 'Top Movies'
      case 'Series':
        return 'Top Series'
      case 'Matches':
        return 'Top Matches'
      default:
        return null
    }
  }

  return (
    <Box sx={{ paddingLeft: '50px', paddingRight: '50px' }}>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          mt: '50px',
        }}
      >
        <Box></Box>
        <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: '1000 !important' }}>
            {getTitle()}
          </Typography>
          <Videocam />
        </Box>
      </Paper>
    </Box>
  )
}
