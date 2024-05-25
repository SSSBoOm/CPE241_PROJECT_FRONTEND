import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { MAINTENANCE_PATH } from '@/configs/route'
import { IRoom } from '@/interfaces/Room'
import { IRoomType } from '@/interfaces/RoomType'
import { MaintenanceStatus } from '@/interfaces/enums/Maintenance'
import { AxiosInstance } from '@/lib/axios'
import { uploadImage } from '@/lib/supabase'
import { Button, DatePicker, Form, GetProps, Input, Select, Space, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import Dragger from 'antd/es/upload/Dragger'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'
import { useEffect, useState } from 'react'
import { MdOutlineFileUpload } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
const dateFormat = 'DD/MM/YYYY'
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current < dayjs().endOf('day')
}

const CreateMaintenance = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [selectRoomType, setSelectRoomType] = useState<number>(0)
  const [room, setRoom] = useState<IRoom[]>([])
  const [roomType, setRoomType] = useState<IRoomType[]>([])
  const [uploadImageFile, setUploadImageFile] = useState<File>(new File([], ''))

  const uploadProps: UploadProps = {
    multiple: true,
    maxCount: 1,
    action: '',
    showUploadList: false,
    beforeUpload(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        return false
      }
      setUploadImageFile(file)
      return false
    }
  }

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const response = await AxiosInstance.get('/api/room_type')
        setRoomType(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRoom = async () => {
      try {
        const response = await AxiosInstance.get('/api/room')
        setRoom(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    Promise.all([fetchRoomType(), fetchRoom()])
  }, [])

  const onFinish = async () => {
    try {
      if (uploadImageFile.name === '') {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาอัพโหลดรูปภาพ',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        return
      }
      // Upload Image
      // using supa
      let img_path = ''
      try {
        img_path = await uploadImage(uploadImageFile)
      } catch (error) {
        console.error(error)
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถอัพโหลดรูปภาพได้',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        throw new Error('Upload Image Error')
      }
      const values = form.getFieldsValue()
      const response = await AxiosInstance.post('/api/maintenance', {
        roomId: values.roomId,
        title: values.title,
        maintenanceLog: [
          {
            imageUrl: img_path,
            description: values.description,
            date: values.date,
            STATUS: MaintenanceStatus.MAINTENANCE_LOG_STATUS_CASE_OPEN
          }
        ]
      })
      if (response.status === 201) {
        form.resetFields()
        Swal.fire({
          icon: 'success',
          title: 'สร้างการบำรุงรักษาสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate(MAINTENANCE_PATH)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Create Maintenance</h1>
        <Form
          layout="vertical"
          requiredMark={customizeRequiredMark}
          form={form}
          onFinish={onFinish}
          initialValues={{
            Roomnum: '',
            date: '',
            headdetail: '',
            detail: ''
          }}
        >
          <div className="container mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Form.Item
              name="roomTypeId"
              rules={[{ required: true, message: 'กรุณาเลือกประเภทห้อง' }]}
              label={<p className="font-semibold">ประเภทห้อง</p>}
            >
              <Select
                size="large"
                onChange={(value) => {
                  setSelectRoomType(value)
                  form.setFieldsValue({ roomId: '' })
                }}
                options={roomType.map((item) => {
                  return {
                    label: item.name,
                    value: item.id
                  }
                })}
              />
            </Form.Item>
            <Form.Item
              name="roomId"
              rules={[{ required: true, message: 'กรุณากรอกเลขห้อง' }]}
              label={<p className="font-semibold">หมายเลขห้องที่ปิดบำรุง</p>}
            >
              <Select
                size="large"
                options={room
                  .filter((item) => item.roomType?.id === selectRoomType)
                  .map((item) => {
                    return {
                      label: item.roomNumber,
                      value: item.id
                    }
                  })}
              />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[{ required: true, message: 'กรุณากรอกวันที่' }]}
              label={<p className="font-semibold">กำหนดการเริ่มซ่อมบำรุง</p>}
            >
              <DatePicker disabledDate={disabledDate} format={dateFormat} size="large" className="w-full" />
            </Form.Item>
            <Form.Item
              name="title"
              rules={[{ required: true, message: 'กรุณากรอกหัวข้อปิดปรับปรุง' }]}
              label={<p className="font-semibold">หัวข้อการปิดบำรุง</p>}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true, message: 'กรุณากรอกรายละเอียดการปิดบำรุง' }]}
              className="lg:col-span-2"
              label={<p className="font-semibold">รายละเอียดการปิดบำรุง</p>}
            >
              <Input.TextArea size="large" rows={3} />
            </Form.Item>
            <div className="my-4 aspect-video max-w-[500px] md:col-span-2">
              <ImgCrop rotationSlider aspect={1920 / 1080}>
                <Dragger {...uploadProps}>
                  {uploadImageFile.name === '' ? (
                    <div>
                      <p className="ant-upload-drag-icon flex w-full justify-center">
                        <MdOutlineFileUpload className="text-primary-blue h-16 w-16" />
                      </p>
                      <p className="text-primary-blue my-2 text-xl font-semibold underline">อัปโหลดรูปภาพ</p>
                      <p className="text-black">ไฟล์รูปต้องเป็นขนาด 1920 W * 1080 H , สูงสุด 1 รูป</p>
                    </div>
                  ) : (
                    <img
                      src={URL.createObjectURL(uploadImageFile)}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                  )}
                </Dragger>
              </ImgCrop>
            </div>
            <div className="text-end lg:col-start-2">
              <Space>
                <Form.Item>
                  <Button size="large" type="primary" htmlType="submit">
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
export default CreateMaintenance
