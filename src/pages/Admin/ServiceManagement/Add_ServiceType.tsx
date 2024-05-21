import { PlusOutlined } from '@ant-design/icons'
import type { FormInstance } from 'antd'
import { Button, Form, Input, InputNumber, Space, Switch, Upload } from 'antd'
import React from 'react'

interface SubmitButtonProps {
  form: FormInstance
}

const { TextArea } = Input

const Add_ServiceType = () => {
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
        <p className="text-center text-3xl font-bold text-primary-blue-700">Add Service Type</p>
      </div>
      <div className="mx-auto  w-3/5 ">
        <Form form={form} layout="vertical" autoComplete="off">
          <div className="grid grid-cols-1 gap-2">
            <Form.Item name="Name" label="Name of room" rules={[{ required: true, message: 'กรุณากรอกชื่อห้อง' }]}>
              <Input
                placeholder="please Input Name"
                count={{
                  show: true,
                  max: 20
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              name="Price"
              label="Price"
              rules={[
                { required: true, message: 'กรุณากรอกราคา' },
                {
                  pattern: /^[0-9]*$/,
                  message: 'กรุณากรอกราคาให้ถูกต้อง'
                }
              ]}
            >
              <Input placeholder="please Input Price"></Input>
            </Form.Item>
            <div className="">
              <Form.Item label="content">
                <TextArea
                  placeholder="please Input content"
                  autoSize={{ minRows: 3, maxRows: 4 }}
                  count={{
                    show: true,
                    max: 80
                  }}
                ></TextArea>
              </Form.Item>
            </div>
            <div className="grid w-fit md:grid-cols-2">
              <Form.Item className="" label="accommodate ">
                <InputNumber min={1} max={8} defaultValue={2}></InputNumber>
              </Form.Item>
              <Form.Item label="Food">
                <Switch></Switch>
              </Form.Item>
              <Form.Item label="Upload" valuePropName="fileList">
                <Upload action="/upload.do" listType="picture-card">
                  <button style={{ border: 0, background: 'none' }} type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
              </Form.Item>
            </div>
          </div>
          <Form.Item className="text-end">
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
export default Add_ServiceType
