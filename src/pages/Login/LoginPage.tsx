import { GoogleOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input } from 'antd'
import React from 'react'
import { handleSignInWithGoogle } from '../../lib/googleSignUp'

interface LoginFormValues {
  email: string
  password: string
}
const LoginPage: React.FC = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log('Received values:', values)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[url('/images/login/view.png')] bg-cover bg-repeat">
      <Card className="h-2/3 w-1/3 border-2 border-primary-blue-600 opacity-80">
        <div className="flex h-full flex-col justify-center">
          <div>
            <div className="mb-2 text-xl text-primary-blue-600">Meridian Bliss</div>
            <div className="mb-3 text-4xl font-bold text-primary-blue-600">Login</div>
          </div>
          <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
            <div className="mb-4">
              <div className="mb-2 text-2xl font-bold text-primary-blue-600">Email</div>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                className="mb-0"
              >
                <Input />
              </Form.Item>
            </div>
            <div className="mb-4">
              <div className="mb-2 text-2xl font-bold text-primary-blue-600">Password</div>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                className="mb-0"
              >
                <Input type="password" />
              </Form.Item>
            </div>
            <div className="flex justify-center">
              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mb-3 h-full min-w-44 text-2xl sm:w-full lg:w-1/3"
                  style={{ backgroundColor: '#0E4459' }}
                >
                  Login
                </Button>
              </Form.Item>
            </div>
          </Form>
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
        </div>
      </Card>
    </div>
  )
}

export default LoginPage
