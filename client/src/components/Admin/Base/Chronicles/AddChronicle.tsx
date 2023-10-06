import { useCreateChronicle } from '@/api/useCreateChronicle'
import { chronicleMonths } from '@/consts/months'
import { isNumber } from '@/utils/isNumber'
import { FC, useEffect, useState } from 'react'

const AddChronicle: FC = () => {
	const { mutate, isSuccess } = useCreateChronicle()
	const [date, setDate] = useState<string>('')

	const clickAdd = () => {
		let [monthStr, year] = date.split(' ')
		monthStr = monthStr.slice(0, 1).toUpperCase() + monthStr.slice(1)
		if (!Object.values(chronicleMonths).includes(monthStr)) {
			console.log('invalid date')
			return
		}

		if (!isNumber(year)) {
			console.log('invalid date')
			return
		}

		const month = Object.keys(chronicleMonths).find(
			key => chronicleMonths[key] === monthStr
		)

		if (!month) {
			console.log('invalid date')
			return
		}

		mutate({ month: +month, year: +year })
	}

	useEffect(() => {
		if (isSuccess) {
			setDate('')
		}
	}, [isSuccess])

	return (
		<div className='w-full h-[3.375rem] flex'>
			<input
				value={date}
				onChange={e => setDate(e.target.value)}
				className='w-[67%] h-full bg-tertiary outline-none text-[#FFF] text-xl text-center'
			/>
			<button
				onClick={clickAdd}
				className='w-[33%] h-full bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-[0.9375rem]'
			>
				Добавить
			</button>
		</div>
	)
}

export default AddChronicle
