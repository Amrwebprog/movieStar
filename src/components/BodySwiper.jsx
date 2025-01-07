import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import FootballBg from '../assets/football-pitch-4994688_960_720.jpg'
import { GlobalContext } from './GlobalContext'
const data = [
  {
    img: 'https://via.placeholder.com/300x400',
    name: 'The Movie',
    type: 'فيلم',
    top10: true,
    classification: 'أكشن / دراما',
    rate: 8,
    country: 'USA',
    year: 2023,
    quality: '1080p',
    story: 'This is a simple story about a movie.',
  },
  {
    img: 'https://via.placeholder.com/300x400',
    name: 'Another Movie',
    type: 'مسلسل',
    top10: false,
    classification: 'كوميديا / تشويق',
    rate: 7,
    country: 'UK',
    year: 2022,
    quality: '720p',
    story: 'A comedy series with lots of twists.',
  },
  {
    img: 'https://via.placeholder.com/300x400',
    name: 'Another Movie',
    type: 'مسلسل',
    top10: false,
    classification: 'كوميديا / تشويق',
    rate: 7,
    country: 'UK',
    year: 2022,
    quality: '720p',
    story: 'A comedy series with lots of twists.',
  },
  {
    img: 'https://via.placeholder.com/300x400',
    name: 'Another Movie',
    type: 'مسلسل',
    top10: false,
    classification: 'كوميديا / تشويق',
    rate: 7,
    country: 'UK',
    year: 2022,
    quality: '720p',
    story: 'A comedy series with lots of twists.',
  },
  {
    img: 'https://via.placeholder.com/300x400',
    name: 'Another Movie',
    type: 'مسلسل',
    top10: false,
    classification: 'كوميديا / تشويق',
    rate: 7,
    country: 'UK',
    year: 2022,
    quality: '720p',
    story: 'A comedy series with lots of twists.',
  },
  {
    img: 'https://via.placeholder.com/300x400',
    name: 'Another Movie',
    type: 'مسلسل',
    top10: false,
    classification: 'كوميديا / تشويق',
    rate: 7,
    country: 'UK',
    year: 2022,
    quality: '720p',
    story: 'A comedy series with lots of twists.',
  },
]

export default function BodySwiper({ Type, Needs }) {
  const Navigate = useNavigate()
  const {
    TopMovies,
    newMovies,
    setNewMovies,
    TopSeries,
    GenreData,
    TopMatches,
  } = useContext(GlobalContext)
  useEffect(() => {
    console.log(newMovies)
  }, [newMovies])
  const theme = useTheme()
  const MySwiper = () => {
    if (!Needs || !data) {
      // تأكد من وجود Needs و data
      return <div>لا توجد بيانات لعرضها</div>
    }
    const HandleClick = (Type, ID) => {
      Navigate(`/${Type}/${ID}`)
    }
    switch (Needs) {
      case 'NewMovies':
        return (
          <>
            {newMovies?.map((item, index) => (
              <SwiperSlide
                onClick={() => {
                  HandleClick('Films', item.id)
                }}
                key={index}
              >
                <Card
                  sx={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      height: '300px',
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent
                    sx={{
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ margin: '8px 0' }}
                    >
                      {item.genre.genre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      الجودة: {item.quality} | التقييم: {item.rate}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </>
        )

      case 'TopMovies':
        return (
          <>
            {TopMovies.map((item, index) => (
              <SwiperSlide
                key={index}
                onClick={() => {
                  HandleClick('Films', item.id)
                }}
              >
                <Card
                  sx={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      height: '300px',
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent
                    sx={{
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ margin: '8px 0' }}
                    >
                      {item.genre.genre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      الجودة: {item.quality} | التقييم: {item.rate} | سنة :{' '}
                      {item.year_of_production}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </>
        )

      case 'TopSeries':
        return (
          <>
            {TopSeries.map((item, index) => (
              <SwiperSlide
                key={index}
                onClick={() => {
                  HandleClick('Series', item.id)
                }}
              >
                <Card
                  sx={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.series_name}
                    sx={{
                      height: '300px',
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent
                    sx={{
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {item.series_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ margin: '8px 0' }}
                    >
                      {item.genre.genre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      الجودة: {item.quality} | التقييم: {item.rate} | سنة :{' '}
                      {item.year_of_production}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </>
        )

      case 'TopMatches':
        return (
          <>
            {TopMatches.map((item, index) => (
              <SwiperSlide
                key={index}
                onClick={() => {
                  HandleClick('Matches', item.id)
                }}
              >
                <Card
                  sx={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out',
                    position: 'relative',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      display: 'flex',
                      zIndex: '2',
                      gap: '10%',
                      width: '100%',

                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      height: '100%',
                      flexDirection: 'row',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={item.team_1_logo}
                        alt={item.team_1_logo}
                        style={{ width: '80px' }}
                      />
                      <Typography variant="body1">{item.team_1}</Typography>
                    </Box>
                    <Typography variant="body2">VS</Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={item.team_1_logo}
                        alt={item.team_1_logo}
                        style={{ width: '80px' }}
                      />
                      <Typography variant="body1">{item.team_2}</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      height: '300px',
                      position: 'absolute',
                      zIndex: '1',
                      width: '100%',
                      backgroundColor: theme.palette.custom.boxOverlay,
                    }}
                  ></Box>
                  <CardMedia
                    component="img"
                    image={FootballBg}
                    alt={item.name}
                    sx={{
                      height: '300px',
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent
                    sx={{
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ margin: '8px 0' }}
                    >
                      {item.classification}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      الجودة: {item.quality} | التقييم: {item.rate}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </>
        )

      default:
        if (Needs.genre) {
          const genreName = Needs.genre // الحصول على اسم النوع من Needs
          console.log('GenreName:', genreName) // تتبع اسم النوع

          // التحقق من أن GenreData يحتوي على النوع المطلوب
          if (GenreData[genreName]) {
            console.log('Data for Genre:', genreName, GenreData[genreName]) // تتبع البيانات لهذا النوع

            return (
              <>
                {GenreData[genreName].map((item, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => {
                      HandleClick(Type, item.id)
                    }}
                  >
                    <Card
                      sx={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          item.image || 'https://via.placeholder.com/300x400'
                        }
                        alt={item.name || 'No Name'}
                        sx={{
                          height: '300px',
                          objectFit: 'cover',
                        }}
                      />
                      <CardContent
                        sx={{
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {item.series_name || item.name || 'اسم غير متوفر'}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ margin: '8px 0' }}
                        >
                          {genreName || 'تصنيف غير متوفر'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          الجودة: {item.quality || 'غير متوفر'} | سنة الإنتاج:{' '}
                          {item.year_of_production || 'غير معروفة'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </>
            )
          } else {
            console.error(`No data found for genre: ${genreName}`)
            return <div>لا توجد بيانات متوفرة لهذا التصنيف</div>
          }
        }
        return <div>لا توجد حالة مطابقة</div>
    }
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        style={{
          padding: '20px 0',
        }}
      >
        {MySwiper()}
      </Swiper>
    </Box>
  )
}
