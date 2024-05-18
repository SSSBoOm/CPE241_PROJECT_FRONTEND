import type { TableColumnsType } from 'antd'
import { DatePicker, Form, Table } from 'antd'
interface Datatype {
  key: string
  bookingid: string
  roomno: string
  userid: string
  fname: string
  lname: string
  checkin: string
  checkout: string
}
const columns: TableColumnsType<Datatype> = [
  {
    title: 'BookingID',
    dataIndex: 'bookingid',
    key: 'bookingid'
  },
  { title: 'RoomNo.', dataIndex: 'roomno', key: 'roomno' },
  { title: 'UserID', dataIndex: 'userid', key: 'userid' },
  { title: 'Firstname', dataIndex: 'fname', key: 'fname' },
  { title: 'Lastname', dataIndex: 'lname', key: 'lname' },
  { title: 'checkIn', dataIndex: 'checkin', key: 'checkin' },
  { title: 'checkOut', dataIndex: 'checkout', key: 'checkout' },

  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a href="/admin/booking_details">Check</a>
  }
]
const data: Datatype[] = [
  {
    key: '1',
    bookingid: '0042',
    userid: '001',
    fname: 'Panachai',
    lname: 'Bualoi',
    roomno: 'A245',
    checkin: '05/06/2024',
    checkout: '06/06/2024'
  },
  {
    key: '1',
    bookingid: '0044',
    userid: '001',
    fname: 'Panachai',
    lname: 'Bualoi',
    roomno: 'A245',
    checkin: '05/06/2024',
    checkout: '06/06/2024'
  }
]
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
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  )
}
export default Booking_list
