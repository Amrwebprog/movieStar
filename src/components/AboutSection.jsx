import { useTheme } from '@emotion/react'
import { Avatar, Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import AmrImg from '../assets/1725041913024.jpg'
import khaledImg from '../assets/khaled.jpg'
import askryImg from '../assets/mohamedaskry.jpg'
export default function AboutSection() {
  const theme = useTheme()
  return (
    <Container maxWidth="xl" sx={{ marginBottom: '30px', marginTop: '50px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                About
              </Typography>
              <Box
                sx={{
                  width: '150px',
                  height: '5px',
                  background: 'linear-gradient(90deg, #2338f5, #00b8c7)',
                  borderRadius: '2px',
                }}
              />
            </Box>
            <Box>
              <Typography variant="body2">
                For 100 years, The Movie Star Studios has been the foundation on
                which The Movie Star Company was built. Today it brings quality
                movies, episodic storytelling, and stage plays to consumers
                throughout the world. The Movie Star Studios encompasses a
                collection of respected film studios, including Movie Star,
                Movie Star Animation Studios, Pixar Animation Studios,
                Lucasfilm, Marvel Studios, Searchlight Pictures, and 20th
                Century Studios. It is also home to Movie Star Theatrical Group,
                producer of world-class stage shows, as well as Movie Star Music
                Group.
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Leadership
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: '2px',
              background: theme.palette.text.primary,
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              alignItems: 'start',
              width: '100%',
            }}
          >
            {/* العنصر الأول */}
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: '20px',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt="Amr Samy"
                src={AmrImg}
                sx={{ width: 56, height: 56 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  Amr Samy Aly
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '100' }}>
                  Front End Developer
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '100' }}>
                  UI / UX
                </Typography>
              </Box>
            </Box>

            {/* العنصر الثاني */}
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: '20px',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt="Mohamed El Askry"
                src={askryImg}
                sx={{ width: 56, height: 56 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  Mohamed El Askry
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '100' }}>
                  Back End
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '100' }}>
                  Back End
                </Typography>
              </Box>
            </Box>

            {/* العنصر الثالث */}
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: '20px',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt="Khaled Beeeh"
                src={khaledImg}
                sx={{ width: 56, height: 56 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                  Khaled Beeeh
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '100' }}>
                  Back End
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '100' }}>
                  Back End
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
