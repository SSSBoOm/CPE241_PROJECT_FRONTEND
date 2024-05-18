import { UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
type Props = {
  name?: string
  content?: string
  accommodate?: number
  RoomNo?: string
  food: boolean
  image?: string
  price?: number
  checkIn?: string
  checkOut?: string
  oncoming?: boolean
}
const Details = (props: Props) => {
  return (
    <>
      <div className="flex w-fit rounded-md border-2 border-primary-blue-700">
        <div className=" w-6/12 rounded-md bg-cover">
          <img className="h-full" src={props.image} alt="" />
        </div>
        <div className="w-6/12 px-2">
          <div className="mb-4 text-wrap">
            <p className="text-3xl font-semibold">{props.name}</p>
            <p className="truncate text-sm">{props.content}</p>
          </div>
          <div className="grid grid-flow-col grid-rows-5">
            <p className={props.RoomNo == null ? 'hidden' : 'text-lg'}>Room: {props.RoomNo}</p>
            <p className="text-lg">
              <UserOutlined />
              For: {props.accommodate}
            </p>
            <p className="text-lg">{props.food ? 'Food' : ''}</p>
            <p className="col-start-2 row-start-2 text-center text-lg">IN:{props.checkIn}</p>
            <p className="col-start-2 row-start-3 text-center text-lg">OUT:{props.checkOut}</p>
            <p className="col-start-2 row-start-4 text-center text-lg">{props.price} Bath</p>
          </div>
        </div>
      </div>
      <div className={props.oncoming ? 'text-end' : 'hidden text-end'}>
        <Button className="mx-4 my-2" type="primary">
          confirm
        </Button>
        <Button className="mx-4 my-2" danger type="primary">
          Cancel
        </Button>
      </div>
    </>
  )
}
export default Details
