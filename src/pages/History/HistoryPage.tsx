import { IReservation } from '@/interfaces/Reservation'
import { ReservationType } from '@/interfaces/enums/ReservationType'
import { AxiosInstance } from '@/lib/axios'
import React, { Fragment, useEffect, useState } from 'react'
import RoomCardHist from '../../components/Card/RoomCardHist'

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<IReservation[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await AxiosInstance.get('/api/reservation/me')
        setHistory(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchHistory()
  }, [])

  // const serviceCard = [
  //   {
  //     name: 'Room name',
  //     content: 'no context',
  //     size: 'king size',
  //     accommodate: 2,
  //     food: true,
  //     view: { sea: true, forest: true },
  //     price: 690,
  //     checkIn: '23/04/2023',
  //     checkOut: '24/04/2023',
  //     img: 'Room_3.jpg'
  //   },
  //   {
  //     name: 'Room name',
  //     content: 'no context',
  //     size: 'king size',
  //     accommodate: 2,
  //     food: true,
  //     view: { sea: true, forest: true },
  //     price: 690,
  //     checkIn: '23/04/2023',
  //     checkOut: '24/04/2023',
  //     img: 'Room_4.jpg'
  //   }
  // ]

  return (
    <Fragment>
      <div className="min-h-screen space-y-8 bg-[url('/images/login/view.png')] bg-cover px-4 py-8">
        <div className="container mx-auto rounded-md border-2 bg-white p-4">
          <h1 className="text-center text-3xl font-bold text-primary-blue-600">History Booking</h1>
        </div>
        <div className="container col-span-2 col-start-1 mx-auto grid-cols-2 rounded-md border-2 bg-white text-primary-blue-600 lg:col-start-2">
          <div className=" col-span-2 col-start-1 m-5 text-4xl font-bold text-primary-blue-600 ">Room</div>
          {history
            .filter((item) => item.type === ReservationType.ROOM)
            .sort((a, b) => {
              return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            })
            .map((element, index) => {
              return (
                <div
                  className=" col-span-2 col-start-1 m-5 place-items-center  content-center items-center justify-center place-self-center self-center justify-self-center object-center lg:col-span-4 lg:col-start-1"
                  key={index}
                >
                  <RoomCardHist
                    name={element.room?.roomType?.name || ''}
                    content={element.room?.roomType?.detail || ''}
                    size={element.room?.roomType?.detail || ''}
                    accommodate={element.room?.roomType?.accommodate || 0}
                    price={element.price}
                    checkIn={element.startDate}
                    checkOut={element.endDate}
                    // image={element.room?.roomType?.image || ''}
                  />
                </div>
              )
            })}
          <div className=" col-span-2 col-start-1 m-5 text-4xl font-bold text-primary-blue-600 lg:col-start-2 ">
            Service
          </div>
          {history
            .filter((item) => item.type === ReservationType.SERVICE)
            .sort((a, b) => {
              return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            })
            .map((element, index) => {
              return (
                <div
                  className=" col-span-2 col-start-1 m-5 place-items-center  content-center items-center justify-center place-self-center self-center justify-self-center object-center lg:col-span-4 lg:col-start-1"
                  key={index}
                >
                  <RoomCardHist
                    name={element.service?.name || ''}
                    content={element.service?.description || ''}
                    price={element.price}
                    checkIn={element.startDate}
                    checkOut={element.endDate}
                    // image={element.room?.roomType?.image || ''}
                  />
                </div>
              )
            })}
        </div>
      </div>
    </Fragment>
  )
}

export default HistoryPage
