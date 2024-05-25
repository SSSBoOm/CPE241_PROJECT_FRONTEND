import { IReservation } from '@/interfaces/Reservation'

type Props = {
  data: IReservation
}

const ServiceCardHist = (props: Props) => {
  return (
    <>
      <div className="grid min-h-32 w-full min-w-[300px] rounded-md border-2 border-primary-blue-700 md:flex">
        <div className="w-full rounded-md bg-cover md:w-3/12">
          <img
            className="h-full content-center object-cover"
            src={`https://evquseshrfnvyndhterj.supabase.co/storage/v1/object/public/cpe241-image/${props?.data?.service?.serviceType?.imageUrl || ''}`}
            onError={(e) => {
              e.currentTarget.src = `${window.location.origin}/user_not_found.svg`
            }}
            alt="img"
          />
        </div>
        <div className="h-full w-full p-2 md:w-9/12">
          <div className="grid h-full grid-cols-1 md:grid-cols-3">
            <div className="flex-1 flex-col flex-wrap ">
              <div className="mb-4 text-wrap">
                <p className="text-3xl font-semibold">{props.data?.service?.name}</p>
                <p className="truncate text-sm">{props.data?.service?.description}</p>
              </div>
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

export default ServiceCardHist
