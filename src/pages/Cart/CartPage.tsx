import { Button } from 'antd'
import RoomCardList from '../../components/Card/RoomCardList'

const CartPage = () => {
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
      checkOut: '24/04/2023'
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
      checkOut: '24/04/2023'
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
      checkOut: '24/04/2023'
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
      checkOut: '24/04/2023'
    }
  ]
  return (
    <>
      <div className="container mx-auto mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4 ">
        <div className=" col-span-2 col-start-1 m-5 grid-cols-2 text-4xl font-bold text-primary-blue-600 lg:col-start-2 ">
          Room
        </div>
        {roomCard.map((element) => {
          return (
            <div className=" col-span-2 col-start-1 m-5 justify-self-center lg:col-span-4 lg:col-start-1 ">
              <RoomCardList
                name={element.name}
                content={element.content}
                size={element.size}
                accommodate={element.accommodate}
                food={element.food}
                view={{ sea: element.view.sea, forest: element.view.forest }}
                price={element.price}
                checkIn={element.checkIn}
                checkOut={element.checkOut}
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
              <RoomCardList
                name={element.name}
                content={element.content}
                size={element.size}
                accommodate={element.accommodate}
                food={element.food}
                view={{ sea: element.view.sea, forest: element.view.forest }}
                price={element.price}
                checkIn={element.checkIn}
                checkOut={element.checkOut}
              />
            </div>
          )
        })}
        <div className=" col-span-1 col-start-1 my-5 justify-self-center text-4xl font-bold text-primary-blue-600 lg:col-start-2">
          Total
        </div>
        <div className=" col-span-1 col-start-2 my-5 justify-self-center text-4xl font-bold text-primary-blue-600 lg:col-start-3">
          {roomCard.reduce((total, current) => (total = total + current.price), 0) +
            serviceCard.reduce((total, current) => (total = total + current.price), 0)}
        </div>
        <div className=" col-span-1 col-start-2 my-5 justify-self-center text-4xl font-bold text-primary-blue-600 lg:col-start-3">
          <Button className="mx-1 bg-primary-blue-600 text-white">Proceed to book</Button>
        </div>
      </div>
    </>
  )
}

export default CartPage
