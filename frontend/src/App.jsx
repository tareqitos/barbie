import { BrowserRouter, Route, Routes } from "react-router-dom"
import ListPage from "./pages/listPage"
import Member from "./components/login/Login"
import Header from "./components/header"
import GamePage from "./pages/gamePage"


function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route index element={<ListPage />} />
          <Route path="/games/:slug" element={<GamePage />} />
          
          <Route path='/login' element={<Member />} />
          <Route path='/password-reset' element={<Member />} />
          <Route path='/signup' element={<Member />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
