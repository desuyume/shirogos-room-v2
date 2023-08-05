import { FC } from 'react'
import TaskQueueItem from './TaskQueueItem'

interface ITaskQueue {
	currentQueue: number | null
}

const TaskQueue: FC<ITaskQueue> = ({ currentQueue }) => {
	return (
		<div
			className={
				(currentQueue ? 'visible opacity-100' : 'invisible opacity-0') +
				' w-[37vw] h-[51.5625rem] overflow-y-auto bg-secondary transition-all'
			}
		>
			<div className='w-full h-[3.375rem] bg-tertiary flex justify-center items-center'>
				<h3 className='text-[#FFF] text-[1.375rem]'>Очередь #{currentQueue}</h3>
			</div>
			<TaskQueueItem />
		</div>
	)
}

export default TaskQueue
