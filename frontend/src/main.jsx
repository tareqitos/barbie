import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './components/app/App';
import Member from './components/login/Login'
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/login' element={<Member />} />
        <Route path='/password-reset' element={<Member />} />
        <Route path='/signup' element={<Member />} />
      </Routes>
  </BrowserRouter>,
)
