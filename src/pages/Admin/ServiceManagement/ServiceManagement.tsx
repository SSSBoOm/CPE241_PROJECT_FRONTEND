import { IService } from '@/interfaces/Service'
import { IServiceType } from '@/interfaces/ServiceType'
import { AxiosInstance } from '@/lib/axios'
import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Switch, Table } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ServiceManagement: React.FC = () => {
  const [serviceTypeData, setServiceTypeData] = useState<IServiceType[]>([])
  const [serviceData, setServiceData] = React.useState<IService[]>([])

  const serviceTypeCol: TableColumnsType<IServiceType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'x',
      render: (_, record: IServiceType, index: number) => {
        return (
          <Switch
            value={record.isActive}
            onChange={async (value: boolean) => {
              try {
                const response = await AxiosInstance.post(`/api/service_type/active`, {
                  id: record.id,
                  isActive: value
                })
                if (response.status === 200) {
                  Swal.fire({
                    title: 'Success',
                    text: 'แก้ไขสถานะสำเร็จ',
                    icon: 'success'
                  })
                  setServiceTypeData((prev) => {
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

  const serviceCol: TableColumnsType<IService> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      key: 'serviceType',
      render: (_, record) => {
        return record.serviceType.name
      }
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'x',
      render: (_, record: IService, index: number) => {
        return (
          <Switch
            value={record.isActive}
            onChange={async (value: boolean) => {
              try {
                const response = await AxiosInstance.post(`/api/service/active`, {
                  id: record.id,
                  isActive: value
                })
                if (response.status === 200) {
                  setServiceData((prev) => {
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
    const fetchServiceType = async () => {
      try {
        const res = await AxiosInstance.get('/api/service_type/all')
        setServiceTypeData(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }
    const fetchService = async () => {
      try {
        const res = await AxiosInstance.get('/api/service/all')
        setServiceData(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchServiceType()
    fetchService()
  }, [])

  return (
    <Fragment>
      <div className="container mx-auto">
        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Service Type</p>
            <button className="flex min-w-[8rem] justify-center space-x-2 rounded-md bg-primary-blue-500 px-4 py-2 text-white">
              <p>Add Service Type</p>
              <PlusOutlined className="place-self-end self-center" />
            </button>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={serviceTypeCol}
              dataSource={serviceTypeData.map((item) => {
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
            <p className="text-3xl  font-bold text-primary-blue-600">Service</p>
            <button className="flex min-w-[8rem] justify-center space-x-2 rounded-md bg-primary-blue-500 px-4 py-2 text-white">
              <p>Add Service</p>
              <PlusOutlined className="place-self-end self-center" />
            </button>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={serviceCol}
              dataSource={serviceData.map((item) => {
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
export default ServiceManagement
