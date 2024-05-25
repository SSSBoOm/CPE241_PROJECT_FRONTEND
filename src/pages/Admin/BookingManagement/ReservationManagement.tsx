import FormatDate from '@/components/utils/formatDate'
import { BOOKING_DETAILS_PATH } from '@/configs/route'
import { ReservationStatus } from '@/interfaces/enums/ReservationStatus'
import { IReservation } from '@/interfaces/Reservation'
import { AxiosInstance } from '@/lib/axios'
import { Table, TableColumnsType } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const columnsRoom: TableColumnsType<IReservation> = [
  {
    title: 'BookingID',
    dataIndex: 'id',
    key: 'bookingid'
  },
  {
    title: 'Type',
    dataIndex: 'Type',
    key: 'Type',
    render: (_: string, row: IReservation) => row.type
  },
  {
    title: 'Firstname',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_: string, row: IReservation) => row.user?.firstName
  },
  {
    title: 'Lastname',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (_: string, row: IReservation) => row.user?.lastName
  },
  {
    title: 'checkIn',
    dataIndex: 'startDate',
    key: 'checkin',
    render: (date: Date) => FormatDate(date)
  },
  { title: 'checkOut', dataIndex: 'endDate', key: 'checkout', render: (date: Date) => FormatDate(date) },
  {
    title: '',
    dataIndex: '',
    key: 'x',
    render: (_, row: IReservation) => <Link to={`${BOOKING_DETAILS_PATH}/${row.id}`}>Detail</Link>
  }
]

const ReservationManagement: React.FC = () => {
  const [reservationDataWaitPayment, setReservationDataWaitPayment] = useState<IReservation[]>([])
  const [reservationDataCheckIn, setReservationDataCheckIn] = useState<IReservation[]>([])
  const [reservationDataCheckOut, setReservationDataCheckOut] = useState<IReservation[]>([])

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const currentDate = new Date()
        const startDate = new Date(currentDate.setHours(0, 0, 0, 0))
        const endDate = new Date(currentDate.setHours(23, 59, 59, 999))
        const response = await AxiosInstance.get('/api/reservation')

        setReservationDataWaitPayment(
          response.data.data.filter(
            (item: IReservation) => item.status === ReservationStatus.RESERVATION_STATUS_WAITING_APPROVE_PAYMENT
          )
        )

        setReservationDataCheckIn(
          response.data.data.filter(
            (item: IReservation) => new Date(item.startDate) >= startDate && new Date(item.startDate) <= endDate
          )
        )
        setReservationDataCheckOut(
          response.data.data.filter(
            (item: IReservation) => new Date(item.endDate) >= startDate && new Date(item.endDate) <= endDate
          )
        )
      } catch (error) {
        console.error(error)
      }
    }
    fetchReservation()
  }, [])
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Waiting Approve Payment</p>
          </div>
          <div className="mx-auto text-center">
            <Table columns={columnsRoom} dataSource={reservationDataWaitPayment} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Check In</p>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={columnsRoom}
              dataSource={reservationDataCheckIn.filter(
                (item) => item.status === ReservationStatus.RESERVATION_STATUS_WAITING_CHECKIN
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">Check Out</p>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={columnsRoom}
              dataSource={reservationDataCheckOut.filter(
                (item) => item.status === ReservationStatus.RESERVATION_STATUS_WAITING_CHECKED_OUT
              )}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ReservationManagement
