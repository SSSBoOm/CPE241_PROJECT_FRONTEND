import { CREATE_MAINTENANCE_PATH, DETAIL_MAINTENACE_PATH } from '@/configs/route'
import { MaintenanceStatus } from '@/interfaces/enums/Maintenance'
import { IMaintenance } from '@/interfaces/Maintenance'
import { AxiosInstance } from '@/lib/axios'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Table, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FormatDate = 'DD/MM/YYYY'

const columns: TableColumnsType<IMaintenance> = [
  {
    title: 'Room number',
    dataIndex: 'roomNumber',
    key: 'roomNumber',
    render: (_: string, row: IMaintenance) => <p>{row.room.roomNumber}</p>
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Start Date maintain',
    dataIndex: 'date',
    key: 'startDate',
    render: (_: string, row: IMaintenance) => {
      const date = row.maintenanceLog.find(
        (item) => item.status === MaintenanceStatus.MAINTENANCE_LOG_STATUS_CASE_OPEN
      )?.createdAt

      if (!date) {
        return <p>-</p>
      }
      return <p>{dayjs(date).format(FormatDate)}</p>
    }
  },
  {
    title: 'End Date maintain',
    dataIndex: 'date',
    key: 'endDate',
    render: (_: string, row: IMaintenance) => {
      const date = row.maintenanceLog.find(
        (item) => item.status === MaintenanceStatus.MAINTENANCE_LOG_STATUS_DONE
      )?.createdAt

      if (!date) {
        return <p>-</p>
      }
      return <p>{dayjs(date).format(FormatDate)}</p>
    }
  },
  {
    title: 'Detail',
    dataIndex: '',
    key: 'check',
    render: (_: string, row: IMaintenance) => (
      <Link to={`${DETAIL_MAINTENACE_PATH}/${row.id}`}>
        <Button type="primary">Detail</Button>
      </Link>
    )
  }
]

const MaintenancePage = () => {
  const [data, setData] = useState<IMaintenance[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/api/maintenance')
        setData(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="container mx-auto">
        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Maintenance</p>
            <Link to={CREATE_MAINTENANCE_PATH}>
              <Button type="primary" className="flex gap-x-2" size="large">
                <p>Create Maintenance</p>
                <PlusOutlined className="place-self-end self-center" />
              </Button>
            </Link>
          </div>
          <div>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </>
  )
}
export default MaintenancePage
