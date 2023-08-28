import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

const Tasks: FC = () => {
	const tasks = [
		{ id: 1, text: 'Указать в настройках свой День Рождения', reward: 10 },
		{ id: 2, text: 'Открыть первый арт в Паноптикуме', reward: 10 },
		{ id: 3, text: 'Привязать Discord', reward: 10 },
		{ id: 4, text: 'Купить свою первую рамку', reward: 10 },
		{ id: 5, text: 'Получить десять достижений', reward: 50 },
		{ id: 6, text: 'Купить все цветовые темы аккаунта', reward: 40 },
		{ id: 7, text: 'Составить уникальную роль', reward: 10 },
		{ id: 8, text: 'Составить уникальную роль', reward: 10 },
		{ id: 9, text: 'Составить уникальную роль', reward: 10 },
		{ id: 10, text: 'Составить уникальную роль', reward: 10 },
		{ id: 11, text: 'Составить уникальную роль', reward: 10 },
		{ id: 12, text: 'Составить уникальную роль', reward: 10 },
		{ id: 13, text: 'Составить уникальную роль', reward: 10 },
	]

	return (
		<div className='w-[32%] h-[27.875rem] bg-room-gradient rounded-[1.5625rem] flex flex-col items-center pt-[0.81rem] mr-[1.56rem] room-tasks'>
			<div className='w-[52%] h-[2.4375rem] bg-tertiary rounded-[1.5625rem] flex justify-center items-center mb-[0.81rem]'>
				<p className='text-primaryText text-xl'>Задания</p>
			</div>
			<Scrollbar
				className='w-[94%]'
				noDefaultStyles
				style={{ height: '22.0625rem' }}
			>
				{tasks.map(task => (
					<div key={task.id} className='w-full h-[2.9375rem] bg-tertiary bg-opacity-50 rounded-[1.5625rem] mb-1 last-of-type:mb-0 flex justify-between items-center'>
						<p className='text-primaryText text-[0.9375rem] text-center flex-1 px-3 leading-[97.795%]'>
							{task.text}
						</p>
						<div className='w-[20%] h-full bg-primary rounded-[1.5625rem] flex justify-center items-center'>
							<p className='text-primaryText text-xs text-center'>+{task.reward} ДО</p>
						</div>
					</div>
				))}
			</Scrollbar>
		</div>
	)
}

export default Tasks
