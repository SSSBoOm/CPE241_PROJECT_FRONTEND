import { IRoomType } from '@/interfaces/RoomType'

export interface IRoomTypePromotionPrice {
  id: number
  promotionPrice: null
  roomType?: IRoomType
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
