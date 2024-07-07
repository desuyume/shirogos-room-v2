import { FC, useEffect, useState } from 'react'
import OrderRules from './OrderRules'
import Order from './Order'
import OrderDone from './OrderDone'
import RulesBlock from './RulesBlock'
import { IMakeOrder } from '@/types/room.interface'
import { useMakeOrder } from '@/api/useMakeOrder'
import { isUrl } from '@/utils/isUrl'
import { needUrlToast, notEnoughDangoToast } from '@/utils/toasts'
import { toast } from 'react-toastify'
import { useToastOnError } from '@/hooks/useToast'

interface IOrderSection {
	orderType: string
}

const OrderSection: FC<IOrderSection> = ({ orderType }) => {
	const [userOrder, setUserOrder] = useState<IMakeOrder | null>(null)
	const [isOrdered, setIsOrdered] = useState<boolean>(false)
	const [isRulesOpened, setIsRulesOpened] = useState<boolean>(false)
	const [finalPrice, setFinalPrice] = useState<number>(0)

	const { mutate, isSuccess: isBuySucces, error } = useMakeOrder(orderType)

	const clickBuy = () => {
		if (userOrder) {
			const isVideo =
				userOrder?.orderPriceId === 4 || userOrder?.orderPriceId === 5

			if (isVideo && !isUrl(userOrder.orderText)) {
				needUrlToast()
				return
			}

			if (userOrder.orderText.length < 3) {
				toast.warning('Описание заказа должно быть не менее 3 символов !')
				return
			}

			mutate({
				orderText: userOrder.orderText,
				orderPriceId: userOrder.orderPriceId,
			})
		} else {
			toast.warning('Не указан заказ !')
		}
	}

	const clickDanBttn = () => {
		setUserOrder(null)
		setIsOrdered(false)
		setFinalPrice(0)
	}

	useToastOnError(error, notEnoughDangoToast)

	useEffect(() => {
		if (isBuySucces) {
			setIsOrdered(true)
		}
	}, [isBuySucces])

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
			<RulesBlock type={orderType} isRulesOpened={isRulesOpened} />
		</div>
	)
}

export default OrderSection
