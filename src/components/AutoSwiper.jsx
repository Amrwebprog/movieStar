import { Box } from '@mui/material'
import React from 'react'
import BodySwiper from './BodySwiper'
import SwiperFillter from './SwiperFillter'
import SwiperHeader from './SwiperHeader'

export default function AutoSwiper({ Get, Needs }) {
  switch (Get) {
    case 'NewMovies':
      return (
        <>
          <SwiperHeader Type="New" Needs="NewMovies" />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            <SwiperFillter Type="New" Needs="NewMovies" />
          </Box>
          <BodySwiper Needs="NewMovies" />
        </>
      )
    case 'Movies':
      return (
        <>
          <SwiperHeader Type="Movies" Needs={Needs} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            <SwiperFillter Type="Movies" Needs={Needs} />
          </Box>
          <BodySwiper Type="Films" Needs={Needs} />
        </>
      )
    case 'Series':
      return (
        <>
          <SwiperHeader Type="Series" Needs={Needs} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            <SwiperFillter Type="Series" Needs={Needs} />
          </Box>
          <BodySwiper Type="Series" Needs={Needs} />
        </>
      )
    case 'Matches':
      return (
        <>
          <SwiperHeader Type="Matches" Needs="TopMatches" />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            <SwiperFillter Type="Matches" Needs="TopMatches" />
          </Box>
          <BodySwiper Needs="TopMatches" />
        </>
      )
    default:
      return null
  }
}
