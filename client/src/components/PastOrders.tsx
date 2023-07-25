import { FC } from 'react'
import OrdersList from './OrdersList'

interface IPastOrders { 
	isPastOrders: boolean
	setIsPastOrders: React.Dispatch<React.SetStateAction<boolean>>
}

const PastOrders: FC<IPastOrders> = ({ isPastOrders, setIsPastOrders }) => {
	return (
		<div className={(isPastOrders ? 'visible opacity-100' : 'invisible opacity-0') + ' w-[38.8125rem] h-[18.375rem] absolute top-[11.40rem] right-6 transition-all'}>
			<div className='bg-tertiary bg-opacity-80 h-[4.3125rem] flex justify-center items-center rounded-t-[2.3125rem]'>
				<svg
					className='absolute left-5 mt-1 cursor-pointer'
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'
					onClick={() => setIsPastOrders(false)}
				>
					<circle cx='8' cy='8' r='8' fill='#C34375' />
				</svg>
				<h3 className='text-primary text-[1.875rem]'>Прошлые заказы</h3>
			</div>
			<OrdersList isPastOrders={isPastOrders} />
		</div>
	)
}

export default PastOrders
