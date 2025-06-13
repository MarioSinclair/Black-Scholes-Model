import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.jsx'
import Nav from './NavBar.jsx'
import ScrollBar from './ScrollBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
    <App />
    <ScrollBar />
  </StrictMode>
)
