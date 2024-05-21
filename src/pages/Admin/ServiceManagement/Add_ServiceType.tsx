import { PlusOutlined } from '@ant-design/icons'
import type { FormInstance } from 'antd'
import { Button, Form, Input, InputNumber, Space, Switch, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { Fragment, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'

interface SubmitButtonProps {
  form: FormInstance
}

const { TextArea } = Input

const Add_ServiceType: React.FC = () => {
  const [form] = Form.useForm()
  const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false)

    // Watch all values
    const values = Form.useWatch([], form)

    useEffect(() => {
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
    <Fragment>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Add Service Type</h1>
        <Form form={form} layout="vertical" autoComplete="off">
          <div className="grid grid-cols-1 gap-2">
            <Form.Item
              name="Name"
              label={<p className="font-semibold">Name of Service Type</p>}
              rules={[{ required: true, message: 'กรุณากรอกชื่อประเภทบริการ' }]}
            >
              <Input
                size="large"
                placeholder="please Input Name"
                count={{
                  show: true,
                  max: 20
                }}
              ></Input>
            </Form.Item>

            <div className="">
              <Form.Item label={<p className="font-semibold">content</p>}>
                <TextArea
                  size="large"
                  placeholder="please Input content"
                  autoSize={{ minRows: 3, maxRows: 4 }}
                  count={{
                    show: true,
                    max: 80
                  }}
                ></TextArea>
              </Form.Item>
            </div>
          </div>
          <div>
            <Form.Item label={<p className="text-xl font-bold text-primary-blue-600">Service</p>}>
              <Form.List name={'room'}>
                {(Field, option) => (
                  <div className="space-y-8">
                    {Field.map((item) => {
                      return (
                        <div key={item.key} className="grid w-full grid-cols-1 md:grid-cols-2 md:gap-x-4">
                          <Form.Item
                            name={[item.name, 'roomNumber']}
                            label={<p className="font-semibold">Room Number</p>}
                            className="w-full"
                          >
                            <Input placeholder="หมายเลขห้อง" size="large" />
                          </Form.Item>
                          <Form.Item
                            name={[item.name, 'roomNumber']}
                            label={<p className="font-semibold">Room Number</p>}
                            className="w-full"
                          >
                            <Input placeholder="หมายเลขห้อง" size="large" />
                          </Form.Item>
                          <Form.Item
                            name={[item.name, 'roomNumber']}
                            label={<p className="font-semibold">Room Number</p>}
                            className="w-full"
                          >
                            <Input placeholder="หมายเลขห้อง" size="large" />
                          </Form.Item>
                          <div className="flex w-full flex-wrap space-x-8">
                            <Form.Item label={<p className="font-semibold">Upload</p>} valuePropName="fileList">
                              <ImgCrop>
                                <Upload action="/upload.do" listType="picture-card">
                                  <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                  </button>
                                </Upload>
                              </ImgCrop>
                            </Form.Item>
                            <div>
                              <Form.Item label={<p className="font-semibold">accommodate</p>}>
                                <InputNumber size="large" min={1} max={8} defaultValue={2}></InputNumber>
                              </Form.Item>
                              <Form.Item name={[item.name, 'isActive']} label={<p className="font-semibold">Active</p>}>
                                <Switch />
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div>
                      <button
                        className="border-primary-blue text-primary-blue hover:bg-primary-blue flex flex-row items-center rounded-lg border bg-white px-4 py-2  text-sm font-bold hover:text-white"
                        type="button"
                        onClick={() => {
                          const initValue = { roomNumber: '', isActive: true }
                          option.add(initValue)
                        }}
                      >
                        <p>Add service</p>
                        <FaPlus className="mx-2" />
                      </button>
                    </div>
                  </div>
                )}
              </Form.List>
            </Form.Item>
          </div>
          <Form.Item className="text-end">
            <Space>
              <SubmitButton form={form}>Submit</SubmitButton>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  )
}
export default Add_ServiceType
