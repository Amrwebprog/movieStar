import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
export default function Error() {
  const navigate = useNavigate()
  return (
    <div className="error">
      <h1>Error 404</h1>
      <Button
        variant="contained"
        className="mt-3"
        onClick={() => {
          navigate('/')
        }}
      >
        Go Back To home{' '}
      </Button>
    </div>
  )
}
