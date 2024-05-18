import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { BASE_PATH, FACILITY_PATH, LOGIN_PATH, PROFILE_PATH, REGISTER_PATH, ROOM_PATH } from '../../configs/route'
import { AuthContext } from '../../contexts/AuthContext'
import { handleLogout } from '../../lib/googleSignUp'

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
      <Link to={BASE_PATH} className="w-full">
        <p className="text-center">Booking History</p>
      </Link>
    ),
    key: '1'
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
    key: '3'
  }
]

const Navbar: FC = () => {
  const authContext = useContext(AuthContext)
  const isAuthenticated = authContext?.authContext.isAuthenticated

  return (
    <>
      <div className="h-16 content-center bg-primary-blue-600">
        <div className="grid grid-cols-3 justify-items-center gap-x-2 px-5">
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
            <Link to="" className="mx-3 hover:text-primary-orange">
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
      </div>
    </>
  )
}

export default Navbar
