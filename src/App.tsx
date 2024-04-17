import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BASE_PATH } from './configs/route'
import Home from './pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={BASE_PATH} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
