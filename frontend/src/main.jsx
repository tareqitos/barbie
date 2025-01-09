import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app'
import Header from './components/header'
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Header />
  </StrictMode>,
)
