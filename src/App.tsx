import { ConfigProvider } from 'antd'
import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/Layout/AdminLayout'
import HomeLayout from './components/Layout/HomeLayout'
import {
  ADDCARD_PATH,
  ADD_ROOM_MAINTENANCE_PATH,
  ADD_ROOM_PATH,
  ADD_ROOM_TYPE_PATH,
  ADD_SERVICETYPE_PATH,
  ADD_SERVICE_PATH,
  ADMIN_PATH,
  BASE_PATH,
  BOOKING_DETAILS_PATH,
  BOOKING_LIST_PATH,
  CART_PATH,
  FACILITY_PATH,
  HISTORY_PATH,
  LOGIN_PATH,
  MAINTENANCE_PATH,
  MY_PAYMENT_PATH,
  PAYMENT_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  ROOM_MANAGE_PATH,
  ROOM_PATH,
  SERVICE_MANAGE_PATH,
  SERVICE_PATH,
  USER_DETAILS_PATH,
  USER_MANAGE_PATH
} from './configs/route'
import { AuthContext, initialAuthContextValue } from './contexts/AuthContext'
import { IAuthContext } from './interfaces/AuthContext'
import { AxiosInstance } from './lib/axios'

const AddPaymentPage = lazy(() => import('@/pages/MyPayment/AddPaymentPage'))
const MyPaymentPage = lazy(() => import('@/pages/MyPayment/MyPaymentPage'))
const Booking_details = lazy(() => import('./pages/Admin/Booking_list/Booking_details'))
const Booking_list = lazy(() => import('./pages/Admin/Booking_list/Booking_list'))
const ServiceManagement = lazy(() => import('@/pages/Admin/ServiceManagement/ServiceManagement'))
const RoomManagement = lazy(() => import('./pages/Admin/RoomManagement/RoomManagement'))
const User_details = lazy(() => import('./pages/Admin/User_management/User_details'))
const User_management = lazy(() => import('./pages/Admin/User_management/User_management'))
const PaymentPage = lazy(() => import('./pages/Payment/PaymentPage'))
const CardPage = lazy(() => import('./pages/Cart/CartPage'))
const Facility = lazy(() => import('./pages/Facitily/Facility'))
const HistoryPage = lazy(() => import('./pages/History/HistoryPage'))
const HomePage = lazy(() => import('./pages/Home/HomePage'))
const LoginPage = lazy(() => import('./pages/Login/LoginPage'))
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage'))
const RegisterPage = lazy(() => import('./pages/Register/RegisterPage'))
const RoomPage = lazy(() => import('./pages/Room/RoomPage'))
const ServicePage = lazy(() => import('./pages/Service/ServicePage'))
const CreateRoomType = lazy(() => import('./pages/Admin/RoomManagement/CreateRoomType'))
const Add_roomPage = lazy(() => import('./pages/Admin/RoomManagement/Add_room'))
const Add_ServiceType = lazy(() => import('./pages/Admin/ServiceManagement/Add_ServiceType'))
const Add_Service = lazy(() => import('./pages/Admin/ServiceManagement/Add_Service'))
const MaintenancePage = lazy(() => import('./pages/Admin/Maintenance/MaintenancePage'))
const Addroommaintain = lazy(() => import('./pages/Admin/Maintenance/AddRoommaintain'))
const Addservicemaintain = lazy(() => import('./pages/Admin/Maintenance/Addservicemaintain'))

function App(): React.ReactElement {
  const [authContext, setAuthContext] = useState<IAuthContext>(initialAuthContextValue)
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
    return <div></div>
  }

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1A6886'
          },
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
            Input: {
              colorBorder: '#0E4459'
            },
            Select: {
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
              <Route path={MY_PAYMENT_PATH} element={<MyPaymentPage />} />
              <Route path={ADDCARD_PATH} element={<AddPaymentPage />} />
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
              <Route path={ROOM_MANAGE_PATH} element={<RoomManagement />} />
              <Route path={SERVICE_MANAGE_PATH} element={<ServiceManagement />} />
              <Route path={USER_MANAGE_PATH} element={<User_management />} />
              <Route path={USER_DETAILS_PATH} element={<User_details />} />
              <Route path={BOOKING_LIST_PATH} element={<Booking_list />} />
              <Route path={BOOKING_DETAILS_PATH} element={<Booking_details />} />
              <Route path={ADD_ROOM_TYPE_PATH} element={<CreateRoomType />} />
              <Route path={ADD_ROOM_PATH} element={<Add_roomPage />} />
              <Route path={ADD_SERVICETYPE_PATH} element={<Add_ServiceType />} />
              <Route path={ADD_SERVICE_PATH} element={<Add_Service />} />
              <Route path={MAINTENANCE_PATH} element={<MaintenancePage />} />
              <Route path={ADD_ROOM_MAINTENANCE_PATH} element={<Addroommaintain />} />
              <Route path={ADD_SERVICETYPE_PATH} element={<Addservicemaintain />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </AuthContext.Provider>
  )
}

export default App
