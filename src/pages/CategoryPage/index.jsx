import { Box, Divider, Pagination } from '@mui/material'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AutoSwiper from '../../components/AutoSwiper.jsx'
import Footer from '../../components/footer.jsx'
import { GlobalContext } from '../../components/GlobalContext.jsx'
import HeroSection2 from '../../components/HeroSection2.jsx'
import MovieCard from '../../components/MovieCard.jsx'
import Navbar3 from '../../components/NavBar3.jsx'
import './index.scss'

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger)

export default function CategoryPage() {
  const { PageNum, setPageNum } = useContext(GlobalContext)
  const Navigate = useNavigate()

  // Refs for animations
  const pageContainerRef = useRef(null)
  const movieCardRef = useRef(null)

  const HandleChange = (event, value) => {
    Navigate(`?page=${value}`)
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

  // Run animations when DOM is updated
  useEffect(() => {
    initializeAnimations()

    // Cleanup ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [PageNum]) // Add dependencies like PageNum to reinitialize on updates

  return (
    <>
      <Navbar3 />
      <Box ref={pageContainerRef}>
        <HeroSection2 Needs="Films" />
        <AutoSwiper Get="NewMovies" Needs="NewMovies" />
        <AutoSwiper Get="Movies" Needs="TopMovies" />
        <AutoSwiper Get="Series" Needs="TopSeries" />
        <AutoSwiper Get="Matches" Needs="TopMatches" />
        <Divider sx={{ mt: '30px', mb: '30px' }} />
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
        <MovieCard Needs={'All'} />
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
      <Box sx={{ marginTop: '25px' }}>
        <Footer />
      </Box>
    </>
  )
}
