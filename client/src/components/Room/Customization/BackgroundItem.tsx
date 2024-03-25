import { useChooseActiveRoomBackground } from '@/api/useChooseActiveRoomBackground'
import { FC } from 'react'

interface IBackgroundItem {
	bgId: number
	bgImg: string
	bgName: string
	selectedBg: number | null
	setSelectedBg: React.Dispatch<React.SetStateAction<number | null>>
}

const BackgroundItem: FC<IBackgroundItem> = ({
	bgId,
	bgImg,
	bgName,
	selectedBg,
	setSelectedBg,
}) => {
	const { mutate } = useChooseActiveRoomBackground()

	const clickBg = () => {
		if (selectedBg === bgId) {
			setSelectedBg(null)
			mutate({ backgroundId: null })
		} else {
			setSelectedBg(bgId)
			mutate({ backgroundId: bgId })
		}
	}

	return (
		<div
			key={bgId}
			onClick={clickBg}
			className={
				(selectedBg === bgId ? 'scale-105 ' : '') +
				'mr-5 flex flex-col items-center relative mb-2 cursor-pointer transition-all duration-300'
			}
		>
			<img
				className={
					(selectedBg === bgId ? 'border-2 border-[#F8FEFA] ' : '') +
					'min-w-[18.375rem] max-h-[11rem] rounded-[1.5625rem] mb-2 pointer-events-none'
				}
				src={`${import.meta.env.VITE_SERVER_URL}/${bgImg}`}
				alt='bg-img'
			/>
			<p
				className={
					(selectedBg === bgId
						? 'text-xl -bottom-6 '
						: 'text-[0.8125rem] -bottom-4 ') +
					'text-primaryText absolute transition-all select-none text-center'
				}
			>
				{bgName ?? 'Нет названия'}
			</p>
		</div>
	)
}

export default BackgroundItem
