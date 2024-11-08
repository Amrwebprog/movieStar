import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Button, Container, Typography, useTheme } from '@mui/material'
import { useRef } from 'react'
import img from '../assets/AAAABb-nFlMd-C_gNZp9HJpegH6RJfMNtEx-7mvxOZz5BkL9SOIbMwr3hnf2MVaET5eSRqFaBmB9LPGTPHkSvunSq1slmtEveCpgI77L.jpg'
import img2 from '../assets/AAAABb158YrdX6gdWKU9lWiyObMWGTC93KSxEuUOnkuSUDVOOA3Hi0EMWYIffGPYxlLEDjDma4LC_eXmcBbwmHtPY7C_mqTDuun6pAVd.jpg'

export default function HeroSection() {
  const nextbutton = useRef()
  const prevbutton = useRef()
  const carosuel = useRef()
  const list = useRef()
  const thumbnail = useRef()

  let timeRuning = 3000
  let runTimeout
  const showSlider = (type) => {
    const mylist = list.current
    const mythumbnail = thumbnail.current
    let itemSlider = document.querySelectorAll('.carousel .list .item')
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item')

    if (type === 'next') {
      mylist.appendChild(itemSlider[0])
      mythumbnail.appendChild(itemThumbnail[0])
      carosuel.current.classList.add('next')
    } else {
      let postionLastItem = itemSlider.length - 1
      mylist.prepend(itemSlider[postionLastItem])
      mythumbnail.prepend(itemThumbnail[postionLastItem])
      carosuel.current.classList.add('prev')
    }

    clearTimeout(runTimeout)
    runTimeout = setTimeout(() => {
      carosuel.current.classList.remove('next')
      carosuel.current.classList.remove('prev')
    }, timeRuning)
  }

  const theme = useTheme()
  return (
    <div>
      <Container maxWidth="xl" sx={{ marginTop: '70px', textAlign: 'center' }}>
        <Typography
          variant="h1"
          sx={{ color: theme.palette.secondary, zIndex: '3' }}
        >
          Trending Now
        </Typography>
      </Container>
      <Container maxWidth="xl" sx={{ marginTop: '65px' }}>
        <Box className="carousel" ref={carosuel}>
          <Box
            className="carosuel-overlay"
            sx={{
              position: 'absolute',
              zIndex: '1000',
              width: '100%',
              height: '100%',
              background: theme.palette.custom.rightgradiant,
              pointerEvents: 'none',
            }}
          ></Box>

          <Box className="list" ref={list}>
            <Box className="item">
              <img src={img} alt="" />
              <Box
                className="content"
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.custom.contentBG,
                  padding: '20px',
                }}
              >
                <Box className="product-name">
                  <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body1">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
                <Box className="product-dis">
                  <Typography variant="body1">
                    عندما يكتشف خمسة أشخاص عاديين من جنوب لندن أنهم يتمتعون
                    بقوًى استثنائية، تقع مسؤولية اتحادهم على عاتق رجل واحد
                    لإنقاذ المرأة التي يحبها.
                  </Typography>
                </Box>
                <Box className="product-actors">
                  <Typography variant="body2">
                    بطولة:توسين كول، نادين ميلز، إيريك كوفي أبريفا
                    التأليف:رابمان
                  </Typography>
                </Box>
                <Box className="Buttons d-flex gap-3">
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    <Typography variant="h3">Show More</Typography>
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    <Typography variant="h3">Watch Now</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className="item">
              <img src={img2} alt="" />
              <Box
                className="content"
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <Box className="product-name">
                  <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body1">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
                <Box className="product-dis">
                  <Typography variant="body1">
                    عندما يكتشف خمسة أشخاص عاديين من جنوب لندن أنهم يتمتعون
                    بقوًى استثنائية، تقع مسؤولية اتحادهم على عاتق رجل واحد
                    لإنقاذ المرأة التي يحبها.
                  </Typography>
                </Box>
                <Box className="product-actors">
                  <Typography variant="body2">
                    بطولة:توسين كول، نادين ميلز، إيريك كوفي أبريفا
                    التأليف:رابمان
                  </Typography>
                </Box>
                <Box className="Buttons d-flex gap-3">
                  <Button
                    variant="contained"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="h3">Show More</Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="h3">Watch Now</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className="item">
              <img src={img} alt="" />
              <Box
                className="content"
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <Box className="product-name">
                  <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body1">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
                <Box className="product-dis">
                  <Typography variant="body1">
                    عندما يكتشف خمسة أشخاص عاديين من جنوب لندن أنهم يتمتعون
                    بقوًى استثنائية، تقع مسؤولية اتحادهم على عاتق رجل واحد
                    لإنقاذ المرأة التي يحبها.
                  </Typography>
                </Box>
                <Box className="product-actors">
                  <Typography variant="body2">
                    بطولة:توسين كول، نادين ميلز، إيريك كوفي أبريفا
                    التأليف:رابمان
                  </Typography>
                </Box>
                <Box className="Buttons d-flex gap-3">
                  <Button
                    variant="contained"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="h3">Show More</Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="h3">Watch Now</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className="item">
              <img src={img} alt="" />
              <Box
                className="content"
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <Box className="product-name">
                  <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body1">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
                <Box className="product-dis">
                  <Typography variant="body1">
                    عندما يكتشف خمسة أشخاص عاديين من جنوب لندن أنهم يتمتعون
                    بقوًى استثنائية، تقع مسؤولية اتحادهم على عاتق رجل واحد
                    لإنقاذ المرأة التي يحبها.
                  </Typography>
                </Box>
                <Box className="product-actors">
                  <Typography variant="body2">
                    بطولة:توسين كول، نادين ميلز، إيريك كوفي أبريفا
                    التأليف:رابمان
                  </Typography>
                </Box>
                <Box className="Buttons d-flex gap-3">
                  <Button
                    variant="contained"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="h3">Show More</Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="h3">Watch Now</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className="item">
              <img src={img} alt="" />
              <Box
                className="content"
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <Box className="product-name">
                  <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body1">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
                <Box className="product-dis">
                  <Typography variant="body1">
                    عندما يكتشف خمسة أشخاص عاديين من جنوب لندن أنهم يتمتعون
                    بقوًى استثنائية، تقع مسؤولية اتحادهم على عاتق رجل واحد
                    لإنقاذ المرأة التي يحبها.
                  </Typography>
                </Box>
                <Box className="product-actors">
                  <Typography variant="body2">
                    بطولة:توسين كول، نادين ميلز، إيريك كوفي أبريفا
                    التأليف:رابمان
                  </Typography>
                </Box>
                <Box className="Buttons d-flex gap-3">
                  <Button
                    variant="contained"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="h3">Show More</Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="h3">Watch Now</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className="item">
              <img src={img} alt="" />
              <Box
                className="content"
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <Box className="product-name">
                  <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body1">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
                <Box className="product-dis">
                  <Typography variant="body1">
                    عندما يكتشف خمسة أشخاص عاديين من جنوب لندن أنهم يتمتعون
                    بقوًى استثنائية، تقع مسؤولية اتحادهم على عاتق رجل واحد
                    لإنقاذ المرأة التي يحبها.
                  </Typography>
                </Box>
                <Box className="product-actors">
                  <Typography variant="body2">
                    بطولة:توسين كول، نادين ميلز، إيريك كوفي أبريفا
                    التأليف:رابمان
                  </Typography>
                </Box>
                <Box className="Buttons d-flex gap-3">
                  <Button
                    variant="contained"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="body1">Show More</Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography variant="body1">Watch Now</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="thumbnail" ref={thumbnail}>
            <Box className="item">
              <img src={img} alt="" />
              <Box className="content">
                <Box className="product-name">
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body2">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="item">
              <img src={img2} alt="" />
              <Box className="content">
                <Box className="product-name">
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body2">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="item">
              <img src={img} alt="" />
              <Box className="content">
                <Box className="product-name">
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body2">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="item">
              <img src={img} alt="" />
              <Box className="content">
                <Box className="product-name">
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body2">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="item">
              <img src={img} alt="" />
              <Box className="content">
                <Box className="product-name">
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body2">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box className="item">
              <img src={img} alt="" />
              <Box className="content">
                <Box className="product-name">
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    سوباسيل{' '}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body2">
                    2024 | تصنيف النضج:+18 | 1 من المواسم | دراما
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="arrows" sx={{ zIndex: '10000000' }}>
            <Button
              sx={{ zIndex: '3000', cursor: 'pointer' }}
              ref={nextbutton}
              variant="outlined"
              className="rounded-circle p-3"
              color="error"
              aria-label="add"
              id="next"
              onClick={() => {
                showSlider('prev')
              }}
            >
              <ArrowBackIos />
            </Button>
            <Button
              sx={{ zIndex: '3000', cursor: 'pointer' }}
              variant="outlined"
              className="rounded-circle p-3"
              color="error"
              aria-label="add"
              id="prev"
              ref={prevbutton}
              onClick={() => showSlider('next')}
            >
              <ArrowForwardIos />
            </Button>
          </Box>
          <Box className="time" sx={{ zIndex: '2000' }}></Box>
        </Box>
      </Container>
    </div>
  )
}
