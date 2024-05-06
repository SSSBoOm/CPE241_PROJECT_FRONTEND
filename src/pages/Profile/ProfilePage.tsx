import { Button, Form, Input } from 'antd'
import { useState } from 'react'
const PF = {
  F_Name: 'Is my name ',
  L_Name: 'Is My Lastname',
  Email: 'xxxx@gmail.com',
  Tell: '0xx-xxx-xxxx',
  address: '24/2 .....'
}
const ProfilePage = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true)
  const [ChangePassword, setChangPassword] = useState<boolean>(true)

  return (
    <>
      <div className="h-screen content-center bg-[url('hotelview2.svg')] bg-cover bg-repeat">
        <div className="mx-auto w-2/4  content-center rounded-md bg-white/80">
          <div className="mx-4 my-6">
            <p className="mx-16 text-3xl font-bold text-primary-blue-700">User Details</p>
            <div className=" mx-12 my-4 grid grid-cols-1 rounded-md border-2 border-primary-blue-600 bg-white opacity-100">
              <Form disabled={componentDisabled} className="my-4">
                <div className=" mx-6 grid grid-cols-2 gap-3">
                  <Input defaultValue={PF.F_Name} />
                  <Input defaultValue={PF.L_Name} />
                  <Input defaultValue={PF.Email} disabled={true} />
                  <div></div>
                  <Input defaultValue={PF.Tell} />
                  <div></div>
                  <Input defaultValue={PF.address} />
                  <Button
                    type="primary"
                    disabled={false}
                    onClick={() => {
                      setComponentDisabled(!componentDisabled)
                      console.log(PF)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </Form>
            </div>
            <div className="grid grid-cols-2">
              <Input disabled={ChangePassword}></Input>
              <Button
                type="primary"
                className={ChangePassword == false ? 'hidden' : '' + 'w-fit'}
                onClick={() => {
                  setChangPassword(!ChangePassword)
                }}
              >
                เปลี่ยนรหัส
              </Button>
              <div className={ChangePassword == true ? 'hidden' : ''}></div>
              <Input className={ChangePassword == true ? 'hidden' : ''}></Input>
              <Button
                type="primary"
                className={ChangePassword == true ? 'hidden' : '' + 'w-fit'}
                onClick={() => {
                  setChangPassword(!ChangePassword)
                }}
              >
                ยืนยัน
              </Button>
            </div>
            <p className="mx-16 text-3xl font-bold text-primary-blue-700">Payment Methods</p>
            <div className="mx-12 my-4 grid grid-cols-1 rounded-md border-2 border-primary-blue-600 bg-white">
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
