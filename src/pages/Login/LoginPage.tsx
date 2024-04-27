import { Button, Card, Input } from 'antd'
import React from 'react'

const LoginPage: React.FC = () => {
  return (
    <div className=" h-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <Card className="h-2/3 w-1/3 border-2 border-primary-blue-600 opacity-80">
        <div className="flex flex-col justify-center h-full">
          <div>
            <div className="text-xl text-primary-blue-600 mb-2">Meridian Bliss</div>
            <div className="font-bold text-4xl text-primary-blue-600 mb-3">Login</div>
          </div>
          <div className="mb-4">
            <div className="font-bold text-2xl mb-2 text-primary-blue-600">Email</div>
            <Input />
          </div>
          <div className="mb-4">
            <div className="font-bold text-2xl mb-2 text-primary-blue-600">Password</div>
            <Input type="password" />
          </div>
          <div className="flex justify-center">
            <Button type="primary" className="w-1/3 mb-3 text-2xl h-full " style={{ backgroundColor: '#0E4459' }}>
              Login
            </Button>
          </div>
        </div>
        <div className="text-center text-cyan-900 text-lg font-normal leading-snug mt-2 mb-3">OR</div>
        <Button className="w-full h-full">Google</Button>
      </Card>
    </div>
  )
}

export default LoginPage
