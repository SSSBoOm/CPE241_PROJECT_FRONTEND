import { IRoom } from '@/interfaces/Room'

export interface IRoomType {
  id: number
  name: string
  detail: string
  price: number
  accommodate: number
  isActive: boolean
  room?: IRoom[]
  updateAt: Date
  createdAt: Date
}
