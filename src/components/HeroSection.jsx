import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Button, Typography, useTheme } from '@mui/material'
import axios from 'axios'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import useLoader from './CustomHook'

const HeroSection = () => {
  const carosuel = useRef()
  const list = useRef()
  const thumbnail = useRef()
  const { setLoading, Loader } = useLoader()
  const theme = useTheme()
  const [cookies] = useCookies()
  const [data, setData] = useState([])

  const fetchData = useCallback(async () => {
    const token = cookies.authToken
    setLoading(true)
    try {
      const res = await axios.get('http://Movie-Star.test/api/Films/top_10', {
        headers: {
          Authorization: `Bearer ${
            token || `7|SG6S14gDl0wG1iVG9tKumBEBTpCOj9zNKg1YiGEiad45a222`
          }`,
        },
      })
      const films = Object.values(res.data.data)
      const limitedFilms = films.length > 10 ? films.slice(0, 10) : films
      setData(limitedFilms)
    } catch (err) {
      null
    } finally {
      setLoading(false)
    }
  }, [cookies, setLoading])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const showSlider = useCallback((type) => {
    const mylist = list.current
    const mythumbnail = thumbnail.current
    const itemSlider = mylist.children
    const itemThumbnail = mythumbnail.children

    if (type === 'next') {
      mylist.appendChild(itemSlider[0])
      mythumbnail.appendChild(itemThumbnail[0])
      carosuel.current.classList.add('next')
    } else {
      const lastIndex = itemSlider.length - 1
      mylist.prepend(itemSlider[lastIndex])
      mythumbnail.prepend(itemThumbnail[lastIndex])
      carosuel.current.classList.add('prev')
    }

    setTimeout(() => {
      carosuel.current.classList.remove('next')
      carosuel.current.classList.remove('prev')
    }, 3000)
  }, [])

  return (
    <div>
      {Loader}
      <Box className="carousel" sx={{ marginTop: '65px' }} ref={carosuel}>
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
          {data.map((el, index) => (
            <Box className="item" key={index}>
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                }}
              ></Box>
              <img
                src={el.image}
                alt={el.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',

                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Box
                className="content"
                sx={{
                  display: 'flex',
                  gap: '10px',
                  flexDirection: 'column',
                  padding: '20px',
                  position: 'relative',
                  zIndex: 2,
                  color: 'white',
                }}
              >
                <Box className="product-name">
                  <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
                    {el.name}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body1">{el.description}</Typography>
                </Box>
                <Box className="product-dis">
                  <Typography variant="body1">{el.story}</Typography>
                </Box>
                <Box className="product-actors">
                  <Typography variant="body2">{el.rate}</Typography>
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
          ))}
        </Box>
        <Box className="thumbnail" ref={thumbnail}>
          {data.map((el, index) => (
            <Box className="item" key={index}>
              <img
                src={el.image}
                alt={el.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',

                  borderRadius: '10px',
                }}
              />
              <Box className="content">
                <Box className="product-name">
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {el.name}
                  </Typography>
                </Box>
                <Box className="product-info">
                  <Typography variant="body2">
                    {el.year_of_production} | {el.rate} | {el.country_id} |{' '}
                    {el.genre_id}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box className="arrows" sx={{ zIndex: '10000000' }}>
          <Button
            sx={{ zIndex: '3000', cursor: 'pointer' }}
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
            onClick={() => showSlider('next')}
          >
            <ArrowForwardIos />
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default memo(HeroSection)
