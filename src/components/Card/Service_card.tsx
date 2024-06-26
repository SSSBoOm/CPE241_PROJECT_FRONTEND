import { UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
type Props = {
  name?: string
  content?: string
  accommodate?: number
  image?: string
  price?: number
}
const ServiceCard = (props: Props) => {
  return (
    <>
      <div className="flex w-fit rounded-md border-2 border-primary-blue-700">
        <div className=" w-5/12 rounded-md bg-cover">
          <img className="h-full" src={props.image} alt="" />
        </div>
        <div className="w-7/12 px-2">
          <div className="mb-4 text-wrap">
            <p className="text-3xl font-semibold">{props.name}</p>
            <p className=" truncate text-sm">{props.content}</p>
          </div>
          <div className="grid grid-flow-col grid-rows-2">
            <p className="text-lg">
              <UserOutlined />
              For: {props.accommodate}
            </p>
            <p className="col-start-2 row-start-1 text-center text-2xl">{props.price} Bath</p>
            <Button className="col-start-2 row-start-2">Booking</Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ServiceCard
