import { customizeRequiredMark } from '@/components/utils/customizeRequiredMark'
import { SearchOutlined } from '@ant-design/icons'
import { DatePicker, Form, GetProps, Select } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'
import React, { Fragment, lazy, useEffect, useState } from 'react'
import { IRoomType } from '../../interfaces/RoomType'
import { AxiosInstance } from '../../lib/axios'

const Room = lazy(() => import('../../components/Card/Room'))

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

const RoomPage: React.FC = () => {
  const [form] = Form.useForm()
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([])

  const onFinish = () => {
    const values = form.getFieldsValue()
    console.log(values)
    const { start_date, end_date } = {
      start_date: dayjs(values.dates[0]).set('hour', 13).set('minute', 0).set('second', 0).set('millisecond', 0),
      end_date: dayjs(values.dates[1]).set('hour', 11).set('minute', 0).set('second', 0).set('millisecond', 0)
    }
    console.log(start_date.toISOString())
    console.log(end_date.toISOString())
  }

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const result = await AxiosInstance.get('/api/room_type/all')
        setRoomTypes(result.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchRoom()
  }, [])

  return (
    <Fragment>
      <div className="container mx-auto px-8 py-4">
        <div className="space-y-4 py-4 font-bold text-primary-blue-600">
          <h1 className="text-4xl">Room</h1>
          <p className="text-3xl">ห้องพักโรงแรม</p>
          <p className="text-xl">อีกสัมผัสแห่งความสะดวกสบายด้วยบริการมากมายจากทางโรงแรม</p>
        </div>
        <Form
          layout="vertical"
          initialValues={{
            number: 1
          }}
          form={form}
          requiredMark={customizeRequiredMark}
          scrollToFirstError
          size="large"
          onFinish={onFinish}
        >
          <div className="w-full gap-x-4 lg:flex lg:justify-center">
            <Form.Item
              name="dates"
              className="min-w-[16rem]"
              label={<p className="text-xl font-bold text-primary-blue-600">วันที่ต้องการเข้าพัก</p>}
              rules={[
                {
                  required: true,
                  message: 'โปรดระบุช่วงที่ต้องการเข้าพัก'
                },
                {
                  validator: (_, value) => {
                    if (value && value[0] && value[1]) {
                      const startDate = dayjs(value[0])
                        .set('hour', 13)
                        .set('minute', 0)
                        .set('second', 0)
                        .set('millisecond', 0)
                      const endDate = dayjs(value[1])
                        .set('hour', 11)
                        .set('minute', 0)
                        .set('second', 0)
                        .set('millisecond', 0)
                      const daysDiff = Math.ceil(endDate.diff(startDate, 'days', true))
                      if (daysDiff < 1) {
                        return Promise.reject('โปรดระบุช่วงที่ต้องการเข้าพักให้ถูกต้อง')
                      } else {
                        return Promise.resolve()
                      }
                    } else {
                      return Promise.resolve()
                    }
                  }
                }
              ]}
            >
              <DatePicker.RangePicker format={dateFormat} className="w-full" size="large" disabledDate={disabledDate} />
            </Form.Item>
            <Form.Item
              className="min-w-[16rem]"
              name="number"
              rules={[
                {
                  required: true,
                  message: 'โปรดระบุจำนวนห้องที่ต้องการ'
                }
              ]}
              label={<p className="text-xl font-bold text-primary-blue-600">จำนวนห้อง</p>}
            >
              <Select
                className="w-full"
                size="large"
                options={new Array(8).fill({}).map((_, index) => {
                  return {
                    label: index + 1,
                    value: index + 1
                  }
                })}
              />
            </Form.Item>
            <Form.Item className="min-w-[16rem] justify-center lg:inline lg:content-end">
              <button
                className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-primary-blue-700 px-4 py-2 font-bold text-white"
                type="submit"
              >
                <p>ค้นหาห้องพัก</p>
                <SearchOutlined />
              </button>
            </Form.Item>
          </div>
        </Form>
        <div className="flex flex-col space-y-4">
          {roomTypes.map((roomType) => {
            return <Room key={roomType.id} data={roomType} />
          })}
        </div>
      </div>
    </Fragment>
  )
}
export default RoomPage
