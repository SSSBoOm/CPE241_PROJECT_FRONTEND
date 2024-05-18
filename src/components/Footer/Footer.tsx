import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { FC, Fragment } from 'react'

const Footer: FC = () => {
  return (
    <Fragment>
      <footer className="content-center bg-primary-blue-600 py-8 text-white">
        <div className="flex w-full flex-col justify-center space-y-2">
          <div className="space-y-2">
            <h1 className="text-center text-3xl">Meridian Bliss</h1>
            <h1 className="text-center text-3xl">WAVE & SAND</h1>
            <p className="text-center">1573 PETCHKASEM ROAD,HUA HIN, 76120</p>
          </div>
          <div className="flex w-full flex-row flex-wrap justify-center space-x-2 px-2">
            <div className="flex gap-x-2">
              <PhoneOutlined />
              <p>032-728 0480</p>
            </div>
            <div className="flex gap-x-2">
              <PhoneOutlined />
              <p>032-708 088</p>
            </div>
            <div className="flex gap-x-2">
              <MailOutlined />
              <p>Email@.com</p>
            </div>
          </div>
          <div className="flex w-full justify-center py-4">
            <img src="/images/footer/image.png" className="aspect-square  max-w-[16rem]" />
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

export default Footer
