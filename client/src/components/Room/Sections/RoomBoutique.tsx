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
				' transition-all w-full bg-black bg-opacity-25 rounded-[2.3125rem] relative'
			}
		>
			<BooutiqueNav />
			<BoutiqueSections />
		</div>
	)
}

export default RoomBoutique
