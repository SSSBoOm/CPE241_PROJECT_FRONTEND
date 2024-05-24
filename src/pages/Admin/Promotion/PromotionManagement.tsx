import { ADD_PROMOTIONADMIN_PATH } from '@/configs/route'
import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Button, Switch, Table } from 'antd'
import { Link } from 'react-router-dom'

const PromotionManagement = () => {
  const column_data: TableColumnsType = [
    {
      title: 'Room Type',
      dataIndex: 'RoomType',
      key: 'RoomType'
    },
    {
      title: 'Promotion price',
      dataIndex: 'promotionPrice',
      key: 'promotionPrice'
    },
    {
      title: 'Start date',
      dataIndex: 'startdate',
      key: 'startdate'
    },
    {
      title: 'End date',
      dataIndex: 'startdate',
      key: 'startdate'
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'x',
      render: () => {
        return <Switch />
      }
    }
  ]
  return (
    <>
      <div className="container mx-auto px-8 py-4">
        <div className=" flex h-fit w-full content-center justify-between space-y-4 px-4">
          <p className="content-center text-3xl font-bold text-primary-blue-600">Create Promotion</p>
          <Link to={ADD_PROMOTIONADMIN_PATH}>
            <Button size="large" type="primary" className="h-fit content-center">
              Add promotion
              <PlusOutlined className=" place-self-end self-center" />
            </Button>
          </Link>
        </div>

        <Table columns={column_data} />
      </div>
    </>
  )
}
export default PromotionManagement
