import React, { Fragment, ReactNode, Suspense } from 'react'
import Navbar from '../Navbar/Navbar'

type Props = {
  children: ReactNode
}

const HomeLayout: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <Suspense>
        <Navbar />
        {props.children}
      </Suspense>
    </Fragment>
  )
}

export default HomeLayout
