import { Card, Carousel } from 'antd'
import React, { Fragment, lazy } from 'react'
const Footer = lazy(() => import('../../components/Footer/Footer'))

const HomePage: React.FC = () => {
  return (
    <Fragment>
      {/* BG top page */}
      <div className="relative max-h-[32rem]">
        <h1 className="absolute top-1/2 w-full text-center text-6xl font-bold text-white">Hotel Del Luna</h1>
        <img className="max-h-[32rem] w-full object-cover" src="landing_hotel.jpg" alt="hero" />
      </div>

      {/* Card */}
      <div className="container mx-auto my-8 grid grid-cols-1 gap-y-4 px-4 md:grid-cols-2 md:gap-x-4">
        <img src="hotel-pool.jpg" className="aspect-video w-full object-cover" alt="" />
        <div className="">
          <h2 className="text-3xl">Hotel Del Luna</h2>
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

      <Carousel autoplay className=" my-9 h-96 w-full object-none">
        <div>
          <div className="flex justify-around">
            <div className="">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              />
            </div>
            <div>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              />
            </div>
            <div>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              />
            </div>
          </div>
        </div>
      </Carousel>

      <Footer />
    </Fragment>
  )
}

export default HomePage
