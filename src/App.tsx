import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { BASE_PATH, LOGIN_PATH } from './configs/route'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={BASE_PATH} element={<HomePage />} />
        <Route path={LOGIN_PATH} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
