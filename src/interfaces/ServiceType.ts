import { IService } from '@/interfaces/Service'

export interface IServiceType {
  id: number
  name: string
  detail: string
  isActive: boolean
  service: IService[]
  updateAt: Date
  createdAt: Date
}
