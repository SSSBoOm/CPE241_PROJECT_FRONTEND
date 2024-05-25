import FormatDate from '@/components/utils/formatDate'
import { BOOKING_DETAILS_PATH } from '@/configs/route'
import { GenderType } from '@/interfaces/enums/Gender'
import { PrefixType } from '@/interfaces/enums/Prefix'
import { ReservationType } from '@/interfaces/enums/ReservationType'
import { IReservation } from '@/interfaces/Reservation'
import { IUser } from '@/interfaces/User'
import { AxiosInstance } from '@/lib/axios'
import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Form, GetProps, Input, Modal, Select, Table } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

const columnsRoom: TableColumnsType<IReservation> = [
  {
    title: 'BookingID',
    dataIndex: 'id',
    key: 'bookingid'
  },
  {
    title: 'Type',
    dataIndex: 'Type',
    key: 'Type',
    render: (_: string, row: IReservation) => row.type
  },
  {
    title: 'Firstname',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_: string, row: IReservation) => row.user?.firstName
  },
  {
    title: 'Lastname',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (_: string, row: IReservation) => row.user?.lastName
  },
  {
    title: 'checkIn',
    dataIndex: 'startDate',
    key: 'checkin',
    render: (date: Date) => FormatDate(date)
  },
  { title: 'checkOut', dataIndex: 'endDate', key: 'checkout', render: (date: Date) => FormatDate(date) },
  {
    title: '',
    dataIndex: '',
    key: 'x',
    render: (_, row: IReservation) => <Link to={`${BOOKING_DETAILS_PATH}/${row.id}`}>Detail</Link>
  }
]

