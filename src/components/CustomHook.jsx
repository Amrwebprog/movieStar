import { Box, LinearProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'

const useLoader = () => {
  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  const Loader = loading ? (
    <Box
      sx={{
        position: 'fixed',
        bgcolor: theme.palette.custom.boxOverlay,
        width: '100%',
        height: '100vh',
        zIndex: '100000',
      }}
    >
      <LinearProgress
        style={{ top: '50%', width: '100vh', margin: 'auto' }}
      ></LinearProgress>
    </Box>
  ) : null

  return { loading, setLoading, Loader }
}

export default useLoader
