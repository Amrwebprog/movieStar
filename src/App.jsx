import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { GlobalContext } from './components/GlobalContext'
import AboutUsPage from './pages/AboutPage'
import CategoryPage from './pages/CategoryPage'
import ContactUsPage from './pages/contactuspage'
import Error from './pages/ErorePage'
import Homepage from './pages/homepage'
import LoginPage from './pages/LoginPage'
import LoginSuccesPath from './pages/loginSuccessPage'
import MatchesPage from './pages/MatchesPage'
import MoviesPage from './pages/MoviesPage'
import NewPassword from './pages/NewPasswordPage'
import NewPlan from './pages/NewPlan'
import PlanPage from './pages/PlanePage'
import ProductPage from './pages/ProductPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SeriesPage from './pages/SeriesPage'

function App() {
  const { mode, setMode } = useContext(GlobalContext)
  const CoolTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#8f4034' : '#E78F81',
        navBar: mode === 'light' ? '#c2c0c0' : null,
      },
      secondary: {
        main: '#FFCFB3',
      },
      background: {
        default: mode === 'dark' ? '#181d25' : '#d7d7db',
        paper: mode === 'dark' ? '#1f242d' : '#eaeaea',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000',
      },
      custom: {
        rightgradiant:
          mode === 'dark'
            ? 'linear-gradient(to right, rgba(24, 29, 37, 0.1%) 10%, rgba(24, 29, 37, 1) 100%)'
            : 'none',
        contentBG:
          mode === 'dark'
            ? 'rgba(24, 29, 37, 0.6)'
            : 'rgba(247, 249, 252, 0.2)',
        boxOverlay:
          mode === 'dark'
            ? 'rgba(24, 29, 37, 0.7)'
            : 'rgba(247, 249, 252, 0.3)',
        boxOverlay1:
          mode === 'dark'
            ? 'rgba(24, 29, 37, 0.7)'
            : 'rgba(247, 249, 252, 0.7)',
        FoucsOverlay:
          mode === 'dark' ? 'rgba(24, 29, 37, 1)' : 'rgba(247, 249, 252, 1)',
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '100',

      h1: {
        fontSize: '3rem',
        fontWeight: 900,
        '@media (max-width:1200px)': { fontSize: '2.5rem' },
        '@media (max-width:768px)': { fontSize: '2rem' },
        '@media (max-width:576px)': { fontSize: '1.75rem' },
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 800,
        '@media (max-width:1200px)': { fontSize: '2.25rem' },
        '@media (max-width:768px)': { fontSize: '1.75rem' },
        '@media (max-width:576px)': { fontSize: '1.5rem' },
      },
      h3: {
        fontSize: '2rem',
        fontWeight: 600,
        '@media (max-width:1200px)': { fontSize: '1.75rem' },
        '@media (max-width:768px)': { fontSize: '1.5rem' },
        '@media (max-width:576px)': { fontSize: '1.25rem' },
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 700,
        '@media (max-width:768px)': { fontSize: '0.9rem' },
        '@media (max-width:576px)': { fontSize: '0.85rem' },
      },
      body2: {
        fontSize: '0.9rem',
        fontWeight: 700,
        '@media (max-width:768px)': { fontSize: '0.85rem' },
        '@media (max-width:576px)': { fontSize: '0.8rem' },
      },
      caption: {
        fontSize: '0.8rem',
        fontWeight: 300,
        '@media (max-width:768px)': { fontSize: '0.75rem' },
        '@media (max-width:576px)': { fontSize: '0.7rem' },
      },
    },
  })

  return (
    <>
      <ThemeProvider theme={CoolTheme}>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/:ProductType/:ProductId" element={<ProductPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/LoginSucces" element={<LoginSuccesPath />} />
            <Route path="/contactus" element={<ContactUsPage />} />
            <Route path="/Login&Register" element={<LoginPage />} />
            <Route path="/PlanPage" element={<PlanPage />} />
            <Route path="/ResetPassword" element={<ResetPasswordPage />} />
            <Route path="/Category" element={<CategoryPage />} />
            <Route path="/Movies" element={<MoviesPage />} />
            <Route path="/Seriess" element={<SeriesPage />} />
            <Route path="/Matches" element={<MatchesPage />} />
            <Route path="/errorPage" element={<Error />} />0
            <Route
              path="/NewPassword/http://movie-star.test/api/Auth/:url"
              element={<NewPassword />}
            />
            <Route
              path="/pay/success/http://movie-star.test/api/SubscriptionDetails/:ID"
              element={<NewPlan />}
            />
            <Route path="*" element={<h1>error 404</h1>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
