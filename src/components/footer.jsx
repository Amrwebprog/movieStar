import { useTheme } from '@emotion/react'
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material'
import { Box, Container, Grid, Link, Paper, Typography } from '@mui/material'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

export default function Footer() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])
  const theme = useTheme()
  return (
    <Box>
      <Paper elevation={3} sx={{ opacity: '0.95' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} data-aos="fade-up">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Movie Star
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                A platform for movie lovers. Discover, rate, and review the
                latest movies from around the world.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} data-aos="fade-up">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
                <Link href="#" color="inherit" underline="hover">
                  Home
                </Link>

                <Link href="#" color="inherit" underline="hover">
                  About Us
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Contact Us
                </Link>
              </Box>
            </Grid>

            {/* Social Media Links */}
            <Grid item xs={12} md={4} data-aos="fade-up">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Link href="#" color="inherit">
                  <Facebook />
                </Link>
                <Link href="#" color="inherit">
                  <Twitter />
                </Link>
                <Link href="#" color="inherit">
                  <Instagram />
                </Link>
                <Link href="#" color="inherit">
                  <YouTube />
                </Link>
              </Box>
            </Grid>
          </Grid>

          <Box textAlign="center" sx={{ mt: 4 }}>
            <Typography variant="body2" color="inherit">
              © {new Date().getFullYear()} MovieStar. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Paper>
    </Box>
  )
}
