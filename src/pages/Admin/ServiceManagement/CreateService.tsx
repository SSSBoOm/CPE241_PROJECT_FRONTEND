import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { SERVICE_MANAGE_PATH } from '@/configs/route'
import { IServiceType } from '@/interfaces/ServiceType'
import { AxiosInstance } from '@/lib/axios'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const CreateService: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [serviceTypeData, setServiceTypeData] = useState<IServiceType[]>([])

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
      console.log(values)

      const response = await AxiosInstance.post('/api/service', {
        description: values.description,
        information: values.information,
        isActive: values.isActive,
        name: values.name,
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
            <div className="flex w-full flex-wrap">
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
            </div>
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
