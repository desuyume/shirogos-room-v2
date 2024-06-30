import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { ITask } from '@/types/task.inerface'
import { FC, useContext } from 'react'

interface IAutoTask {
	task: ITask
	activeTasks: ITask[] | null
	setActiveTasks: (task: ITask[] | null) => void
}

const AutoTask: FC<IAutoTask> = ({ task, activeTasks, setActiveTasks }) => {
	const roomAppearance = useContext(RoomAppearanceContext)
	const isActive: boolean = activeTasks?.some(t => t.id === task.id) ?? false

	const clickHandler = () => {
		if (isActive) {
			!!activeTasks && activeTasks?.length > 1
				? setActiveTasks(activeTasks?.filter(t => t.id !== task.id))
				: setActiveTasks(null)
		} else {
			!!activeTasks
				? setActiveTasks([...activeTasks, task])
				: setActiveTasks([task])
		}
	}

	return (
		<button
			onClick={clickHandler}
			className={`w-[94%] h-[2.9375rem] bg-tertiary bg-opacity-50 rounded-[1.5625rem] mb-1 last-of-type:mb-0 flex justify-between items-center mx-auto relative group`}
		>
			<p className='text-primaryText text-[0.9375rem] text-center flex-1 line-clamp-2 break-words px-3 leading-[97.795%]'>
				{task.title}
			</p>
			<div
				className={`w-[20%] h-full ${
					colorVariants.bg[roomAppearance.active_room_color]
				} rounded-[1.5625rem] flex justify-center items-center`}
			>
				<p className='text-primaryText text-xs text-center'>
					+{task.do ?? 0} ДО
				</p>
			</div>

			<div
				className={`w-full h-full absolute outline ${
					colorVariants.outline[roomAppearance.active_room_color]
				} outline-[5px] rounded-[1.5625rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible`}
			/>
		</button>
	)
}

export default AutoTask
