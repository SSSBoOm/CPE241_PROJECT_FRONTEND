import { IService } from '@/interfaces/Service'
import { Button } from 'antd'
import React from 'react'
type Props = {
  data: IService
  onClick?: () => void
  disabled?: boolean
}

const CardService: React.FC<Props> = (props) => {
  return (
    <>
      <div className="grid w-full min-w-[300px] rounded-md border-2 border-primary-blue-700 md:flex">
        <div className="w-full rounded-md bg-cover md:w-5/12">
          <img
            className="h-full w-full rounded-md"
            src={
              'https://evquseshrfnvyndhterj.supabase.co/storage/v1/object/public/cpe241-image/' + props.data.imageUrl
            }
            alt={props.data.name}
          />
        </div>
        <div className="w-full px-2 md:w-7/12">
          <div className="item-center grid h-full grid-cols-1 content-center md:grid-cols-2">
            <div className="item-center mb-4 flex-col flex-wrap text-wrap text-center  md:flex-1">
              <p className="text-2xl font-semibold">{props.data.name}</p>
              <p className="text-md truncate">{props.data.description}</p>
            </div>
            <div className="item-center h-full flex-col flex-wrap content-center text-center md:flex-1">
              <p className="text-lg font-semibold md:text-2xl">
                {(props.data.price || 0).toLocaleString(navigator.language, { minimumFractionDigits: 2 })} ฿
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
export default CardService
