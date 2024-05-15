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
        <div>{props.children}</div>
      </div>
    </React.Fragment>
  )
}

export default AdminLayout
