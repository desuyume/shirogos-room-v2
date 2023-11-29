import { IBackground } from '@/types/background.interface'
import { FC } from 'react'

interface IBackgroundItem {
	background: IBackground
	buyedBackgrounds: IBackground[]
	activeBg: IBackground | null
	setActiveBg: React.Dispatch<React.SetStateAction<IBackground | null>>
}

const BackgroundItem: FC<IBackgroundItem> = ({
	background,
	buyedBackgrounds,
	activeBg,
	setActiveBg,
}) => {
	const isBuyed = buyedBackgrounds.some(bg => bg.id === background.id)

	return (
		<div
			key={background.id}
			onClick={() =>
				activeBg?.id === background.id
					? setActiveBg(null)
					: setActiveBg(background)
			}
			className={
				(background.id === activeBg?.id
					? 'bg-tertiary bg-opacity-[0.35] '
					: '') +
				'w-[69%] max-w-[38.4375rem] pt-[0.69rem] pb-5 flex flex-col items-center rounded-[1.25rem] hover:bg-tertiary hover:bg-opacity-[0.35] cursor-pointer mb-10 last-of-type:mb-0 transition-all'
			}
		>
			<img
				className='w-[88%] rounded-[1.5625rem] mb-5'
				src={`${import.meta.env.VITE_SERVER_URL}/${background.img}`}
				alt='bg-img'
			/>
			<p className='text-primaryText text-[1.5625rem] leading-[100%] text-center w-[88%]'>
				{background.name ?? 'Без названия'} -{' '}
				<span className='text-[#EBE984]'>
					{!!isBuyed ? 'Куплено' : `${background.cost} ДО`}
				</span>
			</p>
		</div>
	)
}

export default BackgroundItem
