import { GoogleOutlined } from '@ant-design/icons'
import { Button, Card, Input } from 'antd'
import React from 'react'
import { handleSignInWithGoogle } from '../../lib/googleSignUp'

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[url('/images/login/view.png')] bg-cover bg-repeat">
      <div className="container mx-auto px-4">
        <Card className="border-2 border-primary-blue-600">
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
          <div className="flex justify-center">
            <button
              className="flex h-full min-w-[16rem] flex-row items-center justify-center space-x-4 rounded-md border-2 border-red-700 py-2 text-red-700"
              onClick={handleSignInWithGoogle}
            >
              <GoogleOutlined className="text-3xl" />
              <h1 className="text-xl">Sign in with Google</h1>
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
