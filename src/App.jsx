import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { GlobalContext } from './components/GlobalContext'
import Homepage from './pages/homepage'

function App() {
  const { mode, setMode } = useContext(GlobalContext)
  const CoolTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#4682B4',
      },
      secondary: {
        main: '#32CD32',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000',
      },
      custom: {
        rightgradiant:
          mode === 'dark'
            ? 'linear-gradient(to right, rgba(0, 0, 0, 0.1%) 10%, rgba(0, 20, 20, 1) 100%)'
            : 'none',
        contentBG:
          mode === 'dark' ? ' rgba(0, 0, 0, 0.6)' : ' rgba(255, 255, 255, 0.6)',
        boxOverlay:
          mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : ' rgba(255, 255, 255, 0.3);',
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",

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
            <Route path="/">
              <Route index element={<Homepage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
