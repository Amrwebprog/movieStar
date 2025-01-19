import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import useLoader from './CustomHook'
import { GlobalContext } from './GlobalContext'

const MovieCard = memo((props) => {
  const { loading, setLoading, Loader } = useLoader()
  const { PageNum, setPageNum } = useContext(GlobalContext)
  const [cookies] = useCookies(['authToken', 'username'])
  const location = useLocation()
  const Navigate = useNavigate()
  const ThisPage = location.search
  const [paginationData, setPaginationData] = useState([])

  const GetAllCards = (Page) => {
    const pageNum = Page.includes('?page=') ? Page.split('=')[1] : Page
    console.log('Current Page:', pageNum)
    setPaginationData([])
    setPageNum(0)

    const fetchData = async (endpoint) => {
      try {
        const apiUrl = `http://Movie-Star.test/api/${endpoint}?page=${pageNum}`
        console.log(`Fetching data from: ${apiUrl}`)

        const res = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${cookies.authToken}` },
        })

        const data = res?.data?.data?.data

        if (Array.isArray(data)) {
          setPaginationData((prev) => {
            const previousData = Array.isArray(prev) ? prev : []
            const combinedData = [...previousData, ...data]

            const shuffledData = combinedData.sort(() => Math.random() - 0.5)
            console.log(`Shuffled Combined Data:`, shuffledData)

            return shuffledData
          })

          const lastPage = res?.data?.data?.last_page || 1
          setPageNum((prev) => (prev || 0) + lastPage)
          console.log(PageNum)
        } else {
          console.warn(`Unexpected data format from ${endpoint}:`, data)
        }
      } catch (err) {
        console.error(`Error fetching data from ${endpoint}:`, err)
        Navigate('/errorPage')
      }
    }

    fetchData('Films')
    fetchData('Matches')
    fetchData('Series')
  }
  const HandleClick = (Type, ID) => {
    Navigate(`/${Type}/${ID}`)
  }

  const GetCard = useCallback(
    (Page, Needs) => {
      setLoading(true)

      const url = Page
        ? `http://Movie-Star.test/api/${Needs}${Page}`
        : `http://Movie-Star.test/api/${Needs}`

      if (Needs === 'All') {
        if (typeof GetAllCards === 'function') {
          GetAllCards(Page)
        } else {
          console.error('GetAllCards is not defined or not a function')
        }
      } else {
        axios
          .get(url, {
            headers: { Authorization: `Bearer ${cookies.authToken}` },
          })
          .then((res) => {
            const data = res?.data?.data?.data
            if (Array.isArray(data)) {
              setPaginationData(data)
              if (!Page) {
                setPageNum(res?.data?.data?.last_page || 1)
              }
            } else {
              console.warn('Unexpected data format:', data)
              setPaginationData([])
            }
          })
          .catch((err) => {
            console.error(err)
            Navigate('/errorPage')
          })
          .finally(() => {
            setLoading(false)
          })
      }
    },
    [cookies.authToken, setLoading, Navigate, setPageNum]
  )

  useEffect(() => {
    GetCard(ThisPage, props.Needs)
  }, [ThisPage, GetCard])

  return (
    <>
      {Loader}
      {paginationData.length > 0 ? (
        paginationData.map((el, index) => {
          const isFilm = el.name && el.genre && el.year_of_production
          const isSeries = el.series_name && el.num_of_seasons
          const isMatch = el.team_1 && el.team_2

          return (
            <Box
              onClick={() => {
                HandleClick(
                  isFilm
                    ? 'Films'
                    : isSeries
                    ? 'Series'
                    : isMatch
                    ? 'Matches'
                    : null,
                  el.id
                )
              }}
              key={index}
              sx={{
                position: 'relative',
                width: '350px',
                height: '400px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                backgroundColor: '#000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: '#fff',
                '&:hover': {
                  transform: 'scale(1.03)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              <Box
                component="img"
                src={el.image}
                alt="Media Poster"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '20px',
                  width: '120px',
                  display: 'flex',
                  justifyContent: 'center',
                  left: '-15px',
                  backgroundColor: '#FFB400',
                  color: '#000',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  transform: 'rotate(-35deg)',
                  zIndex: 2,
                }}
              >
                {el.quality}
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 3,
                  background:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
                  padding: '12px',
                }}
              >
                {isFilm && (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: '16px', fontWeight: 'bold' }}
                    >
                      {el.name} | {el.year_of_production}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>
                      {el.story}
                    </Typography>
                    <Button
                      startIcon={<PlayCircleOutlineIcon />}
                      variant="contained"
                      color="error"
                      sx={{
                        marginTop: '8px',
                        textTransform: 'none',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: '#d32f2f',
                        '&:hover': {
                          backgroundColor: '#b71c1c',
                        },
                      }}
                    >
                      {el.genre?.genre}
                    </Button>
                  </>
                )}

                {isSeries && (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: '16px', fontWeight: 'bold' }}
                    >
                      {el.series_name} | {el.year_of_production}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>
                      Seasons: {el.num_of_seasons}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>
                      {el.story}
                    </Typography>
                  </>
                )}

                {isMatch && (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: '16px', fontWeight: 'bold' }}
                    >
                      {el.team_1} vs {el.team_2}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>
                      {el.result}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>
                      Stadium: {el.stadium}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          )
        })
      ) : (
        <Typography sx={{ color: '#fff' }}>لا توجد بيانات لعرضها</Typography>
      )}
    </>
  )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard
