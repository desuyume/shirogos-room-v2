import { FC, useEffect, useState } from 'react'
import OrderRules from './OrderRules'
import Order from './Order'
import OrderDone from './OrderDone'
import RulesBlock from './RulesBlock'
import { IMakeOrder } from '@/types/room.interface'
import { useMakeOrder } from '@/api/useMakeOrder'
import { isUrl } from '@/utils/isUrl'

interface IOrderSection {
	orderType: string
}

const OrderSection: FC<IOrderSection> = ({ orderType }) => {
	const [userOrder, setUserOrder] = useState<IMakeOrder | null>(null)
	const [isOrdered, setIsOrdered] = useState<boolean>(false)
	const [isRulesOpened, setIsRulesOpened] = useState<boolean>(false)
	const [finalPrice, setFinalPrice] = useState<number>(0)

	const { mutate, isSuccess } = useMakeOrder(orderType)

	const clickBuy = () => {
		if (userOrder) {
			const isVideo =
				userOrder?.orderPriceId === 4 || userOrder?.orderPriceId === 5

			if (isVideo && !isUrl(userOrder.orderText)) {
				console.log('video must be a url')
				return
			}

			mutate({
				orderText: userOrder.orderText,
				orderPriceId: userOrder.orderPriceId,
			})
		} else {
			console.log('no orders')
		}
	}

	const clickDanBttn = () => {
		setUserOrder(null)
		setIsOrdered(false)
		setFinalPrice(0)
	}

	useEffect(() => {
		if (isSuccess) {
			setIsOrdered(true)
		}
	}, [isSuccess])

	return (
		<div
			className={
				(orderType === 'game'
					? 'bg-room-gameOrder-bg rounded-[1.5625rem] '
					: '') + 'w-full h-[21.75rem] py-[0.94rem] pl-[0.69rem] flex relative'
			}
		>
			<div
				className={
					(isOrdered ? 'opacity-0 invisible ' : 'opacity-100 visible ') +
					'w-full h-full flex transition-all'
				}
			>
				<OrderRules
					type={orderType}
					isRulesOpened={isRulesOpened}
					setIsRulesOpened={setIsRulesOpened}
				/>
				<Order
					finalPrice={finalPrice}
					setFinalPrice={setFinalPrice}
					clickBuy={clickBuy}
					isOrdered={isOrdered}
					userOrder={userOrder}
					setUserOrder={setUserOrder}
					type={orderType}
				/>
			</div>
			<OrderDone
				clickDanBttn={clickDanBttn}
				isOrdered={isOrdered}
				userOrder={userOrder}
			/>
			<RulesBlock rules={orderType} isRulesOpened={isRulesOpened} />
		</div>
	)
}

export default OrderSection
