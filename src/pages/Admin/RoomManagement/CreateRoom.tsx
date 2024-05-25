import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { ROOM_MANAGE_PATH } from '@/configs/route'
import { IRoomType } from '@/interfaces/RoomType'
import { AxiosInstance } from '@/lib/axios'
import { Button, Form, Input, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const CreateRoomPage: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [roomType, setRoomType] = useState<IRoomType[]>([])

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const response = await AxiosInstance.get('/api/room_type')
        setRoomType(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRoomType()
  }, [])

  const onFinish = async () => {
    try {
      const values = form.getFieldsValue()
      const response = await AxiosInstance.post('/api/room', {
        isActive: true,
        roomNumber: values.roomNumber,
        roomTypeId: values.roomTypeId
      })
      if (response.status === 201) {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'เพิ่มห้องสำเร็จ',
          icon: 'success'
        }).then(() => {
          navigate(ROOM_MANAGE_PATH)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

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
        }).then(() => {
          navigate(ROOM_MANAGE_PATH)
        })
      }
    })
  }

  return (
    <React.Fragment>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Create Room</h1>
        <Form layout="vertical" requiredMark={customizeRequiredMark} form={form} onFinish={onFinish}>
          <div className="mx-auto grid grid-cols-1 gap-4 space-y-4 md:space-y-0 lg:grid-cols-2">
            <Form.Item
              label={<p className="text-lg font-bold">Number Of Room</p>}
              rules={[{ required: true, message: 'กรุณากรอกเลขห้อง' }]}
              name="roomNumber"
            >
              <Input type="text" placeholder="หมายเลขห้อง" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="text-lg font-bold">Type Of Room</p>}
              rules={[{ required: true, message: 'กรุณาเลือกประเภทห้อง' }]}
              name="roomTypeId"
            >
              <Select
                size="large"
                options={roomType.map((type) => ({
                  label: type.name,
                  value: type.id
                }))}
              />
            </Form.Item>
          </div>
          <Form.Item className="text-end">
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset" onClick={cancel}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  )
}
export default CreateRoomPage
