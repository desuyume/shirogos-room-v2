import { FC, useState } from 'react'

const DonateItem: FC = () => {
	const [addDonateValue, setAddDonateValue] = useState<string>('')
	const [commentValue, setCommentValue] = useState<string>(
		'Absolver + Tales of Zestiria'
	)

	return (
		<div className='flex items-center'>
			<div className='bg-tertiary h-[3.16rem] flex justify-center items-center w-[11.40625vw] mr-[0.8vw]'>
				<p className='text-xl text-[#FFF] text-center'>Mode_Of_God</p>
			</div>
			<div className='bg-tertiary h-[3.16rem] flex justify-center items-center w-[7.65625vw] mr-[0.8vw]'>
				<p className='text-xl text-[#FFF] text-center'>13.770р</p>
			</div>
			<div className='bg-tertiary h-[3.16rem] flex justify-center items-center w-[7.65625vw] mr-[0.7vw]'>
				<input
					value={addDonateValue}
					onChange={e => setAddDonateValue(e.target.value)}
					className='text-xl bg-tertiary w-full h-full outline-none text-[#FFF] text-center'
				/>
			</div>
			<button className='bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-[0.9375rem] mr-[0.7vw] min-w-[5.1vw] max-w-[5.1vw] h-[2.5rem]'>
				Добавить
			</button>
			<div className='bg-tertiary h-[3.16rem] flex justify-center items-center w-[37.03125vw]'>
				<input
					value={commentValue}
					onChange={e => setCommentValue(e.target.value)}
					className='text-xl bg-tertiary w-full h-full outline-none text-[#FFF] text-center'
				/>
			</div>
		</div>
	)
}

export default DonateItem
