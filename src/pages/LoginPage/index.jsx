import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import React, { useContext } from 'react'
import Footer from '../../components/footer'
import { GlobalContext } from '../../components/GlobalContext'
import LoginForm from '../../components/LoginForm'
import Navbar1 from '../../components/Navbar1'
import RegisterForm from '../../components/Register'
import './index.scss'

export default function LoginPage() {
  const { showRegister, setShowRegister } = useContext(GlobalContext)
  const theme = useTheme()
  return (
    <>
      <Box
        sx={{
          background: theme.palette.custom.contentBG,
          position: 'absolute',
          width: '100%',
          height: '100vh',
        }}
      ></Box>
      <Navbar1 />
      <div className="col-12 body2 d-flex align-items-center">
        {showRegister ? <RegisterForm /> : <LoginForm />}
      </div>
      <Footer />
    </>
  )
}
