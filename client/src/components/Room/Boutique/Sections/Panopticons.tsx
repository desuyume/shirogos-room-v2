import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import PanopticonsList from '../Panopticons/PanopticonsList'

const Panopticons: FC = () => {
  const location = useLocation()
  const isActive =
    location.pathname === '/room/boutique/panopticons' ||
    location.pathname === '/room/boutique/panopticons/'

  return (
    <div
      className={
        (isActive ? 'block ' : 'hidden ') +
        'flex h-[47.125rem] justify-end py-[0.94rem] pl-[8.12rem] pr-[1.06rem]'
      }
    >
      <PanopticonsList />
    </div>
  )
}

export default Panopticons
