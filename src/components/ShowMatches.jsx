import { Box, Button, Paper, Typography, useTheme } from '@mui/material'
import axios from 'axios'
import { gsap } from 'gsap'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import Navbar3 from './NavBar3'

export default function ShowMatches() {
  const theme = useTheme()
  const { ProductType, ProductId } = useParams()
  const [matchData, setMatchData] = useState(null)
  const [cookies] = useCookies(['authToken', 'username'])

  useEffect(() => {
    axios
      .get(`http://Movie-Star.test/api/${ProductType}/${ProductId}`, {
        headers: { Authorization: `Bearer ${cookies.authToken}` },
      })
      .then((res) => {
        setMatchData(res.data.data)
        console.log(res.data.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [ProductType, ProductId, cookies.authToken])

  useEffect(() => {
    if (matchData) {
      gsap.from('.match-container', {
        duration: 2,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
      })
    }
  }, [matchData])

  return (
    <>
      <Navbar3 />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Paper
          className="match-container"
          elevation={3}
          sx={{
            mt: '25px',
            p: 2,
            display: 'flex',
            gap: 2,
            width: '90%',
            bgcolor: '#566a37',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {matchData && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  flexWrap: 'wrap',
                }}
              >
                {/* Team 1 */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: '30%',
                  }}
                >
                  <img
                    src={matchData.team_1_logo}
                    alt={matchData.team_1}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '8px',
                    }}
                  />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {matchData.team_1}
                  </Typography>
                </Box>

                {/* VS and Result */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    VS
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1, color: '#555' }}>
                    {matchData.result}
                  </Typography>
                </Box>

                {/* Team 2 */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: '30%',
                  }}
                >
                  <img
                    src={matchData.team_2_logo}
                    alt={matchData.team_2}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '8px',
                    }}
                  />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {matchData.team_2}
                  </Typography>
                </Box>
              </Box>

              {/* Additional Information */}
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body1">
                  <strong>Stadium:</strong> {matchData.stadium}
                </Typography>
                <Typography variant="body1">
                  <strong>Champion:</strong> {matchData.champion}
                </Typography>
                <Typography variant="body1">
                  <strong>Year of Production:</strong>{' '}
                  {matchData.year_of_production}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {matchData.country.country}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    color: theme.palette.text.primary,
                    marginTop: '20px',
                  }}
                >
                  {' '}
                  Watch Now
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </>
  )
}
