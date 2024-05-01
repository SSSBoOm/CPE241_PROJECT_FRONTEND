import { ExpandAltOutlined } from '@ant-design/icons'
import { Button } from 'antd'

type Props = {
  name?: string
  content?: string
  size?: string
  accommodate?: number
  food: boolean
  view: {
    sea: boolean
    forest: boolean
  }
  image?: string
  price?: number
}

const RoomCard = (props: Props) => {
  return (
    <div className="container box-content grid h-72 w-[52rem] grid-cols-3 content-center border-4 text-primary-blue-600">
      <div className="col-span-1 flex w-full content-center items-center">
        <img src={props.image} className="w-4/6 " alt="" />
      </div>
      <div className="col-span-2 row-span-1 grid w-full grid-cols-2 grid-rows-9 p-3">
        <div className="col-span-2 w-full">
          <span className="text-2xl">{props.name}</span>
        </div>
        <div className="col-span-2 row-span-2 w-full">
          <span className="text-sm">
            content
            <br />
            {props.content}
          </span>
        </div>
        <div className="col-span-1 row-span-6 grid w-full grid-rows-6">
          <div className="text-base ">
            <ExpandAltOutlined className="pr-1"></ExpandAltOutlined>
            content of room
          </div>
          <div>
            <span className="text-base">Bed : {props.content}</span>
          </div>
          <div>
            <span className="text-base">For {props.accommodate}</span>
          </div>
          <div>{props.food ? <span className="text-base">food</span> : null}</div>
          <div>{props.view.sea ? <span className="text-base">sea view</span> : null}</div>
          <div>{props.view.forest ? <span className="text-base">forest view</span> : null}</div>
        </div>
        <div className="col-span-1 row-span-3 w-full content-end text-center">
          <span className="text-3xl font-bold">Bath {props.price}</span>
        </div>
        <div className="col-span-1 row-span-3 w-full text-center">
          <Button className="mx-1 bg-primary-blue-600 text-white">Booking</Button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
