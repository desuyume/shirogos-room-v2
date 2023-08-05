import { FC } from 'react'
import ManualTaskItem from './ManualTaskItem'

interface IManualTasksList {
	currentQueue: number | null
	setCurrentQueue: React.Dispatch<React.SetStateAction<number | null>>
}

const ManualTasksList: FC<IManualTasksList> = ({
	currentQueue,
	setCurrentQueue,
}) => {
	const tasks = [
		{ description: 'Задание 1' },
		{ description: 'Задание 2' },
		{ description: 'Задание 3' },
		{ description: 'Задание 4' },
	]
	return (
		<div className='w-[58.5vw] mt-[0.8rem]'>
			<div className='w-[75%] h-[3.375rem] flex justify-center items-center bg-tertiary'>
				<h3 className='text-[#FFF] text-[1.5625rem]'>Список ручных заданий</h3>
			</div>
			{tasks.map((task, index) => (
				<ManualTaskItem
					index={index + 1}
					description={task.description}
					currentQueue={currentQueue}
					setCurrentQueue={setCurrentQueue}
				/>
			))}
		</div>
	)
}

export default ManualTasksList
