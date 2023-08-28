import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const Store: FC = () => {
	const location = useLocation()
	const isActive =
		location.pathname === '/room/boutique/store' ||
		location.pathname === '/room/boutique/store/'

	return (
		<div className={(isActive ? 'block ' : 'hidden ') + 'h-[46.25rem]'}>
			Store
		</div>
	)
}

export default Store