import {
  BASE_PATH,
  CART_PATH,
  FACILITY_PATH,
  LOGIN_PATH,
  MYPAYMENT_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  ROOM_PATH,
  SERVICE_PATH
} from '@/configs/route'
import { AuthContext } from '@/contexts/AuthContext'
import { handleLogout } from '@/lib/googleSignUp'
import { MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

const items: MenuProps['items'] = [
  {
    label: (
      <Link to={PROFILE_PATH} className="w-full">
        <p className="text-center">Profile</p>
      </Link>
    ),
    key: 'profile'
  },
  {
    label: (
      <Link to={MYPAYMENT_PATH} className="w-full">
        <p className="text-center">My Payment</p>
      </Link>
    ),
    key: 'my-payment'
  },
  {
    label: (
      <Link to={BASE_PATH} className="w-full">
        <p className="text-center">Booking History</p>
      </Link>
    ),
    key: 'booking-history'
  },
  {
    type: 'divider'
  },
  {
    label: (
      <button className="w-full" onClick={handleLogout}>
        Logout
      </button>
    ),
    key: 'logout'
  }
]

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext)
  const isAuthenticated = auth?.authContext.isAuthenticated || false
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <div className="h-16 content-center bg-primary-blue-600">
        <div className="hidden grid-cols-3 justify-items-center gap-x-2 px-8 lg:grid">
          <div></div>
          <div className="grid grid-cols-4 content-center text-center text-lg text-primary-b2">
            <Link to={BASE_PATH} className=" mx-3 hover:text-primary-orange">
              Home
            </Link>
            <Link to={ROOM_PATH} className="mx-3 hover:text-primary-orange">
              Room
            </Link>
            <Link to={FACILITY_PATH} className="mx-3 hover:text-primary-orange">
              Facility
            </Link>
            <Link to={SERVICE_PATH} className="mx-3 hover:text-primary-orange">
              Services
            </Link>
          </div>
          <div className="content-center justify-self-end">
            {isAuthenticated ? (
              <>
                <Link to="" className="mx-3">
                  <ShoppingCartOutlined
                    className="text-primary-b2  hover:text-primary-orange"
                    style={{ fontSize: '32px' }}
                  />
                </Link>
                <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                    <UserOutlined
                      className="mx-3 text-primary-b2  hover:text-primary-orange"
                      style={{ fontSize: '32px' }}
                    />
                  </a>
                </Dropdown>
              </>
            ) : (
              <>
                <Link to={LOGIN_PATH} className="mx-3 text-center text-lg text-primary-b2 hover:text-primary-orange">
                  login
                </Link>
                <Button ghost className="mx-3">
                  <Link to={REGISTER_PATH}>Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <div className="flex w-full justify-between px-4">
            <div>LOGO</div>
            <div className="">
              <button
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
              >
                <MenuOutlined className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full ${isOpen ? null : 'hidden'}`}>
        <div>
          <Link
            to={BASE_PATH}
            className="block bg-primary-blue-500 py-2 text-center text-lg text-primary-b2 hover:text-primary-orange"
          >
            Home
          </Link>
          <Link
            to={ROOM_PATH}
            className="block bg-primary-blue-500 py-2 text-center text-lg text-primary-b2 hover:text-primary-orange"
          >
            Room
          </Link>
          <Link
            to={FACILITY_PATH}
            className="block bg-primary-blue-500 py-2 text-center text-lg text-primary-b2 hover:text-primary-orange"
          >
            Facility
          </Link>
          <Link
            to={SERVICE_PATH}
            className="block bg-primary-blue-500 py-2 text-center text-lg text-primary-b2 hover:text-primary-orange"
          >
            Services
          </Link>
          {isAuthenticated ? (
            <>
              <hr />
              <Link
                to={CART_PATH}
                className="block bg-primary-blue-500 py-2 text-center text-lg text-primary-b2 hover:text-primary-orange"
              >
                Cart
              </Link>
              <Link
                to={PROFILE_PATH}
                className="block bg-primary-blue-500 py-2 text-center text-lg text-primary-b2 hover:text-primary-orange"
              >
                Profile
              </Link>
              <button
                className="block w-full bg-primary-blue-500 py-2 text-center text-lg text-primary-b2 hover:text-primary-orange"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={LOGIN_PATH}
                className="block bg-primary-blue-500 py-2 text-center text-lg text-primary-b2 hover:text-primary-orange"
              >
                Login
              </Link>
              <Link
                to={REGISTER_PATH}
                className="block bg-primary-blue-500 py-2 text-center text-lg text-primary-b2 hover:text-primary-orange"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
