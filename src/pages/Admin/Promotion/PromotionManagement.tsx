import CustomModal from '@/components/Modal/CustomModal'
import FormatDate from '@/components/utils/formatDate'
import { ADD_PROMOTIONADMIN_PATH } from '@/configs/route'
import { IPromotionPrice } from '@/interfaces/PromotionPrice'
import { AxiosInstance } from '@/lib/axios'
import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, GetProps, Input, Table, TableColumnsType } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'

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

const PromotionManagement: React.FC = () => {
  const [data, setData] = useState<IPromotionPrice[]>([])
  const [visible, setVisible] = useState(false)
  const [modalData, setModalData] = useState<IPromotionPrice | null>(null)
  const [form] = Form.useForm()
  const openModal = (data: IPromotionPrice) => {
    setModalData(data)
    setVisible(true)
  }

  const column_data: TableColumnsType<IPromotionPrice> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Promotion price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => {
        return <p className="text-center">{price}</p>
      }
    },
    {
      title: 'Start date',
      dataIndex: 'startdate',
      key: 'startdate',
      render: (_: string, row: IPromotionPrice) => {
        return <p className="text-center">{FormatDate(row.startDate)}</p>
      }
    },
    {
      title: 'End date',
      dataIndex: 'startdate',
      key: 'startdate',
      render: (_: string, row: IPromotionPrice) => {
        return <p className="text-center">{FormatDate(row.endDate)}</p>
      }
    },
    {
      title: 'Detail',
      key: 'manage',
      render: (_: string, row: IPromotionPrice) => {
        return <Button onClick={() => openModal(row)}>Detail</Button>
      }
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/api/promotion_price')
        setData(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <div className="container mx-auto">
        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Promotion</p>
            <Link to={ADD_PROMOTIONADMIN_PATH}>
              <Button type="primary" className="flex gap-x-2" size="large">
                <p>Create Promotion</p>
                <PlusOutlined className="place-self-end self-center" />
              </Button>
            </Link>
          </div>
          <div className="mx-auto text-center">
            <Table columns={column_data} dataSource={data} />
          </div>
        </div>
      </div>
      <CustomModal
        visible={visible}
        title="Promotion Detail"
        onClose={() => setVisible(false)}
        footer={<Button onClick={() => setVisible(false)}>Close</Button>}
      >
        <Form layout="vertical" form={form}>
          <div className="mx-auto grid grid-cols-1 gap-x-4 lg:grid-cols-3 ">
            <Form.Item
              label={<p className="text-sm font-semibold">ชื่อ</p>}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
            >
              <Input size="large" value={modalData?.name} readOnly />
            </Form.Item>
            <Form.Item
              label={<p className="text-sm font-semibold">ช่วงเวลาโปรโมชั่น</p>}
              rules={[{ required: true, message: 'กรุณาเลือกช่วงโปรโมชั่น' }]}
            >
              <RangePicker
                disabled
                disabledDate={disabledDate}
                format={dateFormat}
                className="w-full !cursor-default !bg-white !text-black "
                size="large"
                value={[dayjs(modalData?.startDate), dayjs(modalData?.endDate)]}
                inputReadOnly={true}
                onClick={() => {
                  return
                }}
              />
            </Form.Item>
            <Form.Item
              label={<p className="text-sm font-semibold">ราคา</p>}
              rules={[
                { required: true, message: 'กรุณากรอกราคาโปรโมชั่น' },
                { message: 'กรุณากรอกตัวเลข', pattern: /^[0-9]*$/ }
              ]}
            >
              <Input size="large" value={`฿ ${modalData?.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
            </Form.Item>
            <div className="lg:col-span-3">
              {modalData &&
                modalData.roomTypePromotionPrice &&
                modalData.roomTypePromotionPrice.map((room) => {
                  return (
                    <div key={room.roomType?.id} className="grid grid-cols-12">
                      <Form.Item
                        label={<p className="text-sm font-semibold">ประเภทห้อง</p>}
                        className={'col-span-12'}
                        rules={[{ required: true, message: 'กรุณาเลือกประเภทห้อง' }]}
                      >
                        <Input size="large" value={room.roomType?.name} readOnly />
                      </Form.Item>
                    </div>
                  )
                })}
            </div>
          </div>
        </Form>
      </CustomModal>
    </React.Fragment>
  )
}
export default PromotionManagement
