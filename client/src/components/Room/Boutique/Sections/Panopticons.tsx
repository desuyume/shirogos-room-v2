import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const Panopticons: FC = () => {
	const location = useLocation()
	const isActive =
		location.pathname === '/room/boutique/panopticons' ||
		location.pathname === '/room/boutique/panopticons/'

	return (
		<div className={(isActive ? 'block ': 'hidden ') + 'h-[47.125rem]'}>
			Panopticons
		</div>
	)
}

export default Panopticons