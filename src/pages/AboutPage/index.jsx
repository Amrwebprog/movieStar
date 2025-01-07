import { useTheme } from '@emotion/react'
import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import aboutImg from '../../assets/dan-gold-opIZa6gWsFs-unsplash.jpg'
import AboutSection from '../../components/AboutSection'
import FeutureSection from '../../components/FeutureSection'
import Footer from '../../components/footer'
import MovieBrands from '../../components/MovieBrands'
import Navbar1 from '../../components/Navbar1'
import './index.scss'
export default function AboutUsPage() {
  const theme = useTheme()
  return (
    <>
      <Navbar1 />
      <Container maxWidth="xl" sx={{ marginTop: '100px' }}>
        <Box sx={{ width: '100%', height: '75vh', position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: theme.palette.custom.boxOverlay,
              zIndex: 2,
            }}
          ></Box>
          <img
            src={aboutImg}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt=""
          />
          <Typography
            sx={{
              position: 'absolute',
              bottom: '5px',
              left: '10px',
              zIndex: '3',
            }}
            variant="body1"
          >
            MovieStar Company Stage
          </Typography>
        </Box>
      </Container>
      <AboutSection />
      <FeutureSection />
      <MovieBrands />
      <Footer />
    </>
  )
}
