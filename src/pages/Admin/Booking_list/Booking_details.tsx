import Details from '../../../components/Card/Detail'
const profiles = {
  Fname: 'panachai',
  Lname: 'Bualoi',
  Email: 'dmails@gmail.com',
  Tell: '061-xxx-xxxx'
}

const Booking_details = () => {
  return (
    <>
      <div className="grid grid-rows-1 justify-items-center gap-4">
        <p className="text-center text-2xl font-bold text-primary-blue-600">Booking Details</p>
        <div className="w-96 rounded-md border-2 border-primary-blue-700 px-2 py-4">
          <p className="mb-4 text-xl font-bold text-primary-blue-600">User Details</p>
          <div className="my-1">
            <b className="mr-3 inline-block">name:</b>
            <p className="mr-3 inline-block">{profiles.Fname}</p>
            <p className="inline-block">{profiles.Lname}</p>
          </div>
          <div>
            <b className="mr-3 inline-block">Email:</b>
            <p className="mr-3 inline-block">{profiles.Email}</p>
            <b className="mr-3 inline-block">Tell:</b>
            <p className="inline-block">{profiles.Tell}</p>
          </div>
        </div>
        <p className="text-center text-2xl font-bold text-primary-blue-600">Room</p>
        <div className=" w-5/12">
          <Details
            food={true}
            accommodate={2}
            RoomNo="A42"
            content="wddwdw"
            image="../../Room_1.jpg"
            name="dwdw"
            price={245}
            checkIn="24/04/2024"
            checkOut="25/04/2024"
            oncoming={true}
          />
        </div>
      </div>
    </>
  )
}
export default Booking_details
