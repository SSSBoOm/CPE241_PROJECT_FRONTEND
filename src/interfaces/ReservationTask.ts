import { IReservation } from '@/interfaces/Reservation'

export interface IReservationTask {
  id: number
  reservation: IReservation
  staffId: null
  staff: null
  status: boolean
  date: Date
  updatedAt: Date
  createdAt: Date
}
