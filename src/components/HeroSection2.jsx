import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  MenuItem,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {
  EffectCoverflow,
  EffectFade,
  EffectFlip,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import IconImg from '../assets/file.png'
import useLoader from './CustomHook'

const data = [
  {
    img: 'https://via.placeholder.com/300x400', // ضع رابط الصورة هنا
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
  // أضف المزيد من العناصر هنا
]

export default function HeroSection2(props) {
  const Navigate = useNavigate()
  const [cookies, setCookies] = useCookies([`authToken`, `username`])
  const { setLoading, Loader } = useLoader()
  const [movies, setMovies] = useState(data)
  const HandleClick = (Type, ID) => {
    Navigate(`/${Type}/${ID}`)
  }
  const getTop10 = () => {
    setLoading(true)
    const tooken = cookies.authToken

    axios
      .get(`http://Movie-Star.test/api/${props.Needs}/rate`, {
        headers: {
          Authorization: `Bearer ${tooken} `,
        },
      })
      .then((res) => {
        const films = Object.values(res.data.data)
        const TopMovies = films.splice(0, 10)
        console.log(res)
        setMovies(TopMovies)
      })
      .catch((err) => {
        null
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    getTop10()
  }, [])
  return (
    <>
      {Loader}
      <Container maxWidth="xl" sx={{ mt: '50px' }}>
        <Box
          sx={{
            minHeight: '35vh',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <MenuItem
                sx={{
                  width: '100%  !important',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <img src={IconImg} alt="" style={{ height: '350px' }} />
                <Typography variant="h1" color="#E53935">
                  Movie Star
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '20px',
                    width: '100%',
                    justifyContent: 'center',
                    mt: '10px',
                  }}
                >
                  <Link>
                    <Facebook />
                  </Link>
                  <Link>
                    <Twitter />
                  </Link>
                  <Link>
                    <LinkedIn />
                  </Link>
                  <Link>
                    <Instagram />
                  </Link>
                </Box>
              </MenuItem>
            </Grid>

            {/* الجانب الأيمن */}
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <MenuItem sx={{ width: '100%  !important', height: '100%' }}>
                <Swiper
                  modules={[
                    Navigation,
                    Pagination,
                    EffectCoverflow,
                    EffectFade,
                    EffectFlip,
                  ]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={30} // المسافة بين الشرائح
                  slidesPerView={3} // عرض 3 شرائح كإعداد افتراضي
                  slidesPerGroup={1} // انتقال بشريحة واحدة
                  loop={true} // تكرار الشرائح
                  centeredSlides={true} // توسيط الشرائح
                  autoHeight={true} // ارتفاع تلقائي للشرائح
                  grabCursor={true} // جعل السحب ممكنًا مع المؤشر
                  effect="coverflow" // تأثير coverflow ثلاثي الأبعاد
                  coverflowEffect={{
                    rotate: 50, // زاوية الدوران
                    depth: 400, // العمق بين الشرائح
                    modifier: 1, // تعديل التأثير
                    slideShadows: true, // الظلال بين الشرائح
                  }}
                  breakpoints={{
                    // إعدادات الشرائح بناءً على حجم الشاشة
                    0: {
                      slidesPerView: 1, // عرض شريحة واحدة على الهواتف
                      spaceBetween: 10, // مسافة صغيرة بين الشرائح
                    },
                    600: {
                      slidesPerView: 2, // عرض شريحتين على الشاشات المتوسطة
                      spaceBetween: 20, // مسافة متوسطة بين الشرائح
                    },
                    960: {
                      slidesPerView: 3, // عرض 3 شرائح على الشاشات الأكبر
                      spaceBetween: 30, // مسافة أكبر بين الشرائح
                    },
                  }}
                  style={{ width: '100%' }}
                >
                  {movies.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => {
                        HandleClick(props.Needs, item.id)
                      }}
                    >
                      <Card
                        sx={{
                          maxWidth: '100%', // عرض الكارت ليكون متجاوبًا
                          mx: 'auto',
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{
                            height: { xs: '150px', md: '300px' }, // ضبط ارتفاع الصورة بناءً على الشاشة
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {item.name || item.series_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            النوع: {props.Needs}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            التصنيف: {item.genre?.genre}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            التقييم: {item.rate}/10
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            الجودة: {item.quality}
                          </Typography>
                          {item.num_of_seasons ? (
                            <Typography variant="body2" color="text.secondary">
                              عدد المواسم: {item.num_of_seasons}
                            </Typography>
                          ) : null}
                        </CardContent>
                      </Card>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </MenuItem>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
