import { IRoomType } from '@/interfaces/RoomType'

export interface IRoom {
  id: number
  roomNumber: string
  roomTypeId: number
  isActive: boolean
  roomType?: IRoomType
}
