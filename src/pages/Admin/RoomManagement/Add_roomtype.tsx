import { Button, Form, Input, InputNumber, Select, Space, Switch } from 'antd'

import type { FormInstance } from 'antd'
import React from 'react'

interface SubmitButtonProps {
  form: FormInstance
}

const { TextArea } = Input

const Add_roomtype = () => {
  const [form] = Form.useForm()
  const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false)

    // Watch all values
    const values = Form.useWatch([], form)

    React.useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false))
    }, [form, values])

    return (
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        {children}
      </Button>
    )
  }

  return (
    <>
      <div>
        <p className="text-center text-3xl font-bold text-primary-blue-700">Add Room Type</p>
      </div>
      <div className="mx-auto  w-3/5 ">
        <Form form={form} layout="vertical" autoComplete="off">
          <div className="grid grid-cols-2">
            <Form.Item
              name="Name"
              label="Name of room"
              className="w-4/5"
              rules={[{ required: true, message: 'กรุณากรอกชื่อห้อง' }]}
            >
              <Input
                placeholder="please Input Name"
                count={{
                  show: true,
                  max: 20
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              name="Size"
              label="size"
              className="w-4/5"
              rules={[{ required: true, message: 'กรุณากรอกขนาดห้อง' }]}
            >
              <Input placeholder="please Input Size"></Input>
            </Form.Item>
            <div>
              <Form.Item
                name="Price"
                label="Price"
                className="w-4/5"
                rules={[
                  { required: true, message: 'กรุณากรอกราคา' },
                  {
                    pattern: /^[0-9]*$/,
                    message: 'กรุณากรอกราคาให้ถูกต้อง'
                  }
                ]}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item label="Bed" className="w-4/5">
                <Select
                  defaultValue="King size"
                  options={[
                    { value: 'King size', label: 'King size' },
                    { value: 'Queen size', label: 'Queen size' },
                    { value: 'Twin bed', label: 'Twin bed' }
                  ]}
                ></Select>
              </Form.Item>
            </div>

            <Form.Item label="content" className="w-4/5">
              <TextArea
                placeholder="please Input content"
                autoSize={{ minRows: 5, maxRows: 7 }}
                count={{
                  show: true,
                  max: 80
                }}
              ></TextArea>
            </Form.Item>
            <div className="grid grid-cols-2">
              <Form.Item label="accommodate" className="w-4/5">
                <InputNumber min={1} max={8} defaultValue={2}></InputNumber>
              </Form.Item>

              <Form.Item label="Food" className="w-4/5">
                <Switch></Switch>
              </Form.Item>

              <Form.Item label="view garden" className="w-4/5">
                <Switch></Switch>
              </Form.Item>
              <Form.Item label="sea" className="w-4/5">
                <Switch></Switch>
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <Space>
              <SubmitButton form={form}>Submit</SubmitButton>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
export default Add_roomtype