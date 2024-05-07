import { Button, Card, Input } from 'antd'
import React from 'react'

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[url('hotelview2.svg')] bg-cover bg-repeat">
      <Card className="h-2/3 w-1/3 border-2 border-primary-blue-600 opacity-80">
        <div className="flex h-full flex-col justify-center">
          <div>
            <div className="mb-2 text-xl text-primary-blue-600">Meridian Bliss</div>
            <div className="mb-3 text-4xl font-bold text-primary-blue-600 ">Login</div>
          </div>
          <div className="mb-4">
            <div className="mb-2 text-2xl font-bold text-primary-blue-600">Email</div>
            <Input />
          </div>
          <div className="mb-4">
            <div className="mb-2 text-2xl font-bold text-primary-blue-600">Password</div>
            <Input type="password" />
          </div>
          <div className="flex justify-center">
            <Button
              type="primary"
              className="mb-3 h-full min-w-44 text-2xl sm:w-full lg:w-1/3"
              style={{ backgroundColor: '#0E4459' }}
            >
              Login
            </Button>
          </div>
        </div>
        <div className="mb-3 mt-2 text-center text-lg font-normal leading-snug text-cyan-900">OR</div>
        <Button className="h-full w-full">Google</Button>
      </Card>
    </div>
  )
}

export default LoginPage
