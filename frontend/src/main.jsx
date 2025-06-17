import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.jsx'
import Nav from './NavBar.jsx'
import HeatMap from './HeatMap.jsx'
import Calculator from './Calculator.jsx'
import ScrollBar from './ScrollBar.jsx'
import Formula from './Formula.jsx'
import Information from './Info.jsx'
import Footer from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
    <App />
    <Calculator />
    <ScrollBar />
    <Formula />
    <Information />
    <Footer />
  </StrictMode>
)
