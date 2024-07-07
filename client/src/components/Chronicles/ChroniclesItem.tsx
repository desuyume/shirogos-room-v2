import { FC } from 'react'

interface IChroniclesItem {
	date: string
	day: number
	prefix?: string
	text?: string
	img?: string
}

const ChroniclesItem: FC<IChroniclesItem> = ({ day, prefix, text, img }) => {
	return (
		<div className='flex items-center mb-[0.9375rem] last-of-type:mb-0'>
			<div className='min-w-[3.3125rem] max-w-[3.3125rem] min-h-[1.5rem] rounded-[0.4375rem] flex justify-center items-center bg-secondaryHover mr-3'>
				<p className='font-pressStart text-[0.625rem] text-primaryText w-full text-center px-1 break-words py-1'>
					{!!prefix && prefix}
					{day}
				</p>
			</div>

			<div className='flex flex-wrap gap-[0.4375rem]'>
				{text && (
					<p className='max-w-[7.875rem] font-pressStart text-[0.625rem] leading-none break-words text-primaryText'>
						{text}
					</p>
				)}
				{img && (
					<img
						src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
						className='w-[2.875rem] h-[2.875rem]'
						alt='chronicle-img'
					/>
				)}
			</div>
		</div>
	)
}

export default ChroniclesItem
