import { BOOKING_LIST_PATH } from '@/configs/route'
import { ReservationStatus } from '@/interfaces/enums/ReservationStatus'
import { IReservation } from '@/interfaces/Reservation'
import { AxiosInstance } from '@/lib/axios'
import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const BookingDetails: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState<IReservation>()

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await AxiosInstance.get(`/api/reservation/${id}`)
        setBooking(response.data.data)
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'โปรดลองใหม่อีกครั้ง'
        }).then(() => {
          navigate(BOOKING_LIST_PATH)
        })
      }
    }
    fetchBooking()
  }, [id, navigate])

  return (
    <React.Fragment>
      <div className="container mx-auto px-4">
        <div className="space-y-4">
          <div className="flex w-full justify-between">
            <p className="text-3xl font-bold text-primary-blue-600">
              Booking Detail [Booking ID : {booking?.id} | Type : {booking?.type}]
            </p>
          </div>
          {/* User */}
          <div className="mx-auto">
            <p className="text-2xl font-bold text-primary-blue-600">User Details</p>
            <Form layout="vertical" className="grid grid-cols-1 gap-x-4 py-4 lg:grid-cols-2">
              <Form.Item label={<p className="text-lg font-semibold">Firstname</p>}>
                <Input value={booking?.user?.firstName} disabled size="large" />
              </Form.Item>
              <Form.Item label={<p className="text-lg font-semibold">Lastname</p>}>
                <Input value={booking?.user?.lastName} disabled size="large" />
              </Form.Item>
              <Form.Item label={<p className="text-lg font-semibold">Email</p>}>
                <Input value={booking?.user?.email} disabled size="large" />
              </Form.Item>
              <Form.Item label={<p className="text-lg font-semibold">Tel</p>}>
                <Input value={booking?.user?.phone} disabled size="large" />
              </Form.Item>
            </Form>
          </div>
          {/* Payment */}
          <div className="mx-auto">
            <p className="text-2xl font-bold text-primary-blue-600">Payment Details</p>
            <Form layout="vertical" className="grid grid-cols-1 gap-x-4 py-4 lg:grid-cols-2">
              <Form.Item label={<p className="text-lg font-semibold">Payment Firstname</p>}>
                <Input value={booking?.paymentInfo.paymentFirstName} disabled size="large" />
              </Form.Item>
              <Form.Item label={<p className="text-lg font-semibold">Payment Lastname</p>}>
                <Input value={booking?.paymentInfo.paymentLastName} disabled size="large" />
              </Form.Item>
              <Form.Item label={<p className="text-lg font-semibold">Payment Number</p>}>
                <Input value={booking?.paymentInfo.paymentNumber} disabled size="large" />
              </Form.Item>
              <Form.Item label={<p className="text-lg font-semibold">Payment Type</p>}>
                <Input value={booking?.paymentInfo.paymentType?.name} disabled size="large" />
              </Form.Item>

              <div className="lg:col-span-2">
                {booking?.status === ReservationStatus.RESERVATION_STATUS_WAITING_APPROVE_PAYMENT && (
                  <div className="flex w-full justify-end space-x-2">
                    <Button
                      type="primary"
                      onClick={async () => {
                        try {
                          const response = await AxiosInstance.patch(`/api/reservation/status`, {
                            reservationId: booking?.id,
                            status: ReservationStatus.RESERVATION_STATUS_APPROVED_PAYMENT
                          })
                          if (response.status === 200) {
                            Swal.fire({
                              icon: 'success',
                              title: 'Approve การจ่ายเงินสำเร็จ'
                            }).then(() => {
                              window.location.reload()
                            })
                          }
                        } catch (error) {
                          console.log(error)
                          Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาด',
                            text: 'โปรดลองใหม่อีกครั้ง'
                          }).then(() => {
                            navigate(BOOKING_LIST_PATH)
                          })
                        }
                      }}
                    >
                      Approve
                    </Button>
                    <Button type="default" onClick={() => {}}>
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          </div>
          {/* Room */}
          <div className={`mx-auto ${booking?.room === null && 'hidden'}`}>
            <p className="text-2xl font-bold text-primary-blue-600">Room Details</p>
            <Form layout="vertical" className="grid grid-cols-1 gap-x-4 py-4 lg:grid-cols-2">
              <Form.Item label={<p className="text-lg font-semibold">Room Type</p>}>
                <Input value={booking?.room?.roomType?.name} disabled size="large" />
              </Form.Item>
              <Form.Item label={<p className="text-lg font-semibold">Room Number</p>}>
                <Input value={booking?.room?.roomNumber} disabled size="large" />
              </Form.Item>
            </Form>
          </div>
          {/* Service */}
          <div className={`mx-auto ${booking?.service === null && 'hidden'}`}>
            <p className="text-2xl font-bold text-primary-blue-600">Service Details</p>
            <Form layout="vertical" className="grid grid-cols-1 gap-x-4 py-4 lg:grid-cols-2">
              <Form.Item label={<p className="text-lg font-semibold">Service</p>}>
                <Input value={booking?.service?.name} disabled size="large" />
              </Form.Item>
              <Form.Item label={<p className="text-lg font-semibold">Service Type</p>}>
                <Input value={booking?.service?.serviceType.name} disabled size="large" />
              </Form.Item>
              <Form.Item label={<p className="text-lg font-semibold">Service Information</p>} className="lg:col-span-2">
                <Input.TextArea rows={3} value={booking?.service?.information} disabled size="large" />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default BookingDetails
