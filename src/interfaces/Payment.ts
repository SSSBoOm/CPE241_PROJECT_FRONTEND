import { IPaymentType } from '@/interfaces/PaymentType'

export interface IPayment {
  name: string
  paymentFirstName: string
  paymentLastName: string
  paymentTypeId: string
  paymentNumber: string
  paymentType?: IPaymentType
}
