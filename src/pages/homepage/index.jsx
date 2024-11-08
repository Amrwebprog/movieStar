import React from 'react'
import HeroSection from '../../components/HeroSection'
import Navbar1 from '../../components/Navbar1'
import ResponseSection from '../../components/ResponseSection'
import './index.scss'

export default function Homepage() {
  return (
    <div>
      <Navbar1 window={window} />
      <HeroSection />
      <ResponseSection />
    </div>
  )
}
