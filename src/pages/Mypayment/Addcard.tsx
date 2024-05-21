import { Button, Form, Input, Select, Space } from 'antd'

import { customizeRequiredMark } from '@/components/utils/customizeRequiredMark'

const Addcard = () => {
  return (
    <>
      <div className="min-h-screen bg-[url('hotelview2.svg')] bg-cover bg-no-repeat px-4 py-8">
        <div className="container rounded-xl bg-white p-8 md:mx-auto">
          <h1 className="my-4 text-3xl font-bold text-primary-blue-700">Add Card</h1>
          <Form layout="vertical" requiredMark={customizeRequiredMark}>
            <div className="container mx-auto grid grid-cols-1 gap-3 md:grid-cols-2">
              <Form.Item
                name="cardnumber"
                label={<p>Card number</p>}
                rules={[{ required: true, message: 'กรุณากรอกเลขบัตร' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="typecard"
                label={<p>Type of Card</p>}
                rules={[{ required: true, message: 'กรุณาเลือกประเภทบัตร' }]}
              >
                <Select size="large" options={[{ value: 'mastercard', title: 'Master Card' }]} />
              </Form.Item>
              <Form.Item
                name="Fname"
                label={<p>First Name</p>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อจริง' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="Lname"
                label={<p>Last Name</p>}
                rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="name_card"
                label={<p>Card Name</p>}
                rules={[{ required: true, message: 'กรุณากรอกชื่อบัตร' }]}
              >
                <Input size="large" />
              </Form.Item>
            </div>
            <Form.Item className="text-end">
              <Space>
                <Button size="large" type="primary">
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
export default Addcard
