import { USER_DETAILS_PATH } from '@/configs/route'
import { IUser } from '@/interfaces/User'
import { AxiosInstance } from '@/lib/axios'
import type { TableColumnsType } from 'antd'
import { Input, Table } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserManagement: React.FC = () => {
  const [user, setUser] = useState<IUser[]>([])
  const [searchEmail, setSearchEmail] = useState<string>('')
  const [searchFirstname, setSearchFirstname] = useState<string>('')
  const [searchLastname, setSearchLastname] = useState<string>('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AxiosInstance.get('/api/admin/manage/user')
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
      render: () => <Link to={USER_DETAILS_PATH}>Check</Link>
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
    </React.Fragment>
  )
}
export default UserManagement
