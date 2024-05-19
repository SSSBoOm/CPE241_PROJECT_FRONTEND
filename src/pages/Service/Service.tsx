import { DatePicker, InputNumber, Space } from 'antd'
import React from 'react'
import ServiceCard from '../../components/Card/Service_card'

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
            <div className="mx-auto my-8 w-5/12">
              <ServiceCard accommodate={2} content="dwdwdwdw" name="dwdwdwwd" price={24} image="Room_2.jpg" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Service
