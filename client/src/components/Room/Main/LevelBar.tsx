import { cn } from '@/utils/cn'
import { FC } from 'react'

interface LevelBarProps {
	level: number
	exp: number
}

const LevelBar: FC<LevelBarProps> = ({ level, exp }) => {
	return (
		<div className='w-[calc(100%-2px)] h-[6.4375rem] absolute bottom-[2px] rounded-l-[1.5625rem] overflow-hidden'>
			<div className='w-full h-full relative'>
				<div className='w-[calc(100%-31px)] h-full absolute bg-[#4A9648] rounded-l-[1.5625rem]' />

				<div className='w-[calc(100%-11px)] h-[38px] absolute bottom-0 flex justify-end items-center'>
					<svg
						width='77'
						height='151'
						viewBox='0 0 77 151'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M77 75.5L0.500001 150.411L0.500007 0.588803L77 75.5Z'
							fill='#4A9648'
						/>
					</svg>
				</div>
			</div>

			<div className='w-full h-[38px] absolute bottom-0 flex justify-center items-center z-10'>
				<p className='text-primaryText text-[0.9375rem] text-center leading-none break-words line-clamp-2 px-8'>
					Уровень {level}
				</p>
			</div>

			<div className='w-[calc(100%-31px)] h-[6.4375rem] absolute bottom-0 rounded-l-[1.5625rem] flex'>
				<div
					style={{ width: `${exp}%` }}
					className={cn(
						'bg-[#79C677] h-full rounded-l-[1.5625rem] relative flex items-end',
						{
							'bg-transparent': exp < 7,
						}
					)}
				>
					<div className='w-full h-[38px] relative flex items-center justify-end'>
						<svg
							width='77'
							height='151'
							viewBox='0 0 77 151'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='absolute -right-[20px]'
						>
							<path
								d='M77 75.5L0.500001 150.411L0.500007 0.588803L77 75.5Z'
								fill='#79C677'
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LevelBar
