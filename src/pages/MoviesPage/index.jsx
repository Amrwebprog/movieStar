import { Box, Pagination } from '@mui/material'
import axios from 'axios'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import React, { useContext, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import AutoSwiper from '../../components/AutoSwiper'
import useLoader from '../../components/CustomHook'
import { GlobalContext } from '../../components/GlobalContext'
import HeroSection2 from '../../components/HeroSection2'
import MovieCard from '../../components/MovieCard'
import Navbar3 from '../../components/NavBar3'

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger)

export default function MoviesPage() {
  const { loading, Loader, setLoading } = useLoader()
  const [cookies] = useCookies(['authToken', 'username'])
  const { Genere, setGenere, PageNum, setPageNum, GenreData } =
    useContext(GlobalContext)
  const Navigate = useNavigate()

  // Refs for animations
  const pageContainerRef = useRef(null)
  const movieCardRef = useRef(null)

  const GetMovieGenere = () => {
    axios
      .get('http://Movie-Star.test/api/Genres', {
        headers: { Authorization: `Bearer ${cookies.authToken}` },
      })
      .then((res) => {
        console.log(res.data.data.splice(0, 5))
        setGenere(res.data.data.splice(0, 5))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Function to initialize animations
  const initializeAnimations = () => {
    // Clear previous ScrollTrigger instances
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    // Animate page container sections on scroll
    if (pageContainerRef.current) {
      gsap.fromTo(
        pageContainerRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: pageContainerRef.current,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      )
    }

    // Animate movie cards on scroll
    if (movieCardRef.current) {
      gsap.fromTo(
        movieCardRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: movieCardRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      )
    }
  }

  // Fetch data and initialize animations
  useEffect(() => {
    GetMovieGenere()
    initializeAnimations()

    // Cleanup ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [PageNum, loading, GenreData])

  const HandleChange = (event, value) => {
    Navigate(`?page=${value}`)
  }

  return (
    <>
      <Navbar3 />
      <Box ref={pageContainerRef}>
        <HeroSection2 Needs="Films" />
        {Genere
          ? Genere.map((el, index) => (
              <AutoSwiper
                key={index}
                Get="Movies"
                Needs={{ genre: el.genre }}
              />
            ))
          : null}
      </Box>
      <Box
        ref={movieCardRef}
        sx={{
          width: '100%',
          padding: '10px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <MovieCard Needs={'Films'} />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginY: '50px',
        }}
      >
        <Pagination
          count={PageNum || 10}
          onChange={HandleChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </>
  )
}
