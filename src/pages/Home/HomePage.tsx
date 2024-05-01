import { Card, Carousel } from 'antd'
import React from 'react'

const { Meta } = Card

const HomePage: React.FC = () => {
  return (
    <>
      {/* BG top page */}
      <div className="">
        <img className="object-none h-80 w-full" src="landing_hotel.jpg" alt="" />
      </div>

      {/* Card */}
      <div className="flex my-9 place-content-center">
        <img src="hotel-pool.jpg " alt="" />
        <div>
          <h2 className=" text-3xl px-8">Wellcome to Meridian Bliss</h2>
          <p className=" text-xl p-8">content....</p>
        </div>
      </div>

      <Carousel autoplay className=" h-96 object-none w-full ">
        <div>
          <div className="flex">
            <img className=" h-96 w-1/2 object-cover " src="Room_1.jpg" alt="" />
            <img className=" h-96 w-1/2 object-cover " src="Room_2.jpg" alt="" />
          </div>
        </div>

        <div>
          <div className="flex">
            <img className=" h-96 w-1/2 object-cover " src="Room_3.jpg" alt="" />
            <img className=" h-96 w-1/2 object-cover " src="Room_4.jpg" alt="" />
          </div>
        </div>

        <div>
          <div className="flex">
            <img className=" h-96 w-1/2 object-cover " src="Room_5.jpg" alt="" />
            <img className=" h-96 w-1/2 object-cover " src="Room_6.png" alt="" />
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
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </div>
            <div>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </div>
            <div>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  )
}

export default HomePage
