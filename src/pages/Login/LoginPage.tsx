import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { GoogleOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import React from 'react'
import { handleSignInWithGoogle } from '../../lib/googleSignUp'

const LoginPage: React.FC = () => {
  return (
    <React.Fragment>
      <div className="flex h-screen items-center justify-center bg-[url('/images/login/view.png')]  bg-cover bg-repeat">
        <div className=" h-screen w-screen border-primary-blue-600 bg-white px-10 py-4 md:h-fit md:w-5/12 md:rounded-md md:border-2">
          <div className="text-center md:mx-4 md:text-start">
            <p className="text-xs font-medium text-primary-blue-700 lg:text-lg">Meridian Bliss</p>
            <p className="text-3xl font-bold text-primary-blue-700 lg:text-5xl">Login</p>
          </div>
          <Form layout="vertical" requiredMark={customizeRequiredMark}>
            <div className=" mx-auto my-8 w-10/12 max-w-[23rem]">
              <Form.Item
                name="username"
                label="User Name"
                className="font-semibold"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input size="large" placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                className="font-semibold"
                rules={[{ required: true, message: 'Please input your Password' }]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>
            </div>
            <Form.Item className="mx-auto  w-3/12 min-w-[10rem] rounded-md border-2 border-primary-blue-700 text-center text-primary-blue-700 hover:border-primary-orange hover:text-primary-orange">
              <button className="h-full w-full">Login</button>
            </Form.Item>
          </Form>
          <p className="text-center text-xl font-medium">OR</p>
          <button
            className="mx-auto my-8 flex min-w-[16rem] flex-row items-center justify-center space-x-4 rounded-md border-2 border-red-700 py-2 text-red-700 lg:h-full"
            onClick={handleSignInWithGoogle}
          >
            <GoogleOutlined className="text-3xl" />
            <h1 className="text-xl">Sign in with Google</h1>
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LoginPage
