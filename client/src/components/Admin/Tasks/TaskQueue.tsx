import { FC } from 'react'
import TaskQueueItem from './TaskQueueItem'
import { ITaskQueue } from '@/types/manual-task.interface'
import { useTaskResponses } from '@/api/useTaskResponses'
import { Scrollbar } from 'react-scrollbars-custom'

interface TaskQueueProps {
	currentTaskQueue: ITaskQueue
}

const TaskQueue: FC<TaskQueueProps> = ({ currentTaskQueue }) => {
	const {
		data: taskResponses,
		isLoading,
		isError,
	} = useTaskResponses(currentTaskQueue.taskId)

	return (
		<div
			className={
				(!!currentTaskQueue ? 'visible opacity-100' : 'invisible opacity-0') +
				' w-[37vw] h-[51.5625rem] bg-secondary transition-all mr-7 manual-task-queue'
			}
		>
			<div className='w-full h-[3.375rem] bg-tertiary flex justify-center items-center'>
				{!!currentTaskQueue && (
					<h3 className='text-[#FFF] text-[1.375rem]'>
						Очередь #{currentTaskQueue.index}
					</h3>
				)}
			</div>

			{isLoading ? (
				<div className='w-full h-[48.1875rem] flex justify-center items-center'>
					<p className='text-primaryText text-[1.375rem]'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-[48.1875rem] flex justify-center items-center'>
					<p className='text-primaryText text-[1.375rem]'>Ошибка</p>
				</div>
			) : !taskResponses.responses.length ? (
				<div className='w-full h-[48.1875rem] flex justify-center items-center'>
					<p className='text-primaryText text-[1.375rem]'>Нет ответов</p>
				</div>
			) : (
				<Scrollbar
					noDefaultStyles
					style={{ width: '100%', height: '48.1875rem' }}
				>
					<>
						{taskResponses.responses.map(response => (
							<TaskQueueItem key={response.id} response={response} />
						))}
					</>
				</Scrollbar>
			)}
		</div>
	)
}

export default TaskQueue
