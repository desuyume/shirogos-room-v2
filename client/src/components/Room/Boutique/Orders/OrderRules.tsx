import { FC, useState } from 'react'
import olenyashaImg from '@/assets/room/olenyasha-order.png'
import olenyashaHoverImg from '@/assets/room/olenyasha-order-hover.png'

interface IOrderRules {
	type: string
	isRulesOpened: boolean
	setIsRulesOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const OrderRules: FC<IOrderRules> = ({ type, isRulesOpened, setIsRulesOpened }) => {
	const [isRulesHover, setIsRulesHover] = useState<boolean>(false)

	const mouseEnterHandler = () => {
		if (isRulesOpened) {
			setIsRulesHover(false)
		} else {
			setIsRulesHover(true)
		}
	}

	const mouseLeaveHandler = () => {
		if (isRulesOpened) {
			setIsRulesHover(true)
		} else {
			setIsRulesHover(false)
		}
	}

	return (
		<div className='w-[23.28%] flex flex-col items-center transition-all z-20'>
			<img
				className={
					(isRulesHover ? 'mr-[2.2rem] ' : '') + ' ml-[0.69rem] min-w-[13.5rem] h-[13.625rem]'
				}
				src={isRulesHover ? olenyashaHoverImg : olenyashaImg}
				alt='olenyasha-img'
			/>
			<div
				onMouseEnter={mouseEnterHandler}
				onMouseLeave={mouseLeaveHandler}
				onClick={() => setIsRulesOpened(!isRulesOpened)}
				className='w-full h-[6.22319rem] bg-tertiary hover:bg-secondaryHover transition-all cursor-pointer bg-opacity-50 rounded-[1.5625rem] flex justify-center items-center'
			>
				<p className='text-primaryText text-xl leading-[97.795%] text-center w-[11.25rem]'>
					{type === 'game' ? 'Правила заказа игр' : 'Правила заказа просмотра'}
				</p>
			</div>
		</div>
	)
}

export default OrderRules
