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
