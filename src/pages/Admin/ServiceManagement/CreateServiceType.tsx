import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { SERVICE_MANAGE_PATH } from '@/configs/route'
import { AxiosInstance } from '@/lib/axios'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Switch } from 'antd'
import React, { Fragment } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const CreateServiceType: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = async () => {
    try {
      const values = form.getFieldsValue()
      console.log(values)
      const response = await AxiosInstance.post('/api/service_type', {
        name: values.name,
        detail: values.description,
        isActive: true,
        service: values.service.map(
          (item: { name: string; description: string; information: string; price: string; isActive: boolean }) => {
            return {
              name: item.name,
              description: item.description,
              information: item.information,
              price: Number(item.price),
              isActive: Boolean(item.isActive)
            }
          }
        )
      })

      if (response.status === 201) {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'สร้างประเภทบริการสำเร็จแล้ว',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate(SERVICE_MANAGE_PATH)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Create Service Type</h1>
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          requiredMark={customizeRequiredMark}
          initialValues={{
            name: '',
            description: '',
            service: [{ name: '', description: '', information: '', price: '', isActive: true }]
          }}
        >
          <div className="grid grid-cols-1 gap-2">
            <Form.Item
              name="name"
              label={<p className="font-semibold">ชื่อประเภทบริการ</p>}
              rules={[{ required: true, message: 'กรุณากรอกชื่อประเภทบริการ' }]}
            >
              <Input size="large" placeholder="ชื่อประเภทบริการ" />
            </Form.Item>

            <Form.Item
              name={`description`}
              label={<p className="font-semibold">รายละเอียด</p>}
              rules={[{ required: true, message: 'กรุณากรอกรายละเอียด' }]}
            >
              <Input.TextArea size="large" placeholder="กรุณากรอกรายละเอียด" autoSize={{ minRows: 3, maxRows: 4 }} />
            </Form.Item>
          </div>
          <div>
            <Form.Item label={<p className="text-xl font-bold text-primary-blue-600">Service</p>}>
              <Form.List name={'service'}>
                {(Field, option) => (
                  <div className="space-y-8">
                    {Field.map((item) => {
                      return (
                        <div key={item.key} className="grid w-full grid-cols-1 md:grid-cols-2 md:gap-x-4">
                          <Form.Item
                            name={[item.name, 'name']}
                            label={<p className="font-semibold">ชื่อบริการ</p>}
                            className="w-full"
                          >
                            <Input placeholder="หมายเลขห้อง" size="large" />
                          </Form.Item>
                          <Form.Item
                            name={[item.name, 'description']}
                            label={<p className="font-semibold">คำอธิบาย</p>}
                            className="w-full"
                          >
                            <Input placeholder="หมายเลขห้อง" size="large" />
                          </Form.Item>
                          <Form.Item
                            name={[item.name, 'information']}
                            label={<p className="font-semibold">ข้อมูลเพิ่มเติม (สำหรับภายใน)</p>}
                            className="w-full"
                          >
                            <Input placeholder="หมายเลขห้อง" size="large" />
                          </Form.Item>
                          <Form.Item
                            name={[item.name, 'price']}
                            label={<p className="font-semibold">ราคา</p>}
                            rules={[
                              { required: true, message: 'กรุณากรอกราคา' },
                              { message: 'กรุณากรอกตัวเลข', pattern: /^[0-9]*$/ }
                            ]}
                            className="w-full"
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
                          const initValue = { isActive: true }
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
export default CreateServiceType
