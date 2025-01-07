import { createContext, useState } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  const [mode, setMode] = useState('dark')
  const [showRegister, setShowRegister] = useState(false)
  const [TopMovies, setTopMovies] = useState([])
  const [TopSeries, setTopSeries] = useState([])
  const [TopMatches, setTopMatches] = useState([])
  const [FilterTaps, setFilterTaps] = useState(false)
  const [PageNum, setPageNum] = useState(10)
  const [Genere, setGenere] = useState(false)
  const [GenreData, setGenreData] = useState([])
  const [newMovies, setNewMovies] = useState()
  return (
    <GlobalContext.Provider
      value={{
        mode,
        setMode,
        showRegister,
        setShowRegister,
        TopMovies,
        setTopMovies,
        TopSeries,
        setTopSeries,
        TopMatches,
        setTopMatches,
        FilterTaps,
        setFilterTaps,
        PageNum,
        setPageNum,
        Genere,
        setGenere,
        GenreData,
        setGenreData,
        newMovies,
        setNewMovies,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export { GlobalContext, GlobalProvider }
