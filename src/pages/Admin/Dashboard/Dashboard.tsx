import { ReservationDashboard } from '@/interfaces/Dashboard'
import { AxiosInstance } from '@/lib/axios'
import { Select } from 'antd'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard: React.FC = () => {
  const [monthL1, setMonthL1] = useState<number>(new Date().getMonth())
  const [monthR1, setMonthR1] = useState<number>(new Date().getMonth())
  const [reservationRoomTypeDashboard, setReservationRoomTypeDashboard] = useState<ReservationDashboard[]>([])
  const [reservationRoomTypeCountByReserv, setReservationRoomTypeCountByReserv] = useState<ReservationDashboard[]>([])
  const [reservationServiceTypeDashboard, setReservationServiceTypeDashboard] = useState<ReservationDashboard[]>([])
  const [reservationServiceTypeCountByReserv, setReservationServiceTypeCountByReserv] = useState<
    ReservationDashboard[]
  >([])
  const [reservationPaymentTypeDashboard, setReservationPaymentTypeDashboard] = useState<
    Omit<ReservationDashboard, 'id'>[]
  >([])
  const [maintenanceByRoomType, setMaintenanceByRoomType] = useState<ReservationDashboard[]>([])

  const fetchReservationRoomTypeDashboard = async (month: number) => {
    try {
      const currentDate = new Date()
      const result = await AxiosInstance.post('/api/dashboard/reservation/room_type', {
        startDate: new Date(currentDate.getFullYear(), month, 1),
        endDate: new Date(currentDate.getFullYear(), month + 1, 0)
      })
      if (result.status === 200) {
        setReservationRoomTypeDashboard(result.data.data)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const fetchReservationRoomTypeCountByReserv = async (month: number) => {
    try {
      const currentDate = new Date()
      const result = await AxiosInstance.post('/api/dashboard/reservation/room_type_by_booking', {
        startDate: new Date(currentDate.getFullYear(), month, 1),
        endDate: new Date(currentDate.getFullYear(), month + 1, 0)
      })
      if (result.status === 200) {
        setReservationRoomTypeCountByReserv(result.data.data)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const fetchReservationServiceTypeDashboard = async (month: number) => {
    try {
      const currentDate = new Date()
      const result = await AxiosInstance.post('/api/dashboard/reservation/service_type', {
        startDate: new Date(currentDate.getFullYear(), month, 1),
        endDate: new Date(currentDate.getFullYear(), month + 1, 0)
      })
      if (result.status === 200) {
        setReservationServiceTypeDashboard(result.data.data)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const fetchReservationServiceTypeCountByReserv = async (month: number) => {
    try {
      const currentDate = new Date()
      const result = await AxiosInstance.post('/api/dashboard/reservation/service_type_by_booking', {
        startDate: new Date(currentDate.getFullYear(), month, 1),
        endDate: new Date(currentDate.getFullYear(), month + 1, 0)
      })
      if (result.status === 200) {
        setReservationServiceTypeCountByReserv(result.data.data)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const fetchReservationPaymentTypeDashboard = async (month: number) => {
    try {
      const currentDate = new Date()
      const result = await AxiosInstance.post('/api/dashboard/reservation/payment_type', {
        startDate: new Date(currentDate.getFullYear(), month, 1),
        endDate: new Date(currentDate.getFullYear(), month + 1, 0)
      })
      if (result.status === 200) {
        setReservationPaymentTypeDashboard(result.data.data)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const fetchMaintenanceByRoomType = async (month: number) => {
    try {
      const currentDate = new Date()
      const result = await AxiosInstance.post('/api/dashboard/reservation/maintenance', {
        startDate: new Date(currentDate.getFullYear(), month, 1),
        endDate: new Date(currentDate.getFullYear(), month + 1, 0)
      })
      if (result.status === 200) {
        setMaintenanceByRoomType(result.data.data)
      }
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    const currentDate = new Date()
    Promise.all([
      fetchReservationRoomTypeDashboard(currentDate.getMonth()),
      fetchReservationRoomTypeCountByReserv(currentDate.getMonth()),
      fetchReservationServiceTypeDashboard(currentDate.getMonth()),
      fetchReservationServiceTypeCountByReserv(currentDate.getMonth()),
      fetchReservationPaymentTypeDashboard(currentDate.getMonth()),
      fetchMaintenanceByRoomType(currentDate.getMonth())
    ])
  }, [])
  return (
    <React.Fragment>
      <div className="container mx-auto space-y-8 px-4">
        <h1 className="text-3xl font-bold text-primary-blue-600">Dashboard</h1>

        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-x-4 space-y-4 xl:grid-cols-2 xl:space-y-0">
          {/* L */}
          <div className="flex flex-col rounded-md bg-slate-300 bg-opacity-15 py-4">
            <div className="grid grid-cols-3">
              <div></div>
              <h1 className="text-center text-xl font-bold text-primary-blue-600">Price In Month</h1>
              <Select
                value={monthL1}
                onChange={(value) => {
                  fetchReservationRoomTypeDashboard(value)
                  fetchReservationServiceTypeDashboard(value)
                  setMonthL1(value)
                }}
                options={[
                  { label: 'January', value: 0 },
                  { label: 'February', value: 1 },
                  { label: 'March', value: 2 },
                  { label: 'April', value: 3 },
                  { label: 'May', value: 4 },
                  { label: 'June', value: 5 },
                  { label: 'July', value: 6 },
                  { label: 'August', value: 7 },
                  { label: 'September', value: 8 },
                  { label: 'October', value: 9 },
                  { label: 'November', value: 10 },
                  { label: 'December', value: 11 }
                ]}
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-1 gap-y-4">
                <h1 className="text-center text-xl font-bold text-primary-blue-600">By Room Type</h1>
                <div className="flex w-full justify-center">
                  {reservationRoomTypeDashboard && reservationRoomTypeDashboard.length > 0 ? (
                    <Bar
                      className="aspect-square max-w-[16rem]"
                      data={{
                        labels: reservationRoomTypeDashboard.map((item) => item.name),
                        datasets: [
                          {
                            label: 'Price',
                            data: reservationRoomTypeDashboard.map((item) => item.total),
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'bottom'
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="">ไม่มีข้อมูล</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                <h1 className="text-center text-xl font-bold text-primary-blue-600">Service Type</h1>
                <div className="flex w-full justify-center">
                  {reservationServiceTypeDashboard && reservationServiceTypeDashboard.length > 0 ? (
                    <Bar
                      className="aspect-square max-w-[16rem]"
                      data={{
                        labels: reservationServiceTypeDashboard.map((item) => item.name),
                        datasets: [
                          {
                            label: 'Price',
                            data: reservationServiceTypeDashboard.map((item) => item.total),
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'bottom'
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="">ไม่มีข้อมูล</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* R */}
          <div className="flex flex-col rounded-md bg-slate-300 bg-opacity-15 py-4">
            <div className="grid grid-cols-3">
              <div></div>
              <h1 className="text-center text-xl font-bold text-primary-blue-600">Booking In Month</h1>
              <Select
                value={monthR1}
                onChange={(value) => {
                  fetchReservationRoomTypeCountByReserv(value)
                  fetchReservationServiceTypeCountByReserv(value)
                  setMonthR1(value)
                }}
                options={[
                  { label: 'January', value: 0 },
                  { label: 'February', value: 1 },
                  { label: 'March', value: 2 },
                  { label: 'April', value: 3 },
                  { label: 'May', value: 4 },
                  { label: 'June', value: 5 },
                  { label: 'July', value: 6 },
                  { label: 'August', value: 7 },
                  { label: 'September', value: 8 },
                  { label: 'October', value: 9 },
                  { label: 'November', value: 10 },
                  { label: 'December', value: 11 }
                ]}
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-1 gap-y-4">
                <h1 className="text-center text-xl font-bold text-primary-blue-600">By Room Type</h1>
                <div className="flex w-full justify-center">
                  {reservationRoomTypeCountByReserv && reservationRoomTypeCountByReserv.length > 0 ? (
                    <Pie
                      className="aspect-square max-w-[16rem]"
                      data={{
                        labels: reservationRoomTypeCountByReserv.map((item) => item.name),
                        datasets: [
                          {
                            label: 'Total Price',
                            data: reservationRoomTypeCountByReserv.map((item) => item.total),
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'bottom'
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="">ไม่มีข้อมูล</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                <h1 className="text-center text-xl font-bold text-primary-blue-600">By Service Type</h1>
                <div className="flex w-full justify-center">
                  {reservationServiceTypeCountByReserv && reservationServiceTypeCountByReserv.length > 0 ? (
                    <Pie
                      className="aspect-square max-w-[16rem]"
                      data={{
                        labels: reservationServiceTypeCountByReserv.map((item) => item.name),
                        datasets: [
                          {
                            label: 'Total Price',
                            data: reservationServiceTypeCountByReserv.map((item) => item.total),
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'bottom'
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="">ไม่มีข้อมูล</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-1 gap-x-4 space-y-4 xl:grid-cols-2 xl:space-y-0">
          {/* L */}
          <div className="flex flex-col rounded-md bg-slate-300 bg-opacity-15 py-4">
            <h1 className="text-center text-xl font-bold text-primary-blue-600">Payment Type</h1>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-1 gap-y-4">
                <h1 className="text-center text-xl font-bold text-primary-blue-600">Payment Type</h1>
                <div className="flex w-full justify-center">
                  <Pie
                    className="aspect-square max-w-[16rem]"
                    data={{
                      labels: reservationPaymentTypeDashboard.map((item) => item.name),
                      datasets: [
                        {
                          label: 'Total Price',
                          data: reservationPaymentTypeDashboard.map((item) => item.total),
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                          ],
                          borderWidth: 1
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-4">
                <h1 className="text-center text-xl font-bold text-primary-blue-600">By Payment Type</h1>
                <div className="flex w-full justify-center">
                  <Bar
                    className="aspect-square max-w-[16rem]"
                    data={{
                      labels: maintenanceByRoomType.map((item) => item.name),
                      datasets: [
                        {
                          label: '',
                          data: maintenanceByRoomType.map((item) => item.total),
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                          ],
                          borderWidth: 1
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* R */}
          <div className="flex flex-col rounded-md bg-slate-300 bg-opacity-15 py-4"></div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
