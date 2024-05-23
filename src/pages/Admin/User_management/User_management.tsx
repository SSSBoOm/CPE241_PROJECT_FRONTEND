import { SearchOutlined } from '@ant-design/icons'
import type { InputRef, TableColumnsType, TableColumnType } from 'antd'
import { Input, Table } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import React, { useRef, useState } from 'react'

interface Datatype {
  key: string
  userid: string
  fname: string
  lname: string
  phone: string
  dob: string
}

type DataIndex = keyof Datatype
const data: Datatype[] = [
  {
    key: '1',
    userid: '001',
    fname: 'Panachai',
    lname: 'Bualoi',
    phone: 'xxx-xxx-xxxx',
    dob: '04/01/2004'
  },
  {
    key: '1',
    userid: '001',
    fname: 'canachai',
    lname: 'Bualoi',
    phone: 'xxx-xxx-xxxx',
    dob: '04/01/2004'
  }
]
const User_management: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  searchText
  searchedColumn
  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
    confirm({ closeDropdown: false })
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Datatype> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : [])
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 10000)
      }
    }
  })
  const columns: TableColumnsType<Datatype> = [
    {
      title: 'UserID',
      dataIndex: 'userid',
      key: 'userid'
    },
    { title: 'Firstname', dataIndex: 'fname', key: 'fname', ...getColumnSearchProps('fname') },
    { title: 'Lastname', dataIndex: 'lname', key: 'lname', ...getColumnSearchProps('lname') },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', ...getColumnSearchProps('phone') },
    { title: 'DOB', dataIndex: 'dob', key: 'dob', ...getColumnSearchProps('dob') },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a href="/admin/user_datils">Check</a>
    }
  ]
  return (
    <>
      <div className="container mx-auto space-y-4 px-4">
        <p className="text-3xl  font-bold text-primary-blue-600">User Management</p>
      </div>
      <div className="container mx-auto">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  )
}
export default User_management
