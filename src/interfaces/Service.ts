import { IServiceType } from '@/interfaces/ServiceType'

export interface IService {
  id: number
  name: string
  description: string
  information: string
  price: number
  imageUrl: string
  isActive: boolean
  serviceType: IServiceType
  updateAt: Date
  createdAt: Date
}
