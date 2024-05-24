import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { IPaymentType } from '@/interfaces/PaymentType'
import { AxiosInstance } from '@/lib/axios'
import type { TableColumnsType } from 'antd'
import { Button, Form, Input, Modal, Table } from 'antd'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const column_data: TableColumnsType<IPaymentType> = [
  {
    title: 'Type name',
    dataIndex: 'name',
    key: 'typename'
  }
]

const PaymentManagement = () => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState<IPaymentType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/api/payment_type')
        setData(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    Promise.all([fetchData()])
  }, [])

  return (
    <>
      <div className="container mx-auto">
        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Payment Type</p>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setIsModalVisible(true)
              }}
            >
              Create Payment Type
            </Button>
          </div>
          <Table columns={column_data} dataSource={data} />
        </div>
      </div>

      <Modal
        title={<p className="text-center text-lg">Create Payment Type</p>}
        open={isModalVisible}
        onCancel={() => {
          form.resetFields()
          setIsModalVisible(false)
        }}
        onOk={async () => {
          try {
            const values = await form.validateFields()
            const response = await AxiosInstance.post('/api/payment_type', {
              name: values.name
            })

            if (response.status === 201) {
              setIsModalVisible(false)
              form.resetFields()
              Swal.fire({
                icon: 'success',
                title: 'เพิ่มประเภทการจ่ายเงินสำเร็จ'
              }).then(() => {
                window.location.reload()
              })
            }
          } catch (error) {
            console.log(error)
          }
        }}
      >
        <Form form={form} requiredMark={customizeRequiredMark} layout="vertical">
          <Form.Item
            label={<p className="text-lg font-semibold">ประเภทการจ่ายเงิน</p>}
            name={'name'}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกประเภทการจ่ายเงิน!'
              }
            ]}
          >
            <Input placeholder="ประเภทการจ่ายเงิน" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default PaymentManagement
