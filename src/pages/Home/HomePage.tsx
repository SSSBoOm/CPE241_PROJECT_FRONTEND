import CardService from '@/components/Card/CardService'
import CardUpgrade from '@/components/Card/CardUpgrade'
import { ROOM_PATH, SERVICE_PATH } from '@/configs/route'
import { IRoomType } from '@/interfaces/RoomType'
import { IService } from '@/interfaces/Service'
import { AxiosInstance } from '@/lib/axios'
import { Carousel } from 'antd'
import React, { Fragment, lazy, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Footer = lazy(() => import('../../components/Footer/Footer'))

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [roomTypes, setRoomTypes] = useState<IRoomType[]>([])
  const [services, setServices] = useState<IService[]>([])

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const result = await AxiosInstance.get('/api/room_type')
        const roomType: IRoomType[] = result.data.data.reduce((acc: IRoomType[], r: IRoomType) => {
          return [...acc, { ...r, room: r.room?.filter((room) => room.isActive) }]
        }, [] as IRoomType[])
        setRoomTypes(roomType.filter((r: IRoomType) => r.room?.length !== 0))
      } catch (err) {
        console.log(err)
      }
    }
    const fetchService = async () => {
      try {
        const result = await AxiosInstance.get('/api/service')
        setServices(
          (result.data.data as IService[]).filter((service) => service.serviceType.isActive && service.isActive)
        )
      } catch (err) {
        console.log(err)
      }
    }
    Promise.all([fetchRoom(), fetchService()])
  }, [])
  return (
    <Fragment>
      {/* BG top page */}
      <div className="relative max-h-[32rem]">
        <h1 className="absolute top-1/2 w-full text-center text-6xl font-bold text-white">Meridian Bliss</h1>
        <img className="max-h-[32rem] w-full object-cover" src="landing_hotel.jpg" alt="hero" />
      </div>

      {/* Card */}
      <div className="container mx-auto my-8 grid grid-cols-1 gap-y-4 px-4 md:grid-cols-2 md:gap-x-4">
        <img src="hotel-pool.jpg" className="aspect-video w-full object-cover" alt="" />
        <div className="">
          <h2 className="text-3xl">Meridian Bliss</h2>
          <p className="text-xl">
            พักผ่อนกาย ผ่อนคลายใจ ริมชายหาดส่วนตัว ขึ้นชื่อเรื่องหาดทรายขาว น้ำทะเลใส เหมาะกับการพักผ่อน
            สัมผัสบรรยากาศสุดโรแมนติก ชมพระอาทิตย์ขึ้นและตกดินเหนือท้องทะเล เพลิดเพลินกับกิจกรรมทางน้ำมากมาย เช่น
            ว่ายน้ำ ดำน้ำ เล่นเซิร์ฟ ผ่อนคลายร่างกายและจิตใจด้วยบริการสปา
          </p>
        </div>
      </div>

      <Carousel autoplay className=" h-96 w-full object-none ">
        <div>
          <div className="flex">
            <img className=" h-96 w-1/2 object-cover" src="Room_1.jpg" alt="" />
            <img className=" h-96 w-1/2 object-cover" src="Room_2.jpg" alt="" />
          </div>
        </div>

        <div>
          <div className="flex">
            <img className=" h-96 w-1/2 object-cover" src="Room_3.jpg" alt="" />
            <img className=" h-96 w-1/2 object-cover" src="Room_4.jpg" alt="" />
          </div>
        </div>

        <div>
          <div className="flex">
            <img className=" h-96 w-1/2 object-cover" src="Room_5.jpg" alt="" />
            <img className=" h-96 w-1/2 object-cover" src="Room_6.png" alt="" />
          </div>
        </div>
      </Carousel>

      <div className="container grid grid-cols-1 gap-5 px-4 md:mx-auto md:grid-cols-2">
        {/* using left is room and right is service  */}
        <div className="scrollbar-hide container mx-auto my-8 grid max-h-[40rem] scroll-m-5 grid-cols-1 gap-y-4 overflow-y-auto px-4 md:grid-cols-1 md:gap-x-4">
          <h2 className="text-3xl">Room</h2>
          {roomTypes &&
            roomTypes.map((roomType: IRoomType) => (
              <CardUpgrade key={roomType.id} data={roomType} onClick={() => navigate(ROOM_PATH)} />
            ))}
        </div>

        <div className="scrollbar-hide container mx-auto my-8 grid max-h-[40rem] grid-cols-1 gap-y-4 overflow-y-auto px-4 md:grid-cols-1 md:gap-x-4">
          <h2 className="text-3xl">Services</h2>
          {services &&
            services.map((service: IService) => (
              <CardService key={service.id} data={service} onClick={() => navigate(SERVICE_PATH)} />
            ))}
        </div>
      </div>

      <Footer />
    </Fragment>
  )
}

export default HomePage
