import { Button, Form, Input, Select, Space } from 'antd'
import Swal from 'sweetalert2'
const Add_room = () => {
  function cancle() {
    Swal.fire({
      title: 'คุณเเน่ใจที่จะออก?',
      text: 'หากออกข้อมูลจะไม่บันทึก',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ใช่, เเน่ใจ'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ออกสำเร็จ',
          text: 'ข้อมูลไม่ได้ถูกบันทึก',
          icon: 'success'
        })
      }
    })
  }
  return (
    <>
      <div>
        <Form layout="vertical">
          <div className="mx-auto grid w-9/12 grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              className="justify-self-end md:w-8/12"
              label="Number Of Room"
              rules={[{ required: true, message: 'กรุณากรอกเลขห้อง' }]}
              name="num"
            >
              <Input
                count={{
                  show: true,
                  max: 30
                }}
              />
            </Form.Item>
            <Form.Item
              className="md:w-8/12"
              label="Type Of Room"
              rules={[{ required: true, message: 'กรุณากรอกเลขห้อง' }]}
              name="type"
            >
              <Select
                options={[
                  { value: 'Standard Room', label: 'Standard Room' },
                  { value: 'Superior Room', label: 'Superior Room' }
                ]}
              />
            </Form.Item>
            <div className="md:col-start-2">
              <Space>
                <Form.Item>
                  <Button>สร้าง</Button>
                </Form.Item>
                <Form.Item>
                  <Button onClick={cancle}>ยกเลิก</Button>
                </Form.Item>
              </Space>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}
export default Add_room
