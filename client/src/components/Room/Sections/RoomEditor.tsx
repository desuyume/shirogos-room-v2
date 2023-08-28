import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const RoomEditor: FC = () => {
	const location = useLocation()
	const isActive = location.pathname.includes('/room/editor')

	return (
		<div className={(isActive ? 'block' : 'hidden') + ' transition-all'}>
			RoomEditor
		</div>
	)
}

export default RoomEditor