import { FC } from 'react'

interface IWikiCard {
	name: string
	img: string
	subtitle: string
	subsubtitle: string
	isSidebarOpen: boolean
}

const WikiCard: FC<IWikiCard> = ({
	name,
	img,
	subtitle,
	subsubtitle,
	isSidebarOpen,
}) => {
	return (
		<div className='flex flex-col items-end'>
			<div className='bg-primary bg-opacity-80 flex justify-center items-center w-[24.8125rem] h-[3.75rem] mb-3'>
				<p className='font-secondary font-bold text-[#FFF] text-[2.1875rem] text-center'>
					{name}
				</p>
			</div>
			<div
				className={
					(isSidebarOpen
						? 'before:opacity-0 after:opacity-100'
						: 'before:opacity-100 after:opacity-0') +
					' rounded-[2.3125rem] z-20 p-[1px] mb-[0.93rem] relative before:bg-wiki-character-gradient before:content-[""] before:block before:h-full before:absolute before:inset-0 before:w-full before:rounded-[2.3125rem] before:-z-10 transition-all before:transition-all duration-1000 ease-out before:duration-1000 before:ease-out after:bg-wiki-character-gradient-second after:content-[""] after:block after:h-full after:absolute after:inset-0 after:w-full after:rounded-[2.3125rem] after:-z-10 after:transition-all after:duration-1000 after:ease-out'
				}
			>
				<img
					className='w-[22.5rem] rounded-[2.3125rem]'
					src={img}
					alt={`${name}-img`}
				/>
			</div>

			<div className='w-[24.8125rem] h-[2.625rem] bg-tertiary bg-opacity-80 flex justify-center items-center mb-3'>
				<p className='text-[#FFF] font-secondary font-bold text-[1.5625rem] text-center'>
					{subsubtitle || '???'}
				</p>
			</div>
			<div className='w-[28.1875rem] h-[3.25rem] bg-tertiary bg-opacity-80 flex justify-center items-center'>
				<p className='text-[#FFF] font-secondary font-bold text-[1.5625rem] text-center'>
					{subtitle}
				</p>
			</div>
		</div>
	)
}

export default WikiCard
