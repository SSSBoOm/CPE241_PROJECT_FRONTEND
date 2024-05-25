import CardService from '@/components/Card/CardService'
import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { LOGIN_PATH } from '@/configs/route'
import { IPayment } from '@/interfaces/Payment'
import { IReservation } from '@/interfaces/Reservation'
import { IService } from '@/interfaces/Service'
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
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

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

const ServicePage: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [formBooking] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [selectedService, setSelectedService] = useState<IService | null>(null)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [payment, setPayment] = useState<IPayment[]>([])
  const [services, setServices] = useState<IService[]>([])
  const [serviceFilter, setServiceFilter] = useState<IService[]>([])
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

      const response = await AxiosInstance.get('/api/reservation/type/SERVICE')
      const reservationInDateRange = response.data.data.filter((r: IReservation) => {
        const startDate = dayjs(r.startDate)
        const endDate = dayjs(r.endDate)
        return startDate.isBefore(end_date) && endDate.isAfter(start_date)
      })
      const data = reservationInDateRange.map((r: IReservation) => r.service?.id)
      setServiceFilter(services.filter((service) => !data.includes(service.id)))
    } catch (error) {
      console.log('Failed:', error)
    }
  }

  const openBookingDialog = async (service: IService) => {
    const fetchPayment = async () => {
      try {
        const result = await AxiosInstance.get('/api/user/payment')
        setPayment(result.data.data)
        setSelectedService(service)
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

  const BookService = async () => {
    try {
      const value = await formBooking.validateFields()
      const date1 = new Date(dateStart!)
      const date2 = new Date(dateEnd!)
      const Difference_In_Time = date2.getTime() - date1.getTime()
      const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24))

      const response = await AxiosInstance.post('/api/reservation', {
        paymentInfoId: value.paymentInfoId,
        price: selectedService!.price * Difference_In_Days,
        roomId: null,
        serviceId: selectedService?.id,
        startDate: dateStart?.toISOString(),
        endDate: dateEnd?.toISOString(),
        type: ReservationType.SERVICE
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
  }

  useEffect(() => {
    const fetchService = async () => {
      try {
        const result = await AxiosInstance.get('/api/service')
        setServices(
          (result.data.data as IService[]).filter((service) => service.serviceType.isActive && service.isActive)
        )
        setServiceFilter(
          (result.data.data as IService[]).filter((service) => service.serviceType.isActive && service.isActive)
        )
      } catch (err) {
        console.log(err)
      }
    }
    fetchService()
  }, [])

  return (
    <>
      <div className="container mx-auto px-8 py-4">
        <div className="space-y-4 py-4 font-bold text-primary-blue-600">
          <h1 className="text-4xl">Services</h1>
          <h1 className="text-3xl">บริการ</h1>
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
              label={<p className="text-xl font-bold text-primary-blue-600">วันที่ต้องการ</p>}
              rules={[
                {
                  required: true,
                  message: 'โปรดระบุช่วงที่ต้องการ'
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
                        return Promise.reject('โปรดระบุช่วงที่ต้องการให้ถูกต้อง')
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
            <Form.Item className="min-w-[16rem] justify-center lg:inline lg:content-end">
              <button
                className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-primary-blue-700 px-4 py-2 font-bold text-white disabled:opacity-50"
                type="submit"
              >
                <p>ค้นหาบริการ</p>
                <SearchOutlined />
              </button>
            </Form.Item>
          </div>
        </Form>
        <div className="mt-8 flex justify-center">
          <div className="grid grid-cols-1 gap-8 font-normal md:grid-cols-2">
            {serviceFilter
              .sort((a, b) => a.price - b.price)
              .map((service) => (
                <CardService
                  key={service.id}
                  data={service}
                  disabled={disabled}
                  onClick={() => openBookingDialog(service)}
                />
              ))}
          </div>
        </div>
      </div>
      <Modal
        open={isModalVisible}
        title={<p className="text-center text-lg">Booking</p>}
        centered
        onCancel={() => {
          setIsModalVisible(false)
          setSelectedService(null)
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
              onClick={() => BookService()}
            >
              <p>Book</p>
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <h1 className="text-lg font-semibold">ประเภท {selectedService?.name}</h1>
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
    </>
  )
}

export default ServicePage
