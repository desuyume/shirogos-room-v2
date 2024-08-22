import { cn } from '@/utils/cn'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IHeaderBttn {
  path: string
  title: string
}

const HeaderBttn: FC<IHeaderBttn> = ({ path, title }) => {
  const isActive = window.location.pathname === path

  return (
    <Link
      className={cn(
        'mr-[0.69rem] flex h-[3.58rem] w-[15rem] items-center justify-center rounded-[2.3125rem] text-center text-xl transition-colors last:mr-0',
        {
          'cursor-default bg-transparent text-primary': isActive,
          'bg-secondary text-primaryText hover:bg-secondaryHover hover:text-white': !isActive
        }
      )}
      to={path}
    >
      {title}
    </Link>
  )
}

export default HeaderBttn
