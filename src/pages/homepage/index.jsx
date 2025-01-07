import React, { useContext } from 'react'
import CatlogSwiper from '../../components/CatlogSwiper'
import FAQ from '../../components/FAQ'
import Footer from '../../components/footer'
import { GlobalContext } from '../../components/GlobalContext'
import HeroSection from '../../components/HeroSection'

import Navbar1 from '../../components/Navbar1'
import ResponseSection from '../../components/ResponseSection'
import './index.scss'

export default function Homepage() {
  const { showRegister, setShowRegister } = useContext(GlobalContext)
  return (
    <div>
      <Navbar1 window={window} />
      <HeroSection />
      <ResponseSection />
      <CatlogSwiper></CatlogSwiper>
      <FAQ />
      <Footer></Footer>
    </div>
  )
}
