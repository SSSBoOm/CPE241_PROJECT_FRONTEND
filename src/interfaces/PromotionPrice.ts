import { IRoomTypePromotionPrice } from '@/interfaces/RoomTypePromotionPrice'

export interface IPromotionPrice {
  id: number
  name: string
  price: number
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
  roomTypePromotionPrice?: IRoomTypePromotionPrice[]
}
