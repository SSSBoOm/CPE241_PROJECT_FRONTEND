import { IServiceType } from '@/interfaces/ServiceType'

export interface IService {
  id: number
  name: string
  isActive: boolean
  serviceType: IServiceType
  updateAt: Date
  createdAt: Date
}
