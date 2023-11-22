import { useInputLimit } from '@/hooks/useInputLimit'
import { IMakeOrder } from '@/types/room.interface'
import { FC, useEffect, useState } from 'react'

interface IOrderInput {
	isOrdered: boolean
	time: string
	orderPrice: number
	orderPriceId: number
	setFinalPrice: React.Dispatch<React.SetStateAction<number>>
	userOrder: IMakeOrder | null
	setUserOrder: React.Dispatch<React.SetStateAction<IMakeOrder | null>>
}

const OrderInput: FC<IOrderInput> = ({
	isOrdered,
	time,
	orderPrice,
	orderPriceId,
	setFinalPrice,
	userOrder,
	setUserOrder,
}) => {
	const [description, setDescription] = useState<string>('')
	const [isInputActive, setIsInputActive] = useState<boolean>(false)
	const { limit, setLimit, changeNameHandler, keyDownHandler } =
		useInputLimit(setDescription)

	const clickChooseBttn = () => {
		if (isInputActive) {
			setFinalPrice(0)
			setUserOrder(null)
		} else {
			setFinalPrice(orderPrice)
			setUserOrder({ orderText: description, orderPriceId: orderPriceId })
		}
		setIsInputActive(!isInputActive)
	}

	useEffect(() => {
		if (!isOrdered) {
			setIsInputActive(false)
			setDescription('')
			setLimit(34)
		}
	}, [isOrdered])

	useEffect(() => {
		if (userOrder && userOrder?.orderPriceId !== orderPriceId) {
			setIsInputActive(false)
		}
	}, [userOrder])

	useEffect(() => {
		if (userOrder) {
			const updatedOrder = {
				orderText: description,
				orderPriceId: orderPriceId,
			}
			setUserOrder(updatedOrder)
		}
	}, [description])

	return (
		<div
			className={
				(isInputActive ? 'border-[1px] border-primaryText ' : '') +
				'w-full h-[2.8rem] flex mb-[0.41rem] last-of-type:mb-0'
			}
		>
			<div className='w-[21%] h-full bg-tertiary bg-opacity-50 flex justify-center items-center'>
				<p className='text-primaryText text-[0.9375rem] text-center'>{time}</p>
			</div>
			<div className='flex-1 h-full flex items-center relative'>
				<input
					value={description}
					onChange={e => changeNameHandler(e)}
					onKeyDown={e => keyDownHandler(e)}
					disabled={!isInputActive}
					className='w-full h-full text-center placeholder:text-primaryText placeholder:text-opacity-25 outline-none text-primaryText text-[0.9375rem] bg-tertiary'
					placeholder='Не забудь описание'
				/>
				<p
					className={
						(isInputActive ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
						'absolute right-[0.44rem] text-[0.625rem] z-10 pointer-events-none transition-all'
					}
				>
					{limit}
				</p>
			</div>

			<button
				onClick={clickChooseBttn}
				className={
					(isInputActive
						? 'w-[22.19%] text-[0.9375rem] bg-secondary hover:bg-secondaryHover '
						: 'w-[15.9%] bg-primary hover:bg-primaryHover text-xs ') +
					'h-full transition-all text-primaryText'
				}
			>
				{isInputActive ? 'Отмена' : 'Выбрать'}
			</button>
		</div>
	)
}

export default OrderInput
