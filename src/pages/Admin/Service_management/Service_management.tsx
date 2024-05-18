import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
const Service_manage: React.FC = () => {
  return (
    <>
      <div className="mb-4 mt-16 grid grid-cols-2 content-center px-7 text-center">
        <p className="text-3xl  font-bold text-primary-blue-600">Service Type</p>
        <PlusOutlined className="place-self-end self-center" />
      </div>
      <div className="mx-auto w-fit text-center">
        <table className="w-96 table-auto">
          <thead>
            <tr>
              <th className="border-2 border-primary-blue-600">Name</th>
              <th className="border-2 border-primary-blue-600">Quantity</th>
              <th className="border-2 border-primary-blue-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-primary-blue-600">Deluxe Room</td>
              <td className="border-2 border-primary-blue-600">2</td>
              <td className="border-2 border-primary-blue-600">
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </td>
              <td>
                <a href="">
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
export default Service_manage
