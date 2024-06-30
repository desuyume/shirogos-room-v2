import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import {
	IMyTaskWithResponse,
	TaskResponseStatus,
} from '@/types/manual-task.interface'
import { ITask } from '@/types/task.inerface'
import { cn } from '@/utils/cn'
import { FC, useContext, useEffect, useState } from 'react'
import { useSendTaskResponse } from '@/api/useSendTaskResponse'
import ManualTaskPendingStatus from './ManualTaskPendingStatus'
import ManualTaskNoStatus from './ManualTaskNoStatus'

interface IManualTask {
	task: IMyTaskWithResponse
	activeTasks: ITask[] | null
	setActiveTasks: (task: ITask[] | null) => void
}

const ManualTask: FC<IManualTask> = ({ task, activeTasks, setActiveTasks }) => {
	const roomAppearance = useContext(RoomAppearanceContext)
	const [isActive, setIsActive] = useState<boolean>(false)
	const [responseImg, setResponseImg] = useState<File | null>(null)
	const [taskResponseStatus, setTaskResponseStatus] =
		useState<TaskResponseStatus | null>(null)

	const { mutate: sendTaskResponse } = useSendTaskResponse(task.task.id)

	const clickTaskHandler = () => {
		if (taskResponseStatus === TaskResponseStatus.ACCEPTED) return

		const currentTask: ITask = {
			id: task.task.id,
			title: task.task.title,
			description: task.task.description ?? '',
			do: task.task.do,
			exp: task.task.exp,
			type: 'manual',
		}

		if (isActive) {
			!!activeTasks && activeTasks?.length > 1
				? setActiveTasks(activeTasks?.filter(t => t.id !== task.task.id))
				: setActiveTasks(null)
		} else {
			!!activeTasks
				? setActiveTasks([...activeTasks, currentTask])
				: setActiveTasks([currentTask])
		}
	}

	const clickApplyHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()

		if (task.response && task.response.status === TaskResponseStatus.ACCEPTED) {
			console.log('task already accepted')
			return
		}

		const data = new FormData()
		if (responseImg) {
			data.append('responseImg', responseImg)
		}
		sendTaskResponse(data)
	}

	useEffect(() => {
		setIsActive(activeTasks?.some(t => t.id === task.task.id) ?? false)
	}, [activeTasks])

	useEffect(() => {
		if (task.response) {
			setTaskResponseStatus(task.response.status)
		}
	}, [task])

	useEffect(() => {
		if (taskResponseStatus === TaskResponseStatus.ACCEPTED) {
			setActiveTasks(activeTasks?.filter(at => at.id !== task.task.id) ?? null)
		}

		if (taskResponseStatus === TaskResponseStatus.REJECTED) {
			setResponseImg(null)
		}
	}, [taskResponseStatus])

	return (
		<div
			onClick={() => !isActive && clickTaskHandler()}
			className={cn(
				`w-[94%] bg-tertiary bg-opacity-50 rounded-[1.5625rem] cursor-pointer flex justify-between items-center mx-auto relative transition-all first-of-type:mt-1 mb-1 group`,
				{
					'h-[2.9375rem]': !isActive,
					'h-[9.125rem] cursor-default': isActive,
					'opacity-50 cursor-default':
						taskResponseStatus === TaskResponseStatus.ACCEPTED,
				}
			)}
		>
			<p
				className={cn(
					'text-primaryText text-[0.9375rem] text-center max-w-[80%] flex-1 line-clamp-1 break-words px-3 transition-all',
					{
						'opacity-100 visible': !isActive,
						'opacity-0 invisible': isActive,
					}
				)}
			>
				{task.task.title}
			</p>

			<div
				className={cn(
					'w-full h-full absolute flex flex-col items-center transition-all pt-4',
					{
						'opacity-100 visible': isActive,
						'opacity-0 invisible': !isActive,
					}
				)}
			>
				<p
					className={`text-[0.9375rem] leading-none ${
						colorVariants.text[roomAppearance.active_room_color]
					} w-[80%] self-start line-clamp-1 break-words text-center px-2 z-10`}
				>
					{task.task.title}
				</p>

				{taskResponseStatus === TaskResponseStatus.REJECTED && (
					<p className='text-[#827B7D] text-xs absolute top-[33px] w-[80%] self-start text-center leading-none z-10'>
						Отказано. Попробуй еще!
					</p>
				)}

				{isActive && task.response?.status === TaskResponseStatus.PENDING ? (
					<ManualTaskPendingStatus
						taskResponseStatus={taskResponseStatus}
						description={task.task.description}
					/>
				) : (
					isActive && (
						<ManualTaskNoStatus
							taskResponseStatus={taskResponseStatus}
							description={task.task.description}
							imgSrc={task.response?.img ?? null}
							responseImg={responseImg}
							setResponseImg={setResponseImg}
							clickApplyHandler={clickApplyHandler}
						/>
					)
				)}
			</div>

			<div
				onClick={() => isActive && clickTaskHandler()}
				className={cn(
					`w-[20%] h-[2.9375rem] ${
						colorVariants.bg[roomAppearance.active_room_color]
					} rounded-[1.5625rem] self-start flex justify-center items-center transition-all z-10`,
					{
						'h-full': taskResponseStatus === TaskResponseStatus.PENDING,
						'cursor-pointer': isActive,
					}
				)}
			>
				{taskResponseStatus === TaskResponseStatus.ACCEPTED ? (
					<p className='text-primaryText text-xs text-center'>Гуд!</p>
				) : (
					<p className='text-primaryText text-xs text-center'>
						+{task.task.do ?? 0} ДО
					</p>
				)}
			</div>

			<div
				className={cn(
					`w-[calc(100%-2px)] h-[calc(100%-2px)] absolute outline ${
						colorVariants.outline[roomAppearance.active_room_color]
					} outline-[5px] rounded-[1.5625rem] opacity-0 invisible transition-all`,
					{
						'opacity-100 visible': isActive,
						'group-hover:opacity-100 group-hover:visible':
							taskResponseStatus !== TaskResponseStatus.ACCEPTED,
					}
				)}
			/>
		</div>
	)
}

export default ManualTask
