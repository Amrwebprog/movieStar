import { Box, Pagination } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AutoSwiper from '../../components/AutoSwiper'
import { GlobalContext } from '../../components/GlobalContext'
import HeroSection2 from '../../components/HeroSection2'
import MovieCard from '../../components/MovieCard'
import Navbar3 from '../../components/NavBar3'
import Footer from '../../components/footer'

export default function MatchesPage() {
  const { PageNum, setPageNum } = useContext(GlobalContext)
  const Navigate = useNavigate()
  const HandleChange = (event, value) => {
    Navigate(`?page=${value}`)
  }
  return (
    <>
      <Navbar3 />
      <HeroSection2 Needs="Matches" />
      <AutoSwiper Get="Matches" Needs="TopMatches" />
      <Box
        sx={{
          width: '100%',
          padding: '10px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <MovieCard Needs={'Matches'} />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginY: '50px',
        }}
      >
        <Pagination
          count={PageNum || 10}
          onChange={HandleChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
      <Footer />
    </>
  )
}
