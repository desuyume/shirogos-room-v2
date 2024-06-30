import { RoomAppearanceContext } from '@/Context'
import ImgUpload from '@/components/ImgUpload'
import { TaskResponseStatus } from '@/types/manual-task.interface'
import { cn } from '@/utils/cn'
import { FC, useContext } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface ManualTaskNoStatusProps {
	taskResponseStatus: TaskResponseStatus | null
	description: string | null
	imgSrc: string | null
	responseImg: File | null
	setResponseImg: React.Dispatch<React.SetStateAction<File | null>>
	clickApplyHandler: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void
}

const ManualTaskNoStatus: FC<ManualTaskNoStatusProps> = ({
	taskResponseStatus,
	description,
	imgSrc,
	responseImg,
	setResponseImg,
	clickApplyHandler,
}) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	return (
		<div
			className={cn(
				'w-full px-3 flex justify-between items-center mt-[1.6875rem] visible opacity-100 transition-all manual-task-no-status',
				{
					'invisible opacity-0':
						taskResponseStatus === TaskResponseStatus.PENDING,
				}
			)}
		>
			<Scrollbar
				className={`z-10 cursor-default ${roomAppearance.active_room_color}-scrollbar flex-1 mr-5`}
				onClick={e => e.stopPropagation()}
				noDefaultStyles
				style={{ height: '64px' }}
			>
				<p className='text-[0.9375rem] text-center leading-none break-words text-primaryText'>
					{description}
				</p>
			</Scrollbar>
			<ImgUpload
				imgSrc={imgSrc}
				img={responseImg}
				setImg={setResponseImg}
				className='z-10 mr-5 aspect-[106/69] max-w-[120px]'
				containerSize={{ width: '25%', height: 'auto' }}
			/>
			<button
				onClick={clickApplyHandler}
				className='text-primaryText text-[0.6vw] w-[27%] aspect-[114/26] bg-[#4A9648] hover:bg-opacity-80 rounded-r-[1.5625rem] text-left pl-[3%] z-10'
			>
				ПРИНЯТЬ
			</button>
		</div>
	)
}

export default ManualTaskNoStatus
