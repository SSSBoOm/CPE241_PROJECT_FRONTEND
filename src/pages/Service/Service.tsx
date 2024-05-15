import { DatePicker, InputNumber, Space } from 'antd'
import React from 'react'
import Room from '../../components/Card/Room'

const { RangePicker } = DatePicker

const Service: React.FC = () => {
  return (
    <>
      <div className="mt-8 text-center text-4xl font-bold text-primary-blue-600 md:ml-28 md:text-left">
        Services
        <div className="mt-8 text-3xl">
          บริการ
          <div className="mt-5 text-xl">อีกสัมผัสแห่งความสะดวกสบายด้วยบริการมากมายจากทางโรงแรม</div>
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
            <Room />
            <Room />
            <Room />
          </div>
        </div>
      </div>
    </>
  )
}

export default Service
