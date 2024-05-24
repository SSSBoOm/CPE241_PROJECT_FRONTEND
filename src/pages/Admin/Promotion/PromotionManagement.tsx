import FormatDate from '@/components/utils/formatDate'
import { ADD_PROMOTIONADMIN_PATH } from '@/configs/route'
import { IPromotionPrice } from '@/interfaces/PromotionPrice'
import { AxiosInstance } from '@/lib/axios'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Table, TableColumnsType } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PromotionManagement: React.FC = () => {
  const [data, setData] = useState<IPromotionPrice[]>([])

  const column_data: TableColumnsType<IPromotionPrice> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Promotion price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => {
        return <p className="text-center">{price}</p>
      }
    },
    {
      title: 'Start date',
      dataIndex: 'startdate',
      key: 'startdate',
      render: (_: string, row: IPromotionPrice) => {
        return <p className="text-center">{FormatDate(row.startDate)}</p>
      }
    },
    {
      title: 'End date',
      dataIndex: 'startdate',
      key: 'startdate',
      render: (_: string, row: IPromotionPrice) => {
        return <p className="text-center">{FormatDate(row.endDate)}</p>
      }
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/api/promotion_price')
        setData(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <div className="container mx-auto">
        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Promotion</p>
            <Link to={ADD_PROMOTIONADMIN_PATH}>
              <Button type="primary" className="flex gap-x-2" size="large">
                <p>Create Promotion</p>
                <PlusOutlined className="place-self-end self-center" />
              </Button>
            </Link>
          </div>
          <div className="mx-auto text-center">
            <Table columns={column_data} dataSource={data} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default PromotionManagement