const UserManagement: React.FC = () => {
  const [user, setUser] = useState<IUser[]>([])
  const [searchEmail, setSearchEmail] = useState<string>('')
  const [searchFirstname, setSearchFirstname] = useState<string>('')
  const [searchLastname, setSearchLastname] = useState<string>('')
  const [openProfileDialog, setOpenProfileDialog] = useState<boolean>(false)
  const [openRoomDialog, setOpenRoomDialog] = useState<boolean>(false)
  const [openServiceDialog, setOpenServiceDialog] = useState<boolean>(false)
  const [dialogProfileData, setDialogProfileData] = useState<IUser>()

  const [form] = Form.useForm()
  const openProfileDialogFn = (uuid: string) => {
    const data = user.find((item) => item.id === uuid)
    if (data) {
      setDialogProfileData(data)
      setOpenProfileDialog(true)
    }
  }
  const openRoomDialogFn = (uuid: string) => {
    const data = user.find((item) => item.id === uuid)
    if (data) {
      setDialogProfileData(data)
      setOpenRoomDialog(true)
    }
  }
  const openServiceDialogFn = (uuid: string) => {
    const data = user.find((item) => item.id === uuid)
    if (data) {
      setDialogProfileData(data)
      setOpenServiceDialog(true)
    }
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AxiosInstance.get('/api/admin/manage/user')
        console.log(response.data.data as IUser[])

        setUser(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])

  const columns: TableColumnsType<IUser> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    { title: 'Prefix', dataIndex: 'prefix', key: 'prefix' },
    { title: 'Firstname', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Lastname', dataIndex: 'lastName', key: 'lastName' },
    {
      title: 'Date of birth',
      dataIndex: 'dob',
      render: (_: string, row: IUser) => {
        if (row.dob) return dayjs(row.dob).format('DD/MM/YYYY')
        return 'N/A'
      },
      key: 'dob'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_: string, i: IUser) => (
        <div className="flex w-full justify-center space-x-2">
          {/* Profile openProfileDialogFn */}
          <Button type="primary" onClick={() => openProfileDialogFn(i.id)}>
            Profile
          </Button>
          <Button type="primary" onClick={() => openRoomDialogFn(i.id)}>
            Room
          </Button>
          <Button type="primary" onClick={() => openServiceDialogFn(i.id)}>
            Service
          </Button>
        </div>
      )
    }
  ]
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <div className="space-y-4">
          <div className="flex w-full justify-between px-4">
            <p className="text-3xl  font-bold text-primary-blue-600">User Management</p>
          </div>
          <div className="grid grid-cols-1 gap-y-4 py-4 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-0">
            <div className="space-y-2">
              <p className="text-xl font-bold">Search Email</p>
              <Input
                placeholder="Search Email"
                size="large"
                onChange={(e) => {
                  setSearchEmail(e.target.value)
                }}
              />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold">Search Firstname</p>
              <Input
                placeholder="Search Firstname"
                size="large"
                onChange={(e) => {
                  setSearchFirstname(e.target.value)
                }}
              />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold">Search Lastname</p>
              <Input
                placeholder="Search Lastname"
                size="large"
                onChange={(e) => {
                  setSearchLastname(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="mx-auto text-center">
            <Table
              columns={columns}
              dataSource={user.filter((item) => {
                return (
                  item.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
                  item.firstName.toLowerCase().includes(searchFirstname.toLowerCase()) &&
                  item.lastName.toLowerCase().includes(searchLastname.toLowerCase())
                )
              })}
            />
          </div>
        </div>
      </div>
      {/* make modal center screen */}
      <Modal
        width={'80vw'}
        styles={{ body: { height: '70vh', overflowY: 'auto' } }}
        title={<h1 className="m-4 text-3xl font-bold text-primary-blue-700 opacity-75">Profile</h1>}
        open={openProfileDialog}
        centered
        closeIcon={null}
        footer={
          <div className="flex justify-end">
            <Button
              type="primary"
              onClick={() => {
                setOpenProfileDialog(false)
              }}
            >
              Close
            </Button>
          </div>
        }
        onOk={async () => {
          setOpenProfileDialog(false)
        }}
        style={{ width: '100%', resize: 'none' }}
      >
        {dialogProfileData ? (
          <div className="container rounded-xl bg-white p-8 md:mx-auto">
            <Form
              className="mx-2 my-2"
              layout="vertical"
              form={form}
              scrollToFirstError
              initialValues={{
                prefix: dialogProfileData.prefix,
                firstName: dialogProfileData.firstName,
                lastName: dialogProfileData.lastName,
                phone: dialogProfileData.phone,
                address: dialogProfileData.address,
                gender: dialogProfileData.gender
              }}
            >
              <div className="flex w-full justify-center py-4">
                <img
                  src={dialogProfileData.profileUrl}
                  alt="profile"
                  className="aspect-square min-h-[4rem] min-w-[4rem] rounded-full md:min-h-[8rem] md:min-w-[8rem]"
                  onError={(e) => {
                    e.currentTarget.src = `${window.location.origin}/user_not_found.svg`
                  }}
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
                      disabled
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
                    <Input placeholder="" size="large" disabled />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    className="col-span-1 md:col-span-2"
                    label={<p className="font-bold">นามสกุล</p>}
                    rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}
                  >
                    <Input placeholder="" size="large" disabled />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
                  <Form.Item label={<p className="font-bold">อีเมล</p>}>
                    <Input type="email" value={dialogProfileData.email} disabled size="large" />
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
                    <Input type="tel" min={10} max={10} maxLength={10} size="large" disabled />
                  </Form.Item>
                </div>
                <Form.Item
                  name="address"
                  label={<p className="font-bold">ที่อยู่</p>}
                  rules={[{ required: true, message: 'กรุณากรอกที่อยู่' }]}
                >
                  <Input placeholder="" size="large" disabled />
                </Form.Item>
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
                  <Form.Item
                    name="dob"
                    label={<p className="font-bold">วันเกิด</p>}
                    rules={[{ required: true, message: 'กรุณากรอกวันเกิด' }]}
                  >
                    <DatePicker
                      size="large"
                      className="w-full"
                      format={dateFormat}
                      disabledDate={disabledDate}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    className="col-span-1"
                    label={<p className="font-bold">เพศ</p>}
                    rules={[{ required: true, message: 'กรุณากรอกเพศ' }]}
                  >
                    <Select
                      showSearch
                      size="large"
                      disabled
                      labelRender={(label) => label.label}
                      options={[
                        { label: 'ชาย', value: GenderType.MALE },
                        { label: 'หญิง', value: GenderType.FEMALE }
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
      <Modal
        width={'80vw'}
        styles={{ body: { height: '70vh', overflowY: 'auto' } }}
        title={<h1 className="m-4 text-3xl font-bold text-primary-blue-700 opacity-75">Room Reservation</h1>}
        open={openRoomDialog}
        centered
        closeIcon={null}
        footer={
          <div className="flex justify-end">
            <Button
              type="primary"
              onClick={() => {
                setOpenRoomDialog(false)
              }}
            >
              Close
            </Button>
          </div>
        }
        onOk={async () => {
          setOpenRoomDialog(false)
        }}
        style={{ width: '100%', resize: 'none' }}
      >
        <Table
          columns={columnsRoom}
          dataSource={dialogProfileData?.reservation!.filter((item) => {
            return item.type === ReservationType.ROOM
          })}
        />
      </Modal>
      <Modal
        width={'80vw'}
        styles={{ body: { height: '70vh', overflowY: 'auto' } }}
        title={<h1 className="m-4 text-3xl font-bold text-primary-blue-700 opacity-75">Service Reservation</h1>}
        open={openServiceDialog}
        centered
        closeIcon={null}
        footer={
          <div className="flex justify-end">
            <Button
              type="primary"
              onClick={() => {
                setOpenServiceDialog(false)
              }}
            >
              Close
            </Button>
          </div>
        }
        onOk={async () => {
          setOpenServiceDialog(false)
        }}
        style={{ width: '100%', resize: 'none' }}
      >
        <Table
          columns={columnsRoom}
          dataSource={dialogProfileData?.reservation!.filter((item) => {
            return item.type === ReservationType.SERVICE
          })}
        />
      </Modal>
    </React.Fragment>
  )
}
export default UserManagement
