import { useAcceptTaskResponse } from '@/api/useAcceptTaskResponse'
import { useRejectTaskResponse } from '@/api/useRejectTaskResponse'
import { IManualTaskResponse } from '@/types/manual-task.interface'
import { FC } from 'react'

interface TaskQueueItemProps {
	response: IManualTaskResponse
	setZoomedImg: React.Dispatch<React.SetStateAction<string | null>>
}

const TaskQueueItem: FC<TaskQueueItemProps> = ({ response, setZoomedImg }) => {
	const { mutate: accept } = useAcceptTaskResponse(response.id)
	const { mutate: reject } = useRejectTaskResponse(response.id)

	return (
		<div className='h-[7.1875rem] flex items-center mb-4 last-of-type:mb-0'>
			<div className='w-[35%] max-w-[35%] h-full flex justify-center items-center'>
				<p className='text-[#FFF] text-xl break-words line-clamp-1 px-2'>
					{response.username}
				</p>
			</div>

			<div className='w-[30%] h-full flex justify-center items-center'>
				{!!response.img ? (
					<img
						src={`${import.meta.env.VITE_SERVER_URL}/${response.img}`}
						alt='response-screen'
						className='w-[70%] h-[4.625rem] object-contain cursor-zoom-in'
						onClick={() => setZoomedImg(response.img)}
					/>
				) : (
					<div className='bg-primaryText w-[70%] h-[4.625rem] flex justify-center items-center'>
						<p className='text-center leading-none'>скрин не прикреплен</p>
					</div>
				)}
			</div>
			<div className='w-[35%] h-[4.0625rem] flex mr-4'>
				<button
					onClick={() => accept()}
					className='w-[70%] h-full text-[1.875rem] bg-primary hover:bg-primaryHover transition-all text-[#FFF]'
				>
					ДА
				</button>
				<button
					onClick={() => reject()}
					className='w-[30%] h-full text-xl bg-tertiary hover:bg-opacity-70 transition-all text-[#FFF]'
				>
					НЕТ
				</button>
			</div>
		</div>
	)
}

export default TaskQueueItem
