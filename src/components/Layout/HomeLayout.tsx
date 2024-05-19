import React, { Fragment, lazy, ReactNode, Suspense } from 'react'
const Navbar = lazy(() => import('../Navbar/Navbar'))

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
