import {
  Box,
  Button,
  Container,
  Grid2,
  Typography,
  useTheme,
} from '@mui/material'
import Aos from 'aos'
import { useEffect, useState } from 'react'
import appleTV from '../assets/appleTV.svg'
import LaptopDevice from '../assets/device-laptop.c43f488.png'
import tap from '../assets/device-tablet-phone.978a2cf.png'
import movieTv from '../assets/device-tv.df3fcfc.png'
import img from '../assets/Devices-Background-Gradient.46aa1c5.jpg'
import tv from '../assets/devices-tab-tv-icon.08f27e8.svg'
import laptop from '../assets/labtop.svg'
import AndroidTv from '../assets/logo_androidtv.3967d9d.svg'
import Chrom from '../assets/logo_chromecast.701986e.svg'
import FireTv from '../assets/logo_firetv.a1ae7fe.svg'
import sammsung from '../assets/logo_samsung.5c4c08b.svg'
import mobile from '../assets/mobile.svg'
import roku from '../assets/Roku.svg'
export default function ResponseSection() {
  const [showTv, setShowTv] = useState(true)
  const [showMobil, setShowMobil] = useState(false)
  const [showDesktop, setShowDesktop] = useState(false)

  const ToggleTv = () => {
    setShowTv(true)
    setShowMobil(false)
    setShowDesktop(false)
  }
  const ToggleMobile = () => {
    setShowMobil(true)
    setShowTv(false)
    setShowDesktop(false)
  }
  const ToggleDesktop = () => {
    setShowDesktop(true)
    setShowTv(false)
    setShowMobil(false)
  }
  const theme = useTheme()
  useEffect(() => {
    Aos.init({})
  }, [])
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${img})`,
          width: '100%',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <Container maxWidth="xl" sx={{}}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'fixed',
                height: '100%',
                width: '100%',
                position: 'absolute',
                backgroundColor: theme.palette.custom.boxOverlay,
              }}
            ></Box>
            <Box
              sx={{
                zIndex: '2',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '30px',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: theme.palette.text.primary,
                  textAlign: 'center',
                  width: '65%',
                }}
                data-aos="fade-up"
              >
                Watch on all your favorite devices,{' '}
                <span style={{ color: '#FFCFB3' }}>any time</span> ,
                <span style={{ color: '#E78F81' }}>anywhere</span>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: { xs: '20px', sm: '50px', lg: '350px' },
                }}
                data-aos="fade-up"
              >
                <Button
                  variant="contained"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    background: 'gray',
                  }}
                  onClick={ToggleTv}
                >
                  <img src={tv}></img>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    Tv
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    background: 'gray',
                  }}
                  onClick={ToggleMobile}
                >
                  <img src={mobile}></img>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    Phone , Tablet & Mobile
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    background: 'gray',
                  }}
                  onClick={ToggleDesktop}
                >
                  <img src={laptop}></img>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    Desktop & Laptop
                  </Typography>
                </Button>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: '2px',
                  background: theme.palette.text.primary,
                  display: 'flex',
                  justifyContent: showTv
                    ? 'start'
                    : showMobil
                    ? 'center'
                    : showDesktop
                    ? 'end'
                    : setShowTv(true),
                }}
              >
                <Box
                  sx={{
                    width: '33%',
                    height: '2px',
                    background: theme.palette.secondary.main,
                  }}
                ></Box>
              </Box>
              <Box sx={{ marginTop: '15px' }}>
                {showTv && (
                  <>
                    <Box
                      data-aos="fade-up"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        Enjoy on your TV
                      </Typography>
                      <Box sx={{ width: '65%', height: 'auto' }}>
                        <img src={movieTv} className="col-12 " alt="" />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        background: '#00000036',
                        padding: '25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Grid2
                        container
                        spacing={2}
                        sx={{ width: '100%' }}
                        data-aos="fade-up"
                      >
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img width="40px" src={appleTV} alt="" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={roku} alt="" width="40px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={Chrom} width="140px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={AndroidTv} alt="" width="40px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={FireTv} alt="" width="40px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={sammsung} alt="" width="40px" />
                        </Grid2>
                      </Grid2>
                    </Box>
                  </>
                )}
                {showMobil && (
                  <>
                    <Box
                      className="animate__fadeIn animate__animated  animate__slower"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        Enjoy on your Mobile , Tablet
                      </Typography>
                      <Box sx={{ width: '65%', height: 'auto' }}>
                        <img src={tap} className="col-12" alt="" />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        background: '#00000036',
                        padding: '25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Grid2
                        container
                        spacing={2}
                        sx={{ width: '100%' }}
                        data-aos="fade-up"
                      >
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img width="40px" src={appleTV} alt="" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={roku} alt="" width="40px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={Chrom} width="140px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={AndroidTv} alt="" width="40px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={FireTv} alt="" width="40px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={sammsung} alt="" width="40px" />
                        </Grid2>
                      </Grid2>
                    </Box>
                  </>
                )}
                {showDesktop && (
                  <>
                    <Box
                      className="animate__fadeIn animate__animated  animate__slower"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        Enjoy on your Laptop && Desktop
                      </Typography>
                      <Box sx={{ width: '65%', height: 'auto' }}>
                        <img src={LaptopDevice} className="col-12" alt="" />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        background: '#00000036',
                        padding: '25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Grid2
                        container
                        spacing={2}
                        sx={{ width: '100%' }}
                        data-aos="fade-up"
                      >
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img width="40px" src={appleTV} alt="" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={roku} alt="" width="40px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={Chrom} width="140px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={AndroidTv} alt="" width="40px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={FireTv} alt="" width="40px" />
                        </Grid2>
                        <Grid2 size={{ xs: 6, md: 2, lg: 2 }}>
                          <img src={sammsung} alt="" width="40px" />
                        </Grid2>
                      </Grid2>
                    </Box>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  marginTop: '45px',
                  width: '100%',
                  height: '2px',
                  background: theme.palette.text.primary,
                  display: 'flex',
                }}
              ></Box>
              <Box data-aos="fade-up">
                <Typography variant="h2">
                  Start watching the latest movies any time, anywhere
                </Typography>
                <Button
                  sx={{
                    marginTop: '30px',
                    background: theme.palette.custom.contentBG,
                    width: '200px',
                  }}
                  variant="contained"
                  color="black"
                  size="large"
                >
                  Get Start
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}
