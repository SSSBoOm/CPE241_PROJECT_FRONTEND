import { ExpandAltOutlined } from '@ant-design/icons'

type Props = {
  name?: string
  content?: string
  size?: string
  accommodate?: number
  image?: string
  price?: number
}

const RoomCardPayment = (props: Props) => {
  return (
    <>
      <div className="container box-content grid grid-cols-1 content-center rounded-md border-2 text-primary-blue-600 lg:h-80 lg:grid-cols-3 ">
        <div className="col-span-1 h-full w-full">
          <img src={props.image} className=" h-full w-full self-center object-cover object-right " alt="" />
        </div>
        <div className=" col-span-1 grid w-full grid-cols-2 grid-rows-9 p-3 lg:col-span-2">
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
          <div className="col-span-1 row-span-5 grid w-full grid-rows-5">
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
          </div>
          <div className="col-span-1 col-start-2 row-span-3 row-start-9 w-full content-end text-center lg:text-right">
            <span className="text-2xl font-bold ">{props.price} Bath</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomCardPayment
