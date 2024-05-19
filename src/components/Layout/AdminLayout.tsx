import React from 'react'
import StaffNavbar from '../Navbar/StaffNavbar'

type Props = {
  children: React.ReactNode
}

const AdminLayout: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <div className="flex w-full">
        <div className="sticky left-0 top-0 h-screen bg-white">
          <StaffNavbar />
        </div>
        <div className="w-full">
          <div className="h-16 w-full bg-primary-blue-600 opacity-80"></div>
          <div className="w-full p-8">{props.children}</div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminLayout
