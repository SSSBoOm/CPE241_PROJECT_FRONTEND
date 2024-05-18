import type { TableColumnsType } from 'antd'
import { Button, Form, Input, Table } from 'antd'
interface Datatype {
  key: string
  userid: string
  fname: string
  lname: string
  phone: string
  dob: string
}
const columns: TableColumnsType<Datatype> = [
  {
    title: 'UserID',
    dataIndex: 'userid',
    key: 'userid'
  },
  { title: 'Firstname', dataIndex: 'fname', key: 'fname' },
  { title: 'Lastname', dataIndex: 'lname', key: 'lname' },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  { title: 'DOB', dataIndex: 'dob', key: 'dob' },

  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a href="/admin/user_datils">Check</a>
  }
]
const data: Datatype[] = [
  {
    key: '1',
    userid: '001',
    fname: 'Panachai',
    lname: 'Bualoi',
    phone: 'xxx-xxx-xxxx',
    dob: '04/01/2004'
  }
]
const User_management: React.FC = () => {
  return (
    <>
      <div className="mb-4 mt-16 grid grid-cols-2 content-center px-7 text-center">
        <p className="text-3xl  font-bold text-primary-blue-600">User Management</p>
      </div>
      <div>
        <Form layout="vertical">
          <Form.Item className="mx-4 inline-block w-48" label="First name">
            <Input />
          </Form.Item>
          <Form.Item className="mx-4 inline-block w-48" label="First name">
            <Input />
          </Form.Item>
          <Form.Item className="mx-4 inline-block" label=" ">
            <Button>Search</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="mx-auto max-w-fit text-center">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  )
}
export default User_management
