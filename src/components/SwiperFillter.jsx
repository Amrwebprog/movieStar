import { Box, Paper, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { GlobalContext } from './GlobalContext'

export default function SwiperFillter({ Type, Needs }) {
  const [cookies, setCookies] = useCookies(['authToken', 'username'])

  useEffect(() => {
    if (Needs?.genre) {
      console.log('yes')
    } else {
      console.log('no')
    }
  }, [])
  const {
    setTopMovies,
    setTopSeries,
    setTopMatches,
    FilterTaps,
    setFilterTaps,
    TopMovies,
    TopSeries,
    GenreData,
    setGenreData,
    TopMatches,
    setNewMovies,
    newMovies,
  } = useContext(GlobalContext)
  const [FilterMovies, setFilterMovies] = useState(false)
  const [FilterSeries, setFilterSeries] = useState(false)
  const [FilterNewMovies, setFilterNewMovies] = useState(false)
  const [combinedGenres, setCombinedGenres] = useState({
    Movies: [],
    Series: [],
  })

  const FilterSwiperMovies = (MyFilterMovie) => {
    setFilterMovies(MyFilterMovie)
  }

  const FilterSwiperSeries = (MyFilterSeries) => {
    setFilterSeries(MyFilterSeries)
  }
  const FilterSwiperNewMovies = (MyFilterNewMovies) => {
    setFilterNewMovies(MyFilterNewMovies)
  }
  const [OriginalTopMovies, setOriginalTopMovies] = useState([])
  const [OriginalNewMovies, setOriginalNewMovies] = useState([])
  const [OriginalTopSeries, setOriginalTopSeries] = useState([])
  useEffect(() => {
    if (FilterMovies === false) {
      setTopMovies(OriginalTopMovies)
    } else {
      setTopMovies(
        OriginalTopMovies.filter((el) => el.genre.genre === FilterMovies)
      )
    }
  }, [FilterMovies, OriginalTopMovies, setTopMovies])
  useEffect(() => {
    if (FilterNewMovies === false) {
      setNewMovies(OriginalNewMovies)
    } else {
      setNewMovies(
        OriginalNewMovies.filter((el) => el.genre.genre === FilterNewMovies)
      )
    }
  }, [FilterNewMovies, OriginalNewMovies, setNewMovies])

  useEffect(() => {
    if (FilterSeries === false) {
      setTopSeries(OriginalTopSeries)
    } else {
      setTopSeries(
        OriginalTopSeries.filter((el) => el.genre.genre === FilterSeries)
      )
    }
  }, [FilterSeries, OriginalTopSeries, setTopSeries])

  const GetTopMovies = () => {
    const token = cookies.authToken
    axios
      .get('http://Movie-Star.test/api/Films/top_10', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const MyObject = Object.values(res.data.data)
        const LimitedObject = MyObject.splice(0, 30)

        setTopMovies(LimitedObject)
        setOriginalTopMovies(LimitedObject)
        const movieGenres = LimitedObject.map((el) => ({
          id: el.id,
          genre: el.genre,
        }))

        const uniqueMovieGenres = Array.from(
          new Map(movieGenres.map((item) => [item.genre.genre, item])).values()
        )

        setCombinedGenres((prev) => ({ ...prev, Movies: uniqueMovieGenres }))
        const taps = uniqueMovieGenres.map((el) => el.genre)
        setFilterTaps(taps)
      })
      .catch(() => {
        null
      })
  }

  const GetTopSeries = () => {
    const token = cookies.authToken
    axios
      .get('http://Movie-Star.test/api/Series/top_10', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const MyObject = Object.values(res.data.data)
        const LimitedObject = MyObject.splice(0, 30)

        setTopSeries(LimitedObject)
        setOriginalTopSeries(LimitedObject)
        const seriesGenres = LimitedObject.map((el) => ({
          id: el.id,
          genre: el.genre,
        }))

        const uniqueSeriesGenres = Array.from(
          new Map(seriesGenres.map((item) => [item.genre.genre, item])).values()
        )

        setCombinedGenres((prev) => ({ ...prev, Series: uniqueSeriesGenres }))
        const taps = uniqueSeriesGenres.map((el) => el.genre)
        setFilterTaps(taps)
      })
      .catch((err) => {
        null
      })
  }

  const getTopMatches = () => {
    const token = cookies.authToken
    axios
      .get('http://Movie-Star.test/api/Matches?page=1', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const MyObject = Object.values(res.data.data)
        const LimitedObject = MyObject.splice(0, 30)
        console.log()
        setTopMatches(res.data.data.data)
        console.log(TopMatches)
      })
      .catch((err) => {
        null
      })
  }
  const getMoviesGenere = (Genere) => {
    setGenreData([])
    console.log('Fetching genre:', Genere)
    if (Genere) {
      axios
        .get(`http://Movie-Star.test/api/Films/genre/${Genere}`, {
          headers: { Authorization: `Bearer ${cookies.authToken}` },
        })
        .then((res) => {
          if (res.data && typeof res.data.data === 'object') {
            const MyArray = Object.values(res.data.data)
            console.log('Fetched Data:', MyArray)

            const newGroupedData = MyArray.reduce((acc, item) => {
              const genreName = item.genre.genre
              if (!acc[genreName]) {
                acc[genreName] = []
              }
              acc[genreName].push(item)
              return acc
            }, {})

            console.log('New Grouped Data:', newGroupedData)

            setGenreData((prevData) => {
              console.log('Previous GenreData:', prevData)
              const mergedData = { ...prevData }

              Object.keys(newGroupedData).forEach((genre) => {
                if (!mergedData[genre]) {
                  mergedData[genre] = []
                }

                const existingIds = new Set(
                  mergedData[genre].map((item) => item.id)
                )
                const uniqueItems = newGroupedData[genre].filter(
                  (item) => !existingIds.has(item.id)
                )
                mergedData[genre] = [...mergedData[genre], ...uniqueItems]
              })

              console.log('Updated GenreData:', mergedData)
              return mergedData
            })
          } else {
            console.error('Unexpected data format:', res.data)
          }
        })
        .catch((err) => {
          console.error('Error fetching genre data:', err)
        })
    }
  }

  const getSeriesGenre = (Genre) => {
    setGenreData([])
    console.log('Fetching series genre:', Genre)
    if (Genre) {
      axios
        .get(`http://Movie-Star.test/api/Series/genre/${Genre}`, {
          headers: { Authorization: `Bearer ${cookies.authToken}` },
        })
        .then((res) => {
          if (res.data && typeof res.data.data === 'object') {
            const MyArray = Object.values(res.data.data)
            console.log('Fetched Data:', MyArray)

            const newGroupedData = MyArray.reduce((acc, item) => {
              const genreName = item.genre.genre
              if (!acc[genreName]) {
                acc[genreName] = []
              }
              acc[genreName].push(item)
              return acc
            }, {})

            console.log('New Grouped Data:', newGroupedData)

            setGenreData((prevData) => {
              console.log('Previous GenreData:', prevData)
              const mergedData = { ...prevData }

              Object.keys(newGroupedData).forEach((genre) => {
                if (!mergedData[genre]) {
                  mergedData[genre] = []
                }

                const existingIds = new Set(
                  mergedData[genre].map((item) => item.id)
                )
                const uniqueItems = newGroupedData[genre].filter(
                  (item) => !existingIds.has(item.id)
                )
                mergedData[genre] = [...mergedData[genre], ...uniqueItems]
              })

              console.log('Updated GenreData:', mergedData)
              return mergedData
            })
          } else {
            console.error('Unexpected data format:', res.data)
          }
        })
        .catch((err) => {
          console.error('Error fetching series genre data:', err)
        })
    }
  }

  const getNewMovies = () => {
    const token = cookies.authToken
    axios
      .get('http://Movie-Star.test/api/Films/new', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const MyObject = Object.values(res.data.data)
        const LimitedObject = MyObject.splice(0, 30)

        setNewMovies(LimitedObject)
        setOriginalNewMovies(LimitedObject)
        const movieGenres = LimitedObject.map((el) => ({
          id: el.id,
          genre: el.genre,
        }))

        const uniqueMovieGenres = Array.from(
          new Map(movieGenres.map((item) => [item.genre.genre, item])).values()
        )

        setCombinedGenres((prev) => ({ ...prev, NewMovies: uniqueMovieGenres }))
        console.log(combinedGenres)
        const taps = uniqueMovieGenres.map((el) => el.genre)
        setFilterTaps(taps)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const WhatINeed = () => {
    if (Needs?.genre) {
      if (Type === 'Movies') {
        getMoviesGenere(Needs.genre)
      } else if (Type === 'Series') {
        getSeriesGenre(Needs.genre)
      }
    } else {
      switch (Needs) {
        case 'TopMovies':
          GetTopMovies()
          break

        case 'TopSeries':
          GetTopSeries()
          break
        case 'TopMatches':
          getTopMatches()
          break
        case 'NewMovies':
          getNewMovies()
          break

        default:
          console.error("Unexpected 'Needs' value:", Needs)
          break
      }
    }
  }

  useEffect(() => {
    WhatINeed()
  }, [])

  const MyGenere = () => {
    switch (Type) {
      case 'Movies':
        return combinedGenres.Movies.map((el, index) => (
          <Paper
            key={index}
            sx={{
              paddingX: '40px',
              paddingY: '15px',
              cursor: 'pointer',
              ':hover': { boxShadow: 4 },
              ':focus': {
                outline: 'none',
                boxShadow: '0 0 8px 2px #3f51b5',
                transform: 'scale(1.02)',
              },
            }}
            tabIndex={0}
            onClick={() => {
              FilterMovies === el.genre.genre
                ? setFilterMovies(false)
                : FilterSwiperMovies(el.genre.genre)
            }}
          >
            <Typography variant="body1">{el.genre.genre}</Typography>
          </Paper>
        ))
      case 'Series':
        return combinedGenres.Series.map((el, index) => (
          <Paper
            key={index}
            sx={{
              paddingX: '40px',
              paddingY: '15px',
              cursor: 'pointer',
              ':hover': { boxShadow: 4 },
              ':focus': {
                outline: 'none',
                boxShadow: '0 0 8px 2px #3f51b5',
                transform: 'scale(1.02)',
              },
            }}
            tabIndex={0}
            onClick={() => {
              FilterSeries === el.genre.genre
                ? setFilterSeries(false)
                : FilterSwiperSeries(el.genre.genre)
            }}
          >
            <Typography variant="body1">{el.genre.genre}</Typography>
          </Paper>
        ))
      case 'New':
        return combinedGenres?.NewMovies?.map((el, index) => (
          <Paper
            key={index}
            sx={{
              paddingX: '40px',
              paddingY: '15px',
              cursor: 'pointer',
              ':hover': { boxShadow: 4 },
              ':focus': {
                outline: 'none',
                boxShadow: '0 0 8px 2px #3f51b5',
                transform: 'scale(1.02)',
              },
            }}
            tabIndex={0}
            onClick={() => {
              FilterNewMovies === el.genre.genre
                ? setFilterNewMovies(false)
                : FilterSwiperNewMovies(el.genre.genre)
            }}
          >
            <Typography variant="body1">{el.genre.genre}</Typography>
          </Paper>
        ))
      case 'Matches':
        return (
          <Paper
            sx={{
              paddingX: '40px',
              paddingY: '15px',
              cursor: 'pointer',
              ':hover': { boxShadow: 4 },
              ':focus': {
                outline: 'none',
                boxShadow: '0 0 8px 2px #3f51b5',
                transform: 'scale(1.02)',
              },
            }}
            tabIndex={0}
          >
            <Typography variant="body1">Matches</Typography>
          </Paper>
        )

      default:
        return null
    }
  }

  return (
    <Box
      sx={{
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        flexDirection: 'row',
        gap: '25px',
        flexWrap: 'wrap',
      }}
    >
      {FilterTaps ? MyGenere() : null}
    </Box>
  )
}
