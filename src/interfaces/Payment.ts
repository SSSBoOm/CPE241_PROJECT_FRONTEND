import { IPaymentType } from '@/interfaces/PaymentType'

export interface IPayment {
  id: number
  name: string
  paymentFirstName: string
  paymentLastName: string
  paymentTypeId: string
  paymentNumber: string
  paymentType?: IPaymentType
}
