import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { ITask } from '@/types/task.inerface'
import { FC, useContext, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import AutoTask from './AutoTask'
import ManualTask from './ManualTask'
import { useMyTasksWithResponses } from '@/api/useMyTasksWithResponses'
import { TaskResponseStatus } from '@/types/manual-task.interface'

const Tasks: FC = () => {
	const autoTasks: ITask[] = [
		// {
		// 	id: 1,
		// 	title: 'Де-е-ень рожде-е-ения!',
		// 	description: 'Выбери в настройках свою дату рождения! Обманывать нельзя!',
		// 	do: 10,
		// 	exp: null,
		// 	type: 'auto',
		// },
		// {
		// 	id: 3,
		// 	title: 'Де-е-ень рожде-е-ения!',
		// 	description: 'Выбери в настройках свою дату рождения! Обманывать нельзя!',
		// 	do: 10,
		// 	exp: null,
		// 	type: 'auto',
		// },
		// {
		// 	id: 5,
		// 	title: 'Де-е-ень рожде-е-ения!',
		// 	description: 'Выбери в настройках свою дату рождения! Обманывать нельзя!',
		// 	do: 10,
		// 	exp: null,
		// 	type: 'auto',
		// },
		// {
		// 	id: 7,
		// 	title: 'Де-е-ень рожде-е-ения!',
		// 	description: 'Выбери в настройках свою дату рождения! Обманывать нельзя!',
		// 	do: 10,
		// 	exp: null,
		// 	type: 'auto',
		// },
	]
	const [activeTasks, setActiveTasks] = useState<ITask[] | null>(null)
	const roomAppearance = useContext(RoomAppearanceContext)

	const { data: manualTasks, isLoading, isError } = useMyTasksWithResponses()

	return (
		<div
			className={`w-[32%] h-[27.875rem] ${
				colorVariants.bgRoomGradient[roomAppearance.active_room_color]
			} rounded-[1.5625rem] flex flex-col items-center pt-[0.81rem] mr-[1.56rem] room-tasks`}
		>
			<div className='w-[52%] h-[2.4375rem] bg-tertiary rounded-[1.5625rem] flex justify-center items-center mb-[0.81rem]'>
				<p className='text-primaryText text-xl'>Задания</p>
			</div>

			{isLoading ? (
				<div className='w-full h-[22.0625rem] flex justify-center items-center'>
					<p className='text-primaryText text-xl'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-[22.0625rem] flex justify-center items-center'>
					<p className='text-primaryText text-xl'>Ошибка</p>
				</div>
			) : (
				<Scrollbar
					className='w-full'
					noDefaultStyles
					style={{ height: '22.0625rem' }}
				>
					{autoTasks.map(task => (
						<AutoTask
							key={`auto-${task.id}`}
							task={task}
							activeTasks={activeTasks}
							setActiveTasks={setActiveTasks}
						/>
					))}
					{manualTasks
						.filter(t => t.response?.status !== TaskResponseStatus.ACCEPTED)
						.map(task => (
							<ManualTask
								key={`manual-${task.task.id}`}
								task={task}
								activeTasks={activeTasks}
								setActiveTasks={setActiveTasks}
							/>
						))}
					{manualTasks
						.filter(t => t.response?.status === TaskResponseStatus.ACCEPTED)
						.map(task => (
							<ManualTask
								key={`manual-${task.task.id}`}
								task={task}
								activeTasks={activeTasks}
								setActiveTasks={setActiveTasks}
							/>
						))}
				</Scrollbar>
			)}
		</div>
	)
}

export default Tasks
