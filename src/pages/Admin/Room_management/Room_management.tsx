import { PlusOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
const Room_manage: React.FC = () => {
  return (
    <>
      <div className="mb-4 mt-16 grid grid-cols-2 content-center px-7 text-center">
        <p className="text-3xl  font-bold text-primary-blue-600">Room Type</p>
        <PlusOutlined className="place-self-end self-center" />
      </div>
      <div className="mx-auto w-fit text-center">
        <table className="w-96 table-auto">
          <thead>
            <tr className="border-2 border-primary-blue-600">
              <th>Name</th>
              <th className="border-2 border-primary-blue-600">Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-2 border-primary-blue-600">
              <td>Deluxe Room</td>
              <td className="border-2 border-primary-blue-600">2</td>
              <td>
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4 mt-16 grid grid-cols-2 content-center px-7 ">
        <p className="text-3xl  font-bold text-primary-blue-600">Room</p>
        <PlusOutlined className="place-self-end self-center" />
      </div>
      <div className="mx-auto w-fit text-center">
        <table className="w-96 table-auto">
          <thead>
            <tr className="border-2 border-primary-blue-600">
              <th>Room No.</th>
              <th className="border-2 border-primary-blue-600">Room Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-2 border-primary-blue-600">
              <td>1</td>
              <td className="border-2 border-primary-blue-600">Deluxe Room</td>
              <td>
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
export default Room_manage
