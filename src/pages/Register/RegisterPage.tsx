import { Button, Checkbox, Input } from 'antd'

const RegisterPage = () => {
  return (
    <div className=" h-dvh w-vw content-center align-middle ">
      <div className=" w-[52rem] h-[40rem] align-middle size-fit ml-auto mr-auto border-4 rounded-3xl border-primary-blue-600 grid grid-cols-2 grid-rows-12 text-primary-blue-600 bg-white opacity-80 ">
        <div className=" col-span-2 row-span-3 mt-3 ml-5 ">
          <div className="text-2xl">Meridian Bliss</div>
          <div className="text-5xl font-bold mt-2 ">Register</div>
        </div>
        <div className=" m-3 items-center row-span-2 ">
          <span className=" text-3xl font-bold ">First name</span>
          <Input className=" border-primary-blue-600 h-1/2 " placeholder="Your first name" />
        </div>
        <div className=" m-3 items-center row-span-2 ">
          <span className=" text-3xl font-bold ">Last name</span>
          <Input className=" border-primary-blue-600 h-1/2 " placeholder="Your last name" />
        </div>
        <div className=" m-3 items-center row-span-2 ">
          <span className=" text-3xl font-bold ">Email</span>
          <Input className=" border-primary-blue-600 h-1/2 " placeholder="example@gmail.com" />
        </div>
        <div className=" m-3 items-center row-span-2 ">
          <span className=" text-3xl font-bold ">Phone number</span>
          <Input className=" border-primary-blue-600 h-1/2 " placeholder="xxx-xxx-xxxx" />
        </div>
        <div className=" m-3 items-center row-span-2 ">
          <span className=" text-3xl font-bold ">Password</span>
          <Input className=" border-primary-blue-600 h-1/2 " placeholder="" />
        </div>
        <div className=" m-3 items-center row-span-2 ">
          <span className=" text-3xl font-bold ">Confirm password</span>
          <Input className=" border-primary-blue-600 h-1/2 " placeholder="" />
        </div>
        <div className=" col-span-2 ">
          <Checkbox className=" m-3 text-xl align-middle ">ฉันยอมรับเงื่อนในการให้บริการ</Checkbox>
        </div>
        <div className="w-full flex justify-center col-span-2 row-span-2">
          <Button className="py-5 bg-primary-blue-600 text-white " size="large">
            Register
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
