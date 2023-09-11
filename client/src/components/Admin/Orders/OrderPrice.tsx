import { FC } from 'react'
import OrderPriceList from './OrderPriceList'
import OrderPriceRules from './OrderPriceRules'

interface IOrderPrice {
	type: string
}

const OrderPrice: FC<IOrderPrice> = ({ type }) => {
	return (
		<div className='w-full mb-[3.06rem] last-of-type:mb-0'>
			<div className='w-full h-[2.9375rem] flex bg-tertiary'>
				<p className='w-[60%] h-full flex justify-center items-center text-center text-[#FFF] text-xl font-secondary font-bold'>
					Прайс заказа {type === 'game' ? 'игры' : 'просмотра'}
				</p>
				<p className='w-[40%] h-full flex justify-center items-center text-center text-[#FFF] text-xl font-secondary font-bold'>
					Текст
				</p>
			</div>
			<OrderPriceList />
			<OrderPriceRules type={type} />
		</div>
	)
}

export default OrderPrice
