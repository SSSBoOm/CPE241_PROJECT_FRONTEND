import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { IPayment } from '@/interfaces/Payment'
import { IReservation } from '@/interfaces/Reservation'
import { IRoomType } from '@/interfaces/RoomType'
import { ReservationType } from '@/interfaces/enums/ReservationType'
import { AxiosInstance } from '@/lib/axios'
import { SearchOutlined } from '@ant-design/icons'
import { DatePicker, Form, GetProps, Modal, Select } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'
import React, { Fragment, lazy, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
const CardUpgrade = lazy(() => import('../../components/Card/CardUpgrade'))

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
  const [formBooking] = Form.useForm()
  const [payment, setPayment] = useState<IPayment[]>([])
  const [disabled, setDisabled] = useState<boolean>(true)
  const [selectedRoomType, setSelectedRoomType] = useState<IRoomType | null>(null)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([])
  const [roomTypesFilter, setRoomTypesFilter] = useState<IRoomType[]>([])
  const [dateStart, setDateStart] = useState<Date>()
  const [dateEnd, setDateEnd] = useState<Date>()

  const onFinish = async () => {
    try {
      setDisabled(false)
      const values = form.getFieldsValue()
      const { start_date, end_date } = {
        start_date: dayjs(values.dates[0]).set('hour', 13).set('minute', 0).set('second', 0).set('millisecond', 0),
        end_date: dayjs(values.dates[1]).set('hour', 11).set('minute', 0).set('second', 0).set('millisecond', 0)
      }
      setDateStart(start_date.toDate())
      setDateEnd(end_date.toDate())

      const response = await AxiosInstance.get('/api/reservation/type/ROOM')
      const reservationInDateRange = response.data.data.filter((r: IReservation) => {
        const startDate = dayjs(r.startDate)
        const endDate = dayjs(r.endDate)
        return startDate.isBefore(end_date) && endDate.isAfter(start_date)
      })
      console.log(reservationInDateRange)
      const data = reservationInDateRange.map((r: IReservation) => r.room?.id)
      console.log(data)
      setRoomTypesFilter(
        roomTypes
          .map((roomType) => {
            return {
              ...roomType,
              room: roomType.room?.filter((room) => !data.includes(room.id))
            }
          })
          .filter((r) => r.room?.length !== 0)
      )
    } catch (error) {
      setDisabled(true)
      console.log('Failed:', error)
    }
  }

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const result = await AxiosInstance.get('/api/room_type')
        const roomType: IRoomType[] = result.data.data.reduce((acc: IRoomType[], r: IRoomType) => {
          return [...acc, { ...r, room: r.room?.filter((room) => room.isActive) }]
        }, [] as IRoomType[])
        console.log(roomType)
        setRoomTypes(roomType.filter((r: IRoomType) => r.room?.length !== 0))
        setRoomTypesFilter(roomType.filter((r: IRoomType) => r.room?.length !== 0))
      } catch (err) {
        console.log(err)
      }
    }
    const fetchPayment = async () => {
      try {
        const result = await AxiosInstance.get('/api/user/payment')
        setPayment(result.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    Promise.all([fetchRoom(), fetchPayment()])
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
          form={form}
          requiredMark={customizeRequiredMark}
          scrollToFirstError
          size="large"
          onFinish={onFinish}
          onFieldsChange={() => {
            setDisabled(true)
          }}
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
            <Form.Item className="mt-12 min-w-[16rem] justify-center lg:mt-0 lg:inline lg:content-end">
              <button
                className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-primary-blue-700 px-4 py-2 font-bold text-white opacity-100 disabled:opacity-50"
                disabled={!disabled}
                type="submit"
              >
                <p>ค้นหาห้องพัก</p>
                <SearchOutlined />
              </button>
            </Form.Item>
          </div>
        </Form>
        <div className="grid grid-cols-5">
          <div className="col-start-1 col-end-6 flex flex-col space-y-4 md:col-start-2 md:col-end-5">
            {roomTypesFilter
              .sort((a, b) => a.price - b.price)
              .map((roomType) => {
                return (
                  <CardUpgrade
                    key={roomType.id}
                    data={roomType}
                    onClick={() => {
                      setSelectedRoomType(roomType)
                      setIsModalVisible(true)
                    }}
                    disabled={disabled}
                  />
                )
              })}
          </div>
        </div>
      </div>

      <Modal
        open={isModalVisible}
        title={<p className="text-center text-lg">Booking</p>}
        centered
        onCancel={() => {
          setIsModalVisible(false)
          setSelectedRoomType(null)
        }}
        onOk={() => {
          setIsModalVisible(false)
        }}
        footer={
          <div className="flex w-full justify-end gap-x-4">
            <button
              className="flex items-center justify-center gap-x-2 rounded-lg bg-primary-blue-700 px-4 py-2 font-bold text-white"
              onClick={() => {
                setIsModalVisible(false)
              }}
            >
              <p>Close</p>
            </button>
            <button
              className="flex items-center justify-center gap-x-2 rounded-lg bg-primary-blue-700 px-4 py-2 font-bold text-white"
              onClick={async () => {
                try {
                  const value = await formBooking.validateFields()

                  const response = await AxiosInstance.post('/api/reservation', {
                    paymentInfoId: value.paymentInfoId,
                    price: selectedRoomType?.price,
                    roomId: selectedRoomType!.room![0].id,
                    serviceId: null,
                    startDate: dateStart?.toISOString(),
                    endDate: dateEnd?.toISOString(),
                    type: ReservationType.ROOM
                  })
                  if (response.status === 200) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: 'Booking successfully'
                    }).then(() => {
                      setIsModalVisible(false)
                      window.location.reload()
                    })
                  }
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              <p>Book</p>
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <h1 className="text-lg font-semibold">ประเภท {selectedRoomType?.name}</h1>
          <h1 className="text-lg font-semibold">
            วันที่ {dayjs(dateStart).format(dateFormat)} - {dayjs(dateEnd).format(dateFormat)}
          </h1>
          <div>
            <Form form={formBooking} layout="vertical" requiredMark={customizeRequiredMark}>
              <Form.Item
                name={'paymentInfoId'}
                label={<p className="text-lg font-semibold">เลือกการชำระเงินของคุณ</p>}
                rules={[
                  {
                    required: true,
                    message: 'โปรดเลือกการชำระเงินของคุณ'
                  }
                ]}
              >
                <Select
                  className="w-full"
                  placeholder="Select payment"
                  options={payment.map((p) => {
                    return {
                      label: `${p.name}: ${p.paymentFirstName} ${p.paymentLastName} ${p.paymentNumber}`,
                      value: p.id
                    }
                  })}
                ></Select>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}
export default RoomPage
