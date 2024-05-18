import { EditOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
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
        <table className=" table-auto">
          <thead>
            <tr>
              <th className="border-2 border-primary-blue-600 px-4">UserID</th>
              <th className="border-2 border-primary-blue-600 px-4">Firstname</th>
              <th className="border-2 border-primary-blue-600 px-4">Lastname</th>
              <th className="border-2 border-primary-blue-600 px-4">Phone</th>
              <th className="border-2 border-primary-blue-600 px-4">DOB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-primary-blue-600 px-4">00223</td>
              <td className=" border-2 border-primary-blue-600 px-4">Panachai...</td>
              <td className="border-2 border-primary-blue-600 px-4">Bualoi</td>
              <td className="border-2 border-primary-blue-600 px-4">061 xxx xxxx</td>
              <td className="border-2 border-primary-blue-600 px-4">34/04/2004</td>
              <td>
                <a href="/admin/user_datils">
                  <EditOutlined />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
export default User_management
