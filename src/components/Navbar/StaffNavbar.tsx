import {
  ADMIN_PATH,
  ADMIN_PAYMENT_PATH,
  BOOKING_LIST_PATH,
  MAINTENANCE_PATH,
  PROMOTIONADMIN_PATH,
  RESERVATION_MANAGEMENT_PATH,
  RESERVATION_TASK_PATH,
  ROOM_MANAGE_PATH,
  SERVICE_MANAGE_PATH,
  USER_MANAGE_PATH
} from '@/configs/route'
import { handleLogout } from '@/lib/googleSignUp'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
const StaffNavbar: React.FC = () => {
  const auth = useContext(AuthContext)

  return (
    <>
      <div className="flex h-full w-80 flex-col justify-between gap-y-2 bg-primary-blue-600 py-16">
        <div className="w-full content-center text-center text-lg text-primary-b2">
          <p className="text-3xl font-bold">Meridian Bliss</p>
          <p className="text-base font-bold">Wave & Sand</p>
          <Link
            to={ADMIN_PATH}
            className="block h-10 content-center text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Dashboard
          </Link>
          <Link
            to={RESERVATION_TASK_PATH}
            className="block h-10 content-center text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Reservation Task
          </Link>
          <Link
            to={RESERVATION_MANAGEMENT_PATH}
            className="block h-10 content-center text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Reservation Management
          </Link>
          <Link
            to={BOOKING_LIST_PATH}
            className="block h-10 content-center text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Booking List
          </Link>
          <Link
            to={USER_MANAGE_PATH}
            className="block h-10 content-center text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            User Management
          </Link>
          <Link
            to={ROOM_MANAGE_PATH}
            className="block h-10 content-center text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Room Management
          </Link>
          <Link
            to={SERVICE_MANAGE_PATH}
            className="block h-10 content-center text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Service Management
          </Link>
          <Link
            to={MAINTENANCE_PATH}
            className="block h-10 content-center text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Maintenance Management
          </Link>
          <Link
            to={ADMIN_PAYMENT_PATH}
            className="block h-10 content-center text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Payment Management
          </Link>
          <Link
            to={PROMOTIONADMIN_PATH}
            className="block h-10 content-center text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Promotion Management
          </Link>
        </div>
        <div className="content-center text-center text-lg text-primary-b2">
          <div className="bottom-0 grid content-center gap-y-5">
            <a>{(auth?.authContext.firstName || '') + ' ' + (auth?.authContext.lastName || '')}</a>
            <Button size="large" ghost className="mx-12" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StaffNavbar
