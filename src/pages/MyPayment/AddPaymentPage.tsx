import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { MY_PAYMENT_PATH } from '@/configs/route'
import { AxiosInstance } from '@/lib/axios'
import { Button, Form, Input, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddPaymentPage: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [OptionPaymentType, setOptionPaymentType] = useState<
    {
      label: string
      value: number
    }[]
  >([])

  const onFinish = async () => {
    try {
      const value = await form.validateFields()
      const response = await AxiosInstance.post('/api/payment', {
        name: value.name,
        paymentNumber: value.paymentNumber,
        paymentTypeId: Number(value.paymentTypeId),
        paymentFirstName: value.paymentFirstName,
        paymentLastName: value.paymentLastName
      })

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'เพิ่มบัตรสำเร็จ',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate(MY_PAYMENT_PATH)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getPaymentType = async () => {
      try {
        const response = await AxiosInstance.get('/api/payment_type')
        setOptionPaymentType(
          response.data.data.map((item: { id: number; name: string }) => ({
            label: item.name,
            value: item.id
          }))
        )
      } catch (error) {
        console.log(error)
      }
    }
    Promise.all([getPaymentType()])
  }, [])

  return (
    <>
      <div className="min-h-screen bg-[url('hotelview2.svg')] bg-cover bg-no-repeat px-4 py-8">
        <div className="container rounded-xl bg-white p-8 md:mx-auto">
          <h1 className="my-4 text-3xl font-bold text-primary-blue-700">Add Card</h1>
          <Form
            layout="vertical"
            requiredMark={customizeRequiredMark}
            form={form}
            onFinish={onFinish}
            initialValues={{
              name: '',
              paymentNumber: '',
              paymentTypeId: '',
              paymentFirstName: '',
              paymentLastName: ''
            }}
          >
            <div className="container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2">
              <Form.Item
                name="name"
                label={<p>Card Name</p>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อบัตร' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="paymentNumber"
                label={<p>Card number</p>}
                rules={[{ required: true, message: 'กรุณากรอกเลขบัตร' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="paymentFirstName"
                label={<p>First Name</p>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อจริง' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="paymentLastName"
                label={<p>Last Name</p>}
                rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="paymentTypeId"
                label={<p>Type of Card</p>}
                rules={[{ required: true, message: 'กรุณาเลือกประเภทบัตร' }]}
              >
                <Select size="large" options={OptionPaymentType} />
              </Form.Item>
            </div>
            <Form.Item className="text-end">
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  Add card
                </Button>
                <Button size="large">Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
export default AddPaymentPage
