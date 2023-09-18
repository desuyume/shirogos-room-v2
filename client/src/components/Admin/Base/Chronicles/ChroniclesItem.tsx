import { FC } from 'react'

interface IChroniclesItem { 
	day: string
	text: string
	img: string | null
}

const ChroniclesItem: FC<IChroniclesItem> = ({ day, text, img }) => {
	return (
		<div className='w-full min-h-[2.875rem] pl-[0.8rem] pr-[0.87rem] flex items-center mb-[0.7rem] last-of-type:mb-0'>
			<div className='w-[12%] h-full flex justify-center items-center'>
				<p className='text-[#FFF] text-[0.9375rem]'>{day}</p>
			</div>
			<div className='flex-1 h-full flex justify-center items-center'>
				<p className='text-[#FFF] text-center text-[0.9375rem]'>{text}</p>
			</div>
			<div className='w-[2.875rem] h-[2.875rem] border-[1px] border-[#FFF] bg-primaryText bg-opacity-10'>
				{img && <img src={img} alt='chronicles-img' className='w-full h-full' />}
			</div>
		</div>
	)
}

export default ChroniclesItem