import { ConfigProvider } from 'antd'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/Layout/AdminLayout'
import HomeLayout from './components/Layout/HomeLayout'
import {
  ADMIN_PATH,
  BASE_PATH,
  BOOKING_DETAILS,
  BOOKING_LIST,
  CART_PATH,
  FACILITY_PATH,
  HISTORY_PATH,
  LOGIN_PATH,
  PAYMENT_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  ROOM_MANAGE,
  ROOM_PATH,
  SERVICE_MANAGE,
  SERVICE_PATH,
  USER_DETAILS,
  USER_MANAGE
} from './configs/route'
import { AuthContext, initialContextValue } from './contexts/AuthContext'
import { IAuthContext } from './interfaces/AuthContext'
import { AxiosInstance } from './lib/axios'
import PaymentPage from './pages/Payment/PaymentPage'

const CardPage = lazy(() => import('./pages/Cart/CartPage'))
const Facility = lazy(() => import('./pages/Facitily/Facility'))
const HistoryPage = lazy(() => import('./pages/History/HistoryPage'))
const HomePage = lazy(() => import('./pages/Home/HomePage'))
const LoginPage = lazy(() => import('./pages/Login/LoginPage'))
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage'))
const RegisterPage = lazy(() => import('./pages/Register/RegisterPage'))
const RoomPage = lazy(() => import('./pages/Room/RoomPage'))
const ServicePage = lazy(() => import('./pages/Service/ServicePage'))

import Booking_details from './pages/Admin/Booking_list/Booking_details'
import Booking_list from './pages/Admin/Booking_list/Booking_list'
import Room_manage from './pages/Admin/Room_management/Room_management'
import Service_manage from './pages/Admin/Service_management/Service_management'
import User_details from './pages/Admin/User_management/User_details'
import User_management from './pages/Admin/User_management/User_management'

function App() {
  const [authContext, setAuthContext] = useState<IAuthContext>(initialContextValue)
  const [loading, setLoading] = useState(true)

  const handleLogin = useCallback(async (): Promise<void> => {
    try {
      const result = await AxiosInstance.get('/api/user/me')
      if (result.status === 200) {
        setAuthContext({ ...result.data.data, isAuthenticated: true })
      }
    } catch (err) {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    handleLogin().then(() => {
      setLoading(false)
    })
  }, [handleLogin])

  if (loading) {
    return <div> console.log(authContext)</div>
  }

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
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
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path={BASE_PATH}
              element={
                <Suspense>
                  <HomeLayout>
                    <Outlet />
                  </HomeLayout>
                </Suspense>
              }
            >
              <Route index element={<HomePage />} />
              <Route path={LOGIN_PATH} element={<LoginPage />} />
              <Route path={REGISTER_PATH} element={<RegisterPage />} />
              <Route path={ROOM_PATH} element={<RoomPage />} />
              <Route path={CART_PATH} element={<CardPage />} />
              <Route path={PROFILE_PATH} element={<ProfilePage />} />
              <Route path={FACILITY_PATH} element={<Facility />} />
              <Route path={HISTORY_PATH} element={<HistoryPage />} />
              <Route path={PAYMENT_PATH} element={<PaymentPage />} />
              <Route path={SERVICE_PATH} element={<ServicePage />} />
            </Route>
            <Route
              path={ADMIN_PATH}
              element={
                <Suspense>
                  <AdminLayout>
                    <Outlet />
                  </AdminLayout>
                </Suspense>
              }
            >
              <Route index element={<HomePage />} />
              <Route path={ROOM_MANAGE} element={<Room_manage />} />
              <Route path={SERVICE_MANAGE} element={<Service_manage />} />
              <Route path={USER_MANAGE} element={<User_management />} />
              <Route path={USER_DETAILS} element={<User_details />} />
              <Route path={BOOKING_LIST} element={<Booking_list />} />
              <Route path={BOOKING_DETAILS} element={<Booking_details />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </AuthContext.Provider>
  )
}

export default App
