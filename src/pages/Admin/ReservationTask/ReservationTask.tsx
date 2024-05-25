import { ADMIN_PATH } from '@/configs/route'
import { IReservationTask } from '@/interfaces/ReservationTask'
import { AxiosInstance } from '@/lib/axios'
import { Button, Table, TableColumnsType } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const ReservationTask: React.FC = () => {
  const navigate = useNavigate()
  const [reservationTask, setReservationTask] = useState<IReservationTask[]>([])

  const Columns: TableColumnsType<IReservationTask> = [
    { title: 'ลำดับที่', dataIndex: 'id', key: 'id' },
    {
      title: 'การจองลำดับที่',
      dataIndex: 'reservation.id',
      key: 'reservation.id',
      render: (_: string, row: IReservationTask) => <span>{row.reservation.id}</span>
    },
    {
      title: 'หมายเลขห้อง',
      dataIndex: 'RoomNumber',
      key: 'RoomNumber',
      render: (_: string, row: IReservationTask) => <span>{row.reservation.room?.roomNumber}</span>
    },
    {
      title: 'วันที่ - ก่อนเวลา',
      dataIndex: 'Date',
      key: 'Date',
      render: (_: string, row: IReservationTask) => <span>{dayjs(row.date).format('DD/MM/YYYY - HH:mm')}</span>
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      width: '10%',
      render(_: string, row: IReservationTask) {
        return (
          <div>
            <Button
              type="primary"
              className="mr-2"
              onClick={async () => {
                try {
                  await AxiosInstance.patch('/api/reservation_task/staff', {
                    id: row.id,
                    status: false
                  })
                  const result = await AxiosInstance.patch('/api/reservation_task/status', {
                    id: row.id,
                    status: true
                  })
                  if (result.status === 200) {
                    Swal.fire({
                      title: 'Success!',
                      text: 'Reservation accepted',
                      icon: 'success',
                      confirmButtonText: 'OK'
                    }).then(() => {
                      window.location.reload()
                    })
                  }
                } catch (error) {
                  console.log(error)
                  Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  }).then(() => {
                    navigate(ADMIN_PATH)
                  })
                }
              }}
            >
              Accept
            </Button>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    const fetchReservationTask = async () => {
      try {
        const result = await AxiosInstance.get('/api/reservation_task')

        if (result.status === 200) {
          setReservationTask(result.data.data)
        }
      } catch (err) {
        console.error(err)
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate(ADMIN_PATH)
        })
      }
    }
    fetchReservationTask()
  }, [navigate])

  return (
    <React.Fragment>
      <div className="container mx-auto space-y-4 px-4">
        <h1 className="text-3xl  font-bold text-primary-blue-600">Reservation Task</h1>
        <Table
          columns={Columns}
          dataSource={reservationTask.filter((item) => {
            const currentDate = new Date()
            const startDate = new Date(currentDate.setHours(0, 0, 0, 0))
            const endDate = new Date(currentDate.setHours(23, 59, 59, 999))
            return item.date >= startDate && item.date <= endDate && item.status === false
          })}
        />
      </div>
    </React.Fragment>
  )
}

export default ReservationTask
