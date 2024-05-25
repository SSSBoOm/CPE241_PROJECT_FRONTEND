import CustomModal from '@/components/Modal/CustomModal'
import { ADD_ROOM_PATH, ADD_ROOM_TYPE_PATH } from '@/configs/route'
import { IRoom } from '@/interfaces/Room'
import { IRoomType } from '@/interfaces/RoomType'
import { AxiosInstance } from '@/lib/axios'
import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Button, Form, Input, InputNumber, Switch, Table } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { Fragment, useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const RoomManagement: React.FC = () => {
  const [form] = Form.useForm()
  const [roomTypeData, setRoomTypeData] = useState<IRoomType[]>([])
  const [roomData, setRoomData] = useState<IRoom[]>([])
  const [roomTypeModal, setRoomTypeModal] = useState<IRoomType | null>(null)
  const [roomTypeModalVisible, setRoomTypeModalVisible] = useState<boolean>(false)
  const roomTypeCol: TableColumnsType<IRoomType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'x',
      render: (_, record: IRoomType, index: number) => {
        return (
          <Switch
            value={record.isActive}
            onChange={async (value: boolean) => {
              try {
                const response = await AxiosInstance.post(`/api/room_type/active`, {
                  id: record.id,
                  isActive: value
                })
                console.log(response)
                if (response.status === 200) {
                  Swal.fire({
                    title: 'Success',
                    text: 'แก้ไขสถานะสำเร็จ',
                    icon: 'success'
                  })
                  setRoomTypeData((prev) => {
                    const newData = [...prev]
                    newData[index].isActive = !newData[index].isActive
                    return newData
                  })
                }
              } catch (error) {
                console.error(error)
                Swal.fire({
                  title: 'Error',
                  text: 'เกิดข้อผิดพลาด',
                  icon: 'error'
                })
              }
            }}
          />
        )
      }
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (_: string, e: IRoomType) => (
        <Button onClick={() => openRoomTypeModal(e)} className="border-0">
          <PiMagnifyingGlass />
        </Button>
      )
    }
  ]

  const roomCol: TableColumnsType<IRoom> = [
    { title: 'Room No.', dataIndex: 'roomNumber', key: 'roomNumber' },
    {
      title: 'Room Type',
      dataIndex: 'roomtype',
      key: 'roomtype',
      render: (_, record) => {
        return record.roomType?.name
      }
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'x',
      render: (_, record: IRoom, index: number) => {
        return (
          <Switch
            value={record.isActive}
            onChange={async (value: boolean) => {
              try {
                const response = await AxiosInstance.post(`/api/room/active`, {
                  id: record.id,
                  isActive: value
                })
                if (response.status === 200) {
                  setRoomData((prev) => {
                    const newData = [...prev]
                    newData[index].isActive = !newData[index].isActive
                    return newData
                  })
                  Swal.fire({
                    title: 'Success',
                    text: 'แก้ไขสถานะสำเร็จ',
                    icon: 'success'
                  })
                }
              } catch (error) {
                console.error(error)
                Swal.fire({
                  title: 'Error',
                  text: 'เกิดข้อผิดพลาด',
                  icon: 'error'
                })
              }
            }}
          />
        )
      }
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () => (
        <Link to="">
          <PiMagnifyingGlass />
        </Link>
      )
    }
  ]

  const openRoomTypeModal = (roomtype: IRoomType) => {
    console.log('open room type modal')
    console.log(roomtype)
    console.log(`฿ ${roomTypeModal?.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`)
    setRoomTypeModal(roomtype)
    setRoomTypeModalVisible(true)
  }
  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const res = await AxiosInstance.get('/api/room_type')
        setRoomTypeData(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }
    const fetchRoom = async () => {
      try {
        const res = await AxiosInstance.get('/api/room')
        setRoomData(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchRoomType()
    fetchRoom()
  }, [])

  return (
    <Fragment>
      <div className="container mx-auto">
        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Room Type</p>
            <Link to={ADD_ROOM_TYPE_PATH}>
              <Button type="primary" className="flex gap-x-2" size="large">
                <p>Add Room Type</p>
                <PlusOutlined className="place-self-end self-center" />
              </Button>
            </Link>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={roomTypeCol}
              pagination={{ pageSize: 5 }}
              dataSource={roomTypeData.map((item) => {
                return {
                  ...item,
                  key: item.id
                }
              })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Room</p>
            <Link to={ADD_ROOM_PATH}>
              <Button type="primary" className="flex gap-x-2" size="large">
                <p>Add Room</p>
                <PlusOutlined className="place-self-end self-center" />
              </Button>
            </Link>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={roomCol}
              pagination={{ pageSize: 5 }}
              dataSource={roomData.map((item) => {
                return {
                  ...item,
                  key: item.id
                }
              })}
            />
          </div>
        </div>
      </div>
      <CustomModal
        visible={roomTypeModalVisible}
        onClose={() => setRoomTypeModalVisible(false)}
        title={`Room Type: ${roomTypeModal?.name}`}
        footer={
          <Button
            type="primary"
            onClick={() => {
              setRoomTypeModalVisible(false)
            }}
          >
            Close
          </Button>
        }
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4">
            <Form.Item className="hidden">
              <Switch value={roomTypeModal?.isActive || false} />
            </Form.Item>
            <Form.Item label="Name" rules={[{ required: true, message: 'กรุณากรอกชื่อห้อง' }]}>
              <Input size="large" placeholder="ชื่อประเภทห้อง" value={roomTypeModal?.name || '123'} />
            </Form.Item>
            <Form.Item label="Price" rules={[{ required: true, message: 'กรุณากรอกราคา' }]}>
              <Input
                size="large"
                placeholder="ราคาต่อคืน"
                readOnly
                value={`฿ ${roomTypeModal?.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
              />
            </Form.Item>

            <Form.Item
              label="Capacity"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกจำนวนคนที่พักได้'
                },
                {
                  pattern: /^[0-9]*$/,
                  message: 'กรุณากรอกจำนวนคนที่พักได้ให้ถูกต้อง'
                }
              ]}
            >
              <InputNumber
                size="large"
                min={1}
                className="w-full"
                placeholder="จำนวนคนต่อห้องพัก"
                readOnly
                value={roomTypeModal?.accommodate || 0}
              />
            </Form.Item>
            <Form.Item
              label="Size"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกขนาดห้อง'
                }
              ]}
            >
              <Input size="large" placeholder="ขนาดห้อง" readOnly value={roomTypeModal?.size || 0} />
            </Form.Item>
            <Form.Item
              label="Bed"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกประเภทเตียง'
                }
              ]}
            >
              <Input size="large" placeholder="ประเภทเตียง" readOnly value={roomTypeModal?.bed || ''} />
            </Form.Item>
            <div className="md:col-span-3">
              <Form.Item
                label="Detail"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกรายละเอียด'
                  }
                ]}
              >
                <TextArea
                  size="large"
                  placeholder="รายละเอียดห้องพัก....."
                  autoSize={{ minRows: 3, maxRows: 4 }}
                  value={roomTypeModal?.detail || ''}
                  readOnly
                />
              </Form.Item>
            </div>
            <div className="my-4 aspect-video max-w-[500px] md:col-span-3">
              <img
                src={`https://evquseshrfnvyndhterj.supabase.co/storage/v1/object/public/cpe241-image/${roomTypeModal?.imageUrl}`}
                alt="room type"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `${window.location.origin}/user_not_found.svg`
                }}
              />
            </div>
          </div>
          <div>
            <Form.Item label={<p className="text-xl font-bold">Room</p>}>
              {roomTypeModal &&
                roomTypeModal?.room &&
                roomTypeModal?.room.map((item: IRoom, index) => {
                  return (
                    <div key={index} className="grid w-full grid-cols-1 md:grid-cols-5 md:gap-x-4">
                      <Form.Item
                        label={<p className="font-semibold">Room Number</p>}
                        rules={[{ required: true, message: 'กรุณากรอกหมายเลขห้อง' }]}
                        className="w-full md:col-span-4"
                      >
                        <Input placeholder="หมายเลขห้อง" size="large" readOnly value={item.roomNumber} />
                      </Form.Item>
                      <div className={`flex w-full justify-center`}>
                        <Form.Item label={<p className="font-semibold">Active</p>}>
                          <Switch value={item.isActive} />
                        </Form.Item>
                      </div>
                    </div>
                  )
                })}
            </Form.Item>
          </div>
        </Form>
      </CustomModal>
    </Fragment>
  )
}
export default RoomManagement
