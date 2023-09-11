import { isNumber } from '@/utils/isNumber'
import { FC, useState } from 'react'

interface IOrderPriceItem {
	cost: number
	time: string
}

const OrderPriceItem: FC<IOrderPriceItem> = ({ cost, time }) => {
	const [costValue, setCostValue] = useState<string>(String(cost))
	const [timeValue, setTimeValue] = useState<string>(time)

	const onBlurCostHandler = () => {
		if (isNumber(costValue)) {
			setCostValue(costValue)
		} else {
			setCostValue(String(cost))
			console.log('cost must be number')
		}
	}

	return (
		<div className='w-full h-[3.25rem] flex bg-secondary'>
			<input
				value={costValue}
				onChange={e => setCostValue(e.target.value)}
				onBlur={onBlurCostHandler}
				className='w-[60%] h-full flex justify-center items-center text-center text-[#FFF] text-xl font-secondary font-bold bg-transparent outline-none'
			/>
			<input
				value={timeValue}
				onChange={e => setTimeValue(e.target.value)}
				className='w-[40%] h-full flex justify-center items-center text-center text-[#FFF] text-[0.9375rem] font-secondary font-bold bg-transparent outline-none'
			/>
		</div>
	)
}

export default OrderPriceItem
