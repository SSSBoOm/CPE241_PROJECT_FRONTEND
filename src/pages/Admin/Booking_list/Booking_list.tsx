import { EditOutlined } from '@ant-design/icons'
import { DatePicker, Form } from 'antd'
const Booking_list: React.FC = () => {
  return (
    <>
      <div className="mb-4 mt-16 grid grid-cols-2 content-center px-7 text-center">
        <p className="text-3xl  font-bold text-primary-blue-600">User Management</p>
      </div>
      <div>
        <Form layout="vertical">
          <Form.Item className="mx-4 inline-block w-48" label="Date">
            <DatePicker />
          </Form.Item>
        </Form>
      </div>
      <div className="mx-auto max-w-fit text-center">
        <table className=" table-auto">
          <thead>
            <tr>
              <th className="border-2 border-primary-blue-600 px-4">BookingID</th>
              <th className="border-2 border-primary-blue-600 px-4">RoomNo.</th>
              <th className="border-2 border-primary-blue-600 px-4">Firstname</th>
              <th className="border-2 border-primary-blue-600 px-4">Lastname</th>
              <th className="border-2 border-primary-blue-600 px-4">checkIn</th>
              <th className="border-2 border-primary-blue-600 px-4">checkOut</th>
              <th className="border-2 border-primary-blue-600 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-primary-blue-600 px-4">00223</td>
              <td className="border-2 border-primary-blue-600 px-4">A24</td>
              <td className=" border-2 border-primary-blue-600 px-4">Panachai</td>
              <td className="border-2 border-primary-blue-600 px-4">Bualoi</td>

              <td className="border-2 border-primary-blue-600 px-4">44/25/5554</td>
              <td className="border-2 border-primary-blue-600 px-4">34/04/2004</td>
              <td className="border-2 border-primary-blue-600 px-4">coming</td>
              <td>
                <a href="/admin/booking_details">
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
export default Booking_list
