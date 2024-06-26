import { IReservation } from '@/interfaces/Reservation'
import { FullscreenOutlined, UserOutlined } from '@ant-design/icons'

type Props = {
  data: IReservation
}

const RoomCardHist = (props: Props) => {
  return (
    <>
      <div className="grid min-h-32 w-full min-w-[300px] rounded-md border-2 border-primary-blue-700 md:flex">
        <div className="w-full rounded-md bg-cover md:w-3/12">
          <img
            className="h-full content-center object-cover"
            src={`https://evquseshrfnvyndhterj.supabase.co/storage/v1/object/public/cpe241-image/${props?.data?.room?.roomType?.imageUrl || ''}`}
            onError={(e) => {
              e.currentTarget.src = `${window.location.origin}/user_not_found.svg`
            }}
            alt="img"
          />
        </div>
        <div className="w-full p-2 md:w-9/12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex-1 flex-col flex-wrap ">
              <div className="mb-4 text-wrap">
                <p className="text-3xl font-semibold">{props.data?.room?.roomType?.name}</p>
                <p className="truncate text-sm">{props.data?.room?.roomType?.detail}</p>
              </div>
              <p className="text-sm md:text-lg">
                <FullscreenOutlined />
                Size: {props.data?.room?.roomType?.size || 10} m²
              </p>
              <p className="text-sm md:text-lg">
                <UserOutlined />
                Capacity: {props.data?.room?.roomType?.accommodate || 1}
              </p>
              {props.data?.room?.roomType?.bed && (
                <p className="text-sm md:text-lg">Bed : {props.data?.room?.roomType?.bed}</p>
              )}
            </div>

            <div className="flex-col flex-wrap content-center text-center md:flex-1">
              {/* check in check out date and total price */}
              <p className="text-lg font-semibold md:text-2xl">CheckIn-CheckOut</p>
              <p className="text-md">
                {new Date(props.data?.startDate).toLocaleDateString()} -{' '}
                {new Date(props.data?.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex-col flex-wrap content-center text-center md:flex-1">
              <p className="text-lg font-semibold md:text-2xl">Total</p>
              <p className="text-xl">
                {props.data?.price.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} ฿
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomCardHist
