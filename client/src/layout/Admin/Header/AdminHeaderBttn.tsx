import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IHeaderBttn {
  path: string
  title: string
}

const AdminHeaderBttn: FC<IHeaderBttn> = ({ path, title }) => {
  const isActive = window.location.pathname === path

  return (
    <Link
      className={
        (isActive
          ? 'cursor-default bg-transparent text-primary'
          : 'bg-secondary text-white hover:bg-secondaryHover') +
        ' mr-[0.8rem] inline-block rounded-[37px] py-4 text-center text-xl transition-all last:mr-0'
      }
      to={path}
    >
      {title}
    </Link>
  )
}

export default AdminHeaderBttn
