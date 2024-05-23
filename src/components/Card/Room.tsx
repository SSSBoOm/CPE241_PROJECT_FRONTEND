import React from 'react'
import { IRoomType } from '../../interfaces/RoomType'

type Props = {
  data: IRoomType
  onClick?: () => void
}

const Room: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <div className=" grid  grid-cols-5 gap-x-2 rounded-md border-2 border-primary-blue-600">
        <div className="col-span-2">
          <img className=" object-cover" src="StandardSuiteRoom.svg" alt="" />
        </div>
        <div className="col-span-3">
          <p className=" text-3xl">props.data.name</p>
          <p className=" mb-2 text-lg">props.data.detail</p>
          <div className=" mb-3 grid grid-cols-3 text-lg">
            <div>
              <p>Bed : King size</p>
              <p>People : props.data.accommodate</p>
              <p>Garden view</p>
              <p>Sea view</p>
            </div>
            <div className="col-span-2 content-center justify-self-center">
              <button
                className="rounded-md bg-primary-blue-600 px-3 py-1 text-primary-b2 hover:bg-primary-blue-500"
                onClick={props.onClick}
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Room
