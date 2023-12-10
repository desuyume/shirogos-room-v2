import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import OrderSection from '../Orders/OrderSection'

const Orders: FC = () => {
	const location = useLocation()
	const isActive =
		location.pathname === '/room/boutique/orders' ||
		location.pathname === '/room/boutique/orders/'

	return (
		<div
			className={
				(isActive ? 'block ' : 'hidden ') +
				'h-[47.125rem] flex flex-col justify-between pl-[9rem] pr-6 py-[0.94rem]'
			}
		>
			<OrderSection orderType='game' />
			<OrderSection orderType='viewing' />
		</div>
	)
}

export default Orders
