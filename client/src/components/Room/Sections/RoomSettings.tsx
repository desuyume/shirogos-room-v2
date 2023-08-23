import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const RoomSettings: FC = () => {
	const location = useLocation()
	const isActive = location.pathname === '/room/settings'

	return (
		<div className={(isActive ? 'block' : 'hidden') + ' transition-all'}>
			RoomSettings
		</div>
	)
}

export default RoomSettings