import { RoomAppearanceContext } from '@/Context'
import { TaskResponseStatus } from '@/types/manual-task.interface'
import { cn } from '@/utils/cn'
import { FC, useContext } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface ManualTaskPendingStatusProps {
	taskResponseStatus: TaskResponseStatus | null
	description: string | null
}

const ManualTaskPendingStatus: FC<ManualTaskPendingStatusProps> = ({
	taskResponseStatus,
	description,
}) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	return (
		<div
			className={cn(
				'flex flex-col justify-between items-center w-[80%] mt-5 self-start invisible opacity-0 transition-all manual-task-pending',
				{
					'visible opacity-100':
						taskResponseStatus === TaskResponseStatus.PENDING,
				}
			)}
		>
			<Scrollbar
				className={`mb-2 z-10 cursor-default ${roomAppearance.active_room_color}-scrollbar`}
				onClick={e => e.stopPropagation()}
				noDefaultStyles
				style={{ width: '60%', height: '48px' }}
			>
				<p className='text-[0.9375rem] text-center leading-none break-words text-primaryText'>
					{description}
				</p>
			</Scrollbar>

			<div className='w-[9.5rem] max-w-full text-center h-[1.625rem] bg-[#4B4B4B] rounded-r-[1.5625rem] z-10 flex justify-center items-center'>
				<p className='text-primaryText text-xs leading-none'>НА ПРОВЕРКЕ</p>
			</div>
		</div>
	)
}

export default ManualTaskPendingStatus
