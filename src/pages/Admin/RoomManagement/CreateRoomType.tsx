import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { ROOM_MANAGE_PATH } from '@/configs/route'
import { AxiosInstance } from '@/lib/axios'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Space, Switch, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { Fragment } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const { TextArea } = Input

const CreateRoomType: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async () => {
    try {
      const values = form.getFieldsValue()
      // TODO: Validate Fields
      const response = await AxiosInstance.post('/api/room_type', {
        ...values,
        price: parseInt(values.price)
      })

      if (response.status === 201) {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'สร้างประเภทห้องสำเร็จแล้ว',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate(ROOM_MANAGE_PATH)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Create Room Type</h1>
        <Form
          form={form}
          initialValues={{
            isActive: true,
            name: '',
            bed: 'King size',
            accommodate: null,
            detail: '',
            room: [{ roomNumber: '', isActive: true }]
          }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
          requiredMark={customizeRequiredMark}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
            <Form.Item name={'isActive'} className="hidden">
              <Switch />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'กรุณากรอกชื่อห้อง' }]}>
              <Input size="large" placeholder="ชื่อประเภทห้อง" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: 'กรุณากรอกราคา' },
                {
                  pattern: /^[0-9]*$/,
                  message: 'กรุณากรอกราคาให้ถูกต้อง'
                }
              ]}
            >
              <Input size="large" placeholder="ราคา" />
            </Form.Item>

            <Form.Item
              name={`accommodate`}
              label="accommodate"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกจำนวนคนที่พักได้'
                },
                {
                  pattern: /^[0-9]*$/,
                  message: 'กรุณากรอกจำนวนคนที่พักได้ให้ถูกต้อง'
                }
              ]}
            >
              <InputNumber size="large" min={1} max={8} className="w-full" />
            </Form.Item>
            <div className="md:col-span-2">
              <Form.Item
                name={`detail`}
                label="detail"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกรายละเอียด'
                  }
                ]}
              >
                <TextArea size="large" placeholder="please Input detail" autoSize={{ minRows: 3, maxRows: 4 }} />
              </Form.Item>
            </div>
            <Form.Item label="Upload" valuePropName="fileList">
              <ImgCrop>
                <Upload action="/upload.do" listType="picture-card">
                  <button style={{ border: 0, background: 'none' }} type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </div>
          <div>
            <Form.Item label={<p className="text-xl font-bold">Room</p>}>
              <Form.List name={'room'}>
                {(Field, option) => (
                  <div>
                    {Field.map((item) => {
                      return (
                        <div key={item.key} className="grid w-full grid-cols-1 md:grid-cols-5 md:gap-x-4">
                          <Form.Item
                            name={[item.name, 'roomNumber']}
                            label={<p className="font-semibold">Room Number</p>}
                            rules={[{ required: true, message: 'กรุณากรอกหมายเลขห้อง' }]}
                            className="w-full md:col-span-4"
                          >
                            <Input placeholder="หมายเลขห้อง" size="large" />
                          </Form.Item>
                          <div
                            className={`flex w-full ${Field.length > 1 ? 'justify-between px-4' : 'flex-row-reverse justify-end'}`}
                          >
                            <Form.Item name={[item.name, 'isActive']} label={<p className="font-semibold">Active</p>}>
                              <Switch />
                            </Form.Item>
                            <button
                              className={`${!(Field.length > 1) && 'hidden'} text-2xl`}
                              onClick={() => {
                                option.remove(item.name)
                              }}
                            >
                              <DeleteOutlined />
                            </button>
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
                        <p>add room</p>
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  )
}
export default CreateRoomType
