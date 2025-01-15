import { Close } from '@mui/icons-material'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import axios from 'axios'
import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import Navbar3 from './NavBar3'

export default function ShowMovie() {
  const [BoxMovies, setBoxMovies] = useState()
  const { ProductType, ProductId } = useParams()
  const [cookies] = useCookies(['authToken', 'username'])
  const [movieData, setMovieData] = useState(null)
  const HandleShowMovie = (MovieData) => {
    const MovieBox = () => {
      return (
        <Box
          sx={{
            top: '0',
            left: '0',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.8)', // خلفية شفافة داكنة
            zIndex: '1',
          }}
          onClick={() => {
            setBoxMovies(null)
          }}
        >
          <Paper
            className="animate__animated animate__backInUp"
            onClick={(event) => {
              event.stopPropagation()
            }}
            variant="outlined"
            sx={{
              position: 'relative',
              width: '70%',
              height: '70%',
              margin: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              flexDirection: 'column',
              gap: '20px',
              bgcolor: '#121212', // خلفية الورقة داكنة
              borderRadius: '16px',
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)', // تأثير الظل
            }}
          >
            <Close
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setBoxMovies(null)
              }}
            />
            <Typography
              variant="h4"
              sx={{
                color: '#ffffff',
                textAlign: 'center',
                marginBottom: '10px',
              }}
            >
              Movie {MovieData.name}
            </Typography>
            <Box
              component="video"
              controls
              src={
                'https://videos.pexels.com/video-files/2435906/2435906-hd_1920_1080_25fps.mp4'
              }
              sx={{
                width: '100%',
                height: '100%',
                maxHeight: '400px',
                borderRadius: '12px',
                boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.3)',
                background: '#000',
              }}
            />
            <Typography variant="body1">{MovieData.description}</Typography>
          </Paper>
        </Box>
      )
    }
    setBoxMovies(MovieBox)
  }
  // Refs for animations
  const containerRef = useRef(null)

  // Fetch movie data
  useEffect(() => {
    axios
      .get(`http://Movie-Star.test/api/${ProductType}/${ProductId}`, {
        headers: { Authorization: `Bearer ${cookies.authToken}` },
      })
      .then((res) => {
        setMovieData(res.data.data)
        console.log(movieData)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [ProductType, ProductId, cookies.authToken])

  // Animations on data load
  useEffect(() => {
    if (containerRef.current && movieData) {
      const timeline = gsap.timeline({
        defaults: { duration: 3, ease: 'power3.out' },
      })
      timeline.from(containerRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 1, // Stagger animation for child elements
      })
    }
  }, [movieData]) // Trigger animation when movieData is loaded

  if (!movieData) return <Typography>Loading...</Typography>

  const defaultImage = 'https://via.placeholder.com/300' // Default image if no posterUrl

  return (
    <>
      {BoxMovies}
      <Navbar3 />
      <Box
        sx={{
          p: 3,
          minHeight: '100vh',
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
                src={movieData.image || defaultImage} // Use default image if posterUrl is not available
                alt={movieData.name || 'No title available'}
                sx={{
                  width: '50%',
                  height: 'auto',
                  borderRadius: 1,
                }}
              />
              {/* Movie Info */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {movieData.name || 'Unknown Title'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                  {movieData.description || 'No description available.'}
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
                  onClick={() => {
                    HandleShowMovie(movieData)
                  }}
                  disabled={!movieData.film_url}
                >
                  {movieData.film_url ? 'Watch Now' : 'No Watch Link Available'}
                </Button>
              </Paper>
              <Paper sx={{ mt: '10px', p: '10px' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  disabled={!movieData.film_url}
                >
                  {movieData.film_url
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
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
