import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { IRoomType } from '@/interfaces/RoomType'
import { AxiosInstance } from '@/lib/axios'
import { Button, DatePicker, Form, GetProps, Input, Select, Space } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'
import React, { useEffect, useState } from 'react'
const { RangePicker } = DatePicker

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
const dateFormat = 'DD/MM/YYYY'
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current < dayjs().endOf('day')
}

const CreatePromotionPage: React.FC = () => {
  const [roomTypeData, setRoomTypeData] = useState<IRoomType[]>([])

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const res = await AxiosInstance.get('/api/room_type')
        setRoomTypeData(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchRoomType()
  }, [])

  return (
    <React.Fragment>
      <p className="text-3xl font-bold text-primary-blue-600">Add Promotion</p>
      <div className="container mx-auto px-4">
        <Form layout="vertical" requiredMark={customizeRequiredMark}>
          <div className="mx-auto grid grid-cols-1 gap-x-4 lg:grid-cols-2 ">
            <Form.Item
              label={<p className="text-sm font-semibold">ช่วงเวลาโปรมาชั่น</p>}
              name="date"
              rules={[{ required: true, message: 'กรุณาเลือกช่วงโปรโมชั่น' }]}
            >
              <RangePicker disabledDate={disabledDate} format={dateFormat} className="w-full" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="text-sm font-semibold">ราคา</p>}
              name="price"
              rules={[{ required: true, message: 'กรุณากรอกราคาโปรโมชั่น' }]}
            >
              <Input size="large" />
            </Form.Item>
            {/* <Form.List>

            </Form.List> */}
            <Form.Item
              label={<p className="text-sm font-semibold">ประเภทห้อง</p>}
              name="typeroom"
              rules={[{ required: true, message: 'กรุณาเลือกประเภทห้อง' }]}
            >
              <Select size="large" options={roomTypeData.map((item) => ({ label: item.name, value: item.id }))} />
            </Form.Item>
          </div>
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
        </Form>
      </div>
    </React.Fragment>
  )
}
export default CreatePromotionPage
