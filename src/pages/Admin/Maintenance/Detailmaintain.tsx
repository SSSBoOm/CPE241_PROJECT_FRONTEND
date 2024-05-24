import MaintenaceStatusCard from '@/components/Card/MaintenaceStatusCard'
import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { DatePicker, Form, Input } from 'antd'
const { RangePicker } = DatePicker
const { TextArea } = Input

const detailmaintain = () => {
  return (
    <>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Create Room Maintenance</h1>
        <Form
          layout="vertical"
          requiredMark={customizeRequiredMark}
          disabled={true}
          initialValues={{
            Roomnum: '',
            date: '',
            headdetail: '',
            detail: ''
          }}
        >
          <div className="container mx-auto grid grid-cols-2 gap-4">
            <Form.Item
              name="roomTypeId"
              rules={[{ required: true, message: 'กรุณาเลือกประเภทห้อง' }]}
              label={<p className="font-semibold">ประเภทห้อง</p>}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="roomNumber"
              rules={[{ required: true, message: 'กรุณากรอกเลขห้อง' }]}
              label={<p className="font-semibold">หมายเลขห้องที่ปิดบำรุง</p>}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[{ required: true, message: 'กรุณากรอกวันที่' }]}
              label={<p className="font-semibold">วันที่บำรุง</p>}
            >
              <RangePicker size="large" className="w-full" />
            </Form.Item>
            <Form.Item
              name="headdetail"
              rules={[{ required: true, message: 'กรุณากรอกหัวข้อปิดปรับปรุง' }]}
              label={<p className="font-semibold">หัวข้อการปิดบำรุง</p>}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item className="" name="detail" label={<p className="font-semibold">รายละเอียดการปิดบำรุง</p>}>
              <TextArea rows={4} size="large" />
            </Form.Item>
          </div>
        </Form>
        <h1 className="text-3xl  font-bold text-primary-blue-600">Maintenace Status</h1>
        <div className="container mx-auto space-y-4">
          <MaintenaceStatusCard
            C_Date="24/2/42"
            C_Details="ได้ส่งเรื่อง"
            C_Label="ส่งเรื่องเเก่หัวหน้า"
            C_Status_name="สร้างหัวข้อ"
            C_Status="Create"
          />
        </div>
      </div>
    </>
  )
}
export default detailmaintain
