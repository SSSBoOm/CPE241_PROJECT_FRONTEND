import MaintenaceStatusCard from '@/components/Card/MaintenaceStatusCard'
import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { MAINTENANCE_PATH } from '@/configs/route'
import { IMaintenance } from '@/interfaces/Maintenance'
import { IMaintenanceLog } from '@/interfaces/MaintenanceLog'
import { MaintenanceStatus } from '@/interfaces/enums/Maintenance'
import { AxiosInstance } from '@/lib/axios'
import { uploadImage } from '@/lib/supabase'
import { Button, DatePicker, Form, Input, Modal, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import Dragger from 'antd/es/upload/Dragger'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'
import React, { useEffect, useState } from 'react'
import { MdOutlineFileUpload } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
const dateFormat = 'DD/MM/YYYY'

const MaintenanceDetailPage: React.FC = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [data, setData] = useState<IMaintenance>()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [maintenanceLog, setMaintenanceLog] = useState<IMaintenanceLog[]>()

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
      await AxiosInstance.post(`/api/maintenance_log`, {
        date: new Date().toISOString(),
        description: values.description,
        imageUrl: img_path,
        maintenanceId: Number(id),
        status: MaintenanceStatus.MAINTENANCE_LOG_STATUS_PENDING
      })

      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const response = await AxiosInstance.get(`/api/maintenance/${id}`)
        setData(response.data.data)
        setMaintenanceLog(
          (response.data.data.maintenanceLog as IMaintenanceLog[]).sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        )
      } catch (error) {
        console.log(error)
        navigate(MAINTENANCE_PATH)
      }
    }
    fetchMaintenance()
  }, [id, navigate])

  return (
    <React.Fragment>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Maintenance Details</h1>
        <Form layout="vertical" requiredMark={customizeRequiredMark} disabled={true}>
          <div className="container mx-auto grid grid-cols-2 gap-4">
            <Form.Item
              rules={[{ required: true, message: 'กรุณาเลือกประเภทห้อง' }]}
              label={<p className="font-semibold">ประเภทห้อง</p>}
            >
              <Input size="large" value={data?.room.roomType?.name} />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'กรุณากรอกเลขห้อง' }]}
              label={<p className="font-semibold">หมายเลขห้องที่ปิดบำรุง</p>}
            >
              <Input size="large" value={data?.room.roomNumber} />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'กรุณากรอกวันที่' }]}
              label={<p className="font-semibold">วันที่บำรุง</p>}
            >
              <DatePicker
                value={dayjs(
                  data?.maintenanceLog.find(
                    (item) => item.status === MaintenanceStatus.MAINTENANCE_LOG_STATUS_CASE_OPEN
                  )?.date
                )}
                format={dateFormat}
                size="large"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'กรุณากรอกหัวข้อปิดปรับปรุง' }]}
              label={<p className="font-semibold">หัวข้อการปิดบำรุง</p>}
            >
              <Input size="large" value={data?.title} />
            </Form.Item>
            <Form.Item className="lg:col-span-2" label={<p className="font-semibold">รายละเอียดการปิดบำรุง</p>}>
              <Input.TextArea
                rows={4}
                size="large"
                value={
                  data?.maintenanceLog.find(
                    (item) => item.status === MaintenanceStatus.MAINTENANCE_LOG_STATUS_CASE_OPEN
                  )?.description
                }
              />
            </Form.Item>
          </div>
        </Form>
        <h1 className="text-3xl  font-bold text-primary-blue-600">Maintenace Status</h1>
        <div className="container mx-auto space-y-4">
          {maintenanceLog
            ?.sort((a, b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime()
            })
            .map((item) => (
              <MaintenaceStatusCard
                key={item.id}
                C_Date={dayjs(item.date).format('DD/MM/YYYY')}
                C_Details={item.description}
                C_Label={item.staff?.firstName + ' ' + item.staff?.lastName}
                C_Status_name={item.status}
                C_Status={item.status}
                imageUrl={`https://evquseshrfnvyndhterj.supabase.co/storage/v1/object/public/cpe241-image/${item.imageUrl}`}
              />
            ))}
        </div>
        <div className="flex w-full justify-between">
          <button
            onClick={() => setIsModalVisible(true)}
            className="rounded-md bg-primary-blue-600 p-2 text-white hover:bg-primary-blue-700"
          >
            Add Maintenance Log
          </button>

          <button
            onClick={async () => {
              try {
                await AxiosInstance.post(`/api/maintenance_log`, {
                  date: new Date().toISOString(),
                  description: 'การซ่อมแซมเสร็จสิ้นแล้ว',
                  imageUrl: '',
                  maintenanceId: Number(id),
                  status: MaintenanceStatus.MAINTENANCE_LOG_STATUS_DONE
                })
                window.location.reload()
              } catch (error) {
                console.log(error)
              }
            }}
            className="rounded-md bg-primary-blue-600 p-2 text-white hover:bg-primary-blue-700"
          >
            Maintenance Done
          </button>
        </div>
        <Modal
          title="Add Maintenance Log"
          open={isModalVisible}
          onOk={() => {
            setIsModalVisible(false)
          }}
          onCancel={() => {
            setIsModalVisible(false)
          }}
          footer={null}
          centered
        >
          <Form layout="vertical" form={form} requiredMark={customizeRequiredMark} onFinish={onFinish}>
            <Form.Item
              rules={[{ required: true, message: 'กรุณาเลือกวันที่' }]}
              label={<p className="font-semibold">วันที่</p>}
            >
              <DatePicker format={dateFormat} defaultValue={dayjs()} disabled size="large" className="w-full" />
            </Form.Item>
            <Form.Item
              name={'description'}
              rules={[{ required: true, message: 'กรุณากรอกรายละเอียด' }]}
              label={<p className="font-semibold">รายละเอียด</p>}
            >
              <Input.TextArea rows={4} size="large" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: 'กรุณาเลือกรูปภาพ' }]}
              label={<p className="font-semibold">รูปภาพ</p>}
            >
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
            </Form.Item>
            <div className="flex flex-row justify-end space-x-4">
              <Button
                type="primary"
                onClick={() => {
                  setIsModalVisible(false)
                }}
                className="rounded-md bg-primary-blue-600 p-2 text-white hover:bg-primary-blue-700"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setIsModalVisible(false)
                }}
                className="rounded-md bg-primary-blue-600 p-2 text-white hover:bg-primary-blue-700"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </React.Fragment>
  )
}
export default MaintenanceDetailPage
