import { ADDCARD_PATH } from '@/configs/route'
import { IPayment } from '@/interfaces/Payment'
import { AxiosInstance } from '@/lib/axios'
import { Button, Table, TableColumnsType } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const columns: TableColumnsType<IPayment> = [
  {
    title: 'Card Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Card Number',
    dataIndex: 'paymentNumber',
    key: 'paymentNumber'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_: string, record: IPayment) => {
      return `${record.paymentFirstName} ${record.paymentLastName}`
    }
  },
  {
    title: 'Type of Card',
    dataIndex: 'type',
    key: 'type',
    render: (_: string, record: IPayment) => {
      return record.paymentType?.name
    }
  }
]

const MyPaymentPage: React.FC = () => {
  const [payment, setPayment] = useState<IPayment[]>([])

  useEffect(() => {
    const getPayment = async () => {
      try {
        const response = await AxiosInstance.get('/api/user/payment')
        console.log(response.data.data)

        setPayment(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPayment()
  }, [])

  return (
    <>
      <div className="min-h-screen bg-[url('hotelview2.svg')] bg-cover bg-no-repeat px-4 py-8">
        <div className="container space-y-4 rounded-xl bg-white p-8 md:mx-auto">
          <div className="flex justify-between sm:px-8">
            <p className="text-2xl font-semibold text-primary-blue-700">Payment</p>
            <Button type="primary">
              <Link to={ADDCARD_PATH}>Add Card</Link>
            </Button>
          </div>
          <div className="container mx-auto">
            <Table columns={columns} dataSource={payment} />
          </div>
        </div>
      </div>
    </>
  )
}
export default MyPaymentPage
