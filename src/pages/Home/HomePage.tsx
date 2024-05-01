import { Card, Carousel } from 'antd'
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <>
      {/* BG top page */}
      <div className="">
        <img className="object-none h-80 w-full" src="landing_hotel.jpg" alt="" />
      </div>

      {/* Card */}
      <div className="mx-auto container grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-4 my-8 px-4">
        <img src="hotel-pool.jpg" className="w-full aspect-video object-cover" alt="" />
        <div className="">
          <h2 className="text-3xl">Lorem ipsum dolor sit</h2>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam error necessitatibus voluptate ut atque,
            incidunt quae minus quos repellendus reprehenderit nisi facere ipsa quis rerum, qui consequuntur iusto
            dignissimos velit?
          </p>
        </div>
      </div>

      <Carousel autoplay className=" h-96 object-none w-full ">
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

      <Carousel autoplay className=" h-96 object-none w-full my-9">
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
    </>
  )
}

export default HomePage
