import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Switch, Table } from 'antd'
interface servicetype {
  key: string
  name: string
  quantity: number
}
const service_col: TableColumnsType<servicetype> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },

  {
    title: 'Status',
    dataIndex: '',
    key: 'x',
    render: () => <Switch checkedChildren="On" unCheckedChildren="Off" />
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a href="">Edit</a>
  }
]
const service_data: servicetype[] = [
  {
    key: '1',
    name: 'Deluxe Room',
    quantity: 2
  }
]
const Service_manage: React.FC = () => {
  return (
    <>
      <div className="mb-4 mt-16 grid grid-cols-2 content-center px-7 text-center">
        <p className="text-3xl  font-bold text-primary-blue-600">Service Type</p>
        <PlusOutlined className="place-self-end self-center" />
      </div>
      <div className="mx-auto w-fit text-center">
        <Table columns={service_col} dataSource={service_data}></Table>
      </div>
    </>
  )
}
export default Service_manage
