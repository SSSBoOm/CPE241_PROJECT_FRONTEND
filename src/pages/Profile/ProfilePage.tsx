import { Button, DatePicker, Form, GetProps, Input, Select } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'
import { Fragment, useContext } from 'react'
import Swal from 'sweetalert2'

import { AuthContext } from '@/contexts/AuthContext'
import { GenderType } from '@/interfaces/enums/Gender'
import { PrefixType } from '@/interfaces/enums/Prefix'
import { AxiosInstance } from '@/lib/axios'

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
const dateFormat = 'DD/MM/YYYY'
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current >= dayjs().endOf('day')
}

const ProfilePage = () => {
  const auth = useContext(AuthContext)
  const [form] = Form.useForm()
  if (auth?.authContext.dob) form.setFieldsValue({ dob: dayjs(auth?.authContext.dob) })

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      const response = await AxiosInstance.patch('/api/user', {
        prefix: values.prefix,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        dob: values.dob,
        gender: values.gender,
        phone: values.phone
      })

      if (response.status === 200) {
        Swal.fire({
          title: 'แก้ไขข้อมูลสำเร็จ',
          text: 'ข้อมูลของคุณได้รับการแก้ไขเรียบร้อยแล้ว',
          icon: 'success'
        })
      }
    } catch (error) {
      console.log('Failed:', error)
    }
  }

  return (
    <Fragment>
      <div className="min-h-screen bg-[url('hotelview2.svg')] bg-cover bg-no-repeat px-4 py-8">
        <div className="container rounded-xl bg-white p-8 md:mx-auto">
          <Form
            className="mx-2 my-2"
            layout="vertical"
            onFinish={onFinish}
            form={form}
            scrollToFirstError
            initialValues={{
              prefix: auth?.authContext.prefix,
              firstName: auth?.authContext.firstName,
              lastName: auth?.authContext.lastName,
              phone: auth?.authContext.phone,
              address: auth?.authContext.address,
              gender: auth?.authContext.gender
            }}
          >
            <h1 className="m-4 text-3xl font-bold text-primary-blue-700 opacity-75">Profile</h1>
            <div className="flex w-full justify-center py-4">
              <img
                src={auth?.authContext.profileUrl}
                alt="profile"
                className="aspect-square min-h-[8rem] min-w-[8rem] rounded-full md:min-h-[16rem] md:min-w-[16rem]"
              />
            </div>
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-1 md:grid-cols-5 md:space-x-4">
                <Form.Item
                  name="prefix"
                  className="col-span-1"
                  label={<p className="font-bold">คำนำหน้าชื่อ</p>}
                  rules={[{ required: true, message: 'กรุณากรอกคำนำหน้าชื่อ' }]}
                >
                  <Select
                    showSearch
                    size="large"
                    labelRender={(label) => label.label}
                    options={[
                      { label: 'นาย', value: PrefixType.MR },
                      { label: 'นาง', value: PrefixType.MRS },
                      { label: 'นางสาว', value: PrefixType.MS }
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name="firstName"
                  className="col-span-1 md:col-span-2"
                  label={<p className="font-bold">ชื่อ</p>}
                  rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
                >
                  <Input placeholder="" size="large" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  className="col-span-1 md:col-span-2"
                  label={<p className="font-bold">นามสกุล</p>}
                  rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}
                >
                  <Input placeholder="" size="large" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
                <Form.Item label={<p className="font-bold">อีเมล</p>}>
                  <Input type="email" value={auth?.authContext.email} disabled size="large" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label={<p className="font-bold">เบอร์โทรศัพท์</p>}
                  rules={[
                    { required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' },
                    {
                      pattern: /^[0-9]*$/,
                      message: 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง'
                    }
                  ]}
                >
                  <Input type="tel" min={10} max={10} maxLength={10} size="large" />
                </Form.Item>
              </div>
              <Form.Item
                name="address"
                label={<p className="font-bold">ที่อยู่</p>}
                rules={[{ required: true, message: 'กรุณากรอกที่อยู่' }]}
              >
                <Input placeholder="" size="large" />
              </Form.Item>
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
                <Form.Item
                  name="dob"
                  label={<p className="font-bold">วันเกิด</p>}
                  rules={[{ required: true, message: 'กรุณากรอกวันเกิด' }]}
                >
                  <DatePicker size="large" className="w-full" format={dateFormat} disabledDate={disabledDate} />
                </Form.Item>
                <Form.Item
                  name="gender"
                  className="col-span-1"
                  label={<p className="font-bold">คำนำหน้าชื่อ</p>}
                  rules={[{ required: true, message: 'กรุณากรอกคำนำหน้าชื่อ' }]}
                >
                  <Select
                    showSearch
                    size="large"
                    labelRender={(label) => label.label}
                    options={[
                      { label: 'ชาย', value: GenderType.MALE },
                      { label: 'หญิง', value: GenderType.FEMALE }
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
            <Form.Item className="content-end">
              <Button type="primary" htmlType="submit" className="w-full" size="large">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Fragment>
  )
}
export default ProfilePage
