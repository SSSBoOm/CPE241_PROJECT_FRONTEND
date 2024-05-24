import { IReservation } from '@/interfaces/Reservation'
import { ReservationType } from '@/interfaces/enums/ReservationType'
import { AxiosInstance } from '@/lib/axios'
import React, { Fragment, useEffect, useState } from 'react'
import RoomCardHist from '../../components/Card/RoomCardHist'

const HistoryPage: React.FC = () => {
  const [historyRoom, setHistoryRoom] = useState<IReservation[]>([])
  const [historyService, setHistoryService] = useState<IReservation[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await AxiosInstance.get('/api/reservation/me')
        setHistoryRoom(response.data.data.filter((item: IReservation) => item.type === ReservationType.ROOM))
        setHistoryService(response.data.data.filter((item: IReservation) => item.type === ReservationType.SERVICE))
      } catch (error) {
        console.log(error)
      }
    }
    fetchHistory()
  }, [])

  return (
    <Fragment>
      <div className="min-h-screen space-y-8 bg-[url('/images/login/view.png')] bg-cover px-4 py-8">
        <div className="container mx-auto rounded-md border-2 bg-white p-4">
          <h1 className="text-center text-3xl font-bold text-primary-blue-600">History Booking</h1>
        </div>
        <div className="container col-span-2 col-start-1 mx-auto grid-cols-2 rounded-md border-2 bg-white text-primary-blue-600 lg:col-start-2">
          <div
            className={`col-span-2 col-start-1 m-5 text-4xl font-bold text-primary-blue-600 lg:col-start-2 ${historyRoom.length === 0 && 'hidden'}`}
          >
            Room
          </div>
          {/* if no historyRoom and historyservie */}
          {historyRoom.length === 0 && historyService.length === 0 && (
            <div className="container mx-auto rounded-md border-2 bg-white p-4">
              <h1 className="text-center text-2xl font-bold text-primary-blue-600">No History Found</h1>
            </div>
          )}
          {historyRoom
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
          <div
            className={`col-span-2 col-start-1 m-5 text-4xl font-bold text-primary-blue-600 lg:col-start-2 ${historyService.length === 0 && 'hidden'}`}
          >
            Service
          </div>
          {historyService
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
