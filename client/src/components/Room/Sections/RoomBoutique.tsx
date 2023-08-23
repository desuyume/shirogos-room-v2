import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const RoomBoutique: FC = () => {
	const location = useLocation()
	const isActive = location.pathname === '/room/boutique'

	return (
		<div className={(isActive ? 'block' : 'hidden') + ' transition-all'}>
			RoomBoutique
		</div>
	)
}

export default RoomBoutique