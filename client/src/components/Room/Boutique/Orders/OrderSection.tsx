import { FC, useState } from 'react'
import OrderRules from './OrderRules'
import Order from './Order'
import OrderDone from './OrderDone'
import { IOrder } from '@/types/order.interface'
import RulesBlock from './RulesBlock'

interface IOrderSection {
	type: string
}

const OrderSection: FC<IOrderSection> = ({ type }) => {
	const [orders, setOrders] = useState<IOrder[] | null>(null)
	const [isOrdered, setIsOrdered] = useState<boolean>(false)
	const [isRulesOpened, setIsRulesOpened] = useState<boolean>(false)
	const [finalPrice, setFinalPrice] = useState<number>(0)

	const clickBuy = () => {
		if (orders) {
			setIsOrdered(true)
		} else {
			console.log('no orders')
		}
	}

	const clickDanBttn = () => {
		setOrders(null)
		setIsOrdered(false)
		setFinalPrice(0)
	}

	return (
		<div
			className={
				(type === 'game' ? 'bg-room-gameOrder-bg rounded-[1.5625rem] ' : '') +
				'w-full h-[21.75rem] py-[0.94rem] pl-[0.69rem] flex relative'
			}
		>
			<div className={(isOrdered ? 'opacity-0 invisible ' : 'opacity-100 visible ') + 'w-full h-full flex transition-all'}>
				<OrderRules type={type} isRulesOpened={isRulesOpened} setIsRulesOpened={setIsRulesOpened} />
				<Order
					finalPrice={finalPrice}
					setFinalPrice={setFinalPrice}
					clickBuy={clickBuy}
					isOrdered={isOrdered}
					orders={orders}
					setOrders={setOrders}
					type={type}
				/>
			</div>
			<OrderDone
				clickDanBttn={clickDanBttn}
				isOrdered={isOrdered}
				orders={orders}
			/>
			<RulesBlock type={type} isRulesOpened={isRulesOpened} />
		</div>
	)
}

export default OrderSection
