const ProfilePage = () => {
  return (
    <>
      <div className="h-screen content-center bg-[url('hotelview2.svg')] bg-cover bg-repeat">
        <div className="mx-auto w-2/4  content-center rounded-md bg-white opacity-80">
          <div className="mx-4 my-6">
            <p>User Details</p>
            <div className=" mx-12 grid grid-cols-1 rounded-md border-2 border-primary-blue-600 bg-white">
              <p>Name</p>
              <p>Name</p>
              <p>Name</p>
              <div className="grid grid-cols-5">
                <p className=" col-span-4">Name</p>
                <button>button</button>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <p className="">Password</p>
              <button className="w-fit">Change</button>
            </div>
            <p>Payment Methods</p>
            <div className=" mx-12 grid grid-cols-1 rounded-md border-2 border-primary-blue-600 bg-white">
              <p>Name</p>
              <p>Name</p>
              <p>Name</p>
              <div className="grid grid-cols-5">
                <p className=" col-span-4">Name</p>
                <button>button</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProfilePage
