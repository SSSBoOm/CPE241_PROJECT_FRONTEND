import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { Switch, Table } from 'antd'
interface Roomtype {
  key: string
  name: string
  quantity: number
}
interface room {
  key: string
  roomno: string
  roomtype: string
}
const roomtype_col: TableColumnsType<Roomtype> = [
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
const room_col: TableColumnsType<room> = [
  { title: 'Room No.', dataIndex: 'roomno', key: 'roomno' },
  { title: 'Room Type', dataIndex: 'roomtype', key: 'roomtype' },
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

const roomtype_data: Roomtype[] = [
  {
    key: '1',
    name: 'Deluxe Room',
    quantity: 2
  }
]
const room_data: room[] = [
  {
    key: '1',
    roomno: 'A024',
    roomtype: 'Deluxe Room'
  }
]
const Room_manage: React.FC = () => {
  return (
    <>
      <div className="mb-4 mt-16 grid grid-cols-2 content-center px-7 text-center">
        <p className="text-3xl  font-bold text-primary-blue-600">Room Type</p>
        <PlusOutlined className="place-self-end self-center" />
      </div>
      <div className="mx-auto text-center">
        <Table columns={roomtype_col} dataSource={roomtype_data}></Table>
      </div>

      <div className="mb-4 mt-16 grid grid-cols-2 content-center px-7 ">
        <p className="text-3xl  font-bold text-primary-blue-600">Room</p>
        <PlusOutlined className="place-self-end self-center" />
      </div>
      <div className="mx-auto text-center">
        <Table columns={room_col} dataSource={room_data}></Table>
      </div>
    </>
  )
}
export default Room_manage
