import { MaintenanceStatus } from '@/interfaces/enums/Maintenance'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined
} from '@ant-design/icons'
import { Card } from 'antd'
interface detailCard {
  C_Status_name: string
  C_Status: string
  C_Label: string
  C_Details: string
  C_Date: string
}

const MaintenaceStatusCard = (detailCards: detailCard) => {
  function checkStatus(Status: string) {
    if (
      Status === MaintenanceStatus.MAINTENANCE_LOG_STATUS_APPROVED ||
      Status === MaintenanceStatus.MAINTENANCE_LOG_STATUS_DONE
    ) {
      return (
        <p className="rounded-md bg-green-600/60 p-2 text-xl font-semibold text-primary-blue-600">
          <CheckCircleOutlined />
          {detailCards.C_Status_name}
        </p>
      )
    } else if (Status === MaintenanceStatus.MAINTENANCE_LOG_STATUS_PENDING) {
      return (
        <p className=" rounded-md bg-primary-orange/60 p-2 text-xl font-semibold text-primary-blue-600">
          <InfoCircleOutlined />
          {detailCards.C_Status_name}
        </p>
      )
    } else if (Status === MaintenanceStatus.MAINTENANCE_LOG_STATUS_CASE_OPEN) {
      return (
        <p className=" rounded-md bg-primary-orange/60 p-2 text-xl font-semibold text-primary-blue-600">
          <InfoCircleOutlined />
          {detailCards.C_Status_name}
        </p>
      )
    } else if (Status === MaintenanceStatus.MAINTENANCE_LOG_STATUS_REJECTED) {
      return (
        <p className=" rounded-md bg-red-700/60 p-2 text-xl font-semibold text-primary-blue-600">
          <CloseCircleOutlined />
          {detailCards.C_Status_name}
        </p>
      )
    } else {
      return (
        <p className="rounded-md bg-red-700/60 p-2 text-xl font-semibold text-primary-blue-600">
          <WarningOutlined />
          ERROR don't have {detailCards.C_Status_name} Status
        </p>
      )
    }
  }

  return (
    <>
      <Card
        title={
          <div className="flex w-full justify-between">
            <div className="flex align-middle">{checkStatus(detailCards.C_Status)}</div>
            <p className="p-2 text-xl  font-semibold text-primary-blue-600">
              <ClockCircleOutlined />
              {detailCards.C_Date}
            </p>
          </div>
        }
        className="w-full text-primary-blue-600"
      >
        <div className="w-[60rem] text-pretty">
          <p className="text-lg font-semibold">{detailCards.C_Label}</p>
          <p className=" break-words text-sm">{detailCards.C_Details}</p>
        </div>
        <div className="mt-4 flex flex-row gap-3">
          <img className="h-20 w-20 rounded-md object-cover" src="/Room_1.jpg" alt="" />
          <img className="h-20 w-20 rounded-md object-cover" src="/Room_1.jpg" alt="" />
          <img className="h-20 w-20 rounded-md object-cover" src="/Room_1.jpg" alt="" />
        </div>
      </Card>
    </>
  )
}
export default MaintenaceStatusCard
