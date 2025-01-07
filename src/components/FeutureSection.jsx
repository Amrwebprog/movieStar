import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material'
import React from 'react'

export default function FeutureSection() {
  const featuredMovies = [
    {
      title: 'The Avengers',
      description: 'Earth’s mightiest heroes unite to save the world.',
      image:
        'https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg',
    },
    {
      title: 'Inception',
      description: 'A mind-bending thriller that dives into dreams.',
      image:
        'https://asd.quest/wp-content/uploads/2018/09/%D9%81%D9%8A%D9%84%D9%85-Inception-2010-%D9%85%D8%AA%D8%B1%D8%AC%D9%85-367x550.jpg',
    },
    {
      title: 'The Dark Knight',
      description: 'A battle between Batman and Joker.',
      image:
        'https://asd.quest/wp-content/uploads/2020/01/The-Dark-Knight-367x550.jpg',
    },
    {
      title: 'Frozen',
      description: 'A magical journey of two sisters.',
      image: 'https://asd.quest/wp-content/uploads/2023/09/Frozen-367x550.jpg',
    },
    {
      title: 'Avatar',
      description: 'An epic adventure on the alien world of Pandora.',
      image:
        'https://a120.egyrbyeteuh.sbs/wp-content/uploads/2023/03/%D9%81%D9%8A%D9%84%D9%85-Avatar-2-2022-%D9%85%D8%AA%D8%B1%D8%AC%D9%85-1.jpg',
    },
    {
      title: 'Interstellar',
      description: 'A journey beyond the stars to save humanity.',
      image:
        'https://asd.quest/wp-content/uploads/2021/08/Interstellar-scaled-367x550.jpg',
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ marginBottom: '30px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Featured Titles
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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {featuredMovies.map((movie, index) => (
            <Card key={index} sx={{ maxWidth: 300, boxShadow: 3 }}>
              <CardMedia
                component="img"
                alt={movie.title}
                height="200"
                image={movie.image}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  )
}
