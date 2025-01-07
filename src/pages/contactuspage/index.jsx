import { useTheme } from '@emotion/react'
import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import Navbar1 from '../../components/Navbar1'
import Footer from '../../components/footer'

import ContactUsForm from '../../components/ContactUsForm'
import './index.scss'
export default function ContactUsPage() {
  const theme = useTheme()
  return (
    <>
      <Navbar1 />
      <Container
        maxWidth="xl"
        sx={{
          marginTop: '90px',
          marginBottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h1">Contact Us</Typography>
          <Paper
            sx={{
              padding: '15px',
              background: theme.palette.custom.boxOverlay,
              borderRadius: '15px',
              cursor: 'pointer',
            }}
          >
            <Typography variant="h2">Help Center</Typography>
          </Paper>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '2px',
            background: theme.palette.text.primary,
          }}
        ></Box>
      </Container>
      <Box
        className="ContactUsContainer"
        sx={{ marginBottom: '40px', minHeight: '60vh', position: 'relative' }}
      >
        <Box
          sx={{
            background: theme.palette.custom.boxOverlay,
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
        ></Box>

        <ContactUsForm />
      </Box>
      <Footer />
    </>
  )
}
