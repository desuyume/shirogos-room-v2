import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface IBoutiqueNavBttn {
  path: string
  img: string
  bgColor: string
  bgColorHover: string
}

const BoutiqueNavBttn: FC<IBoutiqueNavBttn> = ({ path, img, bgColor, bgColorHover }) => {
  const location = useLocation()
  const isActive =
    path === ''
      ? location.pathname === '/room/boutique' || location.pathname === '/room/boutique/'
      : location.pathname.includes(`/room/boutique${path}`)

  return (
    <Link
      to={`/room/boutique${path}`}
      className={
        (isActive
          ? 'border-secondary bg-secondary hover:border-secondary '
          : `${bgColor} ${bgColorHover} `) +
        'mb-3 flex h-[5.3125rem] w-[5.3125rem] items-center justify-center overflow-hidden rounded-full transition-all last-of-type:mb-0'
      }
    >
      <img src={img} alt='link-img' />
    </Link>
  )
}

export default BoutiqueNavBttn
