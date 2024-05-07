import { Button, Form, Input } from 'antd'
import { useState } from 'react'

const ProfilePage = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true)

  return (
    <>
      <div className="h-full content-center bg-[url('hotelview2.svg')] bg-cover bg-repeat lg:h-screen">
        <div className="mx-auto w-5/6 content-center  rounded-md bg-white/80 md:w-5/12">
          <p className="mx-4 text-3xl font-bold text-primary-blue-700">User Details</p>
          <div className="container rounded-md border-2 border-primary-blue-600 bg-white md:mx-auto md:my-3 md:w-11/12 ">
            <Form className="mx-2 my-2" layout="vertical" disabled={componentDisabled}>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:text-center">
                <Form.Item
                  label="First name"
                  className="inline-block w-10/12 place-self-center"
                  rules={[{ required: true }]}
                >
                  <Input></Input>
                </Form.Item>

                <Form.Item
                  label="Last name"
                  className="inline-block w-10/12 place-self-center lg:place-content-start"
                  rules={[{ required: true }]}
                >
                  <Input></Input>
                </Form.Item>

                <Form.Item
                  label="Email"
                  className="inline-block w-10/12 place-self-center"
                  rules={[{ required: true }]}
                >
                  <Input disabled={true}></Input>
                </Form.Item>

                <Form.Item
                  label="Phone number"
                  className="inline-block w-10/12 place-self-center lg:place-content-start"
                  rules={[{ required: true }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="Address"
                  className="inline-block w-10/12 place-self-center"
                  rules={[{ required: true }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item label=" ">
                  <Button
                    disabled={false}
                    onClick={() => {
                      setComponentDisabled(!componentDisabled)
                    }}
                    type="primary"
                    className="inline-block w-7/12 place-self-center"
                  >
                    Edit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
          <p className="mx-4 text-3xl font-bold text-primary-blue-700">Card</p>
          <div className="container grid h-fit grid-rows-1 gap-3 rounded-md border-2 border-primary-blue-600 bg-white md:mx-auto md:my-3 md:w-11/12">
            <div className="mx-6 grid grid-cols-9">
              <p className="col-span-7">Text</p>
              <Button className="col-span-2">d</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProfilePage
