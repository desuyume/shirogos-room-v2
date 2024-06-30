import { useDeleteManualTask } from '@/api/useDeleteManualTask'
import { IManualTask, ITaskQueue } from '@/types/manual-task.interface'
import { FC, useEffect, useState } from 'react'

interface IManualTaskItem {
	index: number
	task: IManualTask
	currentTaskQueue: ITaskQueue | null
	setCurrentTaskQueue: React.Dispatch<React.SetStateAction<ITaskQueue | null>>
}

const ManualTaskItem: FC<IManualTaskItem> = ({
	index,
	task,
	currentTaskQueue,
	setCurrentTaskQueue,
}) => {
	const [isActive, setIsActive] = useState<boolean>(false)

	const { mutate: deleteManualTask, isSuccess: isSuccessDelete } =
		useDeleteManualTask(task.id)

	const clickQueue = () => {
		if (isActive) {
			setCurrentTaskQueue(null)
			setIsActive(false)
		} else {
			setCurrentTaskQueue({ index, taskId: task.id })
			setIsActive(true)
		}
	}

	useEffect(() => {
		if (currentTaskQueue?.index !== index) {
			setIsActive(false)
		} else {
			setIsActive(true)
		}
	}, [currentTaskQueue])

	useEffect(() => {
		if (currentTaskQueue?.taskId === task.id) {
			if (isSuccessDelete) {
				setCurrentTaskQueue(null)
			}
		}
	}, [isSuccessDelete])

	return (
		<div className='h-[3.25rem] flex items-center'>
			<p className='w-[5%] text-[#B7B7B7] text-xl text-center bg-secondary h-full flex justify-center items-center'>
				#{index}
			</p>
			<p className='w-[50%] text-[#B7B7B7] text-xl text-center h-full bg-secondary flex justify-center items-center line-clamp-1 px-4 break-words'>
				{task.title}
			</p>
			<div className='bg-secondary h-full w-[20%] flex items-center'>
				<button
					onClick={() => deleteManualTask()}
					className='bg-primary hover:bg-primaryHover transition-all w-full h-[2.5625rem] text-[#FFF]'
				>
					Удалить
				</button>
			</div>
			<button
				onClick={clickQueue}
				className={
					(isActive ? 'bg-[#FFF] text-tertiary' : 'text-[#FFF] bg-tertiary') +
					' ml-[1%] w-[24%] h-[2.5625rem] hover:bg-[#FFF] hover:text-tertiary transition-all'
				}
			>
				Очередь
			</button>
		</div>
	)
}

export default ManualTaskItem
