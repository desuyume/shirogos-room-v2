import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import BooutiqueNav from '../Boutique/BooutiqueNav'
import BoutiqueSections from '../Boutique/BoutiqueSections'

const RoomBoutique: FC = () => {
  const location = useLocation()
  const isActive = location.pathname.includes('/room/boutique')

  return (
    <div
      className={
        (isActive ? 'block' : 'hidden') +
        ' relative w-full rounded-[2.3125rem] bg-black bg-opacity-25 transition-all'
      }
    >
      <BooutiqueNav />
      <BoutiqueSections />
    </div>
  )
}

export default RoomBoutique
