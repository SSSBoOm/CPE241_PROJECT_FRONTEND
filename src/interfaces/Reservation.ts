import { ReservationStatus } from '@/interfaces/enums/ReservationStatus'
import { ReservationType } from '@/interfaces/enums/ReservationType'
import { IPayment } from '@/interfaces/Payment'
import { IRoom } from '@/interfaces/Room'
import { IService } from '@/interfaces/Service'
import { IUser } from '@/interfaces/User'

export interface IReservation {
  id: number
  type: ReservationType
  room?: IRoom
  service?: IService
  userId: string
  user?: IUser
  startDate: Date
  endDate: Date
  price: number
  status: ReservationStatus
  paymentDate: Date
  paymentInfo: IPayment
  createdAt: Date
  updatedAt: Date
}
