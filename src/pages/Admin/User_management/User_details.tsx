import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import Details from '../../../components/Card/Detail'
const User_details: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true)
  return (
    <>
      <p className="mx-auto mb-3 mt-12 w-6/12">User Details</p>
      <div className="mx-auto w-2/5 rounded-md border-2 border-primary-blue-600">
        <Form className=" mx-2 my-2 w-full" layout="vertical" disabled={componentDisabled}>
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

            <Form.Item label="Email" className="inline-block w-10/12 place-self-center" rules={[{ required: true }]}>
              <Input disabled={true}></Input>
            </Form.Item>

            <Form.Item
              label="Phone number"
              className="inline-block w-10/12 place-self-center lg:place-content-start"
              rules={[{ required: true }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item label="Address" className="inline-block w-10/12 place-self-center" rules={[{ required: true }]}>
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
      <p className="mx-auto mt-6 w-6/12">Room</p>
      <div className="mx-auto w-5/12">
        <Details
          food={true}
          accommodate={2}
          RoomNo="A42"
          content="wddwdw"
          image="../../Room_1.jpg"
          name="dwdw"
          price={245}
          checkIn="24/04/2024"
          checkOut="25/04/2024"
          oncoming={false}
        />
      </div>
      <p className="mx-auto mt-6 w-6/12">Service</p>
      <div className="mx-auto w-5/12">
        <Details
          food={true}
          accommodate={2}
          content="wddwdw"
          image="../../Room_1.jpg"
          name="dwdw"
          price={245}
          checkIn="24/04/2024"
          checkOut="25/04/2024"
          oncoming={false}
        />
      </div>
    </>
  )
}
export default User_details
