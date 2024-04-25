import { Button, ConfigProvider } from 'antd'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'

const items: MenuProps['items'] = [
  {
    label: <a href="">Edit Profile</a>,
    key: '0',
  },
  {
    label: <a href="">Booking History</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: <a href="">Logout</a>,
    key: '3',
  },
]
const Navbar = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              contentFontSize: 18,
              defaultColor: '#F89200',

              defaultHoverBorderColor: '#F89200',
              defaultGhostBorderColor: '#F89200',
              defaultHoverColor: '#F89200',
              //: '#F89200',
            },
          },
        }}
      >
        <div className=" bg-primary-blue-600 h-16 content-center">
          <div className=" grid grid-cols-3 gap-x-2 px-5 justify-items-center">
            <div></div>
            <div className="grid grid-cols-4 content-center text-lg text-primary-b2 text-center">
              <a href="" className=" mx-3 hover:text-primary-orange">
                Home
              </a>
              <a href="" className="mx-3 hover:text-primary-orange">
                Room
              </a>
              <a href="" className="mx-3 hover:text-primary-orange">
                Facility
              </a>
              <a href="" className="mx-3 hover:text-primary-orange">
                Services
              </a>
            </div>
            <div className="justify-self-end content-center">
              <a href="" className=" mx-3">
                <ShoppingCartOutlined
                  className=" text-primary-b2  hover:text-primary-orange"
                  style={{ fontSize: '32px' }}
                />
              </a>
              <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <UserOutlined
                    className="mx-3 text-primary-b2  hover:text-primary-orange"
                    style={{ fontSize: '32px' }}
                  />
                </a>
              </Dropdown>
              <a href="" className="mx-3 text-lg text-primary-b2 text-center hover:text-primary-orange ">
                login
              </a>
              <Button ghost className="mx-3">
                Register
              </Button>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </>
  )
}

export default Navbar
