import { useChooseActiveRoomFrame } from '@/api/useChooseActiveRoomFrame'
import { IFrame } from '@/types/frame.interface'
import { cn } from '@/utils/cn'
import { FC } from 'react'

interface IFrameItem {
	frame: IFrame
	selectedFrame: number | null
	setSelectedFrame: React.Dispatch<React.SetStateAction<number | null>>
}

const FrameItem: FC<IFrameItem> = ({
	frame,
	selectedFrame,
	setSelectedFrame,
}) => {
	const isSelected = frame.id === selectedFrame
	const { mutate } = useChooseActiveRoomFrame()

	const clickFrame = () => {
		if (isSelected) {
			setSelectedFrame(null)
			mutate({ frameId: null })
		} else {
			setSelectedFrame(frame.id)
			mutate({ frameId: frame.id })
		}
	}

	return (
		<button
			className={cn(
				'min-w-[6.75rem] max-w-[6.75rem] h-[7rem] relative flex flex-col items-center hover:opacity-70 transition-opacity py-[0.125rem]',
				{
					'z-10': isSelected,
				}
			)}
			onClick={clickFrame}
		>
			<img
				src={`${import.meta.env.VITE_SERVER_URL}/${frame.img}`}
				alt='frame'
				className='h-[4.90625rem] aspect-[104/83]'
			/>
			<div className='w-full flex-1 flex justify-center items-center'>
				<p className='text-primaryText text-[0.8125rem] line-clamp-1 max-w-full break-words'>
					{frame.title}
				</p>
			</div>

			<div
				className={cn(
					'absolute top-0 w-[8.25rem] h-[7rem] rounded-[1.125rem] border-2 border-primaryText bg-primaryText bg-opacity-10 transition-all',
					{
						'opacity-0 invisible': !isSelected,
						'opacity-100 visible': isSelected,
					}
				)}
			/>
		</button>
	)
}

export default FrameItem
