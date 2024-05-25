import { FullscreenOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { IRoomType } from '../../interfaces/RoomType'

type Props = {
  data: IRoomType
  promotionPrice?: number
  onClick?: () => void
  disabled?: boolean
}

const CardUpgrade: React.FC<Props> = (props) => {
  return (
    <>
      <div className="grid w-fit min-w-[300px] rounded-md border-2 border-primary-blue-700 md:flex">
        <div className="w-full rounded-md bg-cover md:w-5/12">
          <img
            className="h-full object-cover"
            src={
              'https://evquseshrfnvyndhterj.supabase.co/storage/v1/object/public/cpe241-image/' + props.data.imageUrl
            }
            alt="img"
          />
        </div>
        <div className="w-full px-2 md:w-7/12">
          <div className="mb-4 text-wrap">
            <p className="text-3xl font-semibold">{props.data.name}</p>
            <p className="truncate text-sm">{props.data.detail}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex-1 flex-col flex-wrap ">
              <p className="text-sm md:text-lg">
                <FullscreenOutlined />
                Size: {props.data.size || 10} m²
              </p>
              <p className="text-sm md:text-lg">
                <UserOutlined />
                Capacity: {props.data.accommodate || 1}
              </p>
              {props.data.bed && <p className="text-sm md:text-lg">Bed : {props.data.bed}</p>}
            </div>

            <div className="flex-col flex-wrap text-center md:flex-1">
              {props.promotionPrice && (
                <p className="text-2xl font-semibold text-red-600">
                  <a className="line-through">
                    {props.data.price.toLocaleString(navigator.language, {
                      minimumFractionDigits: 2
                    })}
                  </a>
                  <br />
                  {props.promotionPrice.toLocaleString(navigator.language, {
                    minimumFractionDigits: 2
                  })}
                  ฿
                </p>
              )}
              <p className="text-lg font-semibold md:text-2xl">
                {!props.promotionPrice &&
                  props.data.price.toLocaleString(navigator.language, {
                    minimumFractionDigits: 2
                  }) + ' ฿'}
              </p>
              <p className="text-md md:text-md">Per Day</p>
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
