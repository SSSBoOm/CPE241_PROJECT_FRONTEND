import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { IRoom } from '@/interfaces/Room'
import { IRoomType } from '@/interfaces/RoomType'
import { AxiosInstance } from '@/lib/axios'
import { Button, DatePicker, Form, Input, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
const { RangePicker } = DatePicker

const CreateMaintenance = () => {
  const [form] = Form.useForm()
  const [selectRoomType, setSelectRoomType] = useState<number>(0)
  const [room, setRoom] = useState<IRoom[]>([])
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
    const fetchRoom = async () => {
      try {
        const response = await AxiosInstance.get('/api/room')
        setRoom(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    Promise.all([fetchRoomType(), fetchRoom()])
  }, [])

  const onFinish = () => {
    const values = form.getFieldsValue()
    console.log(values)
  }
  return (
    <>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Create Room Maintenance</h1>
        <Form
          layout="vertical"
          requiredMark={customizeRequiredMark}
          form={form}
          onFinish={onFinish}
          initialValues={{
            Roomnum: '',
            date: '',
            headdetail: '',
            detail: ''
          }}
        >
          <div className="container mx-auto grid grid-cols-2 gap-4">
            <Form.Item
              name="roomTypeId"
              rules={[{ required: true, message: 'กรุณาเลือกประเภทห้อง' }]}
              label={<p className="font-semibold">ประเภทห้อง</p>}
            >
              <Select
                size="large"
                onChange={(value) => {
                  setSelectRoomType(value)
                  form.setFieldsValue({ roomNumber: '' })
                }}
                options={roomType.map((item) => {
                  return {
                    label: item.name,
                    value: item.id
                  }
                })}
              />
            </Form.Item>
            <Form.Item
              name="roomNumber"
              rules={[{ required: true, message: 'กรุณากรอกเลขห้อง' }]}
              label={<p className="font-semibold">หมายเลขห้องที่ปิดบำรุง</p>}
            >
              <Select
                size="large"
                options={room
                  .filter((item) => item.roomType?.id === selectRoomType)
                  .map((item) => {
                    return {
                      label: item.roomNumber,
                      value: item.id
                    }
                  })}
              />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[{ required: true, message: 'กรุณากรอกวันที่' }]}
              label={<p className="font-semibold">วันที่บำรุง</p>}
            >
              <RangePicker size="large" className="w-full" />
            </Form.Item>
            <Form.Item
              name="headdetail"
              rules={[{ required: true, message: 'กรุณากรอกหัวข้อปิดปรับปรุง' }]}
              label={<p className="font-semibold">หัวข้อการปิดบำรุง</p>}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item name="detail" label={<p className="font-semibold">รายละเอียดการปิดบำรุง</p>}>
              <Input size="large" />
            </Form.Item>
            <div className="text-end md:col-start-2">
              <Space>
                <Form.Item>
                  <Button size="large" type="primary">
                    สร้าง
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button size="large">ยกเลิก</Button>
                </Form.Item>
              </Space>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}
export default CreateMaintenance
