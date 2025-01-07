import { Folder } from '@mui/icons-material'
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import axios from 'axios'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import useLoader from './CustomHook'
import Navbar3 from './NavBar3'

export default function ShowSeries() {
  const { loading, loader, setLoading } = useLoader()
  const { ProductType, ProductId } = useParams()
  const [cookies] = useCookies(['authToken', 'username'])
  const [movieData, setMovieData] = useState(null)
  const [episode, setEpisode] = useState([])
  const items = [
    { id: 1, label: 'Test 1' },
    { id: 2, label: 'Test 2' },
    { id: 3, label: 'Test 3' },
    { id: 4, label: 'Test 4' },
    { id: 5, label: 'Test 5' },
    { id: 6, label: 'Test 6' },
  ]
  const [seasons, setSeasons] = useState()
  // Refs for animations
  const containerRef = useRef(null)

  const GetEposides = (SeasonId) => {
    setEpisode([])
    setLoading(true)
    axios
      .get(`http://Movie-Star.test/api/Seasons/${SeasonId}`, {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      })
      .then((res) => {
        console.log(res)
        setEpisode(res.data.data.episdes)
        console.log(episode)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  // Fetch movie data
  useEffect(() => {
    axios
      .get(`http://Movie-Star.test/api/${ProductType}/${ProductId}`, {
        headers: { Authorization: `Bearer ${cookies.authToken}` },
      })
      .then((res) => {
        setMovieData(res.data.data)
        setSeasons(res.data.data.seasons)
        console.log(res.data.data)
        console.log(seasons)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [ProductType, ProductId, cookies.authToken])

  // Animations on data load
  useEffect(() => {
    if (containerRef.current && movieData) {
      const elements = Array.from(containerRef.current.children)
      elements.forEach((el) => {
        el.style.opacity = 0 // Hide elements initially
        el.style.transform = 'translateY(50px)' // Start with offset for animation
      })

      const timeline = gsap.timeline({
        defaults: { duration: 2, ease: 'power3.out' },
      })

      timeline.to(elements, {
        opacity: 1,
        y: 0,
        stagger: 1,
      })
    }
  }, [movieData]) // Trigger animation when movieData is loaded

  if (!movieData) return <Typography>Loading...</Typography>

  const defaultImage = 'https://via.placeholder.com/300' // Default image if no posterUrl

  return (
    <>
      {loader}
      <Navbar3 />
      <Box
        sx={{
          p: 3,
        }}
      >
        <Grid container spacing={3} ref={containerRef}>
          {/* Left Column */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}
            >
              {/* Movie Poster */}
              <Box
                component="img"
                src={movieData.image || defaultImage}
                alt={movieData.title || 'No title available'}
                sx={{
                  width: '50%',
                  height: 'auto',
                  borderRadius: 1,
                }}
              />
              {/* Movie Info */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {movieData.series_name || 'Unknown Title'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                  {movieData.discription || 'No description available.'}
                </Typography>
              </Box>
            </Paper>

            {/* Buttons */}
            <Box>
              <Paper sx={{ mt: '20px', p: '10px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  href={movieData.watchUrl || '#'}
                  disabled={!movieData.watchUrl}
                >
                  {movieData.watchUrl ? 'Watch Now' : 'No Watch Link Available'}
                </Button>
              </Paper>
              <Paper sx={{ mt: '10px', p: '10px' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  disabled={!movieData.downloadUrl}
                >
                  {movieData.downloadUrl
                    ? 'Download Now'
                    : 'No Download Link Available'}
                </Button>
              </Paper>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography>
                    <strong>Genre:</strong> {movieData.genre.genre || 'N/A'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography>
                    <strong>Duration:</strong> {movieData.duration || 'N/A'}{' '}
                    mins
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography>
                    <strong>Quality:</strong> {movieData.quality || 'N/A'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography>
                    <strong>Country:</strong>{' '}
                    {movieData.country.country || 'N/A'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography>
                    <strong>Year:</strong>{' '}
                    {movieData.year_of_production || 'N/A'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography>
                    <strong>Rating:</strong> {movieData.rate || 'N/A'}/10
                  </Typography>
                </Paper>
              </Grid>

              {seasons.map((item, index) => (
                <Grid item xs={12} md={4} key={item.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #361a1a, #452252)',
                      cursor: 'pointer',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                    onClick={() => {
                      GetEposides(item.id)
                    }}
                  >
                    <Folder />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    <Typography variant="h6"> Season : {index + 1}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {episode.map((el, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Paper
                className="animate__animated animate__swing"
                elevation={5}
                sx={{
                  p: 3,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 1,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 10px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <Folder sx={{ fontSize: 40, color: 'white' }} />
                <Divider orientation="horizontal" />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Episode: {index + 1}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
