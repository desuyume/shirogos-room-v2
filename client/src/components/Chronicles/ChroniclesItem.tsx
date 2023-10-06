import { FC } from 'react'

interface IChroniclesItem {
	date: string
	day: string
	text?: string
	img?: string
}

const ChroniclesItem: FC<IChroniclesItem> = ({ day, text, img }) => {
	return (
		<div className='flex items-center mb-[0.94rem] last-of-type:mb-0'>
			<p className='min-w-[3.3125rem] h-6 rounded-[0.4375rem] flex justify-center items-center bg-secondaryHover font-secondary font-bold text-[0.9375rem] text-primaryText mr-3'>
				{day}
			</p>
			<div className='flex flex-wrap gap-[0.44rem]'>
				{text && <p className='text-xs text-primaryText w-full'>{text}</p>}
				{img && <img src={`${import.meta.env.VITE_SERVER_URL}/${img}`} className='w-[2.875rem] h-[2.875rem]' alt='img' />}
			</div>
		</div>
	)
}

export default ChroniclesItem
