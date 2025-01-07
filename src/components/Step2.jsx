import { CheckCircleOutline, Done } from '@mui/icons-material'
import { Box, Container, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Step2() {
  const navigate = useNavigate()
  const GoToChosePlanPage = () => {
    navigate('/PlanPage')
  }
  return (
    <Box sx={{ height: '72vh' }}>
      <Container
        maxWidth="xl"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            background: '',
            padding: '40px',
          }}
        >
          <CheckCircleOutline color="error" sx={{ fontSize: '80px' }} />
          <Typography variant="body2">STEP 2 OF 3</Typography>
          <Typography variant="h4">Choose your plan.</Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
              alignContent: 'start',
            }}
          >
            <Done color="error" />
            <Typography variant="h6">
              No commitments, cancel anytime.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
              alignContent: 'start',
            }}
          >
            <Done color="error" />
            <Typography variant="h6">
              Everything on MovieStar for one low price.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
              alignContent: 'start',
            }}
          >
            <Done color="error" />
            <Typography variant="h6">
              Unlimited viewing on all your devices.
            </Typography>
          </Box>
          <Button
            onClick={GoToChosePlanPage}
            variant="contained"
            sx={{ width: '100%', padding: '15px' }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
