import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import disneyImg from '../assets/disney_f6a189acd1.svg'
import marvel from '../assets/marvel-comics-seeklogo.png'
import netFlexImg from '../assets/netflex.jpg'
import pixarImag from '../assets/Pixar_logo_1063ed0633.jpg'
import BrandsCard from './BrandsCard'

export default function MovieBrands() {
  const data = [
    {
      img: marvel,
      title: 'This is Marvel Header',
      footer: 'this is Marvel Footer',
    },
    {
      img: disneyImg,
      title: 'This is Disney Header',
      footer:
        'this is Disney Footer this is Disney Footer this is Disney Footer this is Disney Footer this is Disney Footer',
    },
    {
      img: netFlexImg,
      title: 'This is NetFlex Header',
      footer:
        'this is NetFlex NetFlex NetFlex NetFlex NetFlex Footer this is NetFlex NetFlex NetFlex NetFlex NetFlex Footer this is NetFlex NetFlex NetFlex NetFlex NetFlex Footer this is NetFlex NetFlex NetFlex NetFlex NetFlex Footer',
    },
    {
      img: pixarImag,
      title: 'This is pixar Header',
      footer: 'this is Marvel Footer',
    },
    {
      img: marvel,
      title: 'This is Marvel Header',
      footer: 'this is Marvel Footer',
    },
  ]
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Our Brands
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
              width: '100%',
              display: 'flex',

              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '20px',
              mb: '100px',
            }}
          >
            {data.map((el, index) => {
              return (
                <BrandsCard
                  key={index}
                  img={el.img}
                  header={el.title}
                  footer={el.footer}
                />
              )
            })}
          </Box>
        </Box>
      </Container>
    </>
  )
}
