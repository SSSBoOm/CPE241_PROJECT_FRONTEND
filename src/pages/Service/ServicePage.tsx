import Room from '@/components/Card/Room'
import { IRoomType } from '@/interfaces/RoomType'
import { DatePicker, InputNumber, Space } from 'antd'
import React from 'react'
const { RangePicker } = DatePicker

const data: IRoomType = {
  id: 1,
  name: 'Standard Suite Room',
  detail: 'Standard Suite Room',
  isActive: true,
  updateAt: new Date(),
  createdAt: new Date()
}

const ServicePage: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-8 py-4">
        <div className="space-y-4 py-4 font-bold text-primary-blue-600">
          <h1 className="text-4xl">Services</h1>
          <h1 className="text-3xl">บริการ</h1>
          <p className="text-xl">อีกสัมผัสแห่งความสะดวกสบายด้วยบริการมากมายจากทางโรงแรม</p>
        </div>
        <div className="container mx-auto mt-8 w-fit">
          <Space direction="vertical" size={12}>
            <RangePicker size="large" />
          </Space>
          <InputNumber size="large" min={1} max={8} defaultValue={2} className="mx-9" />
          <button className="text-xl">search</button>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="grid grid-cols-1 gap-8 font-normal sm:grid-cols-1">
            <Room data={data} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicePage
