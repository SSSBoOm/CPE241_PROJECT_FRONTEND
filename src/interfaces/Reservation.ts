import { ReservationType } from '@/interfaces/enums/ReservationType'
import { IPayment } from '@/interfaces/Payment'
import { IRoom } from '@/interfaces/Room'
import { IService } from '@/interfaces/Service'
import { IUser } from '@/interfaces/User'

export enum ReservationStatus {
  RESERVATION_STATUS_WAITING_APPROVE_PAYMENT = 'WAITING_APPROVE_PAYMENT',
  RESERVATION_STATUS_REJECTED_PAYMENT = 'REJECTED_PAYMENT',
  RESERVATION_STATUS_APPROVED_PAYMENT = 'APPROVED_PAYMENT',
  RESERVATION_STATUS_WAITING_CHECKIN = 'WAITING_CHECKIN',
  RESERVATION_STATUS_CHECKED_IN = 'CHECKED_IN',
  RESERVATION_STATUS_WAITING_CHECKED_OUT = 'WAITING_CHECKED_OUT',
  RESERVATION_STATUS_SUCCESS = 'SUCCESS',
  RESERVATION_STATUS_CANCELED = 'CANCELED'
}

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
