import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { Button, Checkbox, Form, Input } from 'antd'
import { useState } from 'react'

const RegisterPage = () => {
  const [form] = Form.useForm()
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false)
  const onFinish = () => {
    const values = form.getFieldsValue()
    console.log(values)
    setComponentDisabled(true)
  }

  return (
    <>
      <div className="h-full content-center bg-[url('/images/login/view.png')] bg-cover bg-repeat lg:h-screen">
        <div className="w-vw h-dvh align-middle lg:content-center">
          <Form
            className="lg:m-2"
            layout="vertical"
            disabled={componentDisabled}
            requiredMark={customizeRequiredMark}
            form={form}
            scrollToFirstError={true}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <div className="grid size-fit w-full border-primary-blue-600 bg-white align-middle text-primary-blue-600 opacity-100 lg:ml-auto lg:mr-auto lg:h-[40rem] lg:w-[52rem] lg:grid-cols-2 lg:grid-rows-12 lg:rounded-md lg:border-4">
              <div className="my-3 ml-5 grid-cols-1 lg:col-span-2 lg:row-span-3">
                <div className="text-2xl">Meridian Bliss</div>
                <div className="mt-2 text-5xl font-bold">Register</div>
              </div>
              <div className=" mx-4 w-full lg:row-span-2">
                <Form.Item
                  name="firstName"
                  label="First name"
                  className="inline-block w-11/12 font-bold "
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <Input className=" border-primary-blue-600 " placeholder="Your first name" />
                </Form.Item>
              </div>
              <div className="mx-4 w-full lg:row-span-2">
                <Form.Item
                  name="lastName"
                  label="Last name"
                  className="inline-block w-11/12 font-bold "
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <Input className=" border-primary-blue-600 " placeholder="Your last name" />
                </Form.Item>
              </div>
              <div className="mx-4 w-full lg:row-span-2">
                <Form.Item
                  name="email"
                  label="E-mail"
                  className="inline-block w-11/12 font-bold "
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Email!'
                    },
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    }
                  ]}
                >
                  <Input className=" border-primary-blue-600 " placeholder="example@gmail.com" />
                </Form.Item>
              </div>
              <div className="mx-4 w-full lg:row-span-2">
                <Form.Item
                  name="phone"
                  label="Phone number"
                  className="inline-block w-11/12 font-bold "
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input className="border-primary-blue-600 " placeholder="xxx-xxx-xxxx" />
                </Form.Item>
              </div>
              <div className="mx-4 w-full lg:row-span-2">
                <Form.Item
                  name="password"
                  label="Password"
                  className="inline-block w-11/12 font-bold "
                  hasFeedback
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password className=" border-primary-blue-600 " placeholder="" />
                </Form.Item>
              </div>
              <div className="mx-4 w-full lg:row-span-2">
                <Form.Item
                  name="confirm"
                  label="Confirm password"
                  className="inline-block w-11/12 font-bold "
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'))
                      }
                    })
                  ]}
                >
                  <Input.Password className=" border-primary-blue-600 " placeholder="" />
                </Form.Item>
              </div>
              <div className="lg:col-span-2">
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  className="m-3 inline-block align-middle"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))
                    }
                  ]}
                >
                  <Checkbox>ฉันยอมรับเงื่อนในการให้บริการ</Checkbox>
                </Form.Item>
              </div>
              <div className="flex w-full justify-center lg:col-span-2 lg:row-span-2">
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="my-5 bg-primary-blue-600 text-white" size="large">
                    Register
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
