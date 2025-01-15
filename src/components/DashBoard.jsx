import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import DashBoardCards from './DashBoardCards'
import SupscriptionDetailsChart from './SupscriptionDetailsChart'
import TotalInCome from './TotalInCome'

export default function DashBoard() {
  return (
    <>
      <Typography variant="h4" sx={{ width: '100%' }}>
        Welcome To DashBoard
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '60px',
          flexWrap: 'wrap',
          mt: '30px',
        }}
      >
        <DashBoardCards Need="UserNumber" />
        <DashBoardCards Need="FilmNumber" />
        <DashBoardCards Need="MatchNumber" />
        <DashBoardCards Need="SeriesNumber" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <SupscriptionDetailsChart />
          </Grid>
          <Grid item xs={12} md={6} sx={{ overflow: 'hidden' }}>
            <TotalInCome />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
