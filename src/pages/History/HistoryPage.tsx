import React from 'react'
import RoomCardHist from '../../components/Card/RoomCardHist'

const HistoryPage: React.FC = () => {
  const roomCard = [
    {
      name: 'Room name',
      content: 'no context',
      size: 'king size',
      accommodate: 2,
      food: true,
      view: { sea: true, forest: true },
      price: 690,
      checkIn: '23/04/2023',
      checkOut: '24/04/2023',
      img: 'Room_1.jpg'
    },
    {
      name: 'Room name',
      content: 'no context',
      size: 'king size',
      accommodate: 2,
      food: true,
      view: { sea: true, forest: true },
      price: 690,
      checkIn: '23/04/2023',
      checkOut: '24/04/2023',
      img: 'Room_2.jpg'
    }
  ]

  const serviceCard = [
    {
      name: 'Room name',
      content: 'no context',
      size: 'king size',
      accommodate: 2,
      food: true,
      view: { sea: true, forest: true },
      price: 690,
      checkIn: '23/04/2023',
      checkOut: '24/04/2023',
      img: 'Room_3.jpg'
    },
    {
      name: 'Room name',
      content: 'no context',
      size: 'king size',
      accommodate: 2,
      food: true,
      view: { sea: true, forest: true },
      price: 690,
      checkIn: '23/04/2023',
      checkOut: '24/04/2023',
      img: 'Room_4.jpg'
    }
  ]

  return (
    <>
      <div className="container mx-auto mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4 ">
        <div className=" col-span-2 col-start-1 grid-cols-2 rounded-md border-2 text-primary-blue-600 lg:col-start-2 ">
          <div className=" col-span-2 col-start-1 m-5 text-4xl font-bold text-primary-blue-600 ">Room</div>
          {roomCard.map((element) => {
            return (
              <div className=" col-span-2 col-start-1 m-5 place-items-center  content-center items-center justify-center place-self-center self-center justify-self-center object-center lg:col-span-4 lg:col-start-1 ">
                <RoomCardHist
                  name={element.name}
                  content={element.content}
                  size={element.size}
                  accommodate={element.accommodate}
                  food={element.food}
                  view={{ sea: element.view.sea, forest: element.view.forest }}
                  price={element.price}
                  checkIn={element.checkIn}
                  checkOut={element.checkOut}
                  image={element.img}
                />
              </div>
            )
          })}
          <div className=" col-span-2 col-start-1 m-5 text-4xl font-bold text-primary-blue-600 lg:col-start-2 ">
            Service
          </div>
          {serviceCard.map((element) => {
            return (
              <div className=" col-span-2 col-start-1 m-5 justify-self-center lg:col-span-4 lg:col-start-1 ">
                <RoomCardHist
                  name={element.name}
                  content={element.content}
                  size={element.size}
                  accommodate={element.accommodate}
                  food={element.food}
                  view={{ sea: element.view.sea, forest: element.view.forest }}
                  price={element.price}
                  checkIn={element.checkIn}
                  checkOut={element.checkOut}
                  image={element.img}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
    //   <div className="container mx-auto mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4 ">
    //     <div className=' col-span-2 lg:col-span-4 col-start-1 m-5 justify-self-center lg:col-start-1 '>
    //       <RoomCardHist name='Room name' content='no context' size='king size' accommodate={2} food={true} view={{ sea: true, forest: true }} price={690} checkIn='23/04/2023' checkOut='24/04/2023' image='hotel-pool.jpg' />
    //     </div>
    //     <div className=' col-span-2 lg:col-span-4 col-start-1 m-5 justify-self-center lg:col-start-1 '>
    //       <RoomCard name='Room name' content='no context' size='king size' accommodate={2} food={true} view={{ sea: true, forest: true }} price={690} image='hotel-pool.jpg' />
    //     </div>
    //     <div className=' col-span-2 lg:col-span-4 col-start-1 m-5 justify-self-center lg:col-start-1 '>
    //       <RoomCardList name='Room name' content='no context' size='king size' accommodate={2} food={true} view={{ sea: true, forest: true }} price={690} checkIn='23/04/2023' checkOut='24/04/2023' image='hotel-pool.jpg' />
    //     </div>
    //   </div>
  )
}

export default HistoryPage
