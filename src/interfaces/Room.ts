import { IRoomType } from '@/interfaces/RoomType'

export interface IRoom {
  id: number
  roomNo: string
  roomTypeId: number
  isActive: boolean
  roomType?: IRoomType
}
