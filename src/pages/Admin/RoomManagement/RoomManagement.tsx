import { ADD_ROOM_TYPE_PATH } from '@/configs/route'
import { IRoom } from '@/interfaces/Room'
import { IRoomType } from '@/interfaces/RoomType'
import { AxiosInstance } from '@/lib/axios'
import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Button, Switch, Table } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const RoomManagement: React.FC = () => {
  const [roomTypeData, setRoomTypeData] = useState<IRoomType[]>([])
  const [roomData, setRoomData] = useState<IRoom[]>([])

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
      render: () => (
        <Link to="">
          <PiMagnifyingGlass />
        </Link>
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
            <Button
              onClick={() => (document.location = ADD_ROOM_TYPE_PATH)}
              type="primary"
              className="flex"
              size="large"
            >
              <p>Add Room Type</p>
              <PlusOutlined className="place-self-end self-center" />
            </Button>
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
            <Button type="primary" className="flex" size="large">
              <p>Add Room</p>
              <PlusOutlined className="place-self-end self-center" />
            </Button>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={roomCol}
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
    </Fragment>
  )
}
export default RoomManagement
