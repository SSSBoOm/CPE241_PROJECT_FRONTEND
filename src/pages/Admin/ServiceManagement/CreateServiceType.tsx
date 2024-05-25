import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { SERVICE_MANAGE_PATH } from '@/configs/route'
import { AxiosInstance } from '@/lib/axios'
import { uploadImage } from '@/lib/supabase'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Switch, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import Dragger from 'antd/es/upload/Dragger'
import React, { Fragment } from 'react'
import { FaPlus } from 'react-icons/fa'
import { MdOutlineFileUpload } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const CreateServiceType: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const uploadProps: UploadProps = {
    multiple: true,
    maxCount: 1,
    action: '',
    showUploadList: false
  }

  const onFinish = async () => {
    try {
      const values = form.getFieldsValue()
      const response = await AxiosInstance.post('/api/service_type', {
        name: values.name,
        detail: values.description,
        isActive: true,
        service: values.service.map(
          (item: {
            name: string
            description: string
            information: string
            price: string
            isActive: boolean
            image: string
          }) => {
            return {
              name: item.name,
              description: item.description,
              information: item.information,
              imageUrl: item.image,
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
            service: [{ name: '', description: '', information: '', price: '', isActive: true, image: '' }]
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
                      const value = form.getFieldValue('service')
                      return (
                        <div key={item.key} className="w-full">
                          <div className="grid w-full grid-cols-1 md:grid-cols-2 md:gap-x-4">
                            <Form.Item
                              name={[item.name, 'name']}
                              label={<p className="font-semibold">ชื่อบริการ</p>}
                              className="w-full"
                              rules={[{ required: true, message: 'กรุณากรอกชื่อบริการ' }]}
                            >
                              <Input placeholder="ชื่อบริการ" size="large" />
                            </Form.Item>
                            <Form.Item
                              name={[item.name, 'description']}
                              label={<p className="font-semibold">คำอธิบาย</p>}
                              className="w-full"
                              rules={[{ required: true, message: 'กรุณากรอกคำอธิบาย' }]}
                            >
                              <Input placeholder="คำอธิบาย" size="large" />
                            </Form.Item>
                            <Form.Item
                              name={[item.name, 'information']}
                              label={<p className="font-semibold">ข้อมูลเพิ่มเติม (สำหรับภายใน)</p>}
                              className="w-full"
                              rules={[{ required: true, message: 'กรุณากรอกข้อมูลเพิ่มเติม' }]}
                            >
                              <Input placeholder="ข้อมูลเพิ่มเติม" size="large" />
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
                              <Input placeholder="ราคา" size="large" />
                            </Form.Item>
                          </div>
                          <Form.Item
                            name={[item.name, 'image']}
                            label={<p className="font-semibold">รูปภาพ</p>}
                            rules={[{ required: true, message: 'กรุณาเลือกรูปภาพ' }]}
                            className="my-4 aspect-video max-w-[500px] md:col-span-3"
                          >
                            <ImgCrop rotationSlider aspect={1920 / 1080}>
                              <Dragger
                                {...uploadProps}
                                beforeUpload={async (file) => {
                                  if (
                                    file.type !== 'image/jpeg' &&
                                    file.type !== 'image/png' &&
                                    file.type !== 'image/jpg'
                                  ) {
                                    Swal.fire({
                                      title: 'เกิดข้อผิดพลาด',
                                      text: 'กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น',
                                      icon: 'error',
                                      confirmButtonText: 'OK'
                                    })
                                    return false
                                  }
                                  try {
                                    const url = await uploadImage(file)
                                    const fields = form.getFieldsValue()
                                    const { service } = fields
                                    Object.assign(service[item.name], { image: url })
                                    form.setFieldsValue({ service })
                                  } catch (error) {
                                    Swal.fire({
                                      title: 'เกิดข้อผิดพลาด',
                                      text: 'ไม่สามารถอัพโหลดรูปภาพได้',
                                      icon: 'error',
                                      confirmButtonText: 'OK'
                                    })
                                    throw new Error('Upload Image Error')
                                  }
                                }}
                              >
                                {value[item.name].image === '' ? (
                                  <div className="aspect-video content-center">
                                    <p className="ant-upload-drag-icon flex w-full justify-center">
                                      <MdOutlineFileUpload className="text-primary-blue h-16 w-16" />
                                    </p>
                                    <p className="text-primary-blue my-2 text-xl font-semibold underline">
                                      อัปโหลดรูปภาพ
                                    </p>
                                    <p className="text-black">ไฟล์รูปต้องเป็นขนาด 1920 W * 1080 H , สูงสุด 1 รูป</p>
                                  </div>
                                ) : (
                                  <img
                                    src={
                                      'https://evquseshrfnvyndhterj.supabase.co/storage/v1/object/public/cpe241-image/' +
                                      value[item.name].image
                                    }
                                    alt="preview"
                                    className="h-full w-full object-cover"
                                  />
                                )}
                              </Dragger>
                            </ImgCrop>
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
                          const initValue = {
                            name: '',
                            description: '',
                            information: '',
                            price: '',
                            isActive: true,
                            image: ''
                          }
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
              <Button onClick={() => navigate(SERVICE_MANAGE_PATH)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  )
}
export default CreateServiceType
