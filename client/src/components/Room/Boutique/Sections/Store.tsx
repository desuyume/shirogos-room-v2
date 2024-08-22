import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import Badges from '../Store/Badges'
import Backgrounds from '../Store/Backgrounds'

const Store: FC = () => {
  const location = useLocation()
  const isActive =
    location.pathname === '/room/boutique/store' || location.pathname === '/room/boutique/store/'

  return (
    <div
      className={
        (isActive ? 'block ' : 'hidden ') +
        'flex h-[46.25rem] pb-[1.31rem] pl-[8.12rem] pt-[0.94rem]'
      }
    >
      <Badges />
      <Backgrounds />
    </div>
  )
}

export default Store
