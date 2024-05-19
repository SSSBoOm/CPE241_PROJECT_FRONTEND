import { IRoomType } from '@/interfaces/RoomType'
import { ExpandAltOutlined } from '@ant-design/icons'
import { FC } from 'react'

type Props = {
  data: IRoomType
}

const Room: FC<Props> = (props) => {
  return (
    <>
      <div className="container mx-auto grid h-[16rem] grid-cols-5 gap-x-2 rounded-md border-2 border-primary-blue-600">
        <div className="col-span-2">
          <img className="h-[16rem] w-full object-cover" src="StandardSuiteRoom.svg" alt="" />
        </div>
        <div className="col-span-3">
          <p className=" text-3xl">{props.data.name}</p>
          <p className=" mb-2 text-lg">{props.data.detail}</p>
          <div className=" mb-3 grid grid-cols-3 text-lg">
            <div>
              <p>
                <ExpandAltOutlined />
                Size : 27
              </p>
              <p>Bed : King size</p>
              <p>People : 2</p>
              <p>Garden view</p>
              <p>Sea view</p>
            </div>
            <div className=" col-span-2 content-center justify-self-center">
              <button className=" rounded-md bg-primary-blue-600 px-3 py-1 text-primary-b2 hover:bg-primary-blue-500">
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Room
