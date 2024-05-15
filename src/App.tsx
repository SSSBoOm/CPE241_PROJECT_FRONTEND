import { ConfigProvider } from 'antd'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/Layout/AdminLayout'
import HomeLayout from './components/Layout/HomeLayout'
import {
  ADMIN_PATH,
  BASE_PATH,
  CART_PATH,
  CUSTOMERSERVICE_PATH,
  FACILITY_PATH,
  HISTORY_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  ROOM_PATH
} from './configs/route'
import CardPage from './pages/Cart/CartPage'
import Facility from './pages/Facitily/Facility'
import HistoryPage from './pages/History/HistoryPage'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import ProfilePage from './pages/Profile/ProfilePage'
import RegisterPage from './pages/Register/RegisterPage'
import RoomPage from './pages/Room/RoomPage'
import Service from './pages/Service/Service'

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            contentFontSize: 18,
            defaultColor: '#F89200',
            defaultHoverBorderColor: '#F89200',
            defaultGhostBorderColor: '#F89200',
            defaultHoverColor: '#F89200'
          },
          InputNumber: {
            colorBorder: '#0E4459'
          },
          DatePicker: {
            colorBorder: '#0E4459'
          }
        }
      }}>
      <BrowserRouter>
        <Routes>
          <Route
            path={BASE_PATH}
            element={
              <HomeLayout>
                <Outlet />
              </HomeLayout>
            }>
            <Route index element={<HomePage />} />
            <Route path={LOGIN_PATH} element={<LoginPage />} />
            <Route path={REGISTER_PATH} element={<RegisterPage />} />
            <Route path={ROOM_PATH} element={<RoomPage />} />
            <Route path={CART_PATH} element={<CardPage />} />
            <Route path={PROFILE_PATH} element={<ProfilePage />} />
            <Route path={FACILITY_PATH} element={<Facility />} />
            <Route path={CUSTOMERSERVICE_PATH} element={<Service />} />
            <Route path={HISTORY_PATH} element={<HistoryPage />} />
          </Route>
          <Route
            path={ADMIN_PATH}
            element={
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            }>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
