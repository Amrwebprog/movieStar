import { Paper } from '@mui/material'
import Aos from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import img6 from '../assets/fourthimg.jpg'
import img3 from '../assets/secondimg.jpg'
import img5 from '../assets/sevenimg.jpg'
import img4 from '../assets/siximg.jpg'
import img1 from '../assets/tenimg.jpg'
import img2 from '../assets/thirdimg.jpg'
import useLoader from './CustomHook'

const CatlogSwiper = () => {
  const { setLoading, Loader } = useLoader()
  const [movies, setMovies] = useState([
    { id: 1, title: 'Movie 1', poster: img1 },
    { id: 2, title: 'Movie 2', poster: img2 },
    { id: 3, title: 'Movie 3', poster: img3 },
    { id: 4, title: 'Movie 4', poster: img4 },
    { id: 5, title: 'Movie 5', poster: img5 },
    { id: 6, title: 'Movie 6', poster: img6 },
  ])
  const [cookies] = useCookies()
  const [error, setError] = useState(null)

  useEffect(() => {
    Aos.init({})
  }, [])

  const GetData = async () => {
    const token = cookies.authToken
    setLoading(true)
    try {
      const response = await axios.get(
        'http://Movie-Star.test/api/Films/rate',
        {
          headers: {
            authorization: `Bearer ${
              token || '2|w4VrtYd1bCbxYtwvxDAq5HfmNugckOR7A1f3oYVw6e7483d0'
            }`,
          },
          params: { limit: 10 },
        }
      )
      const films = Object.values(response.data.data)
      const limitedFilms = films.slice(0, 10)
      setMovies(limitedFilms)
    } catch (err) {
      setError('Failed to load movies. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <>
      {Loader}
      {movies ? (
        <Paper
          sx={{
            height: { xs: '30vh', sm: '40vh', md: '50vh', lg: '75vh' },
            padding: '25px',
          }}
          data-aos="fade-right"
          data-aos-duration="2500"
        >
          {error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : (
            <Swiper
              modules={[
                Navigation,
                Pagination,
                Scrollbar,
                Autoplay,
                EffectCoverflow,
              ]}
              direction="horizontal"
              slidesPerView={4}
              spaceBetween={10}
              centeredSlides={true}
              grabCursor={true}
              loop={true}
              effect="coverflow"
              style={{ width: '100%', height: '100%' }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{
                type: 'fraction',
                clickable: true,
              }}
              navigation
              scrollbar={{ draggable: true }}
              autoplay={{
                disableOnInteraction: false,
                delay: 2500,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
            >
              {movies.map((movie, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="movie-slide"
                    style={{
                      position: 'relative',
                      textAlign: 'center',
                      height: '100%',
                    }}
                  >
                    <img
                      src={movie.image || 'https://via.placeholder.com/150'}
                      alt={movie.name || 'Movie'}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // تحسين الظل
                        transition:
                          'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      }}
                    />
                    <h3
                      style={{
                        position: 'absolute',
                        bottom: '60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 10px rgba(0,0,0,0.9)',
                      }}
                    >
                      {movie.name || 'Unknown'}
                    </h3>
                    <p
                      style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#FFD700',
                        fontSize: '16px',
                        fontWeight: '600',
                      }}
                    >
                      Rating:{' '}
                      {isNaN(movie.rating) || movie.rating === null
                        ? 'N/A'
                        : movie.rate}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Paper>
      ) : null}
    </>
  )
}

export default CatlogSwiper
