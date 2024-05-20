import { IRoom } from '@/interfaces/Room'
import { IRoomType } from '@/interfaces/RoomType'
import { AxiosInstance } from '@/lib/axios'
import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Switch, Table } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const RoomManagement: React.FC = () => {
  const [roomTypeData, setRoomTypeData] = useState<IRoomType[]>([])
  const [roomData, setRoomData] = React.useState<IRoom[]>([])

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
        const res = await AxiosInstance.get('/api/room_type/all')
        setRoomTypeData(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }
    const fetchRoom = async () => {
      try {
        const res = await AxiosInstance.get('/api/room/all')
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
            <button className="flex min-w-[8rem] justify-center space-x-2 rounded-md bg-primary-blue-500 px-4 py-2 text-white">
              <p>Add Room Type</p>
              <PlusOutlined className="place-self-end self-center" />
            </button>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={roomTypeCol}
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
            <button className="flex min-w-[8rem] justify-center space-x-2 rounded-md bg-primary-blue-500 px-4 py-2 text-white ">
              <p>Add Room</p>
              <PlusOutlined className="place-self-end self-center" />
            </button>
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
