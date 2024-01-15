import { FC, useState } from 'react'
import CurrentOrders from './CurrentOrders'
import PastOrders from './PastOrders'

const Orders: FC = () => {
	const [isPastOrders, setIsPastOrders] = useState<boolean>(false)

	return (
		<div className='w-[38.8125rem] h-[18.375rem] relative'>
			<CurrentOrders
				isPastOrders={isPastOrders}
				setIsPastOrders={setIsPastOrders}
			/>
			<PastOrders
				isPastOrders={isPastOrders}
				setIsPastOrders={setIsPastOrders}
			/>
		</div>
	)
}

export default Orders
