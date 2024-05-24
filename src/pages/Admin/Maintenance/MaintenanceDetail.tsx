import MaintenaceStatusCard from '@/components/Card/MaintenaceStatusCard'
import customizeRequiredMark from '@/components/utils/customizeRequiredMark'
import { IMaintenance } from '@/interfaces/Maintenance'
import { IMaintenanceLog } from '@/interfaces/MaintenanceLog'
import { MaintenanceStatus } from '@/interfaces/enums/Maintenance'
import { AxiosInstance } from '@/lib/axios'
import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
const dateFormat = 'DD/MM/YYYY'

const MaintenanceDetailPage: React.FC = () => {
  const { id } = useParams()
  const [data, setData] = useState<IMaintenance>()
  const [maintenanceLog, setMaintenanceLog] = useState<IMaintenanceLog[]>()

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
      }
    }
    fetchMaintenance()
  }, [id])

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
          {maintenanceLog?.map((item) => (
            <MaintenaceStatusCard
              C_Date={dayjs(item.date).format('DD/MM/YYYY')}
              C_Details={item.description}
              C_Label={item.staff?.firstName + ' ' + item.staff?.lastName}
              C_Status_name={item.status}
              C_Status={item.status}
            />
          ))}
          {/* <MaintenaceStatusCard
            C_Date="24/2/42"
            C_Details="ได้ส่งเรื่อง"
            C_Label="ส่งเรื่องเเก่หัวหน้า"
            C_Status_name="สร้างหัวข้อ"
            C_Status="Create"
          /> */}
        </div>
      </div>
    </React.Fragment>
  )
}
export default MaintenanceDetailPage
