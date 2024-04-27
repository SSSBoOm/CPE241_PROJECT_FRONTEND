import { ExpandAltOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'

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
    checkIn : string
    checkOut : string
}

const RoomCardList = (props: Props) => {
  return (
    <div className=" container grid grid-cols-3 box-content h-72 w-[40rem] border-4 text-primary-blue-600 content-center ">
      <div className="w-full col-span-1 items-center content-center">
      <img src={props.image} className=" w-4/6 " alt="" />
      </div>
      <div className=" w-full col-span-2 row-span-1 p-3 grid grid-cols-2 grid-rows-8">
        <div className=" w-full col-span-2 ">
          <span className=" text-2xl ">{props.name}</span>
        </div>
        <div className=" w-full col-span-2 row-span-2 ">
          <span className=" text-sm ">
            content
            <br />
            {props.content}
          </span>
        </div>
        <div className="w-full row-span-5 col-span-1 grid grid-rows-5">
          <div className=" text-base  ">
            <ExpandAltOutlined className=" pr-1"></ExpandAltOutlined>
            content of room
          </div>
          <div>
            <span className=" text-base ">Bed : {props.content}</span>
          </div>
          <div>
            <span className=" text-base ">For {props.accommodate}</span>
          </div>
          <div>{props.food ? <span className=" text-base ">food</span> : null}</div>
          <div>{props.view.sea ? <span className=" text-base ">sea view</span> : null}</div>
          <div>{props.view.forest ? <span className=" text-base ">forest view</span> : null}</div>
        </div>
        <div className=" w-full row-span-1 col-span-1 text-center "></div>
        <div className=" w-full row-span-1 col-span-1 text-center ">
            {props.checkIn}
        </div>
        <div className=" w-full row-span-1 col-span-1 text-center ">
            {props.checkOut}
        </div>
        <div className=" w-full row-span-2 col-span-1 text-right content-end ">
            <span className=' text-2xl font-bold '>{props.price} Bath </span>
            <Checkbox className='  ' />
        </div>
      </div>
    </div>
  )
}

export default RoomCardList