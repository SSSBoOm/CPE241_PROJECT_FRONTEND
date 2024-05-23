import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Select, Space, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React from 'react'
import Swal from 'sweetalert2'

const Add_service: React.FC = () => {
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

  return (
    <>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Create Service</h1>
        <Form layout="vertical" requiredMark={customizeRequiredMark}>
          <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              label={<p className="font-semibold">Type Of Service</p>}
              rules={[{ required: true, message: 'กรุณาเลือกService' }]}
              name="type"
            >
              <Select
                size="large"
                options={[
                  { value: 'จองรถ', label: 'จองรถ' },
                  { value: 'ดำน้ำ', label: 'ดำน้ำ' }
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">ชื่อบริการ</p>}
              rules={[{ required: true, message: 'กรุณากรอกชื่อบริการ' }]}
              name="namcar_ship"
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">information</p>}
              rules={[{ required: true, message: 'กรุณากรอกทะเบียนรถหรือหมายเลขเรือ' }]}
              name="information"
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">Price</p>}
              rules={[{ required: true, message: 'กรุณากรอกราคา' }]}
              name="price"
            >
              <Input size="large" />
            </Form.Item>
            <div className="flex w-full flex-wrap">
              <Form.Item label={<p className="font-semibold">accommodate</p>}>
                <InputNumber size="large" min={1} max={8} defaultValue={2}></InputNumber>
              </Form.Item>
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
                <Button size="large">สร้าง</Button>
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
    </>
  )
}
export default Add_service
