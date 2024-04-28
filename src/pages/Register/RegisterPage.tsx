import { Button, Checkbox, Input } from 'antd'

const RegisterPage = () => {
  return (
    <div className=" w-vw h-dvh content-center align-middle ">
      <div className=" ml-auto mr-auto grid size-fit h-[40rem] w-[52rem] grid-cols-2 grid-rows-12 rounded-3xl border-4 border-primary-blue-600 bg-white align-middle text-primary-blue-600 opacity-80 ">
        <div className=" col-span-2 row-span-3 ml-5 mt-3 ">
          <div className="text-2xl">Meridian Bliss</div>
          <div className="mt-2 text-5xl font-bold ">Register</div>
        </div>
        <div className=" row-span-2 m-3 items-center ">
          <span className=" text-3xl font-bold ">First name</span>
          <Input className=" h-1/2 border-primary-blue-600 " placeholder="Your first name" />
        </div>
        <div className=" row-span-2 m-3 items-center ">
          <span className=" text-3xl font-bold ">Last name</span>
          <Input className=" h-1/2 border-primary-blue-600 " placeholder="Your last name" />
        </div>
        <div className=" row-span-2 m-3 items-center ">
          <span className=" text-3xl font-bold ">Email</span>
          <Input className=" h-1/2 border-primary-blue-600 " placeholder="example@gmail.com" />
        </div>
        <div className=" row-span-2 m-3 items-center ">
          <span className=" text-3xl font-bold ">Phone number</span>
          <Input className=" h-1/2 border-primary-blue-600 " placeholder="xxx-xxx-xxxx" />
        </div>
        <div className=" row-span-2 m-3 items-center ">
          <span className=" text-3xl font-bold ">Password</span>
          <Input className=" h-1/2 border-primary-blue-600 " placeholder="" />
        </div>
        <div className=" row-span-2 m-3 items-center ">
          <span className=" text-3xl font-bold ">Confirm password</span>
          <Input className=" h-1/2 border-primary-blue-600 " placeholder="" />
        </div>
        <div className=" col-span-2 ">
          <Checkbox className=" m-3 align-middle text-xl ">ฉันยอมรับเงื่อนในการให้บริการ</Checkbox>
        </div>
        <div className="col-span-2 row-span-2 flex w-full justify-center">
          <Button className="bg-primary-blue-600 py-5 text-white " size="large">
            Register
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
