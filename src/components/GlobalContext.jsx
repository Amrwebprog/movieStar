import { createContext, useState } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  const [mode, setMode] = useState('dark')

  return (
    <GlobalContext.Provider value={{ mode, setMode }}>
      {children}
    </GlobalContext.Provider>
  )
}
export { GlobalContext, GlobalProvider }
