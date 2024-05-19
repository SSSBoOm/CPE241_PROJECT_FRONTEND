import { Button, Checkbox, Form } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import React, { useState } from 'react'
import RoomCardPayment from '../../components/Card/RoomCardPayment'

const roomCard: {
  name: string
  content: string
  size: string
  accommodate: number
  food: boolean
  view: { sea: boolean; forest: boolean }
  price: number
  checkIn: string
  checkOut: string
  img: string
}[] = [
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

const PaymentPage: React.FC = () => {
  const [value, setValue] = useState('')

  const handleChange = (checkedValues: CheckboxChangeEvent) => {
    setValue(checkedValues.target.value)
  }

  return (
    <>
      <Form className="container mt-10 grid grid-cols-2 rounded-md border-2 lg:mx-auto lg:w-[712px] lg:grid-cols-4 lg:gap-5">
        <div className=" col-span-4 col-start-1 grid-cols-2 text-primary-blue-600 ">
          <div className=" col-span-2 col-start-1 m-5 text-4xl font-bold text-primary-blue-600 ">Room</div>
          {roomCard.map((element) => {
            return (
              <div className=" col-span-2 col-start-1 m-5 place-items-center content-center items-center justify-center place-self-center self-center justify-self-center object-center lg:col-span-4 lg:col-start-1 ">
                <RoomCardPayment
                  name={element.name}
                  content={element.content}
                  size={element.size}
                  accommodate={element.accommodate}
                  price={element.price}
                  image={element.img}
                />
              </div>
            )
          })}
        </div>
        <div className=" col-span-4 col-start-1 grid-cols-2 text-primary-blue-600 ">
          <div className=" col-span-2 col-start-1 m-5 text-4xl font-bold text-primary-blue-600 ">Service</div>
          {serviceCard.map((element) => {
            return (
              <div className=" col-span-2 col-start-1 m-5 place-items-center content-center items-center justify-center place-self-center self-center justify-self-center object-center lg:col-span-4 lg:col-start-1 ">
                <RoomCardPayment
                  name={element.name}
                  content={element.content}
                  size={element.size}
                  accommodate={element.accommodate}
                  price={element.price}
                  image={element.img}
                />
              </div>
            )
          })}
        </div>
        <div className=" col-span-4 col-start-1">
          <span className=" text-4xl font-bold text-primary-blue-700 ">Payment Option</span>
        </div>
        <div className=" container col-span-2 col-start-1 justify-self-center rounded-md border-2 md:w-[494px] lg:col-start-2">
          <Form.Item
            name="creditcard"
            valuePropName="creditcard"
            className="col-span-2 col-start-1 m-3 mx-6 inline-block align-middle lg:col-start-2"
          >
            <Checkbox className=" text-2xl" onChange={handleChange} checked={'creditcard' == value} value="creditcard">
              Pay By Credit Card
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="servicenearyou"
            valuePropName="servicenearyou"
            className="col-span-2 col-start-1 m-3 mx-6 inline-block align-middle lg:col-start-2"
          >
            <Checkbox
              className=" text-2xl"
              onChange={handleChange}
              checked={'servicenearyou' == value}
              value="servicenearyou"
            >
              Pay By Service Near You
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="qr"
            valuePropName="qr"
            className="col-span-2 col-start-1 m-3 mx-6 inline-block align-middle lg:col-start-2"
          >
            <Checkbox className=" text-2xl" onChange={handleChange} checked={'qr' == value} value="qr">
              Pay By QR Code
            </Checkbox>
          </Form.Item>
          <br />
          <div className=" mx-5 my-3 text-right">
            <Button size="large">Next</Button>
          </div>
        </div>
      </Form>
    </>
  )
}

export default PaymentPage
