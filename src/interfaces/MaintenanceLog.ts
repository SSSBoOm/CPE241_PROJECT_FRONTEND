import { MaintenanceStatus } from '@/interfaces/enums/Maintenance'
import { IUser } from '@/interfaces/User'

export interface IMaintenanceLog {
  id: number
  staffId: string
  staff: IUser
  description: string
  imageUrl: string
  date: Date
  status: MaintenanceStatus
  updatedAt: Date
  createdAt: Date
}
