import 'animate.css'
import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GlobalProvider } from './components/GlobalContext.jsx'
import './index.scss'

createRoot(document.getElementById('root')).render(
  <>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </>
)
