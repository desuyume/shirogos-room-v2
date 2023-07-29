import { FC } from 'react'

interface IChroniclesItem { 
	date: string
	day: string
	text?: string
	imgs?: string[]
}

const ChroniclesItem: FC<IChroniclesItem> = ({ day, text, imgs }) => {
	return (
		<div className='flex items-center mb-[0.94rem] last-of-type:mb-0'>
			<p className='min-w-[3.3125rem] h-6 rounded-[0.4375rem] flex justify-center items-center bg-secondaryHover font-secondary font-bold text-[0.9375rem] text-[#FFF] mr-3'>{day}</p>
			<div className='flex flex-wrap gap-[0.44rem]'>
				{text && 
					<p className='font-secondary font-bold text-xs text-[#FFF]'>{text}</p>
				}
				{imgs && imgs.map(img =>
					<img src={img} alt='chronicles-img' />	
				)}
			</div>
		</div>
	)
}

export default ChroniclesItem