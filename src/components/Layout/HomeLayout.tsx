import React from 'react'
import Navbar from '../Navbar/Navbar'

type Props = {
  children: React.ReactNode
}

const HomeLayout: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
    </React.Fragment>
  )
}

export default HomeLayout
