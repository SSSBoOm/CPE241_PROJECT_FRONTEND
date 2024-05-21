import { ADDCARD_PATH } from '@/configs/route'
import { Button, Table } from 'antd'
const columns = [
  {
    title: 'Card Name',
    dataIndex: 'card_name',
    key: 'card_name'
  },
  {
    title: 'Card Number',
    dataIndex: 'card_number',
    key: 'card_number'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Type of Card',
    dataIndex: 'type',
    key: 'type'
  }
]
const Mypayment = () => {
  return (
    <>
      <div className="min-h-screen bg-[url('hotelview2.svg')] bg-cover bg-no-repeat px-4 py-8">
        <div className="container rounded-xl bg-white p-8 md:mx-auto">
          <div className="flex justify-between py-2 sm:px-8">
            <p className="text-2xl font-semibold text-primary-blue-700">Payment</p>
            <Button type="primary" onClick={() => (document.location = ADDCARD_PATH)}>
              <p>Add Card</p>
            </Button>
          </div>
          <div className="container mx-auto">
            <Table columns={columns}></Table>
          </div>
        </div>
      </div>
    </>
  )
}
export default Mypayment
