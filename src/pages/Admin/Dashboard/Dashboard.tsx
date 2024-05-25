import { ReservationDashboard } from '@/interfaces/Dashboard'
import { AxiosInstance } from '@/lib/axios'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard: React.FC = () => {
  const [reservationRoomTypeDashboard, setReservationRoomTypeDashboard] = useState<ReservationDashboard[]>([])
  const [reservationServiceTypeDashboard, setReservationServiceTypeDashboard] = useState<ReservationDashboard[]>([])
  const [reservationPaymentTypeDashboard, setReservationPaymentTypeDashboard] = useState<
    Omit<ReservationDashboard, 'id'>[]
  >([])

  useEffect(() => {
    const fetchReservationRoomTypeDashboard = async () => {
      try {
        const currentDate = new Date()
        const result = await AxiosInstance.post('/api/dashboard/reservation/room_type', {
          startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        })
        if (result.status === 200) {
          setReservationRoomTypeDashboard(result.data.data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    const fetchReservationServiceTypeDashboard = async () => {
      try {
        const currentDate = new Date()
        const result = await AxiosInstance.post('/api/dashboard/reservation/service_type', {
          startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        })
        if (result.status === 200) {
          setReservationServiceTypeDashboard(result.data.data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    const fetchReservationPaymentTypeDashboard = async () => {
      try {
        const currentDate = new Date()
        const result = await AxiosInstance.post('/api/dashboard/reservation/payment_type', {
          startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        })
        if (result.status === 200) {
          setReservationPaymentTypeDashboard(result.data.data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    Promise.all([
      fetchReservationRoomTypeDashboard(),
      fetchReservationServiceTypeDashboard(),
      fetchReservationPaymentTypeDashboard()
    ])
  }, [])
  return (
    <React.Fragment>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Dashboard</h1>
        <div className="grid grid-cols-3">
          <div className="grid grid-cols-1 gap-y-4">
            <h1 className="text-center text-xl font-bold text-primary-blue-600">Price By Room Type</h1>
            <div className="flex w-full justify-center">
              <Pie
                className="aspect-square max-w-[16rem]"
                data={{
                  labels: reservationRoomTypeDashboard.map((item) => item.name),
                  datasets: [
                    {
                      label: 'Total Price',
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
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <h1 className="text-center text-xl font-bold text-primary-blue-600">Price By Service Type</h1>
            <div className="flex w-full justify-center">
              <Pie
                className="aspect-square max-w-[16rem]"
                data={{
                  labels: reservationServiceTypeDashboard.map((item) => item.name),
                  datasets: [
                    {
                      label: 'Total Price',
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
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4">
            <h1 className="text-center text-xl font-bold text-primary-blue-600">Reservation By Payment Type</h1>
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
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
