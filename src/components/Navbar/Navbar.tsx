import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { BASE_PATH, FACILITY_PATH, LOGIN_PATH, REGISTER_PATH, ROOM_PATH } from '../../configs/route'

const items: MenuProps['items'] = [
  {
    label: <a href="">Edit Profile</a>,
    key: '0'
  },
  {
    label: <a href="">Booking History</a>,
    key: '1'
  },
  {
    type: 'divider'
  },
  {
    label: <a href="">Logout</a>,
    key: '3'
  }
]

const Navbar = () => {
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
            <Link to={LOGIN_PATH} className="mx-3 text-center text-lg text-primary-b2 hover:text-primary-orange">
              login
            </Link>
            <Button ghost className="mx-3">
              <Link to={REGISTER_PATH}>Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
