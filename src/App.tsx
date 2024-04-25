import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BASE_PATH, LOGIN_PATH } from './configs/route'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={BASE_PATH} element={<HomePage />} />
        <Route path={LOGIN_PATH} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
