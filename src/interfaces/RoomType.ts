import { IRoom } from '@/interfaces/Room'

export interface IRoomType {
  id: number
  name: string
  detail: string
  price: number
  accommodate: number
  imageUrl: string
  isActive: boolean
  room?: IRoom[]
  bed: string
  size: number
  updateAt: Date
  createdAt: Date
}
