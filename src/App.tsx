import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { BASE_PATH, CART_PATH, LOGIN_PATH, REGISTER_PATH } from './configs/route'
import CardPage from './pages/Cart/CartPage'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import RoomPage from './pages/Room/RoomPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={BASE_PATH} element={<HomePage />} />
        <Route path={LOGIN_PATH} element={<LoginPage />} />
        <Route path={REGISTER_PATH} element={<RegisterPage />} />
        <Route path={ROOM_PATH} element={<RoomPage />} />
        <Route path={CART_PATH} element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
