import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const Orders: FC = () => {
	const location = useLocation()
	const isActive =
		location.pathname === '/room/boutique/orders' ||
		location.pathname === '/room/boutique/orders/'

	return (
		<div className={(isActive ? 'block ' : 'hidden ') + 'h-[47.125rem]'}>
			Orders
		</div>
	)
}

export default Orders