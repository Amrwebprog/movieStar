import {
  LiveTv,
  Movie,
  PersonOutline,
  SportsBasketball,
} from '@mui/icons-material'
import { Box, Divider, Paper, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { GlobalContext } from './GlobalContext'

export default function DashBoardCards(Need) {
  const { allNumber, setAllNumber } = useContext(GlobalContext)

  const [cookies] = useCookies(['authToken'])

  const GetAllNumbers = (Inquiries) => {
    let apiUrl = ''
    let key = ''

    switch (Inquiries) {
      case 'UserNumber':
        apiUrl = 'http://Movie-Star.test/api/Users'
        key = 'userNumber'
        break

      case 'FilmNumber':
        apiUrl = 'http://Movie-Star.test/api/Films'
        key = 'FilmNumber'
        break

      case 'SeriesNumber':
        apiUrl = 'http://Movie-Star.test/api/Series'
        key = 'SeriesNumber'
        break
      case 'MatchNumber':
        apiUrl = 'http://Movie-Star.test/api/Matches'
        key = 'MatchNumber'
        break
      default:
        console.log('Invalid Inquiry')
        return
    }

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      .then((res) => {
        const totalValue = res.data.data.total

        setAllNumber((prev) => ({
          ...prev,
          [key]: totalValue,
        }))
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
      })
  }
  useEffect(() => {
    GetAllNumbers(Need.Need)
  }, [])
  const ShowCard = () => {
    switch (Need.Need) {
      case 'UserNumber':
        return (
          <>
            <Paper
              sx={{ padding: '40px', width: '350px', position: 'relative' }}
              elevation={24}
            >
              <Box
                sx={{
                  boxShadow:
                    '0 4px 20px 0 rgba(0, 0, 0, 0.82),0 7px 10px -5px rgba(1, 12, 14, 0.6)',
                  background: 'linear-gradient(60deg,#66bb6a,#43a047)',
                  position: 'absolute',
                  top: '-20px',
                  left: '40px',
                  padding: '20px',
                }}
              >
                <PersonOutline sx={{ fontSize: '40px' }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Typography variant="body1">User Number</Typography>
                <Typography variant="body1">
                  {allNumber.userNumber > 0
                    ? allNumber.userNumber
                    : 'Loading...'}
                </Typography>
              </Box>
              <Divider />
              <Typography variant="body2" sx={{ marginTop: '10px !important' }}>
                Last Up Data <span style={{ color: '#ab47bc' }}>Now</span>
              </Typography>
            </Paper>
          </>
        )
      case 'FilmNumber':
        return (
          <>
            <Paper
              sx={{ padding: '40px', width: '350px', position: 'relative' }}
              elevation={24}
            >
              <Box
                sx={{
                  boxShadow:
                    '0 4px 20px 0 rgba(0, 0, 0, 0.82),0 7px 10px -5px rgba(1, 12, 14, 0.6)',
                  background: 'linear-gradient(60deg,#ffa726,#fb8c00)',
                  position: 'absolute',
                  top: '-20px',
                  left: '40px',
                  padding: '20px',
                }}
              >
                <Movie sx={{ fontSize: '40px' }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Typography variant="body1">Film Number</Typography>
                <Typography variant="body1">
                  {' '}
                  {allNumber.FilmNumber > 0
                    ? allNumber.FilmNumber
                    : 'Loading...'}
                </Typography>
              </Box>
              <Divider />
              <Typography variant="body2" sx={{ marginTop: '10px !important' }}>
                Last Up Data <span style={{ color: '#ab47bc' }}>Now</span>
              </Typography>
            </Paper>
          </>
        )
      case 'MatchNumber':
        return (
          <>
            <Paper
              sx={{ padding: '40px', width: '350px', position: 'relative' }}
              elevation={24}
            >
              <Box
                sx={{
                  boxShadow:
                    '0 4px 20px 0 rgba(0, 0, 0, 0.82),0 7px 10px -5px rgba(1, 12, 14, 0.6)',
                  background: 'linear-gradient(60deg,#ef5350,#e53935)',
                  position: 'absolute',
                  top: '-20px',
                  left: '40px',
                  padding: '20px',
                }}
              >
                <SportsBasketball sx={{ fontSize: '40px' }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Typography variant="body1">Match Number </Typography>
                <Typography variant="body1">
                  {' '}
                  {allNumber.MatchNumber > 0
                    ? allNumber.MatchNumber
                    : 'Loading...'}
                </Typography>
              </Box>
              <Divider />
              <Typography variant="body2" sx={{ marginTop: '10px !important' }}>
                Last Up Data <span style={{ color: '#ab47bc' }}>Now</span>
              </Typography>
            </Paper>
          </>
        )
      case 'SeriesNumber':
        return (
          <>
            <Paper
              sx={{ padding: '40px', width: '350px', position: 'relative' }}
              elevation={24}
            >
              <Box
                sx={{
                  boxShadow:
                    '0 4px 20px 0 rgba(0, 0, 0, 0.82),0 7px 10px -5px rgba(1, 12, 14, 0.6)',
                  background: 'linear-gradient(60deg,#26c6da,#00acc1)',
                  position: 'absolute',
                  top: '-20px',
                  left: '40px',
                  padding: '20px',
                }}
              >
                <LiveTv sx={{ fontSize: '40px' }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Typography variant="body1">Series Number</Typography>
                <Typography variant="body1">
                  {' '}
                  {allNumber.SeriesNumber > 0
                    ? allNumber.SeriesNumber
                    : 'Loading...'}
                </Typography>
              </Box>
              <Divider />
              <Typography variant="body2" sx={{ marginTop: '10px !important' }}>
                Last Up Data <span style={{ color: '#ab47bc' }}>Now</span>
              </Typography>
            </Paper>
          </>
        )
      default:
        break
    }
  }

  return <>{ShowCard()}</>
}
