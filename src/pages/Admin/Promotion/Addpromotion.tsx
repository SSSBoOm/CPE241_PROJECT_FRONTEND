import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { Button, DatePicker, Form, Input, Select, Space } from 'antd'
const { RangePicker } = DatePicker
const Addpromotion = () => {
  return (
    <>
      <p className="text-3xl font-bold text-primary-blue-600">Add Promotion</p>
      <div className="container mx-auto px-4">
        <Form layout="vertical" requiredMark={customizeRequiredMark}>
          <div className="mx-auto grid grid-cols-3 gap-4 ">
            <Form.Item
              label={<p className="text-sm font-semibold">ประเภทห้อง</p>}
              name="typeroom"
              rules={[{ required: true, message: 'กรุณาเลือกห้อง' }]}
            >
              <Select></Select>
            </Form.Item>
            <Form.Item
              label={<p className="text-sm font-semibold">ช่วงเวลาโปรมาชั่น</p>}
              name="date"
              rules={[{ required: true, message: 'กรุณาเลือกช่วงโปรโมชั่น' }]}
            >
              <RangePicker className="w-full"></RangePicker>
            </Form.Item>
            <Form.Item
              label={<p className="text-sm font-semibold">ราคา</p>}
              name="price"
              rules={[{ required: true, message: 'กรุณากรอกราคาโปรโมชั่น' }]}
            >
              <Input></Input>
            </Form.Item>
          </div>
          <div className="text-end md:col-start-2">
            <Space>
              <Form.Item>
                <Button size="large" type="primary">
                  สร้าง
                </Button>
              </Form.Item>
              <Form.Item>
                <Button size="large">ยกเลิก</Button>
              </Form.Item>
            </Space>
          </div>
        </Form>
      </div>
    </>
  )
}
export default Addpromotion
