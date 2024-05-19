import { Button } from 'antd'

const StaffNavbar = () => {
  const Name = 'Test Name'
  return (
    <>
      <div className="grid h-full w-80 grid-rows-2 content-center justify-items-center gap-y-2 bg-primary-blue-600 py-8">
        <div className=" grid w-full content-center text-center align-middle text-lg text-primary-b2">
          <a className=" my-5 text-3xl font-bold">Meridian Bliss</a>
          <a className=" mb-10 text-base font-bold">Wave & Sand</a>
          <a />
          <a />
          <a href="" className=" h-10 text-center hover:bg-primary-blue-700 hover:text-primary-orange">
            Dashboard
          </a>
          <a
            href="/admin/bookinglist"
            className=" h-10 text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Booking List
          </a>
          <a
            href="/admin/user_management"
            className=" h-10 text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            User Management
          </a>
          <a
            href="/admin/room_management"
            className=" h-10 text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Room Management
          </a>
          <a
            href="/admin/service_management"
            className=" h-10 text-center hover:bg-primary-blue-700 hover:text-primary-orange"
          >
            Service Management
          </a>
        </div>
        <div className=" content-center text-center text-lg text-primary-b2 ">
          <div className="bottom-0 grid content-center gap-y-5">
            <a>{Name}</a>
            <Button ghost className="mx-3">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StaffNavbar
