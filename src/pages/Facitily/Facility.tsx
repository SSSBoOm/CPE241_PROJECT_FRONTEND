import { facilityCard } from '@/mocks/facilityMock'
import { Button, Card, Modal } from 'antd'
import React, { useState } from 'react'
const { Meta } = Card
const Facility: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dialogId, setDialogId] = useState(0)
  const showModal = (index: number) => {
    setDialogId(index)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className=" container mx-2 mt-6 grid gap-4 md:mx-auto md:grid-cols-4">
        <div className="mt-16 w-full text-center text-3xl font-bold text-primary-blue-600 md:col-span-4 md:text-left">
          Our Facility
        </div>
        <div className="w-full text-center text-lg font-bold text-primary-blue-600 text-opacity-50 md:col-span-4 md:text-left">
          สิ่งอำนวยความสะดวก
        </div>
        <div className="w-full text-center text-lg font-bold text-primary-blue-600 text-opacity-50 md:col-span-4 md:text-left">
          อีกสัมผัสแห่งความสะดวกสบายด้วยบริการมากมายจากทางโรงแรม
        </div>
        {facilityCard.map((element, index) => {
          return (
            <Card
              hoverable={true}
              className={'w-min-80 h-min-[25rem] h-full w-full border-primary-blue-600 md:border-2'}
              cover={<img src={element.image} />}
              actions={[
                <Button className="text-primary-blue-500" onClick={() => showModal(index)}>
                  more
                </Button>
              ]}
              key={index}
            >
              <Meta className="h-full min-h-[8rem]" title={element.name} description={element.content} />
            </Card>
          )
        })}
      </div>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        closeIcon={null}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Close
          </Button>
        ]}
      >
        {facilityCard[dialogId] ? (
          <>
            <div className="flex flex-wrap">
              <div className="mb-6 w-full text-gray-500">
                <label htmlFor="facility" className="mb-2 block text-sm font-medium text-gray-700">
                  Facility
                </label>
                <span className="text-sm text-gray-900">{facilityCard[dialogId].name}</span>
              </div>
              <div className="mb-6 w-full">
                <label htmlFor="startDate" className="mb-2 block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <span className="text-sm text-gray-900">{facilityCard[dialogId].startdate}</span>
              </div>
              <div className="mb-6 w-full">
                <label htmlFor="endDate" className="mb-2 block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <span className="text-sm text-gray-900">{facilityCard[dialogId].enddate}</span>
              </div>
              <div className="mb-6 w-full">
                <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-700">
                  Price
                </label>
                <span className="text-sm text-gray-900">{facilityCard[dialogId].price}</span>
              </div>
              <div className="w-full">
                <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
                  Content
                </label>
                {facilityCard[dialogId].content}
              </div>
            </div>
          </>
        ) : (
          <div>Facility not found</div>
        )}
      </Modal>
    </>
  )
}

export default Facility
