import { useChooseActiveRoomBackground } from '@/api/useChooseActiveRoomBackground'
import { FC } from 'react'

interface IBackgroundItem {
	id: number
	img: string
	title: string
	selectedBg: number | null
	setSelectedBg: React.Dispatch<React.SetStateAction<number | null>>
}

const BackgroundItem: FC<IBackgroundItem> = ({
	id,
	img,
	title,
	selectedBg,
	setSelectedBg,
}) => {
	const { mutate } = useChooseActiveRoomBackground()

	const clickBg = () => {
		if (selectedBg === id) {
			setSelectedBg(null)
			mutate({ backgroundId: null })
		} else {
			setSelectedBg(id)
			mutate({ backgroundId: id })
		}
	}

	return (
		<div
			key={id}
			onClick={clickBg}
			className={
				(selectedBg === id ? 'scale-105 ' : '') +
				'mr-5 flex flex-col items-center relative mb-2 cursor-pointer transition-all duration-300'
			}
		>
			<img
				className={
					(selectedBg === id ? 'border-2 border-[#F8FEFA] ' : '') +
					'min-w-[18.375rem] max-h-[11rem] rounded-[1.5625rem] mb-2 pointer-events-none'
				}
				src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
				alt='bg-img'
			/>
			<p
				className={
					(selectedBg === id
						? 'text-xl -bottom-6 '
						: 'text-[0.8125rem] -bottom-4 ') +
					'text-primaryText absolute transition-all select-none text-center'
				}
			>
				{title ?? 'Нет названия'}
			</p>
		</div>
	)
}

export default BackgroundItem
