import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { PROMOTIONADMIN_PATH } from '@/configs/route'
import { IRoomType } from '@/interfaces/RoomType'
import { AxiosInstance } from '@/lib/axios'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, GetProps, Input, InputNumber, Select, Space } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
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
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [roomTypeData, setRoomTypeData] = useState<IRoomType[]>([])
  const [roomTypeSelect, setRoomTypeSelect] = useState<number[]>([])

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

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      const roomTypeData = values.room_type.map((item: { roomTypeId: string }) => Number(item.roomTypeId))
      const response = await AxiosInstance.post('/api/promotion_price', {
        name: values.name,
        price: Number(values.price),
        roomTypeId: roomTypeData,
        startDate: dayjs(values.date[0]),
        endDate: dayjs(values.date[1])
      })
      if (response.status !== 201) {
        Swal.fire({
          icon: 'error',
          title: 'Request failed!',
          text: 'Please try again later.'
        })
        return
      }
      Swal.fire({
        icon: 'success',
        title: 'Create Promotion Success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate(PROMOTIONADMIN_PATH)
      })
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'Request failed!',
        text: 'Please try again later.'
      })
    }
  }

  return (
    <React.Fragment>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Create Promotion</h1>
        <Form
          layout="vertical"
          requiredMark={customizeRequiredMark}
          form={form}
          onFinish={onFinish}
          initialValues={{
            room_type: [{ roomTypeId: '' }]
          }}
        >
          <div className="mx-auto grid grid-cols-1 gap-x-4 lg:grid-cols-3 ">
            <Form.Item
              label={<p className="text-sm font-semibold">ชื่อ</p>}
              name="name"
              rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
            >
              <Input size="large" />
            </Form.Item>
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
              rules={[
                { required: true, message: 'กรุณากรอกราคาโปรโมชั่น' },
                { message: 'กรุณากรอกตัวเลข', pattern: /^[0-9]*$/ }
              ]}
            >
              <InputNumber
                size="large"
                formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className="w-full"
              />
            </Form.Item>
            <div className="lg:col-span-3">
              <Form.List name={'room_type'}>
                {(Field, option) => (
                  <div>
                    {Field.map((item) => {
                      return (
                        <div key={item.key} className="grid grid-cols-12">
                          <Form.Item
                            label={<p className="text-sm font-semibold">ประเภทห้อง</p>}
                            name={[item.name, 'roomTypeId']}
                            className={Field.length > 1 ? 'col-span-11' : 'col-span-12'}
                            rules={[{ required: true, message: 'กรุณาเลือกประเภทห้อง' }]}
                          >
                            <Select
                              size="large"
                              options={roomTypeData.map((item) => {
                                const all_form_room = form.getFieldValue('room_type')
                                console.log(all_form_room)
                                return {
                                  label: item.name,
                                  value: item.id,
                                  disabled: all_form_room
                                    .map((e: { roomTypeId: number | string }) => {
                                      return e.roomTypeId
                                    })
                                    .includes(item.id)
                                }
                              })}
                            />
                          </Form.Item>
                          <div className={`flex w-full justify-center`}>
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
                        className="border-primary-blue text-primary-blue hover:bg-primary-blue flex flex-row items-center rounded-lg border bg-white px-4 py-2  text-sm font-bold hover:bg-gray-100 hover:opacity-90"
                        type="button"
                        onClick={() => {
                          const all_form_room = form.getFieldValue('room_type')
                          if (
                            all_form_room.filter((item: { roomTypeId: string }) => item.roomTypeId === '').length > 0
                          ) {
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Please fill all room type'
                            })
                            return
                          }
                          if (roomTypeSelect.length === all_form_room.length) {
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'All room type is selected'
                            })
                            return
                          }
                          const initValue = { roomTypeId: '' }
                          option.add(initValue)
                          const arr: { roomTypeId: string }[] = form.getFieldValue('room_type')
                          setRoomTypeSelect(arr.map((item) => Number(item.roomTypeId)))
                        }}
                      >
                        <p>Add Room Type</p>
                        <FaPlus className="mx-2" />
                      </button>
                    </div>
                  </div>
                )}
              </Form.List>
            </div>
          </div>
          <div className="text-end md:col-start-2">
            <Space>
              <Form.Item>
                <Button size="large" type="primary" htmlType="submit">
                  สร้าง
                </Button>
              </Form.Item>
              <Form.Item>
                <Button size="large" onClick={() => navigate(PROMOTIONADMIN_PATH)}>
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
export default CreatePromotionPage
