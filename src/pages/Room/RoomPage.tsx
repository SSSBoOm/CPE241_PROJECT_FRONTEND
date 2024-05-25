import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { LOGIN_PATH } from '@/configs/route'
import { IPayment } from '@/interfaces/Payment'
import { IReservation } from '@/interfaces/Reservation'
import { IRoomType } from '@/interfaces/RoomType'
import { ReservationType } from '@/interfaces/enums/ReservationType'
import { AxiosInstance } from '@/lib/axios'
import { SearchOutlined } from '@ant-design/icons'
import { DatePicker, Form, GetProps, Modal, Select } from 'antd'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'
import React, { Fragment, lazy, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const CardUpgrade = lazy(() => import('../../components/Card/CardUpgrade'))

interface Promotion {
  id: number
  promotionPrice: {
    id: number
    name: string
    price: number
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
  }
  roomType: IRoomType
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

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
  const navigate = useNavigate()
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
  const [promotion, setPromotion] = useState<
    {
      roomTypeId: number
      promotionId: number
      price: number
    }[]
  >([])

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
      const data = reservationInDateRange.map((r: IReservation) => r.room?.id)
      const roomtypes = roomTypes
        .map((roomType) => {
          return {
            ...roomType,
            room: roomType.room?.filter((room) => !data.includes(room.id))
          }
        })
        .filter((r) => r.room?.length !== 0)
      setRoomTypesFilter(roomtypes)

      await Promise.all([
        roomtypes.map(async (roomType) => {
          try {
            const result = await AxiosInstance.get(`/api/room_type_promotion_price/room_type/${roomType.id}`)
            if (result.data.data === null) return
            const temp = result.data.data
              .filter((item: Promotion) => {
                return (
                  dayjs(item.promotionPrice.startDate).isBefore(end_date) &&
                  dayjs(item.promotionPrice.endDate).isAfter(start_date)
                )
              })
              .sort((a: Promotion, b: Promotion) => a.promotionPrice.price - b.promotionPrice.price)
            console.log(temp)

            if (temp.length > 0) {
              setPromotion([
                ...promotion,
                {
                  roomTypeId: roomType.id,
                  promotionId: temp[0].promotionPrice.id,
                  price: temp[0].promotionPrice.price
                }
              ])
            }
          } catch (error) {
            console.log('Failed:', error)
          }
        })
      ])
    } catch (error) {
      setDisabled(true)
      console.log('Failed:', error)
    }
  }

  const openBookingDialog = async (roomType: IRoomType) => {
    const fetchPayment = async () => {
      try {
        const result = await AxiosInstance.get('/api/user/payment')
        setPayment(result.data.data)
        setSelectedRoomType(roomType)
        setIsModalVisible(true)
      } catch (err) {
        console.log(err)
        if ((err as AxiosError)?.response?.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'โปรดเข้าสู่ระบบก่อนทำการจองห้องพัก'
          }).then(() => {
            navigate(LOGIN_PATH)
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'เกิดข้อผิดพลาดในการโหลดข้อมูลการชำระเงินของคุณ'
          })
        }
      }
    }
    fetchPayment()
  }
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const result = await AxiosInstance.get('/api/room_type')
        const roomType: IRoomType[] = result.data.data.reduce((acc: IRoomType[], r: IRoomType) => {
          return [...acc, { ...r, room: r.room?.filter((room) => room.isActive) }]
        }, [] as IRoomType[])
        setRoomTypes(roomType.filter((r: IRoomType) => r.room?.length !== 0))
        setRoomTypesFilter(roomType.filter((r: IRoomType) => r.room?.length !== 0))
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
                const promotionroomType = promotion.find((p) => p.roomTypeId === roomType.id)

                if (promotionroomType) {
                  return (
                    <CardUpgrade
                      key={roomType.id}
                      promotionPrice={promotionroomType.price}
                      data={roomType}
                      onClick={() => openBookingDialog(roomType)}
                      disabled={disabled}
                    />
                  )
                }
                return (
                  <CardUpgrade
                    key={roomType.id}
                    data={roomType}
                    onClick={() => openBookingDialog(roomType)}
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
                  const promotionroomType = promotion.find((p) => p.roomTypeId === selectedRoomType?.id)
                  if (promotionroomType) {
                    const date1 = new Date(dateStart!)
                    const date2 = new Date(dateEnd!)
                    const Difference_In_Time = date2.getTime() - date1.getTime()
                    const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24))

                    const response = await AxiosInstance.post('/api/reservation', {
                      paymentInfoId: value.paymentInfoId,
                      roomPromotionId: promotionroomType.promotionId,
                      price: promotionroomType.price * Difference_In_Days,
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
                  } else {
                    const date1 = new Date(dateStart!)
                    const date2 = new Date(dateEnd!)
                    const Difference_In_Time = date2.getTime() - date1.getTime()
                    const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24))

                    const response = await AxiosInstance.post('/api/reservation', {
                      paymentInfoId: value.paymentInfoId,
                      price: selectedRoomType!.price * Difference_In_Days,
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
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}
export default RoomPage
