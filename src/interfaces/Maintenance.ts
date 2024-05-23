import { IMaintenanceLog } from '@/interfaces/MaintenanceLog'
import { IRoom } from '@/interfaces/Room'

export interface IMaintenance {
  id: number
  room: IRoom
  staffId: string
  maintenanceLog: IMaintenanceLog[]
  updatedAt: Date
  createdAt: Date
}
