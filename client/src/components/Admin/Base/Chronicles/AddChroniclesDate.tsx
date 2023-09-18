import { FC, useState } from 'react'

const AddChroniclesDate: FC = () => {
	const [date, setDate] = useState<string>('')

	return (
		<div className='w-full h-[3.375rem] flex'>
			<input
				value={date}
				onChange={e => setDate(e.target.value)}
				className='w-[67%] h-full bg-tertiary outline-none text-[#FFF] text-xl text-center'
			/>
			<button className='w-[33%] h-full bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-[0.9375rem]'>
				Добавить
			</button>
		</div>
	)
}

export default AddChroniclesDate
