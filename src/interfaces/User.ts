import { IReservation } from '@/interfaces/Reservation'

export interface IUser {
  id: string
  email: string
  prefix: string
  firstName: string
  lastName: string
  dob: Date
  phone: string
  gender: string
  address: string
  profileUrl: string
  reservation?: IReservation[]
  updateAt: Date
  createdAt: Date
}
