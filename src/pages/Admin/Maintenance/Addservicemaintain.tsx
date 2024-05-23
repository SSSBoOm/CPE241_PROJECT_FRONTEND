import { customizeRequiredMark } from '@/components/utils/customizeRequiredMark'
import { Button, DatePicker, Form, Input, Select, Space } from 'antd'
const { RangePicker } = DatePicker
const Addservicemaintain = () => {
  return (
    <>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Create Service maintain</h1>
        <Form layout="vertical" requiredMark={customizeRequiredMark}>
          <div className="container mx-auto grid grid-cols-2 gap-4">
            <Form.Item
              name="servicename"
              rules={[{ required: true, message: 'กรุณากรอกบริการที่ปิดบำรุง' }]}
              label={<p className="font-semibold">บริการที่ปิดบำรุง</p>}
            >
              <Select size="large"></Select>
            </Form.Item>
            <Form.Item
              name="date"
              rules={[{ required: true, message: 'กรุณากรอกวันที่บำรุง' }]}
              label={<p className="font-semibold">วันที่บำรุง</p>}
            >
              <RangePicker size="large" className="w-full" />
            </Form.Item>
            <Form.Item
              name="headdetail"
              rules={[{ required: true, message: 'กรุณากรอกหัวข้อการปิดบำรุง' }]}
              label={<p className="font-semibold">หัวข้อการปิดบำรุง</p>}
            >
              <Input size="large"></Input>
            </Form.Item>
            <Form.Item name="detail" label={<p className="font-semibold">รายละเอียดการปิดบำรุง</p>}>
              <Input size="large"></Input>
            </Form.Item>
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
          </div>
        </Form>
      </div>
    </>
  )
}
export default Addservicemaintain
