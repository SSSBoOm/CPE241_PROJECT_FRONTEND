import CustomModal from '@/components/Modal/CustomModal'
import { ADD_SERVICE_PATH, ADD_SERVICE_TYPE_PATH } from '@/configs/route'
import { IService } from '@/interfaces/Service'
import { IServiceType } from '@/interfaces/ServiceType'
import { AxiosInstance } from '@/lib/axios'
import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Button, Form, Input, Switch, Table } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ServiceManagement: React.FC = () => {
  const [serviceTypeData, setServiceTypeData] = useState<IServiceType[]>([])
  const [serviceData, setServiceData] = React.useState<IService[]>([])
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [selectedService, setSelectedService] = React.useState<IService | null>(null)
  const [form] = Form.useForm()
  const showModal = (service: IService) => {
    setSelectedService(service)
    setIsModalVisible(true)
  }
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
            defaultValue={true}
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
      render: (_: string, data: IService) => (
        <Button className="border-0" onClick={() => showModal(data)}>
          <PiMagnifyingGlass />
        </Button>
      )
    }
  ]

  useEffect(() => {
    const fetchServiceType = async () => {
      try {
        const res = await AxiosInstance.get('/api/service_type')
        setServiceTypeData(res.data.data)
      } catch (err) {
        console.error(err)
      }
    }
    const fetchService = async () => {
      try {
        const res = await AxiosInstance.get('/api/service')
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
            <Link to={ADD_SERVICE_TYPE_PATH}>
              <Button type="primary" className="flex gap-x-2" size="large">
                <p>Add Service Type</p>
                <PlusOutlined className="place-self-end self-center" />
              </Button>
            </Link>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={serviceTypeCol}
              pagination={{ pageSize: 5 }}
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
            <Link to={ADD_SERVICE_PATH}>
              <Button type="primary" className="flex gap-x-2" size="large">
                <p>Add Service</p>
                <PlusOutlined className="place-self-end self-center" />
              </Button>
            </Link>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={serviceCol}
              pagination={{ pageSize: 5 }}
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
      <CustomModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Service Detail"
        footer={<Button onClick={() => setIsModalVisible(false)}>Close</Button>}
      >
        <Form layout="vertical" form={form}>
          <div className="mx-auto grid grid-cols-1 gap-x-2 lg:grid-cols-2">
            <Form.Item
              label={<p className="font-semibold">ประเภทบริการ</p>}
              rules={[{ required: true, message: 'กรุณาเลือกประเภทบริการ' }]}
            >
              <Input size="large" placeholder="ประเภทบริการ" value={selectedService?.serviceType.name} readOnly />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">ชื่อบริการ</p>}
              rules={[{ required: true, message: 'กรุณากรอกชื่อบริการ' }]}
            >
              <Input size="large" placeholder="ชื่อบริการ" value={selectedService?.name} readOnly />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">ข้อมูลเพิ่มเติม (สำหรับภายใน)</p>}
              rules={[{ required: true, message: 'กรุณากรอกทะเบียนรถหรือหมายเลขเรือ' }]}
            >
              <Input size="large" placeholder="ข้อมูลเพิ่มเติม" value={selectedService?.information} readOnly />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">คำอธิบาย</p>}
              rules={[{ required: true, message: 'กรุณากรอกทะเบียนรถหรือหมายเลขเรือ' }]}
            >
              <Input size="large" placeholder="คำอธิบาย" value={selectedService?.description} readOnly />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold">ราคา</p>}
              rules={[
                { required: true, message: 'กรุณากรอกราคา' },
                { message: 'กรุณากรอกเป็นตัวเลข', pattern: /^[0-9]*$/ }
              ]}
            >
              <Input size="large" placeholder="ราคา" value={selectedService?.price} readOnly />
            </Form.Item>
          </div>

          <div className="my-4 aspect-video max-w-[500px] md:col-span-3">
            <img
              src={`https://evquseshrfnvyndhterj.supabase.co/storage/v1/object/public/cpe241-image/${selectedService?.imageUrl}`}
              alt="room type"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `${window.location.origin}/user_not_found.svg`
              }}
            />
          </div>
        </Form>
      </CustomModal>
    </Fragment>
  )
}
export default ServiceManagement
