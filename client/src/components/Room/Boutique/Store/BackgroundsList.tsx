import { FC } from 'react'
import bgImg from '@/assets/room/background.png'
import { IBackground } from '@/types/background.interface'
import { Scrollbar } from 'react-scrollbars-custom'

interface IBackgroundsList {
	buyedBackgrounds: number[]
	activeBg: IBackground | null
	setActiveBg: React.Dispatch<React.SetStateAction<IBackground | null>>
}

const BackgroundsList: FC<IBackgroundsList> = ({
	buyedBackgrounds,
	activeBg,
	setActiveBg,
}) => {
	const backrounds = [
		{ id: 1, img: bgImg, name: 'Рюгу Рэна', cost: 100 },
		{ id: 2, img: bgImg, name: 'Рюгу Рэна', cost: 250 },
		{ id: 3, img: bgImg, name: 'Рюгу Рэна', cost: 300 },
		{ id: 4, img: bgImg, name: 'Рюгу Рэна', cost: 500 },
		{ id: 5, img: bgImg, name: 'Рюгу Рэна', cost: 1000 },
		{ id: 6, img: bgImg, name: 'Рюгу Рэна', cost: 500 },
		{ id: 7, img: bgImg, name: 'Рюгу Рэна', cost: 700 },
	]

	return (
		<Scrollbar noDefaultStyles className='w-full flex-1'>
			<div className='flex-1 flex flex-col items-center w-full'>
				{backrounds
					.filter(bg => !buyedBackgrounds.includes(bg.id))
					.map(bg => (
						<div
							onClick={() => setActiveBg(bg)}
							className={
								(bg.id === activeBg?.id
									? 'bg-tertiary bg-opacity-[0.35] '
									: '') +
								'w-[69%] max-w-[38.4375rem] pt-[0.69rem] pb-5 flex flex-col items-center rounded-[1.25rem] hover:bg-tertiary hover:bg-opacity-[0.35] cursor-pointer mb-10 last-of-type:mb-0 transition-all'
							}
							key={bg.id}
						>
							<img
								className='w-[88%] rounded-[1.5625rem] mb-5'
								src={bg.img}
								alt='bg-img'
							/>
							<p className='text-primaryText text-[1.5625rem] leading-[100%] text-center w-[88%]'>
								{bg.name} - <span className='text-[#EBE984]'>{bg.cost} ДО</span>
							</p>
						</div>
					))}
			</div>
		</Scrollbar>
	)
}

export default BackgroundsList
