import { useTheme } from '@emotion/react'
import { Close, Folder } from '@mui/icons-material'
import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
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
  const [showMyVideo, setShowMyVideo] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState(null) // حالة لتخزين بيانات الحلقة الحالية
  const [seasons, setSeasons] = useState([])
  const containerRef = useRef(null)
  const theme = useTheme()

  const handleShowSeries = (element) => {
    setCurrentEpisode(element) // تخزين بيانات الحلقة الحالية
    setShowMyVideo(true) // إظهار الفيديو
  }

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
        setEpisode(res.data.data.episdes)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const ShowVideo = () => {
    console.log(currentEpisode)
    if (!currentEpisode) return null

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
          setShowMyVideo(false)
        }}
      >
        <Paper
          className={
            showMyVideo
              ? 'animate__animated animate__backInUp'
              : 'animate__animated animate__backOutUp'
          }
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
              setShowMyVideo(false)
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
            Episode {currentEpisode.episode_number}
          </Typography>
          <Box
            component="video"
            controls
            src={currentEpisode.eposide_url}
            sx={{
              width: '100%',
              height: '100%',
              maxHeight: '400px',
              borderRadius: '12px',
              boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.3)',
              background: '#000',
            }}
          />
          <Typography variant="body1">{currentEpisode.description}</Typography>
        </Paper>
      </Box>
    )
  }

  useEffect(() => {
    axios
      .get(`http://Movie-Star.test/api/${ProductType}/${ProductId}`, {
        headers: { Authorization: `Bearer ${cookies.authToken}` },
      })
      .then((res) => {
        setMovieData(res.data.data)
        setSeasons(res.data.data.seasons)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [ProductType, ProductId, cookies.authToken])

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
  }, [movieData])

  if (!movieData) return <Typography>Loading...</Typography>

  const defaultImage = 'https://via.placeholder.com/300'

  return (
    <>
      <Box sx={{ position: 'relative' }}>
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
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {movieData.series_name || 'Unknown Title'}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                    {movieData.discription || 'No description available.'}
                  </Typography>
                </Box>
              </Paper>
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
                      <Typography variant="h6">Season : {index + 1}</Typography>
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
                  onClick={() => {
                    handleShowSeries(el)
                  }}
                >
                  <Folder sx={{ fontSize: 40, color: 'white' }} />
                  <Divider orientation="horizontal" />
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    Episode: {el.episode_number}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        {showMyVideo && ShowVideo()}
      </Box>
    </>
  )
}
