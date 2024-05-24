import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { ROOM_MANAGE_PATH } from '@/configs/route'
import { AxiosInstance } from '@/lib/axios'
import { uploadImage } from '@/lib/supabase'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Space, Switch, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import Dragger from 'antd/es/upload/Dragger'
import React, { Fragment, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { MdOutlineFileUpload } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const { TextArea } = Input

const CreateRoomType: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [uploadImageFile, setUploadImageFile] = useState<File>(new File([], ''))

  const uploadProps: UploadProps = {
    multiple: true,
    maxCount: 1,
    action: '',
    showUploadList: false,
    beforeUpload(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        return false
      }
      setUploadImageFile(file)
      return false
    }
  }

  const onFinish = async () => {
    try {
      const values = form.getFieldsValue()
      // Upload Image
      // using supa
      let img_path = ''
      try {
        img_path = await uploadImage(uploadImageFile)
      } catch (error) {
        console.error(error)
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถอัพโหลดรูปภาพได้',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        throw new Error('Upload Image Error')
      }

      // TODO: Validate Fields
      const response = await AxiosInstance.post('/api/room_type', {
        ...values,
        price: parseInt(values.price),
        imageUrl: img_path
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
      console.error(error)
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถสร้างประเภทห้องได้',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate(ROOM_MANAGE_PATH)
      })
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
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4">
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
              <InputNumber
                size="large"
                min={1}
                className="w-full"
                placeholder="ราคาต่อคืน"
                formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                step={100}
              />
            </Form.Item>

            <Form.Item
              name={`accommodate`}
              label="Capacity"
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
              <InputNumber size="large" min={1} className="w-full" placeholder="จำนวนคนต่อห้องพัก" />
            </Form.Item>
            <div className="md:col-span-3">
              <Form.Item
                name={`detail`}
                label="Detail"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกรายละเอียด'
                  }
                ]}
              >
                <TextArea size="large" placeholder="รายละเอียดห้องพัก....." autoSize={{ minRows: 3, maxRows: 4 }} />
              </Form.Item>
            </div>
            <div className="my-4 aspect-video max-w-[500px] md:col-span-3">
              <ImgCrop rotationSlider aspect={1920 / 1080}>
                <Dragger {...uploadProps}>
                  {uploadImageFile.name === '' ? (
                    <div>
                      <p className="ant-upload-drag-icon flex w-full justify-center">
                        <MdOutlineFileUpload className="text-primary-blue h-16 w-16" />
                      </p>
                      <p className="text-primary-blue my-2 text-xl font-semibold underline">อัปโหลดรูปภาพ</p>
                      <p className="text-black">ไฟล์รูปต้องเป็นขนาด 1920 W * 1080 H , สูงสุด 1 รูป</p>
                    </div>
                  ) : (
                    <img
                      src={URL.createObjectURL(uploadImageFile)}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                  )}
                </Dragger>
              </ImgCrop>
            </div>
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
                        <p>Add Room</p>
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

              <Button onClick={() => navigate(ROOM_MANAGE_PATH)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  )
}
export default CreateRoomType
