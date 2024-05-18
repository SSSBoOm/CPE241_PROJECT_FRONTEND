import { FC, Fragment, lazy, ReactNode, Suspense } from 'react'
const Navbar = lazy(() => import('../Navbar/Navbar'))

type Props = {
  children: ReactNode
}

const HomeLayout: FC<Props> = (props) => {
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
