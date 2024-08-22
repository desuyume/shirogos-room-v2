import { cn } from '@/utils/cn'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IPageLink {
  path: string
  title: string
  type: 'primary' | 'secondary'
}

const PageLink: FC<IPageLink> = ({ path, title, type }) => {
  return (
    <Link
      className={cn(
        'z-20 mr-[2.87rem] flex h-[5.625rem] items-center justify-center rounded-[2.3125rem] text-[2.8125rem] transition-colors last:mr-0',
        {
          'w-[25.75rem] bg-primary text-primaryText hover:bg-primaryHover hover:text-white':
            type === 'primary',
          'w-[23.5625rem] bg-secondary text-primary hover:bg-secondaryHover hover:text-primaryHover ':
            type === 'secondary'
        }
      )}
      to={path}
    >
      {title}
    </Link>
  )
}

export default PageLink
