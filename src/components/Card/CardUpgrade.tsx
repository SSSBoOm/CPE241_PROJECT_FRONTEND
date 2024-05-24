import { FullscreenOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { IRoomType } from '../../interfaces/RoomType'
type Props = {
  data: IRoomType
  onClick?: () => void
  disabled?: boolean
}
const CardUpgrade: React.FC<Props> = (props) => {
  return (
    <>
      <div className="flex w-fit rounded-md border-2 border-primary-blue-700">
        <div className=" w-5/12 rounded-md bg-cover">
          <img className="h-full object-cover" src="StandardSuiteRoom.svg" alt="" />
        </div>
        <div className="w-7/12 px-2">
          <div className="mb-4 text-wrap">
            <p className="text-3xl font-semibold">{props.data.name}</p>
            <p className="truncate text-sm">{props.data.detail}</p>
          </div>
          <div className="flex">
            <div className="flex-1 flex-col flex-wrap">
              <p className="text-sm md:text-lg">
                <FullscreenOutlined />
                size
              </p>
              <p className="text-sm md:text-lg">
                <UserOutlined />
                For: {props.data.accommodate}
              </p>
              <p className="text-sm md:text-lg">Bed : King size</p>
              <p className="text-sm md:text-lg">food</p>
              <p className="text-sm md:text-lg">view sea</p>
              <p className="text-sm md:text-lg">view forest</p>
            </div>

            <div className="flex-col flex-wrap text-center md:flex-1">
              <p className="text-lg md:text-2xl">price Bath</p>
              <Button
                disabled={props.disabled}
                size="small"
                className={`content-center md:left-0`}
                onClick={props.onClick}
              >
                Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CardUpgrade
