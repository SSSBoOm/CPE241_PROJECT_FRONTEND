import { ADD_ROOM_MAINTENANCE_PATH } from '@/configs/route'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Room number',
    dataIndex: 'roomnum',
    key: 'roomnum'
  },
  {
    title: 'Start Date maintain',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'End Date maintain',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Check',
    dataIndex: 'check',
    key: 'check'
  }
]
const Service_columns = [
  {
    title: 'Service',
    dataIndex: 'Service',
    key: 'Service'
  },
  {
    title: 'Start Date maintain',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'End Date maintain',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Check',
    dataIndex: 'check',
    key: 'check'
  }
]

const MaintenancePage = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Room Maintenance</p>
            <Link to={ADD_ROOM_MAINTENANCE_PATH}>
              <Button type="primary" className="flex gap-x-2" size="large">
                <p>Add Maintenance</p>
                <PlusOutlined className="place-self-end self-center" />
              </Button>
            </Link>
          </div>
          <div>
            <Table columns={columns}></Table>
          </div>
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Service Maintenance</p>
            <Button type="primary" className="flex gap-x-2" size="large">
              <p>Add Maintenance</p>
              <PlusOutlined className="place-self-end self-center" />
            </Button>
          </div>
          <div>
            <Table columns={Service_columns}></Table>
          </div>
        </div>
      </div>
    </>
  )
}
export default MaintenancePage
