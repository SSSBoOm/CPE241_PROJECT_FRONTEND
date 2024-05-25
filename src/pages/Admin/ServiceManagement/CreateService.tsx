import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { SERVICE_MANAGE_PATH } from '@/configs/route'
import { IServiceType } from '@/interfaces/ServiceType'
import { AxiosInstance } from '@/lib/axios'
import { uploadImage } from '@/lib/supabase'
import { Button, Form, Input, Select, Space, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import Dragger from 'antd/es/upload/Dragger'
import React, { useEffect, useState } from 'react'
import { MdOutlineFileUpload } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const CreateService: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [serviceTypeData, setServiceTypeData] = useState<IServiceType[]>([])
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

  useEffect(() => {
    const fetchServiceType = async () => {
      try {
        const response = await AxiosInstance.get('/api/service_type')
        setServiceTypeData(response.data.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchServiceType()
  }, [])

  function cancel() {
    Swal.fire({
      title: 'คุณเเน่ใจที่จะออก?',
      text: 'หากออกข้อมูลจะไม่บันทึก',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ใช่, เเน่ใจ'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ออกสำเร็จ',
          text: 'ข้อมูลไม่ได้ถูกบันทึก',
          icon: 'success'
        })
      }
    })
  }

  const onFinish = async () => {
    try {
      const values = form.getFieldsValue()
      if (uploadImageFile.name === '') {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาอัพโหลดรูปภาพ',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        return
      }
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

      const response = await AxiosInstance.post('/api/service', {
        description: values.description,
        information: values.information,
        isActive: true,
        name: values.name,
        imageUrl: img_path,
        price: Number(values.price),
        serviceTypeId: Number(values.serviceTypeId)
      })
      if (response.status === 201) {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'สร้างบริการสำเร็จแล้ว',
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
    <React.Fragment>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl font-bold text-primary-blue-600">Create Service</h1>
        <Form layout="vertical" form={form} requiredMark={customizeRequiredMark} onFinish={onFinish}>
          <div className="mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item
              name="serviceTypeId"
              label={<p className="font-semibold">ประเภทบริการ</p>}
              rules={[{ required: true, message: 'กรุณาเลือกประเภทบริการ' }]}
            >
              <Select
                size="large"
                options={serviceTypeData.map((item) => {
                  return {
                    label: item.name,
                    value: item.id
                  }
                })}
              />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">ชื่อบริการ</p>}
              rules={[{ required: true, message: 'กรุณากรอกชื่อบริการ' }]}
              name="name"
            >
              <Input size="large" placeholder="ชื่อบริการ" />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">ข้อมูลเพิ่มเติม (สำหรับภายใน)</p>}
              rules={[{ required: true, message: 'กรุณากรอกทะเบียนรถหรือหมายเลขเรือ' }]}
              name="information"
            >
              <Input size="large" placeholder="ข้อมูลเพิ่มเติม" />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">คำอธิบาย</p>}
              rules={[{ required: true, message: 'กรุณากรอกทะเบียนรถหรือหมายเลขเรือ' }]}
              name="description"
            >
              <Input size="large" placeholder="คำอธิบาย" />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">ราคา</p>}
              rules={[
                { required: true, message: 'กรุณากรอกราคา' },
                { message: 'กรุณากรอกเป็นตัวเลข', pattern: /^[0-9]*$/ }
              ]}
              name="price"
            >
              <Input size="large" placeholder="ราคา" />
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

          <div className="flex w-full flex-row content-center justify-end ">
            <Space>
              <Form.Item>
                <Button size="large" htmlType="submit" type="primary">
                  สร้าง
                </Button>
              </Form.Item>
              <Form.Item>
                <Button size="large" onClick={cancel}>
                  ยกเลิก
                </Button>
              </Form.Item>
            </Space>
          </div>
        </Form>
      </div>
    </React.Fragment>
  )
}
export default CreateService
